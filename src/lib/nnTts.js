const mem = new Map(); // in-memory кэш url-ов

async function fetchNeuralBlob({
  text,
  lang = "de-DE",
  voice = "de_female_1",
  rate = 1.0,
}) {
  const key = `${lang}|${voice}|${rate}|${text}`;
  if (mem.has(key)) return mem.get(key);

  const res = await fetch("/api/tts", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "audio/mpeg" },
    body: JSON.stringify({ text, lang, voice, rate }),
  });
  if (!res.ok) throw new Error("Neural TTS failed");

  const buf = await res.arrayBuffer();
  const blob = new Blob([buf], { type: "audio/mpeg" });
  const url = URL.createObjectURL(blob);
  mem.set(key, url);
  return url;
}

export async function playNeural(text, opts = {}) {
  const url = await fetchNeuralBlob({ text, ...opts });
  const a = new Audio(url);
  a.crossOrigin = "anonymous";
  a.playbackRate = opts?.rate ?? 1.0; // ⚠️ не все движки меняют rate у mp3, но пусть будет
  try {
    await a.play();
  } catch {}
  return a;
}
