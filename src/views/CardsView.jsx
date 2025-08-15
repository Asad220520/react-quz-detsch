import React from 'react'
import Button from '../components/ui/Button'

export default function CardsView({ deck, fontPx, cardIndex, setCardIndex }){
  const [flipped, setFlipped] = React.useState(false)
  React.useEffect(()=> setFlipped(false), [cardIndex, deck?.id])

  const card = deck?.cards?.[cardIndex % (deck?.cards?.length || 1)] || { front:'—', back:'—' }

  const startX = React.useRef(0)
  const moved = React.useRef(false)
  function onTouchStart(e){ startX.current = e.changedTouches[0].clientX; moved.current=false }
  function onTouchMove(){ moved.current = true }
  function onTouchEnd(e){ const dx = e.changedTouches[0].clientX - startX.current; if(!moved.current || Math.abs(dx) < 30) setFlipped(v=>!v) }

  return (
    <section>
      <div className='cardwrap'>
        <article className={['card', flipped && 'flipped'].filter(Boolean).join(' ')} aria-live='polite' onClick={()=>setFlipped(v=>!v)} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
          <div className='face front space-y-1'>
            <div className='text-white/60 font-semibold'>Термин (DE)</div>
            <div className='term text-center font-extrabold' style={{ fontSize: fontPx }}>{card.front}</div>
          </div>
          <div className='face back space-y-1'>
            <div className='text-white/60 font-semibold'>Перевод</div>
            <div className='term text-center font-extrabold' style={{ fontSize: fontPx }}>{card.back}</div>
          </div>
        </article>
      </div>

      <div className='grid grid-cols-[1fr_auto_1fr] gap-2 mt-3 items-center'>
        <Button onClick={()=>setCardIndex(i => (i - 1 + deck.cards.length) % deck.cards.length)}>Назад</Button>
        <Button variant='primary' onClick={()=>setFlipped(v=>!v)}>Перевернуть</Button>
        <Button onClick={()=>setCardIndex(i => (i + 1) % deck.cards.length)}>Вперёд</Button>
      </div>
    </section>
  )
}
