// src/views/WriteView.jsx (mobile‑first, улучшено для телефона)
import React from "react";
import Panel from "../components/ui/Panel";
import Button from "../components/ui/Button";
import Chip from "../components/ui/Chip";
import { normalize, hapticSuccess } from "../lib/utils";
import { Lightbulb, SkipForward, Check, Info, Hash } from "lucide-react";

export default function WriteView({ deck }) {
  const [writeIdx, setWriteIdx] = React.useState(0);
  const [value, setValue] = React.useState("");
  const [feedback, setFeedback] = React.useState(null); // {type:'hint'|'ok'|'bad'}
  const [hintLevel, setHintLevel] = React.useState(0);
  const [locked, setLocked] = React.useState(false);
  const [skipTotal, setSkipTotal] = React.useState(0);
  const [skipsById, setSkipsById] = React.useState({});
  const inputRef = React.useRef(null);
  const timerRef = React.useRef(null);

  const cards = deck?.cards ?? [];
  const hasCards = cards.length > 0;

  const nextIndex = React.useCallback(
    (prev) => {
      if (cards.length <= 1) return 0;
      let i = Math.floor(Math.random() * cards.length);
      if (i === prev) i = (i + 1) % cards.length;
      return i;
    },
    [cards.length]
  );

  const clearTimer = React.useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  function splitDiff(a = "", b = "") {
    let i = 0;
    const minLen = Math.min(a.length, b.length);
    while (i < minLen && a[i] === b[i]) i++;
    let j = 0;
    while (j < minLen - i && a[a.length - 1 - j] === b[b.length - 1 - j]) j++;
    if (i + j > minLen) j = Math.max(0, minLen - i);
    const aMidStart = i,
      aMidEnd = a.length - j;
    const bMidStart = i,
      bMidEnd = b.length - j;
    return {
      aParts: [a.slice(0, i), a.slice(aMidStart, aMidEnd), a.slice(aMidEnd)],
      bParts: [b.slice(0, i), b.slice(bMidStart, bMidEnd), b.slice(bMidEnd)],
    };
  }

  const maskedHint = React.useCallback((correct, level) => {
    const l = Math.max(0, Math.min(level, correct.length));
    const prefix = correct.slice(0, l);
    const rest = "·".repeat(Math.max(0, correct.length - l));
    return prefix + rest;
  }, []);

  React.useEffect(() => {
    clearTimer();
    if (!hasCards) return;
    setWriteIdx(Math.floor(Math.random() * cards.length));
    setValue("");
    setFeedback(null);
    setHintLevel(0);
    setLocked(false);
    setSkipTotal(0);
    setSkipsById({});
  }, [deck.id, cards.length, hasCards, clearTimer]);

  React.useEffect(() => {
    inputRef.current?.focus();
  }, [writeIdx]);

  React.useEffect(() => () => clearTimer(), [clearTimer]);

  const c = hasCards ? cards[writeIdx] : null;
  const thisCardSkips = skipsById[writeIdx] || 0;

  const insertChar = React.useCallback(
    (ch) => {
      const inp = inputRef.current;
      if (!inp) return;
      const start = inp.selectionStart ?? value.length;
      const end = inp.selectionEnd ?? value.length;
      const newVal = value.slice(0, start) + ch + value.slice(end);
      setValue(newVal);
      requestAnimationFrame(() => {
        try {
          inp.selectionStart = inp.selectionEnd = start + ch.length;
          inp.focus();
        } catch {}
      });
    },
    [value]
  );

  const onHintLetter = React.useCallback(() => {
    if (!c) return;
    setHintLevel((h) => Math.min(c.front.length, h + 1));
    setFeedback({ type: "hint" });
  }, [c]);

  const onRevealWord = React.useCallback(() => {
    if (!c) return;
    setHintLevel(c.front.length);
    setValue(c.front);
    setFeedback({ type: "hint" });
  }, [c]);

  const goNext = React.useCallback(() => {
    setWriteIdx((idx) => nextIndex(idx));
    setValue("");
    setFeedback(null);
    setHintLevel(0);
    setLocked(false);
    // скроллим к началу вью на мобиле
    try {
      document
        .querySelector("#write-root")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch {}
  }, [nextIndex]);

  const onSkip = React.useCallback(() => {
    if (!c || locked) return;
    clearTimer();
    setSkipTotal((s) => s + 1);
    setSkipsById((m) => ({ ...m, [writeIdx]: (m[writeIdx] || 0) + 1 }));
    goNext();
  }, [c, locked, clearTimer, goNext, writeIdx]);

  const onCheck = React.useCallback(() => {
    if (!c || locked) return;
    const ok = normalize(value) === normalize(c.front);
    setFeedback(ok ? { type: "ok" } : { type: "bad" });
    setLocked(true);
    if (ok) {
      hapticSuccess?.();
      clearTimer();
      timerRef.current = setTimeout(goNext, 650);
    } else {
      setLocked(false);
    }
  }, [c, value, goNext, clearTimer, locked]);

  const onInputKeyDown = React.useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        onCheck();
        return;
      }
      if (e.key === "Escape") {
        e.preventDefault();
        onHintLetter();
        return;
      }
      if (e.altKey && !e.ctrlKey && !e.metaKey) {
        const map = { a: "ä", o: "ö", u: "ü", s: "ß" };
        const raw = e.key?.toLowerCase?.();
        const ch = map[raw];
        if (ch) {
          e.preventDefault();
          insertChar(e.shiftKey ? ch.toUpperCase() : ch);
        }
      }
    },
    [onCheck, onHintLetter, insertChar]
  );

  if (!hasCards) {
    return (
      <Panel>
        <div className="text-white/60">В этом наборе пока нет карточек.</div>
      </Panel>
    );
  }

  const canCheck = value.trim().length > 0 && !locked;
  const diff = feedback?.type === "bad" ? splitDiff(value, c.front) : null;
  const progressNow = writeIdx + 1;
  const total = cards.length;

  return (
    <Panel>
      <section id="write-root" className="pb-[env(safe-area-inset-bottom)]">
        {/* Header / метрики */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="text-black/60 dark:text-white/60 font-semibold">
            Напишите по‑немецки
          </div>
          <div className="flex items-center gap-2 text-sm text-black/50 dark:text-white/60">
            <Chip>
              <Hash className="size-4" /> {progressNow}/{total}
            </Chip>
            <Chip>
              Пропуски: {skipTotal}
              {skipsById[writeIdx] ? ` (эта: ${skipsById[writeIdx]})` : ""}
            </Chip>
          </div>
        </div>

        {/* Подсказка для мобилки */}
        <div className="mt-2 px-3 py-2 flex items-start gap-2 text-sm text-black/70 dark:text-white/70 bg-white/5 rounded-xl">
          <Info className="size-4 mt-0.5" />
          <div>
            <b>Совет:</b> Alt+a/o/u/s → ä/ö/ü/ß. Esc — буква-подсказка. Enter —
            проверить.
          </div>
        </div>

        {/* Термин → нужно ввести форму на DE */}
        <div className="q text-2xl sm:text-3xl font-extrabold my-3 text-balance">
          {c.back}
        </div>

        <input
          ref={inputRef}
          className="btnlike text-lg sm:text-xl py-3"
          type="text"
          placeholder="Введите ответ…"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onInputKeyDown}
          autoComplete="off"
          inputMode="latin"
          enterKeyHint="done"
          spellCheck={false}
          autoFocus
          aria-label="Поле ввода ответа"
        />

        {/* Экранная клавиатура диакритики — подняли повыше, чтобы не перекрывал нижний док */}
        <div className="sticky bottom-24 sm:bottom-0 z-30 mt-3 grid grid-cols-7 gap-2 rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-white/10 p-2">
          {["ä", "ö", "ü", "ß", "Ä", "Ö", "Ü"].map((ch) => (
            <button
              key={ch}
              className="kbdkey"
              type="button"
              onClick={() => insertChar(ch)}
            >
              {ch}
            </button>
          ))}
          <button
            className="kbdkey col-span-2"
            type="button"
            onClick={onRevealWord}
            title="Показать слово целиком"
          >
            Показать
          </button>
        </div>

        {/* Десктопные кнопки действий */}
        <div className="hidden sm:grid grid-cols-3 gap-2 mt-3">
          <Button disabled={locked} onClick={onSkip}>
            Пропустить
          </Button>
          <Button disabled={locked} onClick={onHintLetter}>
            <Lightbulb className="size-5" /> Показать букву
          </Button>
          <Button variant="primary" disabled={!canCheck} onClick={onCheck}>
            <Check className="size-5" /> Проверить
          </Button>
        </div>

        {/* Мобильная нижняя док‑панель действий */}
        <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 border-t border-white/10 bg-white/80 dark:bg-black/60 backdrop-blur p-2 pb-[calc(env(safe-area-inset-bottom)+0.5rem)]">
          <div className="grid grid-cols-3 gap-2">
            <Button
              onClick={onSkip}
              disabled={locked}
              className="py-3 text-base"
            >
              <SkipForward className="size-5 rotate-180" /> Пропуск
            </Button>
            <Button
              onClick={onHintLetter}
              disabled={locked}
              className="py-3 text-base"
            >
              <Lightbulb className="size-5" /> Буква
            </Button>
            <Button
              variant="primary"
              onClick={onCheck}
              disabled={!canCheck}
              className="py-3 text-base"
            >
              <Check className="size-5" /> Проверить
            </Button>
          </div>
        </div>
        <div className="sm:hidden h-20" />

        {/* Обратная связь */}
        <div
          className="text-white/70 mt-2 min-h-6 space-y-1"
          aria-live="polite"
        >
          {feedback?.type === "hint" && (
            <Chip>💡 {maskedHint(c.front, hintLevel)}</Chip>
          )}
          {feedback?.type === "ok" && (
            <Chip className="border-emerald-500">✔ Верно!</Chip>
          )}
          {feedback?.type === "bad" && diff && (
            <Chip className="border-red-500">
              <div className="font-semibold mb-1">✖ Неверно</div>
              <div className="text-sm">
                <div className="opacity-70">Ваш ответ:</div>
                <div>
                  <span>{diff.aParts[0]}</span>
                  <span className="bg-red-500/30 rounded px-0.5">
                    {diff.aParts[1] || (value.length === 0 ? "∅" : "")}
                  </span>
                  <span>{diff.aParts[2]}</span>
                </div>
                <div className="opacity-70 mt-1">Нужно:</div>
                <div>
                  <span>{diff.bParts[0]}</span>
                  <span className="bg-emerald-500/30 rounded px-0.5">
                    {diff.bParts[1]}
                  </span>
                  <span>{diff.bParts[2]}</span>
                </div>
              </div>
            </Chip>
          )}
        </div>
      </section>
    </Panel>
  );
}
