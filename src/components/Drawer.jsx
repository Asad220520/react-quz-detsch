import React from 'react'
import { X, BookOpen, Library, RectangleHorizontal, CheckSquare, Edit3, Grid3x3, ClipboardList, Download, Settings as SettingsIcon, Sparkles } from 'lucide-react'
import Chip from './ui/Chip'

export default function Drawer({ open, onClose, route, setRoute }){
  const NavItem = ({ to, icon: Icon, children }) => (
    <a href='#' onClick={(e)=>{e.preventDefault(); setRoute(to); onClose();}} className={['flex items-center gap-3 px-3 py-3 rounded-xl font-semibold', route===to ? 'bg-black/10 dark:bg-white/10' : 'hover:bg-black/5 dark:hover:bg-white/5'].join(' ')}>
      <Icon className='size-5' />
      <span className='flex-1'>{children}</span>
    </a>
  )
  return (
    <>
      <aside
        aria-hidden={!open}
        className={[
          "fixed inset-y-0 left-0 z-50 w-[86vw] max-w-[360px] border-r border-black/10 dark:border-white/10 bg-white/80 dark:bg-zinc-900/95 backdrop-blur-xl shadow-2xl transition-transform",
          open ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <div className="flex items-center gap-2 px-4 pt-4 pb-2">
          <Chip>
            <BookOpen className="size-4" /> Мои наборы
          </Chip>
          <div className="grow" />
          <button aria-label="Закрыть" className="iconbtn" onClick={onClose}>
            <X className="size-5" />
          </button>
        </div>
        <nav className="p-4 flex flex-col gap-2">
          <NavItem to="decks" icon={Library}>
            Наборы
          </NavItem>
          <NavItem to="cards" icon={RectangleHorizontal}>
            Карточки
          </NavItem>
          <NavItem to="learn" icon={CheckSquare}>
            Учить (варианты)
          </NavItem>
          <NavItem to="write" icon={Edit3}>
            Письмо
          </NavItem>
          <NavItem to="match" icon={Grid3x3}>
            Матч
          </NavItem>
          <NavItem to="test" icon={ClipboardList}>
            Тест
          </NavItem>
          <NavItem to="memorize" icon={ClipboardList}>
            Запоминание
          </NavItem>
          <NavItem to="import" icon={Download}>
            Импорт / Экспорт
          </NavItem>
          <NavItem to="settings" icon={SettingsIcon}>
            Настройки
          </NavItem>
        </nav>
        <div className="mt-auto p-3 text-sm text-white/60 flex items-center gap-2">
          <Sparkles className="size-4" /> сделано для мобильных ♡
        </div>
      </aside>
      <div
        aria-hidden={!open}
        onClick={onClose}
        className={[
          "fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
      />
    </>
  );
}
