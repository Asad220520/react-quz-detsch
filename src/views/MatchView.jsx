// src/views/MatchView.jsx (mobile‑first, удобнее на телефоне)
import React from "react";
import Panel from "../components/ui/Panel";
import Button from "../components/ui/Button";
import Chip from "../components/ui/Chip";
import { shuffle, hapticSuccess } from "../lib/utils";
import {
  Play,
  Timer as TimerIcon,
  RotateCcw,
  Trophy,
  Hash,
} from "lucide-react";

export default function MatchView({ deck }) {
  // [{key,id,text,side,disabled,selected}]
  const [tiles, setTiles] = React.useState([]);
  const [selected, setSelected] = React.useState([]); // индексы выбранных тайлов (0..N-1)
  const [moves, setMoves] = React.useState(0);
  const [finished, setFinished] = React.useState(false);
  const [elapsedMs, setElapsedMs] = React.useState(0);
  const [pairs, setPairs] = React.useState(
    Math.min(8, deck?.cards?.length || 0)
  ); // количество пар в игре

  // таймер/локи
  const rafRef = React.useRef(null); // RAF id
  const cmpRef = React.useRef(null); // timeout сравнения пары
  const startTsRef = React.useRef(0);
  const lockRef = React.useRef(false); // блок кликов во время сравнения
  const gameIdRef = React.useRef(0); // версия партии

  // best‑результаты по колоде (localStorage)
  const [best, setBest] = React.useState(() => getBest(deck?.id));
  React.useEffect(() => setBest(getBest(deck?.id)), [deck?.id]);

  // формат таймера
  const tText = React.useMemo(() => {
    const sec = Math.floor(elapsedMs / 1000);
    const mm = String(Math.floor(sec / 60)).padStart(2, "0");
    const ss = String(sec % 60).padStart(2, "0");
    return `${mm}:${ss}`;
  }, [elapsedMs]);

  // ресет, когда сменился набор
  React.useEffect(() => {
    cleanupTimers();
    resetState();
    setPairs((p) =>
      Math.min(Math.max(4, p || 8), Math.min(12, deck?.cards?.length || 0))
    );
  }, [deck?.id, deck?.cards?.length]);

  React.useEffect(() => () => cleanupTimers(), []);

  function cleanupTimers() {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (cmpRef.current) clearTimeout(cmpRef.current);
    rafRef.current = null;
    cmpRef.current = null;
  }

  function resetState() {
    setTiles([]);
    setSelected([]);
    setMoves(0);
    setFinished(false);
    setElapsedMs(0);
    lockRef.current = false;
  }

  function startTimer() {
    startTsRef.current = performance.now();
    const myGame = gameIdRef.current;
    const step = () => {
      if (gameIdRef.current !== myGame) return; // отмена, если игра сменилась
      setElapsedMs(performance.now() - startTsRef.current);
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
  }
  function stopTimer() {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
  }

  function startMatch() {
    cleanupTimers();
    resetState();
    gameIdRef.current += 1; // новая версия партии
    const myGame = gameIdRef.current;

    const total = deck?.cards?.length || 0;
    const nPairs = Math.max(4, Math.min(pairs || 8, Math.min(12, total)));
    if (nPairs === 0) return;

    // берём случайные nPairs карт
    const base = shuffle(deck.cards.slice()).slice(0, nPairs);

    // строим пары: id = индекс в base, key = уникальный ключ с учётом стороны
    const t = shuffle(
      base.flatMap((c, i) => [
        { key: `${i}-q`, id: i, text: c.front, side: "q" },
        { key: `${i}-a`, id: i, text: c.back, side: "a" },
      ])
    ).map((x) => ({ ...x, disabled: false, selected: false }));

    if (gameIdRef.current !== myGame) return; // игра уже перезапущена
    setTiles(t);
    startTimer();
  }

  function clickTile(ix) {
    if (lockRef.current) return;
    setTiles((prev) => {
      const cur = [...prev];
      const t = cur[ix];
      if (!t || t.disabled || t.selected) return prev;
      cur[ix] = { ...t, selected: true };
      return cur;
    });

    setSelected((prevSel) => {
      const nextSel = prevSel.concat(ix);
      if (nextSel.length < 2) return nextSel;

      lockRef.current = true; // есть пара для сравнения
      setMoves((m) => m + 1);

      const [a, b] = nextSel;
      const myGame = gameIdRef.current;

      if (cmpRef.current) clearTimeout(cmpRef.current);
      cmpRef.current = setTimeout(() => {
        if (gameIdRef.current !== myGame) return; // игра перезапущена

        setTiles((prev) => {
          const arr = [...prev];
          const ta = arr[a];
          const tb = arr[b];
          if (ta && tb && a !== b && ta.id === tb.id && ta.side !== tb.side) {
            try {
              navigator.vibrate?.(35);
            } catch {}
            hapticSuccess?.();
            arr[a] = { ...ta, disabled: true, selected: true };
            arr[b] = { ...tb, disabled: true, selected: true };
          } else {
            if (ta) arr[a] = { ...ta, selected: false };
            if (tb) arr[b] = { ...tb, selected: false };
          }

          // финиш
          const done = arr.length > 0 && arr.every((t) => t.disabled);
          if (done) {
            setFinished(true);
            stopTimer();
            // сохранить рекорд
            const result = {
              ms: elapsedMs,
              moves: moves + 1,
              pairs: arr.length / 2,
            };
            setBest(saveBest(deck?.id, result));
          }
          return arr;
        });

        setSelected([]);
        lockRef.current = false;
      }, 260);

      return [];
    });
  }

  // ——— helpers: рекорды в localStorage ———
  function getBestKey(id) {
    return `match.best.${id || "__noid__"}`;
  }
  function getBest(id) {
    try {
      const raw = localStorage.getItem(getBestKey(id));
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }
  function saveBest(id, { ms, moves, pairs }) {
    const prev = getBest(id);
    const better =
      !prev || ms < prev.ms || (ms === prev.ms && moves < prev.moves);
    const val = better ? { ms, moves, pairs, ts: Date.now() } : prev;
    try {
      localStorage.setItem(getBestKey(id), JSON.stringify(val));
    } catch {}
    return val;
  }

  // ——— UI ———
  const totalCards = deck?.cards?.length || 0;
  const canStart = totalCards > 0 && pairs > 0;
  const safePairsMax = Math.min(12, totalCards);

  return (
    <Panel>
      {/* Header / метрики */}
      <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
        <div className="q text-xl font-extrabold">Матч</div>
        <div className="flex items-center gap-2">
          <Chip aria-live="polite">
            <TimerIcon className="size-4" /> <span>{tText}</span>
          </Chip>
          <Chip>Ходы: {moves}</Chip>
          <Chip>
            <Hash className="size-4" /> Пары: {pairs}
          </Chip>
          {finished && <Chip className="border-emerald-500">Готово!</Chip>}
        </div>
      </div>

      {/* Контролы: пары + старт/рестарт */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <div className="chip flex items-center gap-2">
          Пары:
          <Button
            size="sm"
            onClick={() => setPairs((p) => Math.max(4, p - 1))}
            disabled={tiles.length > 0}
          >
            −
          </Button>
          <input
            type="number"
            min={4}
            max={safePairsMax}
            value={pairs}
            onChange={(e) =>
              setPairs(() => {
                const v = parseInt(e.target.value || "4", 10);
                return Math.max(4, Math.min(safePairsMax, isNaN(v) ? 4 : v));
              })
            }
            className="w-20 bg-transparent outline-none text-center"
          />
          <Button
            size="sm"
            onClick={() => setPairs((p) => Math.min(safePairsMax, p + 1))}
            disabled={tiles.length > 0}
          >
            +
          </Button>
        </div>
        <Button variant="primary" onClick={startMatch} disabled={!canStart}>
          {tiles.length ? (
            <>
              <RotateCcw className="size-5" /> Рестарт
            </>
          ) : (
            <>
              <Play className="size-5" /> Старт
            </>
          )}
        </Button>
        {best && (
          <Chip title={`Рекорд от ${new Date(best.ts).toLocaleDateString()}`}>
            <Trophy className="size-4" /> {fmtBest(best)}
          </Chip>
        )}
      </div>

      {/* Поле: responsive‑сетка, крупные тапы */}
      <div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2"
        role="grid"
        aria-label="Поле для сопоставления"
      >
        {tiles.map((t, i) => {
          const cls = [
            "btnlike text-left min-h-16 p-3 sm:p-4 break-words", // крупнее зона
            t.selected && "ring-2 ring-emerald-500/60",
            t.disabled ? "opacity-40" : t.selected ? "opacity-90" : "",
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <button
              key={t.key}
              type="button"
              role="gridcell"
              aria-pressed={t.selected}
              disabled={t.disabled || lockRef.current}
              onClick={() => clickTile(i)}
              className={cls}
            >
              <div className="text-[10px] uppercase opacity-60 tracking-wide">
                {t.side === "q" ? "front" : "back"}
              </div>
              <div className="font-bold text-sm sm:text-base leading-snug">
                {t.text}
              </div>
            </button>
          );
        })}
      </div>

      {/* Пустое состояние */}
      {totalCards === 0 && (
        <div className="mt-3 rounded-xl border border-white/10 p-4 text-center bg-white/5">
          В этом наборе пока нет карточек.
        </div>
      )}

      {/* Итоговый экран */}
      {finished && (
        <div className="mt-3 grid gap-2 sm:grid-cols-[1fr_auto] items-center">
          <div className="flex flex-wrap items-center gap-2">
            <Chip className="border-emerald-500">Время: {tText}</Chip>
            <Chip>Ходы: {moves}</Chip>
            {best && (
              <Chip>
                <Trophy className="size-4" /> {fmtBest(best)}
              </Chip>
            )}
          </div>
          <div className="flex gap-2">
            <Button onClick={startMatch}>
              <RotateCcw className="size-5" /> Ещё раз
            </Button>
          </div>
        </div>
      )}
    </Panel>
  );
}

function fmtBest(best) {
  const mm = String(Math.floor(best.ms / 1000 / 60)).padStart(2, "0");
  const ss = String(Math.floor((best.ms / 1000) % 60)).padStart(2, "0");
  return `${mm}:${ss} • ${best.moves} ходов`;
}
