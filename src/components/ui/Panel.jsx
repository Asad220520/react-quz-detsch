import React from 'react'
export default function Panel({ children }){
  return <div className='mt-4 rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 p-3 shadow-xl'>{children}</div>
}
