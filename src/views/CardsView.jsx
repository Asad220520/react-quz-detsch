// src/views/CardsView.jsx (mobile‑first)
import React from "react";
import Button from "../components/ui/Button";
import Chip from "../components/ui/Chip";
import { Volume2, ChevronLeft, ChevronRight, FlipHorizontal2 } from "lucide-react";

export default function CardsView({ deck, fontPx, cardIndex, setCardIndex, onSpeak }) {
  // состояние переворота
  const [flipped, setFlipped] = React.useState(false);
  React.useEffect(() => setFlipped(false), [cardIndex, deck?.id]);

  // локальная настройка шрифта (если fontPx не задан сверху)
  const [localFont, setLocalFont] = React.useState(fontPx ?? 42);
  React.useEffect(() => { if (typeof fontPx === "number") setLocalFont(fontPx); }, [fontPx]);
  const appliedFontPx = typeof fontPx === "number" ? fontPx : localFont;

  const total = deck?.cards?.length ?? 0;
  const safeTotal = Math.max(total, 1);
  const idx = total ? ((cardIndex % total) + total) % total : 0;
  const card = total ? deck.cards[idx] : { front: "—", back: "—" };

  // gestures + long‑press speak
  const ptr = React.useRef({ id: null, startX: 0, startY: 0, moved: false, suppressClick: false });
  const holdTimerRef = React.useRef(null);
  function clearHold() { if (holdTimerRef.current) { clearTimeout(holdTimerRef.current); holdTimerRef.current = null; } }

  function onPointerDown(e) {
    if (ptr.current.id !== null) return;
    ptr.current.id = e.pointerId;
    ptr.current.startX = e.clientX;
    ptr.current.startY = e.clientY;
    ptr.current.moved = false;
    ptr.current.suppressClick = false;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    // долго держим — озвучка (вибрация/tts в onSpeak)
    clearHold();
    holdTimerRef.current = setTimeout(() => {
      onSpeak?.();
      ptr.current.suppressClick = true; // не переворачиваем после long‑press
    }, 350);
  }
  function onPointerMove(e) {
    if (ptr.current.id !== e.pointerId) return;
    const dx = e.clientX - ptr.current.startX;
    const dy = e.clientY - ptr.current.startY;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) { ptr.current.moved = true; clearHold(); }
  }
  function onPointerUp(e) {
    if (ptr.current.id !== e.pointerId) return;
    clearHold();
    const dx = e.clientX - ptr.current.startX;
    const dy = e.clientY - ptr.current.startY;
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);
    const SWIPE = 45;
    if (absX > SWIPE && absX > absY && total > 0) {
      if (dx > 0) setCardIndex((i) => (i - 1 + total) % total); else setCardIndex((i) => (i + 1) % total);
      ptr.current.suppressClick = true;
    } else if (!ptr.current.moved || (absX < 30 && absY < 30)) {
      setFlipped((v) => !v);
      ptr.current.suppressClick = true;
    }
    e.currentTarget.releasePointerCapture?.(e.pointerId);
    setTimeout(() => { ptr.current.id = null; ptr.current.startX = 0; ptr.current.startY = 0; ptr.current.moved = false; ptr.current.suppressClick = false; }, 0);
  }
  function onCardClick(e) {
    if (ptr.current.suppressClick) { e.preventDefault(); e.stopPropagation(); ptr.current.suppressClick = false; return; }
    setFlipped((v) => !v);
  }

  // keyboard: Space/Enter flip, ←/→ nav, S speak
  function onKeyDown(e) {
    if (e.key === " " || e.key === "Enter") { e.preventDefault(); setFlipped((v) => !v); }
    else if (e.key === "ArrowLeft" && total > 0) { e.preventDefault(); setCardIndex((i) => (i - 1 + total) % total); }
    else if (e.key === "ArrowRight" && total > 0) { e.preventDefault(); setCardIndex((i) => (i + 1) % total); }
    else if (e.key.toLowerCase?.() === "s") { e.preventDefault(); onSpeak?.(); }
  }

  return (
    <section className="pb-[env(safe-area-inset-bottom)]">
      {/* Обёртка карточки: больше «воздуха», overlay‑кнопки и подсказки */}
      <div className="cardwrap">
        <article
          className={["card","relative", flipped && "flipped"].filter(Boolean).join(" ")}
          role="button"
          tabIndex={0}
          aria-pressed={flipped}
          aria-live="polite"
          aria-label={flipped ? "Перевод" : "Термин"}
          onClick={onCardClick}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onKeyDown={onKeyDown}
        >
          {/* Быстрая озвучка (overlay) */}
          {/* {onSpeak && (
            <button
              type="button"
              className="absolute top-2 right-2 iconbtn rounded-full backdrop-blur bg-black/10 dark:bg-white/10"
              onClick={(e) => { e.stopPropagation(); onSpeak(); }}
              aria-label="Озвучить"
            >
              <Volume2 className="size-4" />
            </button>
          )} */}

          {/* Навигация кликом по краям (mobile‑friendly) */}
          {total > 0 && (
            <>
              <button
                type="button"
                className="absolute inset-y-0 left-0 w-1/4 opacity-0 sm:opacity-20 hover:opacity-40 transition-opacity"
                aria-label="Предыдущая"
                onClick={(e) => { e.stopPropagation(); setCardIndex((i) => (i - 1 + total) % total); }}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 w-1/4 opacity-0 sm:opacity-20 hover:opacity-40 transition-opacity"
                aria-label="Следующая"
                onClick={(e) => { e.stopPropagation(); setCardIndex((i) => (i + 1) % total); }}
              />
            </>
          )}

          {/* Сторона: Термин */}
          <div className="face front space-y-2">
            <div className="text-black/60 dark:text-white/60 font-semibold">Термин (DE)</div>
            {card.img && (
              <img src={card.img} alt={card.alt || card.front || ""} className="mx-auto max-h-56 w-full object-cover rounded-xl border border-white/10" loading="lazy" decoding="async" referrerPolicy="no-referrer" draggable={false} />
            )}
            <div className="term text-center font-extrabold break-words" style={{ fontSize: appliedFontPx }}>
              {card.front}
            </div>
          </div>

          {/* Сторона: Перевод */}
          <div className="face back space-y-2">
            <div className="text-black/60 dark:text-white/60 font-semibold">Перевод</div>
            <div className="term text-center font-extrabold break-words" style={{ fontSize: appliedFontPx }}>
              {card.back}
            </div>
          </div>

          {/* Визуальные подсказки на десктопе */}
          <div className="hidden sm:flex pointer-events-none absolute inset-x-0 bottom-2 justify-center gap-4 text-xs opacity-60">
            <span>Свайп ←/→ или стрелки для навигации</span>
            <span>Клик/Space — переворот</span>
            {onSpeak && <span>Удерживайте — озвучка</span>}
          </div>
        </article>
      </div>

      {/* Прогресс */}
      <div className="mt-3 flex items-center justify-center gap-2">
        <Chip>№ {total ? idx + 1 : 0} / {safeTotal}</Chip>
        <Chip>Осталось: {total ? Math.max(total - (idx + 1), 0) : 0}</Chip>
      </div>
      <div className="mt-2 h-2 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden" role="progressbar" aria-label="Прогресс по карточкам" aria-valuemin={0} aria-valuemax={safeTotal} aria-valuenow={total ? idx + 1 : 0}>
        <div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${(total ? (idx + 1) / safeTotal : 0) * 100}%` }} />
      </div>

      {/* Панель управления (desktop) */}
      <div className="hidden sm:grid grid-cols-[1fr_auto_auto_1fr] gap-2 mt-3 items-center">
        <Button onClick={() => total && setCardIndex((i) => (i - 1 + total) % total)}><ChevronLeft className="size-4" /> Назад</Button>
        <Button type="button" onClick={() => onSpeak?.()} aria-label="Озвучить" disabled={!onSpeak} className="flex items-center gap-2"><Volume2 className="size-4" /><span>Озвучить</span></Button>
        <Button variant="primary" onClick={() => setFlipped((v) => !v)} className="flex items-center gap-2"><FlipHorizontal2 className="size-4" /> Перевернуть</Button>
        <Button onClick={() => total && setCardIndex((i) => (i + 1) % total)}>Вперёд <ChevronRight className="size-4" /></Button>
      </div>

      {/* Нижняя док‑панель (mobile) */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 border-t border-white/10 bg-white/80 dark:bg-black/60 backdrop-blur p-2 pb-[calc(env(safe-area-inset-bottom)+0.5rem)]">
        <div className="grid grid-cols-3 gap-2">
          <Button onClick={() => total && setCardIndex((i) => (i - 1 + total) % total)} className="py-3 text-base"><ChevronLeft className="size-5" /> Назад</Button>
          <Button variant="primary" onClick={() => setFlipped((v) => !v)} className="py-3 text-base"><FlipHorizontal2 className="size-5" /> Перевернуть</Button>
          <Button onClick={() => total && setCardIndex((i) => (i + 1) % total)} className="py-3 text-base">Вперёд <ChevronRight className="size-5" /></Button>
        </div>
      </div>
      <div className="sm:hidden h-16" />

      {/* Плавающая кнопка озвучки (mobile), если доступно */}
      {onSpeak && (
        <div className="sm:hidden fixed right-3 bottom-20 z-40">
          <Button aria-label="Озвучить" onClick={() => onSpeak()} className="rounded-full px-3 py-3 shadow-xl">
            <Volume2 className="size-5" />
          </Button>
        </div>
      )}

      {/* Быстрые настройки шрифта — только если fontPx не передан сверху */}
      {typeof fontPx !== "number" && (
        <div className="hidden sm:flex mt-3 justify-center gap-2">
          <Button size="sm" onClick={() => setLocalFont((s) => Math.max(18, s - 4))}>A−</Button>
          <Button size="sm" onClick={() => setLocalFont((s) => Math.min(96, s + 4))}>A+</Button>
        </div>
      )}
    </section>
  );
}
