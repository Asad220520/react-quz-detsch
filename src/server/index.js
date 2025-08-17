// server/index.js
import express from "express";
import ttsRoute from "./ttsRoute.js";

const app = express();
app.use(express.json({ limit: "1mb" }));
app.use("/api", ttsRoute);

// …дальше ваш статик, SSR и т.д.
app.listen(process.env.PORT || 3000);
