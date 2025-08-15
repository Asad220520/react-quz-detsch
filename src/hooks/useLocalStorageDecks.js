// src/hooks/useLocalStorageDecks.js
import { useEffect, useState } from "react";
import { STORAGE_KEY, deckCovers, imageMap } from "../lib/constants";

// Make a stable id from name
const makeId = (name = "") =>
  "deck-" +
  btoa(unescape(encodeURIComponent(name)))
    .replace(/=+$/, "")
    .slice(0, 10);

// Attach cover/img when missing
function attachImagesToDecks(input = []) {
  return input.map((d) => {
    const cover =
      d.cover ||
      (Object.entries(deckCovers).find(([prefix]) =>
        (d.name || "").startsWith(prefix)
      )?.[1] ??
        null);

    const cards = Array.isArray(d.cards)
      ? d.cards.map((c) =>
          c.img || imageMap[c.front]
            ? { ...c, img: c.img || imageMap[c.front] }
            : c
        )
      : [];

    return {
      id: d.id || makeId(d.name || "Deck"),
      name: d.name || "Без названия",
      tags: Array.isArray(d.tags) ? d.tags : [],
      cover,
      cards,
    };
  });
}

function mergeDefaults(existing, defaults) {
  // merge by id; if no id — compare by name
  const byId = new Map(existing.map((d) => [d.id || makeId(d.name), d]));
  const result = existing.slice();
  for (const def of defaults) {
    const key = def.id || makeId(def.name);
    if (!byId.has(key)) result.push(def);
  }
  return result;
}

export function useLocalStorageDecks(defaultDecksRaw = []) {
  const [decks, setDecks] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return attachImagesToDecks(defaultDecksRaw);
      }
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed?.decks)) {
        const restored = attachImagesToDecks(parsed.decks);
        const defaults = attachImagesToDecks(defaultDecksRaw);
        return mergeDefaults(restored, defaults);
      }
      return attachImagesToDecks(defaultDecksRaw);
    } catch {
      return attachImagesToDecks(defaultDecksRaw);
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ decks }));
    } catch {}
  }, [decks]);

  return [decks, setDecks];
}
