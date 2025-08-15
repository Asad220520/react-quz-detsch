import React from 'react'
import { cls } from '../../lib/utils'

export default function Chip({ children, className='' }){
  return <span className={cls('inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 font-semibold', className)}>{children}</span>
}
