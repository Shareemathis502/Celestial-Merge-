import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/daily-horoscope", async (req, res) => {
    try {
      const { sign } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
        return res.status(401).json({ error: "Missing or invalid GEMINI_API_KEY" });
      }

      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `You are an expert astrologer. Provide a daily horoscope for ${sign}.
Return a valid RAW JSON string (no markdown, pure JSON) with these exact keys:
"fortune" (integer 0-100)
"love" (integer 0-100)
"career" (integer 0-100)
"element" (string, e.g. "Fire")
"compatible" (array of 2 strings)
"incompatible" (array of 2 strings)
"do" (short string under 4 words)
"dont" (short string under 4 words)
"moonPhase" (e.g. "Waxing Crescent")
"horoscope" (1 paragraph)
"planetaryPositions" (array of exactly 3 objects, each with "planet", "sign", and "details" (1 sentence))
`,
      });

      const text = response.text || "{}";
      const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
      res.json(JSON.parse(cleanedText));
    } catch (error: any) {
      if (error.status === 400 || error.status === 401 || (error.message && error.message.includes('API key not valid'))) {
        return res.status(401).json({ error: "Invalid API key" });
      }
      console.warn("API Error:", error.message || error);
      res.status(500).json({ error: error.message || "Failed to generate horoscope" });
    }
  });

  app.post("/api/birth-chart", async (req, res) => {
    try {
      const { name, date, time, location } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
        return res.status(401).json({ error: "Missing or invalid GEMINI_API_KEY" });
      }

      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `You are an expert astrologer. Calculate (or estimate based on general constraints) the birth chart for ${name} born on ${date} at ${time} in ${location}.
Return a valid RAW JSON string (no markdown, pure JSON) with these exact keys:
"sunSign" (string)
"moonSign" (string)
"risingSign" (string)
"rulingPlanet" (string)
"analysis" (2-3 paragraphs of deep chart analysis)
"elements" (object with integer percentages for "fire", "earth", "air", "water" summing to 100)
`,
      });

      const text = response.text || "{}";
      const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
      res.json(JSON.parse(cleanedText));
    } catch (error: any) {
      if (error.status === 400 || error.status === 401 || (error.message && error.message.includes('API key not valid'))) {
        return res.status(401).json({ error: "Invalid API key" });
      }
      console.warn("API Error:", error.message || error);
      res.status(500).json({ error: error.message || "Failed to calculate birth chart" });
    }
  });

  app.post("/api/moon-calendar", async (req, res) => {
    try {
      const { month, year } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
        return res.status(401).json({ error: "Missing or invalid GEMINI_API_KEY" });
      }

      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `You are an expert astrologer. Provide the 4 major moon phases (New Moon, First Quarter, Full Moon, Last Quarter) for the month of ${month} ${year}.
Return a valid RAW JSON array (no markdown, pure JSON array of objects) with these exact keys for each object:
"date" (string, e.g. "June 7, 2026")
"phase" (string, exact phase name)
"zodiacSign" (string, which sign the moon is in)
"significance" (2-3 sentences explaining the astrological meaning of this specific lunation)
`,
      });

      const text = response.text || "[]";
      const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
      res.json(JSON.parse(cleanedText));
    } catch (error: any) {
      if (error.status === 400 || error.status === 401 || (error.message && error.message.includes('API key not valid'))) {
        return res.status(401).json({ error: "Invalid API key" });
      }
      console.warn("API Error:", error.message || error);
      res.status(500).json({ error: error.message || "Failed to generate moon calendar" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
