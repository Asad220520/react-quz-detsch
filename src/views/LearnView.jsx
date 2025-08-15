// src/views/LearnView.jsx (mobile‑first улучшено)
import React from "react";
import Panel from "../components/ui/Panel";
import Button from "../components/ui/Button";
import Chip from "../components/ui/Chip";
import { hapticSuccess } from "../lib/utils";
import {
  CheckCircle2,
  XCircle,
  SkipForward,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

export default function LearnView({ deck }) {
  const [queue, setQueue] = React.useState([]); // индексы deck.cards
  const [options, setOptions] = React.useState([]); // варианты ответа (строки)
  const [picked, setPicked] = React.useState(null); // индекс выбранного варианта
  const [lastCorrect, setLastCorrect] = React.useState(null); // null/true/false
  const [locked, setLocked] = React.useState(false); // защита от дабл-клика / гонок
  const timerRef = React.useRef(null);

  // ==== mobile‑first helpers ====
  const sectionRef = React.useRef(null);
  React.useEffect(() => {
    // фокус для хоткеев
    sectionRef.current?.focus?.();
  }, [deck?.id]);

  // --- utils ---
  function shuffleInPlace(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function pickOptions(deck, qi) {
    const card = deck.cards[qi];
    const correct = card.back;

    // пул отвлекающих: без повторов и без правильного
    const pool = Array.from(
      new Set(
        deck.cards
          .filter((_, i) => i !== qi)
          .map((c) => c.back)
          .filter((b) => b !== correct)
      )
    );

    shuffleInPlace(pool);
    const distractors = pool.slice(0, Math.min(3, pool.length));
    const opts = shuffleInPlace([...distractors, correct]);
    return opts;
  }

  function clearTimer() {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }

  // --- эффекты ---
  // Инициализация очереди при смене набора или размера колоды
  React.useEffect(() => {
    clearTimer();
    const n = deck?.cards?.length || 0;
    const base = Array.from({ length: n }, (_, i) => i);
    setQueue(shuffleInPlace(base));
    setOptions([]);
    setPicked(null);
    setLocked(false);
    setLastCorrect(null);
  }, [deck?.id, deck?.cards?.length]);

  const currentIndex = queue.length ? queue[0] : null;
  const card = currentIndex != null ? deck.cards[currentIndex] : null;

  // Пересчёт вариантов при смене текущего вопроса
  React.useEffect(() => {
    if (currentIndex == null) return;
    const opts = pickOptions(deck, currentIndex);
    setOptions(opts);
    setPicked(null);
    setLocked(false);
    setLastCorrect(null);
    clearTimer();
    // прокрутить наверх карточки при смене
    sectionRef.current?.scrollIntoView?.({
      behavior: "smooth",
      block: "start",
    });
  }, [currentIndex, deck.cards]);

  // Очистка таймера при размонтировании
  React.useEffect(() => () => clearTimer(), []);

  // --- действия ---
  function choose(text, optIndex) {
    if (locked || currentIndex == null) return;
    clearTimer();
    setPicked(optIndex);
    const correct = text === card.back;
    setLastCorrect(correct);
    setLocked(true);
    if (correct) hapticSuccess?.();

    timerRef.current = setTimeout(
      () => {
        setQueue((q) => {
          if (!q.length) return q;
          if (correct) return q.slice(1); // верный — удалить текущий
          const [first, ...rest] = q; // неверный — поставить в конец
          return [...rest, first];
        });
        // options/picked/locked сбросит эффектор по currentIndex
      },
      correct ? 650 : 360
    );
  }

  function skip() {
    if (locked || !queue.length) return;
    setQueue((q) => (q.length ? [...q.slice(1), q[0]] : q));
  }

  function next() {
    if (locked || !queue.length) return;
    setQueue((q) => q.slice(1));
  }

  const remaining = queue.length;
  const total = deck?.cards?.length || 0;
  const passed = total - remaining;
  const progress = total ? Math.round((passed / total) * 100) : 0;

  // Клавиатура: 1–4 выбрать, стрелки — навигация
  function onKeyDown(e) {
    const key = e.key?.toLowerCase?.();
    if (["1", "2", "3", "4"].includes(key)) {
      const idx = Number(key) - 1;
      if (idx < options.length) {
        e.preventDefault();
        choose(options[idx], idx);
      }
    } else if (key === "arrowright") {
      e.preventDefault();
      next();
    } else if (key === "arrowleft") {
      e.preventDefault();
      skip();
    } else if (key === " ") {
      e.preventDefault(); /* пробел ничего не делает в этой вью */
    }
  }

  const letters = ["A", "B", "C", "D"]; // подписи кнопок

  return (
    <Panel>
      <section
        ref={sectionRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="outline-none pb-[env(safe-area-inset-bottom)]"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="text-black/60 dark:text-white/60 font-semibold">
            Выберите перевод
          </div>
          <div className="flex items-center gap-2 text-sm text-black/50 dark:text-white/60">
            <Chip>Осталось: {remaining}</Chip>
            {total > 0 && <Chip>{progress}%</Chip>}
          </div>
        </div>

        {/* Термин */}
        <div className="q text-2xl sm:text-3xl font-extrabold my-2 text-balance">
          {card ? card.front : "Готово!"}
        </div>

        {/* Картинка (если есть) */}
        {card?.img && (
          <img
            src={card.img}
            alt={card.alt || card.front || ""}
            className="mx-auto max-h-52 w-full object-cover rounded-xl border border-white/10 mb-2"
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            draggable={false}
          />
        )}

        {/* Варианты ответа — крупные кнопки, mobile‑first */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {card &&
            options.map((text, idx) => {
              const isPicked = picked === idx;
              const isCorrect = card && text === card.back;
              const base =
                "choice relative rounded-xl border-2 border-transparent p-3 sm:p-4 font-bold text-left bg-black/5 dark:bg-white/5";
              const state =
                locked && isPicked
                  ? isCorrect
                    ? "border-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.35)] animate-[pop_.22s_ease-out]"
                    : "border-red-500 animate-[shake_.35s_ease-in-out]"
                  : locked && !isPicked && !isCorrect && lastCorrect === false
                  ? "opacity-70"
                  : "hover:bg-black/10 dark:hover:bg-white/10";

              return (
                <button
                  key={idx}
                  className={[base, state].join(" ")}
                  onClick={() => choose(text, idx)}
                  disabled={locked}
                  aria-pressed={isPicked}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs">
                      {letters[idx] || idx + 1}
                    </div>
                    <div className="min-w-0">
                      <div className="truncate text-lg sm:text-base">
                        {text}
                      </div>
                      {locked && isPicked && (
                        <div className="mt-1 text-xs flex items-center gap-1 opacity-80">
                          {isCorrect ? (
                            <>
                              <CheckCircle2 className="size-3" /> Верно
                            </>
                          ) : (
                            <>
                              <XCircle className="size-3" /> Неверно
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
        </div>

        {/* Прогресс‑бар */}
        <div className="mt-3">
          <div
            className="h-2 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden"
            role="progressbar"
            aria-label="Прогресс по набору"
            aria-valuemin={0}
            aria-valuemax={Math.max(total, 1)}
            aria-valuenow={passed}
          >
            <div
              className="h-full rounded-full bg-emerald-500 transition-all"
              style={{ width: `${total ? (passed / total) * 100 : 0}%` }}
            />
          </div>
        </div>

        {/* Desktop controls */}
        {card && (
          <div className="hidden sm:grid grid-cols-[1fr_auto_auto_1fr] gap-2 mt-3 items-center">
            <Button onClick={skip}>
              <ChevronLeft className="size-4" /> Пропустить
            </Button>
            <div />
            <Button variant="primary" onClick={next}>
              Далее <ChevronRight className="size-4" />
            </Button>
            <div />
          </div>
        )}

        {/* Мобильная нижняя панель действий */}
        {card && (
          <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 border-t border-white/10 bg-white/80 dark:bg-black/60 backdrop-blur p-2 pb-[calc(env(safe-area-inset-bottom)+0.5rem)]">
            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={skip}
                disabled={locked}
                className="py-3 text-base"
              >
                <SkipForward className="size-5 rotate-180" /> Пропустить
              </Button>
              <Button
                variant="primary"
                onClick={next}
                disabled={locked}
                className="py-3 text-base"
              >
                Далее <ChevronRight className="size-5" />
              </Button>
            </div>
          </div>
        )}
        {card && <div className="sm:hidden h-16" />}
      </section>
    </Panel>
  );
}
