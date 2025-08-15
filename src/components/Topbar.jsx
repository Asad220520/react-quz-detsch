import React from 'react'
import { Menu, SunMoon } from 'lucide-react'

export default function Topbar({ onMenu, onTheme }){
  return (
    <header className='sticky top-0 z-50 flex items-center gap-2 px-3 py-2 backdrop-blur-md border-b border-black/10 dark:border-white/10 bg-gradient-to-b from-black/5 to-transparent dark:from-black/20'>
      <button aria-label='Открыть меню' className='iconbtn' onClick={onMenu}><Menu className='size-5' /></button>
      <div className='grow' />
      <div className='text-transparent bg-clip-text font-extrabold tracking-wide bg-gradient-to-r from-blue-400 to-emerald-300'>Deutsch Cards</div>
      <div className='grow' />
      <button aria-label='Сменить тему' className='iconbtn' onClick={onTheme}><SunMoon className='size-5' /></button>
    </header>
  )
}
