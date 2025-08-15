import React from 'react'
import Panel from '../components/ui/Panel'
import Button from '../components/ui/Button'
import { Type as TypeIcon, Mic } from 'lucide-react'
import { speak } from '../lib/speech'

export default function SettingsView({ fontPx, setFontPx }){
  return (
    <Panel>
      <div className='q text-xl font-extrabold'>Настройки</div>
      <div className='grid gap-2'>
        <label className='itemrow'>
          <TypeIcon className='size-5' />
          <span className='font-semibold'>Размер шрифта карточек</span>
          <input type='range' min={18} max={46} value={fontPx} onChange={e=>setFontPx(parseInt(e.target.value,10))} className='w-full' />
        </label>
        <div className='itemrow'>
          <Mic className='size-5' />
          <span className='font-semibold'>Озвучка (германский)</span>
          <Button onClick={()=>speak('Guten Tag! Viel Erfolg beim Lernen.')}>Тест</Button>
        </div>
      </div>
    </Panel>
  )
}
