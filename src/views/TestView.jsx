import React from 'react'
import Panel from '../components/ui/Panel'
import Button from '../components/ui/Button'
import Chip from '../components/ui/Chip'
import { shuffle, normalize, hapticSuccess } from '../lib/utils'
import { Hash, BadgeCheck, Sparkles } from 'lucide-react'

function Task({ item, deck, onDone }) {
  const [picked, setPicked] = React.useState(null)
  const [wasCorrect, setWasCorrect] = React.useState(null)
  const [val, setVal] = React.useState('')

  // ---------- Multiple Choice ----------
  if (item._type === 'mc' && deck.cards.length >= 4) {
    // используем предсчитанные опции, иначе аккуратно считаем на лету
    const options = React.useMemo(() => {
      if (item._options && item._options.length) return item._options
      const others = shuffle(deck.cards.filter(x => x !== item)).slice(0, 3).map(x => x.back)
      return shuffle([item.back, ...others])
    }, [item, deck.cards])

    return (
      <div className='itemlike'>
        <div className='q text-lg font-extrabold mb-2'>Выберите перевод: {item.front}</div>
        {options.map((o, k) => {
          const isPicked = picked === k
          const isRight = o === item.back
          const cls = [
            'my-1 transition',
            // выбранная кнопка: красный при ошибке, зелёный при верном
            isPicked && (isRight
              ? 'border-2 border-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.35)] animate-[pop_.22s_ease-out]'
              : 'border-2 border-red-500 animate-[shake_.35s_ease-in-out]'),
            // показать правильный вариант, если выбрали неправильно
            picked != null && wasCorrect === false && isRight && !isPicked && 'border-2 border-emerald-300'
          ].filter(Boolean).join(' ')
          return (
            <Button
              key={`${o}-${k}`}
              className={cls}
              onClick={() => {
                if (picked != null) return
                setPicked(k)
                const ok = isRight
                setWasCorrect(ok)
                if (ok) hapticSuccess()
                setTimeout(() => onDone(ok), ok ? 650 : 360)
              }}
            >
              {o}
            </Button>
          )
        })}
      </div>
    )
  }

  // ---------- True/False ----------
  if (item._type === 'tf') {
    // предсчитанный maybe, иначе считаем на лету стабильно
    const maybe = React.useMemo(() => {
      if (item._maybe) return item._maybe
      const otherBack = shuffle(deck.cards.filter(x => x !== item))[0]?.back
      return Math.random() < 0.5 ? item.back : otherBack
    }, [item, deck.cards])
    const correctIndex = (maybe === item.back) ? 0 : 1

    return (
      <div className='itemlike'>
        <div className='q text-lg font-extrabold mb-2'>Соответствует ли: {item.front} → <b>{maybe}</b> ?</div>
        <div className='grid grid-cols-2 gap-2'>
          <Button
            className={[
              // выбранная: красный/зелёный
              picked === 0 && (correctIndex === 0
                ? 'border-2 border-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.35)] animate-[pop_.22s_ease-out]'
                : 'border-2 border-red-500 animate-[shake_.35s_ease-in-out]'),
              // показать правильную, если выбрано неверно
              picked != null && wasCorrect === false && correctIndex === 0 && 0 !== picked && 'border-2 border-emerald-300'
            ].filter(Boolean).join(' ')}
            onClick={() => {
              if (picked != null) return
              setPicked(0)
              const ok = correctIndex === 0
              setWasCorrect(ok)
              if (ok) hapticSuccess()
              setTimeout(() => onDone(ok), ok ? 650 : 360)
            }}
          >
            Верно
          </Button>

          <Button
            className={[
              picked === 1 && (correctIndex === 1
                ? 'border-2 border-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.35)] animate-[pop_.22s_ease-out]'
                : 'border-2 border-red-500 animate-[shake_.35s_ease-in-out]'),
              picked != null && wasCorrect === false && correctIndex === 1 && 1 !== picked && 'border-2 border-emerald-300'
            ].filter(Boolean).join(' ')}
            onClick={() => {
              if (picked != null) return
              setPicked(1)
              const ok = correctIndex === 1
              setWasCorrect(ok)
              if (ok) hapticSuccess()
              setTimeout(() => onDone(ok), ok ? 650 : 360)
            }}
          >
            Неверно
          </Button>
        </div>
      </div>
    )
  }

  // ---------- Write ----------
  return (
    <div className='itemlike'>
      <div className='q text-lg font-extrabold mb-2'>Введите перевод: {item.front}</div>
      <div className='grid grid-cols-[1fr_auto] gap-2'>
        <input
          className='btnlike'
          placeholder='Ответ…'
          value={val}
          onChange={e => setVal(e.target.value)}
        />
        <Button
          variant='primary'
          onClick={() => {
            const ok = normalize(val) === normalize(item.back)
            if (ok) hapticSuccess()
            onDone(ok)
          }}
        >
          Проверить
        </Button>
      </div>
    </div>
  )
}

export default function TestView({ deck }) {
  const [count, setCount] = React.useState(12)
  const [score, setScore] = React.useState(0)
  const [items, setItems] = React.useState([])

  function gen() {
    setScore(0)
    const n = Math.max(4, Math.min(count || 12, 50))
    const arr = shuffle([...deck.cards]).slice(0, Math.min(n, deck.cards.length))
    const types = ['mc', 'write', 'tf']

    // предсчитываем варианты/maybe для стабильности
    setItems(arr.map(it => {
      const type = types[(Math.random() * 3) | 0]
      const base = { ...it, _type: type, _done: false }
      if (type === 'mc' && deck.cards.length >= 4) {
        const others = shuffle(deck.cards.filter(x => x !== it)).slice(0, 3).map(x => x.back)
        base._options = shuffle([it.back, ...others])
      } else if (type === 'tf') {
        const otherBack = shuffle(deck.cards.filter(x => x !== it))[0]?.back
        base._maybe = Math.random() < 0.5 ? it.back : otherBack
      }
      return base
    }))
  }

  function done(ix, ok) {
    setItems(prev => prev.map((x, i) => i === ix ? { ...x, _done: true } : x))
    if (ok) setScore(s => s + 1)
  }

  return (
    <Panel>
      <div className='q text-xl font-extrabold'>Тест</div>
      <div className='flex items-center gap-2 flex-wrap mb-2'>
        <label className='chip flex items-center gap-2'>
          <Hash className='size-4' />
          <input
            type='number'
            min={4}
            max={50}
            value={count}
            onChange={e => setCount(parseInt(e.target.value || '12', 10))}
            className='w-24 rounded-md bg-transparent outline-none'
          />
        </label>
        <Button variant='primary' onClick={gen}>
          <Sparkles className='size-5' /> Сгенерировать
        </Button>
        <Chip><BadgeCheck className='size-4' /> <span>{score}</span></Chip>
      </div>

      <div className='grid gap-2'>
        {items.map((it, i) => (
          <Task key={i} item={it} deck={deck} onDone={(ok) => done(i, ok)} />
        ))}
      </div>
    </Panel>
  )
}
