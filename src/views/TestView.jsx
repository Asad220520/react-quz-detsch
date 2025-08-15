// src/views/TestView.jsx (mobile‑first, удобнее на телефоне)
import React from "react";
import Panel from "../components/ui/Panel";
import Button from "../components/ui/Button";
import Chip from "../components/ui/Chip";
import { shuffle, normalize, hapticSuccess } from "../lib/utils";
import {
  Hash,
  BadgeCheck,
  Sparkles,
  RotateCcw,
  Check,
  X,
  HelpCircle,
} from "lucide-react";

// ——— helpers ———
function uniqueBacks(cards, excludeBack) {
  // множественные одинаковые переводы не дублируем
  const set = new Set();
  for (const c of cards) {
    if (c?.back == null) continue;
    if (excludeBack != null && c.back === excludeBack) continue;
    set.add(c.back);
  }
  return Array.from(set);
}

function pickTFMaybe(cards, item) {
  const pool = uniqueBacks(cards, item.back);
  if (pool.length === 0) return item.back; // другой опции нет — спрашиваем про верный
  const wrong = shuffle(pool)[0];
  return Math.random() < 0.5 ? item.back : wrong;
}

function makeItemId(i, it) {
  // стабильный, но уникальный ключ для сброса локального стейта Task
  return `${i}:${String(it.front)}→${String(it.back)}:${Math.random()
    .toString(36)
    .slice(2, 8)}`;
}

const letters = ["A", "B", "C", "D"]; // подписи вариантов MC

// ——— Task ———
function Task({ item, deck, onDone }) {
  const [picked, setPicked] = React.useState(null); // индекс выбранного варианта (MC/TF)
  const [wasCorrect, setWasCorrect] = React.useState(null); // true/false/null
  const [val, setVal] = React.useState(""); // ввод для write
  const [locked, setLocked] = React.useState(false);
  const rootRef = React.useRef(null);

  // сбрасываем локальный стейт при смене задания
  React.useEffect(() => {
    setPicked(null);
    setWasCorrect(null);
    setVal("");
    setLocked(false);
    // автофокус карточки для хоткеев
    rootRef.current?.focus?.();
  }, [item._id]);

  const cards = deck.cards || [];

  // заранее готовим данные для всех типов (хуки — только на верхнем уровне!)
  const mcOptions = React.useMemo(() => {
    if (item._type !== "mc") return [];
    let opts =
      Array.isArray(item._options) && item._options.length
        ? [...item._options]
        : (() => {
            const backs = uniqueBacks(cards, item.back);
            const distractors = shuffle(backs).slice(0, 3);
            return shuffle([item.back, ...distractors]);
          })();
    // дедуп и гарантируем наличие правильного
    const seen = new Set();
    opts = opts.filter((o) => {
      if (o == null) return false;
      if (seen.has(o)) return false;
      seen.add(o);
      return true;
    });
    if (!opts.includes(item.back))
      opts = shuffle([item.back, ...opts]).slice(0, 4);
    return opts; // может быть <4, но >=2
  }, [item, cards]);

  const tfMaybe = React.useMemo(() => {
    if (item._type !== "tf") return undefined;
    return item._maybe ?? pickTFMaybe(cards, item);
  }, [item, cards]);

  // хоткеи: 1–4 для MC, стрелки для TF, Enter для write
  const onKeyDown = (e) => {
    if (locked || item._done) return;
    const key = e.key?.toLowerCase?.();
    if (item._type === "mc" && ["1", "2", "3", "4"].includes(key)) {
      const idx = Number(key) - 1;
      if (idx < mcOptions.length) {
        e.preventDefault();
        onPickMC(idx);
      }
    } else if (
      item._type === "tf" &&
      (key === "arrowleft" || key === "arrowright")
    ) {
      e.preventDefault();
      onPickTF(key === "arrowleft" ? 1 : 0); // left => Неверно, right => Верно
    } else if (item._type === "write" && key === "enter") {
      e.preventDefault();
      onCheckWrite();
    }
  };

  function finish(ok) {
    setLocked(true);
    setWasCorrect(ok);
    if (ok) hapticSuccess?.();
    setTimeout(() => onDone(ok), ok ? 650 : 360);
  }

  // MC
  function onPickMC(idx) {
    if (picked != null) return;
    setPicked(idx);
    const ok = mcOptions[idx] === item.back;
    finish(ok);
  }

  // TF
  function onPickTF(idx) {
    if (picked != null) return;
    // idx: 0 = Верно, 1 = Неверно
    const isTrue = tfMaybe === item.back;
    const ok = (idx === 0) === isTrue;
    setPicked(idx);
    finish(ok);
  }

  // WRITE
  function onCheckWrite() {
    if (locked) return;
    const ok = normalize(val) === normalize(item.back);
    finish(ok);
  }

  return (
    <div
      ref={rootRef}
      tabIndex={0}
      onKeyDown={onKeyDown}
      className="rounded-2xl border border-white/10 bg-white/5 p-3 sm:p-4"
    >
      {/* MC */}
      {item._type === "mc" && mcOptions.length >= 2 && (
        <div className="itemlike">
          <div className="q text-lg font-extrabold mb-2 leading-tight">
            Выберите перевод: {item.front}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {mcOptions.map((o, k) => {
              const isPicked = picked === k;
              const isRight = o === item.back;
              const state = isPicked
                ? isRight
                  ? "border-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.35)] animate-[pop_.22s_ease-out]"
                  : "border-red-500 animate-[shake_.35s_ease-in-out]"
                : item._done
                ? "opacity-60"
                : "hover:bg-black/10 dark:hover:bg-white/10";
              return (
                <button
                  key={`${item._id}-mc-${k}`}
                  className={[
                    "btnlike text-left p-3 sm:p-4 border-2 border-transparent",
                    state,
                  ].join(" ")}
                  disabled={picked != null || item._done || locked}
                  onClick={() => onPickMC(k)}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs">
                      {letters[k] || k + 1}
                    </div>
                    <div className="font-bold leading-snug break-words">
                      {o}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
          {picked != null && wasCorrect === false && (
            <div className="mt-2">
              <Chip className="border-red-500">✖ Правильно: {item.back}</Chip>
            </div>
          )}
        </div>
      )}

      {/* TF */}
      {item._type === "tf" && (
        <div className="itemlike">
          <div className="q text-lg font-extrabold mb-2 leading-tight">
            Соответствует ли: {item.front} → <b>{tfMaybe ?? "—"}</b>?
          </div>
          <div className="grid grid-cols-2 gap-2">
            {["Верно", "Неверно"].map((label, idx) => {
              const isTrue = tfMaybe === item.back;
              const ok = (idx === 0) === isTrue;
              const isPicked = picked === idx;
              const state = isPicked
                ? ok
                  ? "border-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.35)] animate-[pop_.22s_ease-out]"
                  : "border-red-500 animate-[shake_.35s_ease-in-out]"
                : item._done
                ? "opacity-60"
                : "hover:bg-black/10 dark:hover:bg-white/10";
              return (
                <button
                  key={`${item._id}-tf-${idx}`}
                  className={[
                    "btnlike p-3 sm:p-4 border-2 border-transparent",
                    state,
                  ].join(" ")}
                  disabled={picked != null || item._done || locked}
                  onClick={() => onPickTF(idx)}
                >
                  <div className="flex items-center justify-center gap-2 font-bold">
                    {idx === 0 ? (
                      <Check className="size-4" />
                    ) : (
                      <X className="size-4" />
                    )}
                    {label}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* WRITE */}
      {item._type === "write" && (
        <div className="itemlike">
          <div className="q text-lg font-extrabold mb-2 leading-tight">
            Введите перевод: {item.front}
          </div>
          <div className="grid grid-cols-[1fr_auto] gap-2">
            <input
              className="btnlike text-lg sm:text-xl py-3"
              placeholder="Ответ…"
              value={val}
              onChange={(e) => setVal(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  onCheckWrite();
                }
              }}
              autoComplete="off"
              inputMode="latin"
              spellCheck={false}
              aria-label="Поле ввода ответа"
              disabled={item._done || locked}
            />
            <Button
              variant="primary"
              disabled={!val.trim().length || item._done || locked}
              onClick={onCheckWrite}
            >
              Проверить
            </Button>
          </div>
          {/* мини-клавиатура диакритики */}
          <div className="mt-2 grid grid-cols-7 gap-2">
            {["ä", "ö", "ü", "ß", "Ä", "Ö", "Ü"].map((ch) => (
              <button
                key={ch}
                className="kbdkey"
                type="button"
                onClick={() => setVal((v) => v + ch)}
              >
                {ch}
              </button>
            ))}
          </div>
          {wasCorrect === false && (
            <div className="mt-2">
              <Chip className="border-red-500">✖ Правильно: {item.back}</Chip>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ——— TestView ———
export default function TestView({ deck }) {
  const [count, setCount] = React.useState(12);
  const [score, setScore] = React.useState(0);
  const [items, setItems] = React.useState([]);

  const total = items.length;
  const doneCount = items.reduce((acc, it) => acc + (it._done ? 1 : 0), 0);

  function gen() {
    const all = deck.cards || [];
    if (all.length === 0) {
      setItems([]);
      setScore(0);
      return;
    }
    setScore(0);
    // финальное число заданий
    const n = Math.max(4, Math.min(Number(count) || 12, 50, all.length));
    const base = shuffle(all.slice()).slice(0, n);
    // доступность типов по данным
    const uniqBacks = uniqueBacks(all);
    const canMC = uniqBacks.length >= 4;
    const typesPool = canMC ? ["mc", "write", "tf"] : ["write", "tf"];

    const next = base.map((it, i) => {
      const pickedType = typesPool[(Math.random() * typesPool.length) | 0];
      const _id = makeItemId(i, it);
      if (pickedType === "mc" && canMC) {
        const backs = uniqueBacks(all, it.back);
        const distractors = shuffle(backs).slice(0, 3);
        const _options = shuffle([it.back, ...distractors]);
        return { ...it, _id, _type: "mc", _options, _done: false };
      }
      if (pickedType === "tf") {
        const _maybe = pickTFMaybe(all, it);
        return { ...it, _id, _type: "tf", _maybe, _done: false };
      }
      return { ...it, _id, _type: "write", _done: false };
    });

    setItems(next);
    // прокрутка к началу списка
    try {
      document
        .getElementById("test-top")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch {}
  }

  function done(ix, ok) {
    setItems((prev) =>
      prev.map((x, i) => (i === ix ? { ...x, _done: true } : x))
    );
    if (ok) setScore((s) => s + 1);
    // скроллим к следующему невыполненному
    requestAnimationFrame(() => {
      const j = items.findIndex((it, k) => !it._done && k !== ix);
      const targetId = j !== -1 ? `task-${j}` : `test-bottom`;
      try {
        document
          .getElementById(targetId)
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      } catch {}
    });
  }

  return (
    <Panel>
      <div id="test-top" className="q text-xl font-extrabold">
        Тест
      </div>

      <div className="flex items-center gap-2 flex-wrap mb-2">
        <label className="chip hidden sm:flex items-center gap-2">
          <Hash className="size-4" />
          <input
            type="number"
            min={4}
            max={50}
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value || "12", 10))}
            className="w-24 rounded-md bg-transparent outline-none"
            title="Сколько заданий сгенерировать"
          />
        </label>

        <Button
          variant="primary"
          onClick={gen}
          disabled={(deck.cards?.length || 0) === 0}
        >
          <Sparkles className="size-5" />{" "}
          {items.length ? "Пересоздать" : "Сгенерировать"}
        </Button>

        <Chip>
          <BadgeCheck className="size-4" /> <span>{score}</span>
        </Chip>
        {total > 0 && (
          <Chip>
            Прогресс: {doneCount}/{total}
          </Chip>
        )}
      </div>

      {/* прогресс-бар */}
      {total > 0 && (
        <div
          className="mt-1 h-2 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuenow={doneCount}
          aria-label="Прогресс по заданиям"
        >
          <div
            className="h-full rounded-full bg-emerald-500 transition-all"
            style={{ width: `${(doneCount / total) * 100}%` }}
          />
        </div>
      )}

      <div className="grid gap-2 mt-2">
        {items.map((it, i) => (
          <div
            id={`task-${i}`}
            key={it._id}
            className={it._done ? "opacity-70" : "opacity-100"}
          >
            <Task item={it} deck={deck} onDone={(ok) => done(i, ok)} />
          </div>
        ))}
      </div>

      {total > 0 && doneCount === total && (
        <div id="test-bottom" className="mt-3">
          <Chip className="border-emerald-500">
            Готово! Очки: {score} / {total}
          </Chip>
          <div className="mt-2">
            <Button onClick={gen}>
              <RotateCcw className="size-5" /> Ещё раз
            </Button>
          </div>
        </div>
      )}

      {/* FAB для мобилы */}
      {total > 0 && (
        <div className="sm:hidden fixed bottom-3 right-3 z-30">
          <Button
            variant="primary"
            className="rounded-full px-4 py-3 text-base shadow-xl"
            onClick={gen}
          >
            <RotateCcw className="size-5" /> Обновить тест
          </Button>
          <div className="h-3" />
        </div>
      )}
      <div className="sm:hidden h-14" />
    </Panel>
  );
}
