import React from 'react'
import Panel from '../components/ui/Panel'
import { FolderOpen, Play } from 'lucide-react'

export default function DecksView({ decks, onOpenDeck }){
  return (
    <Panel>
      <div className='font-extrabold text-xl mb-3'>Наборы</div>
      <div className='grid gap-2'>
        {decks.map((d, i) => (
          <div key={d.id} className='flex items-center gap-3 rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 p-3'>
            <FolderOpen className='size-5' />
            <div className='grow'>
              <div className='font-extrabold'>{d.name}</div>
              <div className='text-white/60'>{d.cards.length} карточек</div>
            </div>
            <button className='iconbtn' onClick={()=>onOpenDeck(i)}><Play className='size-5' /> Открыть</button>
          </div>
        ))}
      </div>
    </Panel>
  )
}
