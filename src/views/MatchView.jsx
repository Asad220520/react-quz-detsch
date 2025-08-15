import React from 'react'
import Panel from '../components/ui/Panel'
import Button from '../components/ui/Button'
import Chip from '../components/ui/Chip'
import { shuffle, hapticSuccess } from '../lib/utils'
import { Play, Timer as TimerIcon } from 'lucide-react'

export default function MatchView({ deck }){
  const [tiles, setTiles] = React.useState([])
  const [pair, setPair] = React.useState([])
  const rafRef = React.useRef(null)
  const [timer, setTimer] = React.useState('00:00')

  React.useEffect(()=>{ setTiles([]); setTimer('00:00'); cancelAnimationFrame(rafRef.current) }, [deck.id])

  function startMatch(){
    const base = deck.cards.slice(0, Math.max(8, Math.min(8, deck.cards.length)))
    const t = shuffle([...base.flatMap(c => [{id:c.front, text:c.front, side:'q'}, {id:c.front, text:c.back, side:'a'}])])
    setTiles(t.map(x => ({...x, disabled:false, muted:false})))
    const s0 = performance.now()
    tick(s0)
  }

  function tick(s0){
    cancelAnimationFrame(rafRef.current)
    const diff = performance.now() - s0
    const sec = Math.floor(diff/1000)
    const mm = String(Math.floor(sec/60)).padStart(2,'0')
    const ss = String(sec%60).padStart(2,'0')
    setTimer(`${mm}:${ss}`)
    if(tiles.some(t=>!t.disabled)) rafRef.current = requestAnimationFrame(()=>tick(s0))
  }

  function clickTile(ix){
    setTiles(prev => {
      const cur = [...prev]
      if(cur[ix].disabled) return prev
      cur[ix] = {...cur[ix], muted:true}
      return cur
    })
    setPair(p => {
        const pp = [...p, ix]
        if(pp.length === 2){
          const [a,b] = pp
          // immediate haptic on match
          try { if(a!==b && tiles[a]?.id === tiles[b]?.id) navigator.vibrate && navigator.vibrate(35) } catch {}
          setTimeout(()=>{
          setTiles(prev => {
            const x = [...prev]
            if(a!==b && x[a].id === x[b].id){ hapticSuccess();
              x[a] = {...x[a], disabled:true, muted:true, opacity:0.4}
              x[b] = {...x[b], disabled:true, muted:true, opacity:0.4}
            }else{
              x[a] = {...x[a], muted:false}
              x[b] = {...x[b], muted:false}
            }
            return x
          })
        }, 260)
        return []
      }
      return pp
    })
  }

  return (
    <Panel>
      <div className='q text-xl font-extrabold mb-2'>Матч</div>
      <div className='flex items-center gap-2 flex-wrap mb-2'>
        <Button variant='primary' onClick={startMatch}><Play className='size-5' /> Старт</Button>
        <Chip><TimerIcon className='size-4' /> <span>{timer}</span></Chip>
      </div>
      <div className='grid grid-cols-2 gap-2'>
        {tiles.map((t,i)=>(
          <button key={i} disabled={t.disabled} onClick={()=>clickTile(i)} className={['btnlike text-left min-h-14', t.muted && 'opacity-60', t.disabled && 'opacity-40'].filter(Boolean).join(' ')} style={{opacity: t.opacity}}>{t.text}</button>
        ))}
      </div>
    </Panel>
  )
}
