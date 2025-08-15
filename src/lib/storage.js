// src/lib/storage.js
import { useEffect, useState } from "react";
import { STORAGE_KEY } from "./constants";

// делаем стабильный slug из имени (чтобы id был человекочитаемый)
const slug = (s = "") =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 40);

// навешиваем id, если его нет
function withDeckIds(decks = []) {
  return decks.map((d, i) => ({
    ...d,
    id: d.id || `deck-${slug(d.name || "untitled")}-${i}`,
  }));
}

// добавляем дефолтные наборы, которых нет у пользователя (по id)
function mergeDefaults(existing, defaults) {
  const ex = withDeckIds(existing);
  const defs = withDeckIds(defaults);
  const byId = new Map(ex.map((d) => [d.id, d]));
  for (const def of defs) {
    if (!byId.has(def.id)) ex.push(def);
  }
  return ex;
}

export function useLocalStorageDecks(defaultDecks) {
  const [decks, setDecks] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return withDeckIds(defaultDecks);

      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed?.decks)) {
        // миграция: у сохранённых тоже навешиваем id и добавляем новые дефолты
        return mergeDefaults(parsed.decks, defaultDecks);
      }
      return withDeckIds(defaultDecks);
    } catch {
      return withDeckIds(defaultDecks);
    }
  });

  // сохраняем при каждом изменении
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ decks }));
    } catch {}
  }, [decks]);

  return [decks, setDecks];
}
