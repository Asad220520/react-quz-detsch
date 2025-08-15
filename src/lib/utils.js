import React from 'react'
export function cls(...xs){ return xs.filter(Boolean).join(' ') }
export function shuffle(arr){ return arr.map(v=>[Math.random(), v]).sort((a,b)=>a[0]-b[0]).map(x=>x[1]) }
export function normalize(s){ return s.toLowerCase().replace(/\s+/g,' ').trim() }
export function usePrefersDark(){
  const mq = window.matchMedia?.('(prefers-color-scheme: dark)')
  const [dark, setDark] = React.useState(() => mq?.matches ?? true)
  React.useEffect(()=>{
    if(!mq) return
    const on = (e)=>setDark(e.matches)
    mq.addEventListener?.('change', on)
    return ()=> mq.removeEventListener?.('change', on)
  },[mq])
  return dark
}


export function hapticSuccess(){
  try { navigator.vibrate && navigator.vibrate(35) } catch {}
}
export function hapticError(){
  try { navigator.vibrate && navigator.vibrate([20, 40, 20]) } catch {}
}
