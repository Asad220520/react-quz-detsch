// lib/tts.js — умная озвучка для немецкого (Web Speech API)
// Особенности:
// • ждёт загрузки голосов (voiceschanged / таймаут), кеширует выбор
// • приоритетно выбирает de-DE, затем de-AT/de-CH; эвристика по именам
// • поддерживает interrupt, slow, rate/pitch/volume, queue текста по предложениям
// • API: listVoices, setPreferredVoice, getPreferredVoice, speak, cancelAll, speakSlow, ensureReady, pickGermanVoice

const LS_KEY = "tts.preferredVoiceURI";
let _voices = [];
let _readyPromise = null;

function hasSynth() {
  return typeof window !== "undefined" && !!window.speechSynthesis;
}

export function ensureReady(timeout = 1500) {
  if (!hasSynth()) return Promise.resolve([]);
  if (_readyPromise) return _readyPromise;
  _readyPromise = new Promise((resolve) => {
    const synth = window.speechSynthesis;
    const done = () => {
      _voices = synth.getVoices() || [];
      resolve(_voices);
    };
    let timer = null;
    // иногда голоса доступны сразу
    const now = synth.getVoices();
    if (now && now.length) {
      _voices = now;
      return resolve(now);
    }
    // иначе ждём событие
    const onChange = () => {
      clearTimeout(timer);
      synth.removeEventListener("voiceschanged", onChange);
      done();
    };
    synth.addEventListener("voiceschanged", onChange);
    timer = setTimeout(() => {
      synth.removeEventListener("voiceschanged", onChange);
      done();
    }, timeout);
  });
  return _readyPromise;
}

export function listVoices() {
  return (
    _voices && _voices.length
      ? _voices
      : hasSynth()
      ? window.speechSynthesis.getVoices()
      : []
  ).map((v) => ({
    name: v.name,
    lang: v.lang,
    default: v.default,
    localService: v.localService,
    voiceURI: v.voiceURI,
  }));
}

export function getPreferredVoice() {
  try {
    return localStorage.getItem(LS_KEY) || null;
  } catch {
    return null;
  }
}
export function setPreferredVoice(voiceURI) {
  try {
    if (voiceURI) localStorage.setItem(LS_KEY, voiceURI);
    else localStorage.removeItem(LS_KEY);
  } catch {}
}

function scoreGermanVoice(v, preferRegion = "DE") {
  if (!v || !v.lang) return -1;
  const L = v.lang.toLowerCase();
  const name = (v.name || "").toLowerCase();
  let s = 0;
  // язык
  if (L.startsWith("de-de")) s += 5;
  else if (L.startsWith("de-")) s += 4;
  if (preferRegion === "AT" && L.startsWith("de-at")) s += 1;
  if (preferRegion === "CH" && L.startsWith("de-ch")) s += 1;
  // эвристика по имени движка/голоса
  if (/google|samsung|microsoft|siri|apple|pico|acapela/.test(name)) s += 1;
  if (/marlene|vicki|anna|katja|conrad|markus|hans|klara|hedi/.test(name))
    s += 1;
  // локальный сервис — обычно ниже задержка
  if (v.localService) s += 0.5;
  // значение по умолчанию
  if (v.default) s += 0.25;
  return s;
}

export async function pickGermanVoice({ preferRegion = "DE" } = {}) {
  if (!hasSynth()) return null;
  await ensureReady();
  const synth = window.speechSynthesis;
  const preferredURI = getPreferredVoice();
  const voices = synth.getVoices() || [];
  if (preferredURI) {
    const hit = voices.find((v) => v.voiceURI === preferredURI);
    if (hit) return hit;
  }
  // лучший по оценке
  let best = null,
    bestScore = -1;
  for (const v of voices) {
    const sc = scoreGermanVoice(v, preferRegion);
    if (sc > bestScore) {
      best = v;
      bestScore = sc;
    }
  }
  return best;
}

function splitIntoChunks(text, maxLen = 180) {
  // делим по предложениям и запятым, чтобы избежать обрезаний на iOS
  const parts = [];
  const sentences = String(text).split(/([.!?…]+\s+)/g);
  let buf = "";
  for (let i = 0; i < sentences.length; i++) {
    buf += sentences[i] || "";
    if (buf.length >= maxLen || /[.!?…]\s*$/.test(buf)) {
      parts.push(buf.trim());
      buf = "";
    }
  }
  if (buf.trim()) parts.push(buf.trim());
  return parts.length ? parts : [String(text)];
}

export function cancelAll() {
  if (!hasSynth()) return;
  try {
    window.speechSynthesis.cancel();
  } catch {}
}

export async function speak(text, opts = {}) {
  if (!hasSynth()) return null;
  await ensureReady();
  const synth = window.speechSynthesis;

  const {
    interrupt = true,
    slow = false,
    rate = slow ? 0.9 : 1.0,
    pitch = 1,
    volume = 1,
    lang,
    voice, // передай заранее выбранный voice
    preferRegion = "DE",
    onend,
    onerror,
  } = opts;

  if (interrupt && (synth.speaking || synth.pending)) synth.cancel();

  const picked = voice || (await pickGermanVoice({ preferRegion }));
  if (picked)
    try {
      setPreferredVoice(picked.voiceURI);
    } catch {}

  const chunks = splitIntoChunks(text);
  let ended = 0;
  let resolveFin, rejectFin;
  const finished = new Promise((res, rej) => {
    resolveFin = res;
    rejectFin = rej;
  });

  const utterances = chunks.map((t) => {
    const u = new SpeechSynthesisUtterance(t);
    if (picked) u.voice = picked;
    u.lang = lang || picked?.lang || "de-DE";
    u.rate = rate;
    u.pitch = pitch;
    u.volume = volume;
    u.onend = (ev) => {
      if (++ended === utterances.length) {
        onend?.(ev);
        resolveFin();
      }
    };
    u.onerror = (ev) => {
      onerror?.(ev);
      rejectFin(ev.error || ev);
    };
    return u;
  });

  // Запуск очереди
  for (const u of utterances) synth.speak(u);
  return { finished, cancel: () => synth.cancel(), voice: picked };
}

export async function speakSlow(text, opts = {}) {
  return speak(text, { ...opts, slow: true });
}

// Удобный алиас как в твоём старом коде
export async function germanVoice() {
  if (!hasSynth()) return null;
  await ensureReady();
  const synth = window.speechSynthesis;
  // сначала строгий de-*, затем эвристика
  const hard = synth.getVoices().find((v) => /^de(-|_|$)/i.test(v.lang));
  if (hard) return hard;
  return pickGermanVoice();
}
