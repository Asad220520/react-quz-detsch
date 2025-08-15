export function germanVoice(){
  try {
    const list = window.speechSynthesis?.getVoices?.() || []
    return list.find(v => /de(-|_|$)/i.test(v.lang)) || null
  } catch { return null }
}
export function speak(text){
  if(!window.speechSynthesis) return
  const u = new SpeechSynthesisUtterance(text)
  const v = germanVoice()
  if(v) u.voice = v
  u.lang = v?.lang || 'de-DE'
  window.speechSynthesis.cancel()
  window.speechSynthesis.speak(u)
}
