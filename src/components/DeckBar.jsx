import React from 'react'
import Chip from './ui/Chip'
import { Layers, ListOrdered, Shuffle, Volume2 } from 'lucide-react'

export default function DeckBar({ deckName, count, onShuffle, onSpeak }){
  return (
    <div className='flex items-center gap-2 my-3'>
      <Chip><Layers className='size-4' /> <span>{deckName}</span></Chip>
      {/* <Chip><ListOrdered className='size-4' /> <span>{count} карточек</span></Chip> */}
      <div className='grow' />
      <button className='iconbtn' title='Перемешать' onClick={onShuffle}><Shuffle className='size-5' /></button>
      {/* <button className='iconbtn' title='Озвучить' onClick={onSpeak}><Volume2 className='size-5' /></button> */}
    </div>
  )
}
