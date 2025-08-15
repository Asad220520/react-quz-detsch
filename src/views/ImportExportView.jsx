  import React from 'react'
  import Panel from '../components/ui/Panel'
  import { FileJson, FolderOpen, Upload, UploadCloud, Info, Download } from 'lucide-react'

  export default function ImportExportView({ decks, setDecks, onAfterChange }){
    function exportAll(){
      const data = JSON.stringify({ decks }, null, 2)
      const blob = new Blob([data], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'deutsch-decks.json'
      a.click()
      setTimeout(()=>URL.revokeObjectURL(url), 500)
    }

    async function importFiles(){
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = '.json'
      input.multiple = true
      input.onchange = async () => {
        const toAdd = []
        for(const f of input.files){
          try {
            const obj = JSON.parse(await f.text())
            if(obj?.name && Array.isArray(obj?.cards)){
              toAdd.push({ id: 'deck-' + Math.random().toString(36).slice(2,8), name: obj.name, cards: obj.cards })
            }
          } catch(e){ console.warn('bad json', f.name, e) }
        }
        if(toAdd.length){
          setDecks(prev => [...prev, ...toAdd])
          onAfterChange?.()
          alert('Импорт завершён')
        }
      }
      input.click()
    }

    async function importFolder(){
      if(!window.showDirectoryPicker){
        alert('Ваш браузер не поддерживает импорт папки. Используйте «Импорт JSON-файлов».')
        return
      }
      try {
        const dir = await window.showDirectoryPicker()
        const toAdd = []
        for await (const [name, handle] of dir.entries()){
          if(name.toLowerCase().endsWith('.json') && handle.kind === 'file'){
            const file = await handle.getFile()
            try {
              const obj = JSON.parse(await file.text())
              if(obj?.name && Array.isArray(obj?.cards)){
                toAdd.push({ id: 'deck-' + Math.random().toString(36).slice(2,8), name: obj.name, cards: obj.cards })
              }
            } catch(e){ console.warn('bad json', name, e) }
          }
        }
        if(toAdd.length){
          setDecks(prev => [...prev, ...toAdd])
          onAfterChange?.()
          alert('Импорт папки завершён')
        }
      } catch(e){}
    }

    return (
      <Panel>
        <div className='q text-xl font-extrabold'>Импорт / Экспорт</div>
        <div className='grid gap-2'>
          <div className='itemrow'>
            <FileJson className='size-5' />
            <div className='grow'>
              <div className='font-extrabold'>Импорт JSON-файлов</div>
              <div className='text-white/60'>Поддерживается несколько файлов сразу. Формат — см. ниже.</div>
            </div>
            <button className='iconbtn' onClick={importFiles}><Download className='size-5' /> Импорт</button>
          </div>
          <div className='itemrow'>
            <FolderOpen className='size-5' />
            <div className='grow'>
              <div className='font-extrabold'>Импорт папки (File System Access API)</div>
              <div className='text-white/60'>Загрузит все .json из выбранной папки. (Chrome/Edge/Android)</div>
            </div>
            <button className='iconbtn' onClick={importFolder}><FolderOpen className='size-5' /> Импорт папки…</button>
          </div>
          <div className='itemrow'>
            <Upload className='size-5' />
            <div className='grow'>
              <div className='font-extrabold'>Экспорт моих наборов</div>
              <div className='text-white/60'>Сохранит один JSON со всеми наборами.</div>
            </div>
            <button className='iconbtn' onClick={exportAll}><UploadCloud className='size-5' /> Экспорт</button>
          </div>
          <div className='itemlike'>
            <div className='font-extrabold mb-2 flex items-center gap-2'><Info className='size-5' /> Формат JSON</div>
            <pre className='w-full overflow-auto m-0 text-sm opacity-90'>{`{
  "name": "Deutsch A1 — Глаголы",
  "cards": [
    { "front": "gehen", "back": "идти" },
    { "front": "kommen", "back": "приходить" }
  ]
}`}</pre>
          </div>
        </div>
      </Panel>
    )
  }
