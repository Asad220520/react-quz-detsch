import React from 'react'
import Panel from '../components/ui/Panel'
import Button from '../components/ui/Button'
import Chip from '../components/ui/Chip'
import { normalize, hapticSuccess } from '../lib/utils'

export default function WriteView({ deck }){
  const [writeIdx, setWriteIdx] = React.useState(0)
  const [value, setValue] = React.useState('')
  const [feedback, setFeedback] = React.useState(null)
  const inputRef = React.useRef(null)

  React.useEffect(()=>{
    setWriteIdx(Math.floor(Math.random()*deck.cards.length))
    setValue('')
    setFeedback(null)
  }, [deck.id])

  React.useEffect(()=>{ inputRef.current?.focus() }, [writeIdx])

  function onShow(){ setFeedback({ type:'hint', text: deck.cards[writeIdx].front }) }
  function onCheck(){
    const c = deck.cards[writeIdx]
    const ok = normalize(value) === normalize(c.front)
    setFeedback({ type: ok ? 'ok' : 'bad', text: ok ? 'Верно!' : `Правильно: ${c.front}` })
    if(ok){ hapticSuccess(); setTimeout(()=> next(), 650) }
  }
  function next(){
    setWriteIdx(Math.floor(Math.random()*deck.cards.length))
    setValue('')
    setFeedback(null)
  }

  function insertChar(ch){
    const inp = inputRef.current
    if(!inp) return
    const start = inp.selectionStart, end = inp.selectionEnd, text = value
    const newVal = text.slice(0,start)+ch+text.slice(end)
    setValue(newVal)
    requestAnimationFrame(()=>{
      inp.selectionStart = inp.selectionEnd = start + ch.length
      inp.focus()
    })
  }

  React.useEffect(()=>{
    function onKeyDown(e){
      if(!e.altKey) return
      const map = { a:'ä', o:'ö', u:'ü', s:'ß' }
      const ch = map[e.key?.toLowerCase?.()] || null
      if(!ch) return
      e.preventDefault()
      const ins = e.shiftKey ? ch.toUpperCase() : ch
      insertChar(ins)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [value])

  const c = deck.cards[writeIdx]

  return (
    <Panel>
      <div className='text-white/60 font-semibold'>Напишите по-немецки</div>
      <div className='q text-2xl sm:text-3xl font-extrabold my-2'>{c.back}</div>
      <input ref={inputRef} className='btnlike' type='text' placeholder='Введите ответ…' value={value} onChange={e=>setValue(e.target.value)} autoComplete='off' inputMode='latin' />

      <div className='sticky bottom-0 z-40 mt-3 grid grid-cols-7 gap-2 rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-white/10 p-2'>
        {['ä','ö','ü','ß','Ä','Ö','Ü'].map(ch => <button key={ch} className='kbdkey' onClick={()=>insertChar(ch)}>{ch}</button>)}
      </div>

      <div className='grid grid-cols-2 gap-2 mt-3'>
        <Button onClick={onShow}>Показать</Button>
        <Button variant='primary' onClick={onCheck}>Проверить</Button>
      </div>

      <div className='text-white/70 mt-2 min-h-6'>
        {feedback?.type==='hint' && <Chip>💡 {feedback.text}</Chip>}
        {feedback?.type==='ok' && <Chip className='border-emerald-500'>✔ Верно!</Chip>}
        {feedback?.type==='bad' && <Chip className='border-red-500'>✖ <span dangerouslySetInnerHTML={{__html: feedback.text}} /></Chip>}
      </div>
    </Panel>
  )
}
