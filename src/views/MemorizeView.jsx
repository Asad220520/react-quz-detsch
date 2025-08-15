
// src/views/MemorizeView.jsx (mobile‑first)
import React from "react";
import Panel from "../components/ui/Panel";
import Button from "../components/ui/Button";
import Chip from "../components/ui/Chip";
import { hapticSuccess, normalize, shuffle } from "../lib/utils";
import {
  Play,
  Lightbulb,
  RotateCcw,
  Timer as TimerIcon,
  CheckCircle2,
  Hash,
  Table as TableIcon,
  BookOpen,
  Filter,
  Info,
  Search as SearchIcon,
  Flame,
} from "lucide-react";

/** ====== ДАННЫЕ: формы Präsens для модальных и частых неправильных ====== */
const PRONOUNS = ["ich", "du", "er", "wir", "ihr", "sie"]; // er = 3л. ед.; sie = 3л. мн.

const VERB_FORMS = {
  // модальные
  können: { ich: "kann", du: "kannst", er: "kann", wir: "können", ihr: "könnt", sie: "können" },
  müssen: { ich: "muss", du: "musst", er: "muss", wir: "müssen", ihr: "müsst", sie: "мüssen".replace("м","m") },
  dürfen: { ich: "darf", du: "darfst", er: "darf", wir: "dürfen", ihr: "dürft", sie: "dürfen" },
  sollen: { ich: "soll", du: "sollst", er: "soll", wir: "sollen", ihr: "sollt", sie: "sollen" },
  wollen: { ich: "will", du: "willst", er: "will", wir: "wollen", ihr: "wollt", sie: "wollen" },
  mögen: { ich: "mag", du: "magst", er: "mag", wir: "mögen", ihr: "mögt", sie: "mögen" },

  // «супер» неправильные
  sein: { ich: "bin", du: "bist", er: "ist", wir: "sind", ihr: "seid", sie: "sind" },
  haben: { ich: "habe", du: "hast", er: "hat", wir: "haben", ihr: "habt", sie: "haben" },
  werden: { ich: "werde", du: "wirst", er: "wird", wir: "werden", ihr: "werdet", sie: "werden" },
  wissen: { ich: "weiß", du: "weißt", er: "weiß", wir: "wissen", ihr: "wisst", sie: "wissen" },

  // сильные/смена гласной в du/er
  fahren: { ich: "fahre", du: "fährst", er: "fährt", wir: "fahren", ihr: "fahrt", sie: "fahren" },
  laufen: { ich: "laufe", du: "läufst", er: "läuft", wir: "laufen", ihr: "lauft", sie: "laufen" },
  lesen: { ich: "lesе".replace("е","e"), du: "liest", er: "liest", wir: "lesen", ihr: "lest", sie: "lesen" },
  sehen: { ich: "sehe", du: "siehst", er: "sieht", wir: "sehen", ihr: "seht", sie: "sehen" },
  sprechen: { ich: "spreche", du: "sprichst", er: "spricht", wir: "sprechen", ihr: "sprecht", sie: "sprechen" },
  nehmen: { ich: "nehme", du: "nimmst", er: "nimmt", wir: "nehmen", ihr: "nehmt", sie: "nehmen" },
  geben: { ich: "gebe", du: "gibst", er: "gibt", wir: "geben", ihr: "gebt", sie: "geben" },
  essen: { ich: "esse", du: "isst", er: "isst", wir: "essen", ihr: "esst", sie: "essen" },
  schlafen: { ich: "schlafe", du: "schläfst", er: "schläфт".replace("фт","ft"), wir: "schlafen", ihr: "schlaft", sie: "schlafen" },
  tragen: { ich: "trage", du: "trägst", er: "trägt", wir: "tragen", ihr: "tragt", sie: "tragen" },
  treffen: { ich: "treffe", du: "triffst", er: "trifft", wir: "treffen", ihr: "trefft", sie: "treffen" },
  fangen: { ich: "fange", du: "fängst", er: "fängt", wir: "fangen", ihr: "fangt", sie: "fangen" },
  halten: { ich: "halte", du: "hältst", er: "hält", wir: "halten", ihr: "haltet", sie: "halten" },
  lassen: { ich: "lasse", du: "lässt", er: "lässt", wir: "lassen", ihr: "lasst", sie: "lassen" },
};

const SETS = {
  modals: ["können", "müssen", "dürfen", "sollen", "wollen", "mögen"],
  irregulars: [
    "sein","haben","werden","wissen","fahren","laufen","lesen","sehen","sprechen","nehmen","geben","essen","schlafen","tragen","treffen","fangen","halten","lassen",
  ],
  all() { return [...this.modals, ...this.irregulars]; },
};

// Переводы и краткие пояснения (для внимания/удержания)
const TRANSLATIONS = {
  können: "мочь, уметь", müssen: "долженствовать", dürfen: "иметь право, можно", sollen: "следует", wollen: "хотеть", mögen: "нравиться, любить",
  sein: "быть", haben: "иметь", werden: "становиться; формирует будущее/пассив", wissen: "знать (факт)",
  fahren: "ехать, везти", laufen: "бежать, ходить", lesen: "читать", sehen: "видеть", sprechen: "говорить", nehmen: "брать", geben: "давать", essen: "есть", schlafen: "спать", tragen: "носить", treffen: "встречать", fangen: "ловить", halten: "держать; останавливаться", lassen: "позволять; оставлять",
};

const SUPER_IRREG = new Set(["sein", "haben", "werden", "wissen"]);
const VOWEL_CHANGE = new Set(["fahren","laufen","lesen","sehen","sprechen","nehmen","geben","essen","schlafen","tragen","treffen","fangen","halten","lassen"]);

/** ====== ВСПОМОГАТЕЛЬНЫЕ ====== */
function classNames(...xs) { return xs.filter(Boolean).join(" "); }
function formatMasked(ans, level) { const n = Math.max(0, Math.min(level, ans.length)); return ans.slice(0, n) + "·".repeat(Math.max(0, ans.length - n)); }
function splitDiff(a = "", b = "") {
  let i = 0; const minLen = Math.min(a.length, b.length); while (i < minLen && a[i] === b[i]) i++; let j = 0; while (j < minLen - i && a[a.length - 1 - j] === b[b.length - 1 - j]) j++; if (i + j > minLen) j = Math.max(0, minLen - i);
  return { a0: a.slice(0, i), a1: a.slice(i, a.length - j), a2: a.slice(a.length - j), b0: b.slice(0, i), b1: b.slice(i, b.length - j), b2: b.slice(b.length - j) };
}
function asType(inf) { if (SETS.modals.includes(inf)) return "модальный"; if (SUPER_IRREG.has(inf)) return "супер-неправильный"; return "неправильный"; }

/** Мобильная карточка для справочника */
function VerbCard({ inf }) {
  return (
    <div className="rounded-xl border border-white/10 p-3 bg-white/5">
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="text-base font-extrabold">{inf}</div>
          <div className="text-xs opacity-70 -mt-0.5">{TRANSLATIONS[inf]}</div>
        </div>
        <span className={classNames(
          "rounded-full px-2 py-0.5 text-[10px] border whitespace-nowrap",
          asType(inf) === "модальный" && "border-sky-500/60 text-sky-500",
          asType(inf) === "супер-неправильный" && "border-fuchsia-500/60 text-fuchsia-500",
          asType(inf) === "неправильный" && "border-emerald-500/60 text-emerald-500"
        )}>{asType(inf)}</span>
      </div>
      <div className="grid grid-cols-3 gap-2 mt-2 text-sm">
        {PRONOUNS.map((p) => (
          <div key={p} className={classNames("rounded-lg px-2 py-1 bg-black/5 dark:bg-white/5", (VOWEL_CHANGE.has(inf) && (p === "du" || p === "er")) && "ring-1 ring-emerald-500/50 font-semibold")}>            
            <div className="text-[10px] uppercase opacity-60">{p}</div>
            <div className="leading-tight">{VERB_FORMS[inf][p]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** ====== КОМПОНЕНТ ====== */
export default function MemorizeView() {
  // вкладки: табличный справочник / тренировка
  const [tab, setTab] = React.useState("reference"); // 'reference' | 'practice'

  // настройки общего режима/набора
  const [mode, setMode] = React.useState("all"); // 'modals' | 'irregulars' | 'all'
  const [count, setCount] = React.useState(12);

  // состояние тренировки
  const [queue, setQueue] = React.useState([]); // [{inf, pro, ans}]
  const [value, setValue] = React.useState("");
  const [hintLevel, setHintLevel] = React.useState(0);
  const [locked, setLocked] = React.useState(false);
  const [feedback, setFeedback] = React.useState(null); // 'ok' | 'bad' | null

  // таймер
  const [elapsedMs, setElapsedMs] = React.useState(0);
  const rafRef = React.useRef(null);
  const startRef = React.useRef(0);

  const timeText = React.useMemo(() => { const sec = Math.floor(elapsedMs / 1000); const mm = String(Math.floor(sec / 60)).padStart(2, "0"); const ss = String(sec % 60).padStart(2, "0"); return `${mm}:${ss}`; }, [elapsedMs]);
  React.useEffect(() => () => cancelAnimationFrame(rafRef.current), []);
  function startTimer() { cancelAnimationFrame(rafRef.current); startRef.current = performance.now(); const step = () => { setElapsedMs(performance.now() - startRef.current); rafRef.current = requestAnimationFrame(step); }; rafRef.current = requestAnimationFrame(step); }
  function stopTimer() { cancelAnimationFrame(rafRef.current); }

  // генерация заданий
  function gen(customList) {
    const verbs = customList ? customList : mode === "modals" ? SETS.modals : mode === "irregulars" ? SETS.irregulars : SETS.all();
    const base = shuffle(verbs.slice());
    const n = Math.max(4, Math.min(Number(count) || 12, base.length));
    const picked = base.slice(0, n);
    const tasks = picked.map((inf) => { const pro = PRONOUNS[(Math.random() * PRONOUNS.length) | 0]; const ans = VERB_FORMS[inf][pro]; return { inf, pro, ans }; });
    setQueue(tasks); setValue(""); setHintLevel(0); setLocked(false); setFeedback(null); setElapsedMs(0); startTimer(); setTab("practice");
  }

  // текущее задание
  const cur = queue[0] || null;

  function check() {
    if (!cur || locked) return;
    const ok = normalize(value) === normalize(cur.ans);
    setLocked(true); setFeedback(ok ? "ok" : "bad"); if (ok) hapticSuccess?.();
    setTimeout(() => { setQueue((q) => { const [, ...rest] = q; return ok ? rest : [...rest, q[0]]; }); setValue(""); setHintLevel(0); setFeedback(null); setLocked(false); }, ok ? 650 : 360);
  }

  React.useEffect(() => { if (queue.length === 0) stopTimer(); }, [queue.length]);

  const total = queue.length; // оставшиеся в текущей сессии
  const done = (mode === "modals" ? SETS.modals.length : mode === "irregulars" ? SETS.irregulars.length : SETS.all().length) - total;
  const diff = cur && value && normalize(value) !== normalize(cur.ans) ? splitDiff(value, cur.ans) : null;

  // ====== Табличный справочник ======
  const [q, setQ] = React.useState("");
  const verbsInMode = mode === "modals" ? SETS.modals : mode === "irregulars" ? SETS.irregulars : SETS.all();
  const filtered = verbsInMode.filter((v) => (v.toLowerCase().includes(q.toLowerCase()) || (TRANSLATIONS[v] || "").toLowerCase().includes(q.toLowerCase())));
  const stats = { modals: SETS.modals.length, superIrreg: [...SUPER_IRREG].length, vowelChange: [...VOWEL_CHANGE].length, total: SETS.all().length };

  return (
    <Panel>
      {/* Hero / заголовок */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/40 dark:bg-white/5 p-3 sm:p-4 mb-3">
        <div className="flex items-start sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
              <Flame className="size-4" /> Präsens: модальные и неправильные
            </div>
            <div className="text-xl sm:text-3xl font-extrabold -mt-0.5">Справочник + Тренировка</div>
            <div className="text-black/70 dark:text-white/70 mt-1 text-sm sm:text-base">
              Мобильный режим: карточки вместо таблиц, крупные поля ввода, быстрые действия внизу экрана.
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <Button size="sm" className={tab === "reference" ? "ring-2 ring-emerald-500/60" : ""} onClick={() => setTab("reference")}>
              <TableIcon className="size-5" /> Справочник
            </Button>
            <Button size="sm" className={tab === "practice" ? "ring-2 ring-emerald-500/60" : ""} onClick={() => setTab("practice")}>
              <BookOpen className="size-5" /> Тренировка
            </Button>
          </div>
        </div>
        {/* Глобальные метрики */}
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Chip className="flex items-center justify-between text-xs sm:text-sm"><span>Модальные</span><b>{stats.modals}</b></Chip>
          <Chip className="flex items-center justify-between text-xs sm:text-sm"><span>«Супер» неправ.</span><b>{stats.superIrreg}</b></Chip>
          <Chip className="flex items-center justify-between text-xs sm:text-sm"><span>Смена гласной</span><b>{stats.vowelChange}</b></Chip>
          <Chip className="hidden sm:flex items-center justify-between text-sm"><span>Всего</span><b>{stats.total}</b></Chip>
        </div>
      </div>

      {/* Переключатель наборов + поиск (мобильный first) */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <div className="chip flex items-center gap-2 text-sm">
          Набор:
          <Button size="sm" className={mode === "modals" ? "ring-2 ring-emerald-500/60" : ""} onClick={() => setMode("modals")}>Модальные</Button>
          <Button size="sm" className={mode === "irregulars" ? "ring-2 ring-emerald-500/60" : ""} onClick={() => setMode("irregulars")}>Неправильные</Button>
          <Button size="sm" className={mode === "all" ? "ring-2 ring-emerald-500/60" : ""} onClick={() => setMode("all")}>Все</Button>
        </div>
        <label className="chip flex items-center gap-2 grow">
          <SearchIcon className="size-4" />
          <input type="text" placeholder="Поиск по инфинитиву или переводу…" value={q} onChange={(e) => setQ(e.target.value)} className="w-full bg-transparent outline-none text-base" />
        </label>
        {/* Кол-во в тренировке: спрятано на мобиле, оставлено на десктопе */}
        <label className="chip hidden sm:flex items-center gap-2">
          <Hash className="size-4" />
          <input type="number" min={4} max={SETS.all().length} value={count} onChange={(e) => setCount(parseInt(e.target.value || "12", 10))} className="w-20 bg-transparent outline-none" title="Сколько глаголов взять в тренировку" />
        </label>
        <Button variant="primary" className="hidden sm:inline-flex" onClick={() => gen()}><Play className="size-5" /> Быстрая тренировка</Button>
      </div>

      {/* Вкладка: Справочник */}
      {tab === "reference" && (
        <div>
          {/* Info для мобилы */}
          <div className="px-3 py-2 flex items-start gap-2 text-sm text-black/70 dark:text-white/70 bg-white/5 rounded-xl mb-2">
            <Info className="size-4 mt-0.5" />
            <div>
              <b>Совет:</b> на телефоне удобнее просматривать карточки. Формы <i>du/er</i> подсвечены, где меняется гласная.
            </div>
          </div>

          {/* Мобильные карточки */}
          <div className="grid grid-cols-1 gap-2 sm:hidden">
            {filtered.map((inf) => <VerbCard key={inf} inf={inf} />)}
          </div>

          {/* Таблица — только на >= md */}
          <div className="hidden sm:block rounded-xl border border-white/10 overflow-hidden mt-2">
            <div className="relative max-w-full overflow-auto">
              <table className="min-w-[780px] w-full text-sm">
                <thead className="sticky top-0 bg-black/5 dark:bg-white/5 backdrop-blur">
                  <tr className="text-left">
                    <th className="px-3 py-2 w-10">#</th>
                    <th className="px-3 py-2">Infinitiv</th>
                    <th className="px-3 py-2">Тип</th>
                    <th className="px-3 py-2">Перевод</th>
                    {PRONOUNS.map((p) => (<th key={p} className={classNames("px-3 py-2", (p === "du" || p === "er") && "text-emerald-500")}>{p}</th>))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((inf, idx) => (
                    <tr key={inf} className={classNames(idx % 2 ? "bg-black/5 dark:bg-white/5" : "", "hover:bg-emerald-500/10 transition-colors")}>                    
                      <td className="px-3 py-2 text-black/60 dark:text-white/60">{idx + 1}</td>
                      <td className="px-3 py-2 font-semibold">{inf}</td>
                      <td className="px-3 py-2">
                        <span className={classNames("rounded-full px-2 py-0.5 text-xs border",
                          asType(inf) === "модальный" && "border-sky-500/60 text-sky-500",
                          asType(inf) === "супер-неправильный" && "border-fuchsia-500/60 text-fuchsia-500",
                          asType(inf) === "неправильный" && "border-emerald-500/60 text-emerald-500")}>{asType(inf)}</span>
                      </td>
                      <td className="px-3 py-2 opacity-80">{TRANSLATIONS[inf]}</td>
                      {PRONOUNS.map((p) => (<td key={p} className={classNames("px-3 py-2 whitespace-nowrap", (VOWEL_CHANGE.has(inf) && (p === "du" || p === "er")) && "font-semibold text-emerald-500")}>{VERB_FORMS[inf][p]}</td>))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Итоги/CTA */}
            <div className="flex items-center justify-between gap-2 p-3 border-t border-white/10">
              <div className="text-sm text-black/60 dark:text-white/60 flex items-center gap-2">
                <Filter className="size-4" /> Показано: <b>{filtered.length}</b> из {verbsInMode.length}
              </div>
              <div className="flex items-center gap-2">
                <Button onClick={() => gen(filtered)}><Play className="size-5" /> Тренировать показанные ({Math.max(4, Math.min(count, filtered.length))})</Button>
              </div>
            </div>
          </div>

          {/* FAB для мобилы */}
          <div className="sm:hidden fixed bottom-3 right-3 z-30">
            <Button variant="primary" className="rounded-full px-4 py-3 text-base shadow-xl" onClick={() => gen(filtered)}>
              <Play className="size-5" /> Тренировка ({Math.max(4, Math.min(count, filtered.length || verbsInMode.length))})
            </Button>
            <div className="h-3" />
          </div>
          <div className="sm:hidden h-14" /> {/* отступ под FAB */}
        </div>
      )}

      {/* Вкладка: Тренировка (мобильная оптимизация) */}
      {tab === "practice" && (
        <div className="pb-[env(safe-area-inset-bottom)]">
          {/* Header тренировки */}
          <div className="flex items-center justify-between mb-2">
            <div className="q text-lg sm:text-xl font-extrabold flex items-center gap-2">
              <BookOpen className="size-5" /> Тренировка
            </div>
            <div className="flex items-center gap-2">
              <Chip><TimerIcon className="size-4" /> {timeText}</Chip>
              {queue.length > 0 && (<Chip><CheckCircle2 className="size-4" /> {total}</Chip>)}
            </div>
          </div>

          {/* настройки тренировки */}
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <div className="chip flex items-center gap-2 text-sm">
              Набор:
              <Button size="sm" className={mode === "modals" ? "ring-2 ring-emerald-500/60" : ""} onClick={() => setMode("modals")}>Модальные</Button>
              <Button size="sm" className={mode === "irregulars" ? "ring-2 ring-emerald-500/60" : ""} onClick={() => setMode("irregulars")}>Неправильные</Button>
              <Button size="sm" className={mode === "all" ? "ring-2 ring-emerald-500/60" : ""} onClick={() => setMode("all")}>Все</Button>
            </div>
            <label className="chip items-center gap-2 hidden sm:flex">
              <Hash className="size-4" />
              <input type="number" min={4} max={SETS.all().length} value={count} onChange={(e) => setCount(parseInt(e.target.value || "12", 10))} className="w-20 bg-transparent outline-none" />
            </label>
            <Button variant="primary" className="hidden sm:inline-flex" onClick={() => gen()}><Play className="size-5" /> Начать</Button>
          </div>

          {/* задание */}
          {cur && (
            <div className="rounded-2xl border border-white/10 p-3 sm:p-4 bg-white/5 dark:bg-white/5">
              <div className="text-black/60 dark:text-white/60 font-semibold mb-1 text-sm">Впишите форму глагола</div>
              <div className="text-2xl sm:text-3xl font-extrabold mb-2 leading-tight">
                {cur.inf} — <span className="opacity-70">{cur.pro}</span>
              </div>

              {/* форма ввода: mobile-first */}
              <form
                className="flex flex-col gap-2"
                onSubmit={(e) => { e.preventDefault(); check(); }}
              >
                <input
                  className="btnlike text-lg sm:text-xl py-3"
                  placeholder="Ответ…"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  autoComplete="off"
                  inputMode="latin"
                  spellCheck={false}
                  disabled={locked}
                  aria-label="Форма глагола"
                />
                {/* Кнопка проверки для десктопа; на мобиле есть нижняя панель */}
                <Button variant="primary" className="hidden sm:inline-flex" disabled={locked || !value.trim()} type="submit">Проверить</Button>
              </form>

              {/* подсказка / дифф */}
              <div className="mt-2 min-h-6 text-white/80 space-y-1" aria-live="polite">
                {hintLevel > 0 && (<Chip>💡 {formatMasked(cur.ans, hintLevel)}</Chip>)}
                {diff && (
                  <Chip className="border-red-500">
                    <div className="text-sm">
                      <div className="opacity-70">Ваш ответ:</div>
                      <div><span>{diff.a0}</span><span className="bg-red-500/30 rounded px-0.5">{diff.a1 || (value.length === 0 ? "∅" : "")}</span><span>{diff.a2}</span></div>
                      <div className="opacity-70 mt-1">Нужно:</div>
                      <div><span>{diff.b0}</span><span className="bg-emerald-500/30 rounded px-0.5">{diff.b1}</span><span>{diff.b2}</span></div>
                    </div>
                  </Chip>
                )}
              </div>
            </div>
          )}

          {/* прогресс */}
          {queue.length > 0 && (
            <div className="mt-3">
              <div className="flex items-center gap-2"><Chip>Осталось: {queue.length}</Chip></div>
              <div className="mt-2 h-2 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden" role="progressbar" aria-valuemin={0} aria-valuemax={SETS.all().length} aria-valuenow={done} aria-label="Прогресс тренировки">
                <div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${(done / SETS.all().length) * 100}%` }} />
              </div>
            </div>
          )}

          {/* когда очередь опустела */}
          {queue.length === 0 && elapsedMs > 0 && (
            <div className="mt-3"><Chip className="border-emerald-500">Готово! Время: {timeText}</Chip></div>
          )}

          {/* Нижняя панель действий (мобильная) */}
          {cur && (
            <div className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-white/10 bg-white/80 dark:bg-black/60 backdrop-blur p-2 pb-[calc(env(safe-area-inset-bottom)+0.5rem)]">
              <div className="grid grid-cols-3 gap-2">
                <Button disabled={locked} onClick={() => setHintLevel((h) => Math.min(cur.ans.length, h + 1))} className="py-3 text-base"><Lightbulb className="size-5" /> Подсказка</Button>
                <Button variant="primary" disabled={locked || !value.trim()} onClick={check} className="py-3 text-base">Проверить</Button>
                <Button disabled={locked} onClick={() => { setQueue((q) => (q.length ? [...q.slice(1), q[0]] : q)); setValue(""); setHintLevel(0); setFeedback(null); }} className="py-3 text-base">Пропустить</Button>
              </div>
            </div>
          )}
          {/* отступ под панель */}
          <div className="md:hidden h-16" />

          {/* Кнопка Пересоздать — плавающая для мобилы */}
          {queue.length > 0 && (
            <div className="sm:hidden fixed right-3 bottom-20 z-30">
              <Button onClick={() => gen()} className="rounded-full px-3 py-3 shadow-xl"><RotateCcw className="size-5" /></Button>
            </div>
          )}
        </div>
      )}
    </Panel>
  );
}
