import React from "react";
import Panel from "../components/ui/Panel";
import Button from "../components/ui/Button";
import { hapticSuccess } from "../lib/utils";

export default function LearnView({ deck }) {
  const [queue, setQueue] = React.useState([]); // индексы deck.cards
  const [options, setOptions] = React.useState([]); // варианты ответа (строки)
  const [picked, setPicked] = React.useState(null); // индекс выбранного варианта
  const [lastCorrect, setLastCorrect] = React.useState(null); // null/true/false
  const [locked, setLocked] = React.useState(false); // защита от дабл-клика

  // Инициализация очереди при смене набора
  React.useEffect(() => {
    const n = deck.cards.length;
    const q = Array.from({ length: n }, (_, i) => i).sort(
      () => Math.random() - 0.5
    );
    setQueue(q);
  }, [deck.id]);

  // Пересчёт вариантов при смене текущего вопроса
  React.useEffect(() => {
    if (!queue.length) return;
    const qi = queue[0];
    const card = deck.cards[qi];
    const others = deck.cards
      .map((c, i) => ({ i, back: c.back }))
      .filter((o) => o.i !== qi)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((o) => o.back);
    const opts = [...others, card.back].sort(() => Math.random() - 0.5);
    setOptions(opts);
    setPicked(null);
    setLocked(false);
    setLastCorrect(null);
  }, [queue, deck.cards]);

  const currentIndex = queue[0];
  const card = currentIndex != null ? deck.cards[currentIndex] : null;

  function choose(text, optIndex) {
    if (locked || currentIndex == null) return;
    setPicked(optIndex);
    const correct = text === card.back;
    setLastCorrect(correct);
    setLocked(true);
    if (correct) hapticSuccess();

    setTimeout(
      () => {
        setQueue((q) => {
          if (!q.length) return q;
          if (correct) return q.slice(1); // верный — удаляем текущий
          // неверный — отправляем текущий в конец
          const [first, ...rest] = q;
          return [...rest, first];
        });
      },
      correct ? 650 : 360
    );
  }

  return (
    <Panel>
      <div className="text-black/60 dark:text-white/60 font-semibold">
        Выберите перевод
      </div>
      <div className="q text-2xl sm:text-3xl font-extrabold my-2">
        {card ? card.front : "Готово!"}
      </div>

      <div className="grid gap-2">
        {card &&
          options.map((text, idx) => {
            const isPicked = picked === idx;
            const isCorrect = text === card.back;
            const cls = [
              "choice relative rounded-xl border-2 border-transparent p-3 font-bold text-left",
              "bg-black/5 dark:bg-white/5",
              // выбранная кнопка: зелёный при верном, красный при неверном
              locked &&
                isPicked &&
                (isCorrect
                  ? "border-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.35)] animate-[pop_.22s_ease-out]"
                  : "border-red-500 animate-[shake_.35s_ease-in-out]"),
              // если ответ неверный — дополнительно подсветить правильный вариант зелёным
              locked &&
                lastCorrect === false &&
                isCorrect &&
                !isPicked &&
                "border-emerald-300",
            ]
              .filter(Boolean)
              .join(" ");
            return (
              <button
                key={`${text}-${idx}`}
                className={cls}
                onClick={() => choose(text, idx)}
              >
                {text}
              </button>
            );
          })}
      </div>

      {card && (
        <div className="grid grid-cols-2 gap-2 mt-3">
          <Button
            onClick={() =>
              setQueue((q) => (q.length ? [...q.slice(1), q[0]] : q))
            }
          >
            Пропустить
          </Button>
          {/* Если хочешь, чтобы "Далее" реально переходил к следующему, замени на: setQueue(q => q.slice(1)) */}
          <Button variant="primary" onClick={() => setQueue((q) => [...q])}>
            Далее
          </Button>
        </div>
      )}
    </Panel>
  );
}
