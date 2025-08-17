import express from "express";
import fetch from "node-fetch";

const router = express.Router();

// Ограничители: защита от спама
const MAX_LEN = 500; // символов
const ALLOWED_LANGS = new Set(["de-DE", "de-AT", "de-CH"]);

router.post("/tts", async (req, res) => {
  try {
    const {
      text,
      lang = "de-DE",
      voice = "de_female_1",
      rate = 1.0,
    } = req.body || {};
    if (!text || typeof text !== "string" || text.length > MAX_LEN) {
      return res.status(400).json({ error: "Bad text" });
    }
    if (!ALLOWED_LANGS.has(lang)) {
      return res.status(400).json({ error: "Unsupported lang" });
    }

    // 👇 ЗАМЕНИ на ваш апстрим (любой провайдер нейро-TTS)
    // Примерно так же работают многие API: Accept: audio/mpeg + JSON-параметры.
    const upstream = await fetch(process.env.TTS_UPSTREAM_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.TTS_API_KEY}`,
        "Content-Type": "application/json",
        Accept: "audio/mpeg",
      },
      body: JSON.stringify({ text, lang, voice, rate }),
    });

    if (!upstream.ok) {
      const details = await upstream.text().catch(() => "");
      return res
        .status(502)
        .json({ error: "Upstream failed", details: details.slice(0, 500) });
    }

    // Стримим клиенту MP3 без буферизации памяти
    res.set("Content-Type", "audio/mpeg");
    res.set("Cache-Control", "public, max-age=31536000, immutable");
    upstream.body.pipe(res);
  } catch (e) {
    res.status(500).json({ error: "TTS proxy error" });
  }
});

export default router;
