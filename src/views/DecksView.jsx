// src/views/DecksView.jsx (mobile‑first)
import React from "react";
import Panel from "../components/ui/Panel";
import Button from "../components/ui/Button";
import {
  FolderOpen,
  Play,
  Search as SearchIcon,
  Grid as GridIcon,
  List as ListIcon,
  ChevronRight,
} from "lucide-react";

function pluralRu(n, one, few, many) {
  const abs = Math.abs(n) % 100;
  const n1 = abs % 10;
  if (abs > 10 && abs < 20) return many;
  if (n1 > 1 && n1 < 5) return few;
  if (n1 === 1) return one;
  return many;
}

export default function DecksView({ decks = [], onOpenDeck }) {
  // mobile‑first улучшения: поиск, сортировка, вид сетка/список, большие тапы, кликабельная карточка
  const [q, setQ] = React.useState("");
  const [sort, setSort] = React.useState("name"); // 'name' | 'cards'
  const [view, setView] = React.useState("grid"); // 'grid' | 'list'

  // работаем всегда с парами {deck, index} чтобы не терять исходный индекс при сортировке/фильтре
  const source = React.useMemo(
    () =>
      (Array.isArray(decks) ? decks : []).map((d, i) => ({
        deck: d,
        index: i,
      })),
    [decks]
  );

  const items = React.useMemo(() => {
    const filtered = source.filter(({ deck }) => {
      const name = (deck.name || "").toLowerCase();
      return !q.trim() || name.includes(q.toLowerCase());
    });
    filtered.sort((a, b) => {
      if (sort === "cards") {
        const ac = a.deck.cards?.length || 0;
        const bc = b.deck.cards?.length || 0;
        return bc - ac; // по убыванию количества
      }
      // name
      return (a.deck.name || "").localeCompare(b.deck.name || "", undefined, {
        sensitivity: "base",
      });
    });
    return filtered;
  }, [q, sort, source]);

  const open = (originalIndex) => {
    if (typeof onOpenDeck === "function") onOpenDeck(originalIndex);
  };

  return (
    <Panel>
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="font-extrabold text-xl">Наборы</div>
        <div className="hidden sm:flex gap-2">
          <Button
            size="sm"
            className={view === "grid" ? "ring-2 ring-emerald-500/60" : ""}
            onClick={() => setView("grid")}
          >
            <GridIcon className="size-4" />
          </Button>
          <Button
            size="sm"
            className={view === "list" ? "ring-2 ring-emerald-500/60" : ""}
            onClick={() => setView("list")}
          >
            <ListIcon className="size-4" />
          </Button>
        </div>
      </div>

      {/* Controls (mobile‑first) */}
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <label className="chip flex items-center gap-2 grow">
          <SearchIcon className="size-4" />
          <input
            type="text"
            placeholder="Поиск по названию…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="w-full bg-transparent outline-none"
          />
        </label>
        <label className="chip flex items-center gap-2">
          <span className="text-sm opacity-80">Сортировка</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-transparent outline-none text-sm"
          >
            <option value="name">по имени</option>
            <option value="cards">по количеству</option>
          </select>
        </label>
        {/* Переключатель вида — на мобиле ниже, на десктопе сверху */}
        <div className="sm:hidden w-full flex gap-2">
          <Button className="grow" size="sm" onClick={() => setView("grid")}>
            <GridIcon className="size-4" /> Сетка
          </Button>
          <Button className="grow" size="sm" onClick={() => setView("list")}>
            <ListIcon className="size-4" /> Список
          </Button>
        </div>
      </div>

      {/* Empty state */}
      {items.length === 0 && (
        <div className="rounded-xl border border-white/10 p-6 text-center bg-white/5">
          <FolderOpen className="size-8 mx-auto opacity-60" />
          <div className="mt-2 font-semibold">Ничего не найдено</div>
          <div className="opacity-70 text-sm">
            Попробуйте изменить запрос или сортировку.
          </div>
        </div>
      )}

      {/* Grid view */}
      {items.length > 0 && view === "grid" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {items.map(({ deck: d, index: i }) => {
            const count = d.cards?.length || 0;
            const suffix = pluralRu(count, "карточка", "карточки", "карточек");
            return (
              <div
                key={d.id || d.name || i}
                role="button"
                tabIndex={0}
                onClick={() => open(i)}
                onKeyDown={(e) =>
                  (e.key === "Enter" || e.key === " ") && open(i)
                }
                className="group rounded-2xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 overflow-hidden focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
              >
                {/* cover */}
                {d.cover ? (
                  <img
                    src={d.cover}
                    alt=""
                    loading="lazy"
                    className="h-24 w-full object-cover"
                  />
                ) : (
                  <div className="h-24 w-full grid place-items-center bg-gradient-to-br from-emerald-500/15 to-sky-500/15">
                    <FolderOpen className="size-6 opacity-60" />
                  </div>
                )}
                <div className="p-3 flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="font-extrabold truncate" title={d.name}>
                      {d.name}
                    </div>
                    <div className="opacity-70 text-sm">
                      {count} {suffix}
                    </div>
                  </div>
                  <div className="self-center shrink-0 opacity-70 group-hover:opacity-100 transition-opacity">
                    <ChevronRight className="size-5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* List view */}
      {items.length > 0 && view === "list" && (
        <div className="grid gap-2">
          {items.map(({ deck: d, index: i }) => {
            const count = d.cards?.length || 0;
            const suffix = pluralRu(count, "карточка", "карточки", "карточек");
            return (
              <div
                key={d.id || d.name || i}
                className="flex items-center gap-3 rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 p-3"
              >
                {d.cover ? (
                  <img
                    src={d.cover}
                    alt=""
                    className="h-12 w-16 object-cover rounded-lg border border-black/10 dark:border-white/10"
                    loading="lazy"
                  />
                ) : (
                  <div className="h-12 w-16 rounded-lg border border-black/10 dark:border-white/10 grid place-items-center bg-gradient-to-br from-emerald-500/15 to-sky-500/15">
                    <FolderOpen className="size-5 opacity-60" />
                  </div>
                )}
                <button
                  className="grow min-w-0 text-left"
                  onClick={() => open(i)}
                  title={d.name}
                >
                  <div className="font-extrabold truncate">{d.name}</div>
                  <div className="text-white/60 text-sm">
                    {count} {suffix}
                  </div>
                </button>
                <Button
                  className="shrink-0"
                  onClick={() => open(i)}
                  aria-label={`Открыть «${d.name}»`}
                >
                  <Play className="size-5" /> Открыть
                </Button>
              </div>
            );
          })}
        </div>
      )}
    </Panel>
  );
}
