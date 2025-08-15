import { useEffect, useState } from 'react'
import { STORAGE_KEY } from './constants'

function mergeDefaults(existing, defaults){
  const byId = new Map(existing.map(d => [d.id, d]))
  for(const def of defaults){
    if(!byId.has(def.id)) existing.push(def)
  }
  return existing
}

export function useLocalStorageDecks(defaultDecks) {
  const [decks, setDecks] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw){
        // no saved -> start with defaults
        return defaultDecks
      }
      const parsed = JSON.parse(raw)
      if(Array.isArray(parsed?.decks)){
        const arr = [...parsed.decks]
        return mergeDefaults(arr, defaultDecks)
      }
      return defaultDecks
    } catch {
      return defaultDecks
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ decks }))
    } catch {}
  }, [decks])

  return [decks, setDecks]
}
