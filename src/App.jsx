import React from "react";
import Topbar from "./components/Topbar";
import Drawer from "./components/Drawer";
import DeckBar from "./components/DeckBar";
import DecksView from "./views/DecksView";
import CardsView from "./views/CardsView";
import LearnView from "./views/LearnView";
import WriteView from "./views/WriteView";
import MatchView from "./views/MatchView";
import TestView from "./views/TestView";
import ImportExportView from "./views/ImportExportView";
import SettingsView from "./views/SettingsView";
import { defaultDecks } from "./lib/constants";
import { useLocalStorageDecks } from "./lib/storage";
import { shuffle, usePrefersDark } from "./lib/utils";
import { speak } from "./lib/speech";
import { Plus } from "lucide-react";
import MemorizeView from "./views/MemorizeView";

const ROUTES = [
  "decks",
  "cards",
  "learn",
  "write",
  "match",
  "test",
  "memorize",
  "import",
  "settings",
];

export default function App() {
  const prefersDark = usePrefersDark();
  const [manualDark, setManualDark] = React.useState(null);
  const isDark = manualDark === null ? prefersDark : manualDark;
  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const [decks, setDecks] = useLocalStorageDecks(defaultDecks);
  const [deckIndex, setDeckIndex] = React.useState(0);
  const deck = decks[deckIndex] ?? decks[0];

  const [route, setRoute] = React.useState("decks");
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const [cardIndex, setCardIndex] = React.useState(0);
  const [fontPx, setFontPx] = React.useState(32);

  React.useEffect(() => {
    setCardIndex(0);
  }, [deckIndex]);

  function shuffleDeck() {
    setDecks((prev) => {
      const copy = [...prev];
      const d = {
        ...copy[deckIndex],
        cards: shuffle([...copy[deckIndex].cards]),
      };
      copy[deckIndex] = d;
      return copy;
    });
    setCardIndex(0);
  }
  function openDeck(i) {
    setDeckIndex(i);
    setCardIndex(0);
    setRoute("cards");
  }
  function onSpeak() {
    const c = deck.cards[cardIndex];
    if (c) speak(c.front);
  }
  function onAddCard() {
    const front = window.prompt("Немецкий термин: (ä ö ü ß)");
    if (!front) return;
    const back = window.prompt("Перевод:");
    if (back === null) return;
    setDecks((prev) => {
      const copy = [...prev];
      const d = {
        ...copy[deckIndex],
        cards: [...copy[deckIndex].cards, { front, back }],
      };
      copy[deckIndex] = d;
      return copy;
    });
    setCardIndex(deck.cards.length);
    setRoute("cards");
  }

  return (
    <div className="min-h-dvh grid grid-rows-[auto_1fr] bg-gradient-to-b from-slate-50 to-white text-slate-900 dark:from-slate-950 dark:to-black dark:text-slate-100 selection:bg-blue-500/20 dark:selection:bg-blue-500/40">
      <Topbar
        onMenu={() => setDrawerOpen(true)}
        onTheme={() => setManualDark((v) => (v === null ? !prefersDark : !v))}
      />
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        route={route}
        setRoute={setRoute}
      />

      <main className="max-w-[900px] w-full mx-auto px-3 sm:px-4">
        <DeckBar
          deckName={deck.name}
          count={deck.cards.length}
          onShuffle={shuffleDeck}
          onSpeak={onSpeak}
        />
        {route === "decks" && <DecksView decks={decks} onOpenDeck={openDeck} />}
        {route === "cards" && (
          <CardsView
            deck={deck}
            fontPx={fontPx}
            cardIndex={cardIndex}
            setCardIndex={setCardIndex}
            onSpeak={onSpeak}
          />
        )}
        {route === "learn" && <LearnView deck={deck} />}
        {route === "write" && <WriteView deck={deck} />}
        {route === "match" && <MatchView deck={deck} />}
        {route === "test" && <TestView deck={deck} />}
        {route === "memorize" && (
          <MemorizeView
            deck={deck}
            onSpeak={(card) => {
              // опциональная озвучка в Memorize: если передали карточку — озвучим front
              if (card?.front) speak(card.front);
            }}
          />
        )}
        {route === "import" && (
          <ImportExportView
            decks={decks}
            setDecks={setDecks}
            onAfterChange={() => {}}
          />
        )}
        {route === "settings" && (
          <SettingsView fontPx={fontPx} setFontPx={setFontPx} />
        )}
      </main>

      {/* <button
        className="fixed right-4 bottom-5 z-40 grid place-items-center h-14 w-14 rounded-2xl text-white border border-blue-400/60 shadow-[0_12px_30px_rgba(37,99,235,.35)] bg-gradient-to-b from-blue-500/40 to-blue-500/20"
        title="Добавить карточку"
        onClick={onAddCard}
      >
        <Plus className="size-6" />
      </button> */}
    </div>
  );
}
