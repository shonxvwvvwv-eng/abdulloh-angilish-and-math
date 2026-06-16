import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Lazy initialize Gemini client to avoid crashes if GEMINI_API_KEY is not defined yet
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn("WARNING: GEMINI_API_KEY is not configured in environment variables.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key || "MOCK_KEY_FALLBACK",
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// Secure Gemini proxy API endpoint
app.post("/api/gemini/generate", async (req, res) => {
  try {
    const { prompt, grade, history } = req.body;
    
    // Check if key is available. If not, use local smart fallback simulator to keep app fully interactive
    if (!process.env.GEMINI_API_KEY) {
      // Simulate tutor answers so developer or preview user still has a 100% functional chatbot with helpful Uzbekistan content!
      let simulatedReply = `Salom, aziz o'quvchim! 😊 Hozircha tizimimizda AI kaliti sozlanmagan, lekin men sizga yordam berishga doim tayyorman.\n\n`;
      const p = (prompt || "").toLowerCase();
      
      if (p.includes("zamon") || p.includes("tense") || p.includes("present") || p.includes("past") || p.includes("future")) {
        simulatedReply += `Ingliz tilida jami **12 ta asosiy zamon** bor. Boshlang'ichlari:\n` +
          `1. **Present Simple** (Hozirgi oddiy) - Har kuni bajariladigan ishlar. Formula: \`Subject + V1 (s/es)\`. Misol: *I learn English every day.*\n` +
          `2. **Present Continuous** (Hozirgi davmoli) - Ayni paytda bo'layotgan ishlar. Formula: \`Subject + am/is/are + V-ing\`. Misol: *We are learning English now.*\n` +
          `3. **Present Perfect** (Hozirgi tugallangan) - Bajarilgan va natijasi bor ishlar. Formula: \`Subject + have/has + V3\`. Misol: *I have finished my homework.*\n\n` +
          `Siz ${grade}-sinfdasiz, darslarimiz bo'limida barcha zamonlar formulalari batafsil keltirilgan! Qaysi birini chuqurroq tushuntirib beray?`;
      } else if (p.includes("formula") || p.includes("math") || p.includes("matem") || p.includes("tenglama") || p.includes("kasr")) {
        simulatedReply += `Matematika - bu nafis fan! ${grade}-sinf o'quvchisi sifatida siz darsligimizda quyidagi ajoyib qoidalarni o'rganishingiz mumkin:\n` +
          `- **Oddiy tenglamalar:** Noma'lum x ni tarozi pallasidek topamiz. Masalan: \`2x = 10\` bo'lsa, x ni topish uchun 10 ni 2 ga bo'lamiz: \`x = 5\`.\n` +
          `- **Kasrlar:** Bir butunning bo'laklari (Surat va Maxraj). Masalan: 1/4 (to'rtdan bir).\n\nQaysi matematik misolni birgalikda yechamiz, zukko talabam?`;
      } else {
        simulatedReply += `Zukko talabam! Menga matematika qoidalari yoki ingliz tili grammatikasi haqida xohlagan savolingizni bering. Siz ${grade}-sinfdasiz, keling o'zlashtirishni yanada yuqori darajaga olib chiqamiz! 🔥`;
      }
      return res.json({ text: simulatedReply });
    }

    const ai = getAiClient();
    
    // System instruction for perfect tutor behavior in Uzbek language
    const systemInstruction = `Siz o'zbek maktablarining 1-11 sinf o'quvchilari uchun mo'ljallangan matematika va ingliz tili bo'yicha shaxsiy, o'ta quvnoq va mehribon AI o'qituvchisiz.
Muloqotni mutlaqo chiroyli, tushunarli o'zbek tilida olib boring. Bolalar oson o'rganishi uchun emoji 😇, 🌟 va rasm belgilardan foydalaning.
Talaba hozirda ${grade}-sinf o'quv chisidir, uning yoshiga va darajasiga muvofiq, oson tarzda javob bering.
Ingliz tili zamonlari haqida so'rashsa, yoki formula topshiriqlari so'ralganda batafsil dars o'ting, formulalarini, qoidalarni va qiziqarli mashq misollarini taqdim eting.
Doim do'stona bo'ling, bolalarni ruhlantiruvchi so'zlar (Barakalla, Aqllivoy, Zukko o'quvchi, Katta qadamlar) bilan qo'llab-quvvatlang!`;

    // Map history to Google GenAI sdk content format
    const contents = [];
    if (history && Array.isArray(history)) {
      for (const h of history) {
        if (h.text && h.role) {
          contents.push({
            role: h.role,
            parts: [{ text: h.text }]
          });
        }
      }
    }
    
    // Append current prompt
    contents.push({
      role: "user",
      parts: [{ text: prompt }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini proxy endpoint error:", error);
    res.status(500).json({ error: "Xatolik yuz berdi: " + error.message });
  }
});

// Vite middleware flow for development & static serving for production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Development fullstack server actively running on port ${PORT}`);
  });
}

startServer();
