import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { buildGeminiContents, normalizeChatHistory } from "./src/lib/chat";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const CHAT_RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const CHAT_RATE_LIMIT_MAX_REQUESTS = 30;
const chatRequestLog = new Map<string, number[]>();

// Initialize Google GenAI client if key is available
let ai: GoogleGenAI | null = null;
try {
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
    console.log("SerFP backend: Gemini API client initialized successfully.");
  } else {
    console.warn("SerFP backend WARNING: GEMINI_API_KEY not found. AI assistant will run in simulate/fallback mode.");
  }
} catch (error) {
  console.error("Error initializing GoogleGenAI client:", error);
}

app.use(express.json({ limit: "64kb" }));
app.set("trust proxy", 1);

// API: Handle Chat with SerFP AI Orientador
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;

    const clientKey = req.ip || req.socket.remoteAddress || "unknown";
    const now = Date.now();
    const recentRequests = (chatRequestLog.get(clientKey) || []).filter(
      (timestamp) => now - timestamp < CHAT_RATE_LIMIT_WINDOW_MS,
    );

    if (recentRequests.length >= CHAT_RATE_LIMIT_MAX_REQUESTS) {
      chatRequestLog.set(clientKey, recentRequests);
      return res.status(429).json({
        error: "Demasiadas solicitudes. Inténtalo de nuevo en unos minutos.",
      });
    }

    recentRequests.push(now);
    chatRequestLog.set(clientKey, recentRequests);

    if (typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ error: "El mensaje es obligatorio" });
    }

    if (!ai) {
      // Fallback response generator if GEMINI_API_KEY is not defined
      console.log("No Gemini API client. Using expert rule-based helper.");
      const reply = generateUnbiasedFallbackResponse(message);
      return res.json({ text: reply, isFallback: true });
    }

    // Prepare system instructions for realistic, zero-hype, professional FP advice in Spain.
    const systemInstruction =
      "Eres 'SerFP AI', el orientador neutral e independiente de Formación Profesional (FP) en España. " +
      "Tu propósito es dar respuestas transparentes, claras, realistas y libres de humo (sin exagerar salarios, sin promocionar centros privados ni vender falsas expectativas). " +
      "Conoces a fondo el sistema educativo español: " +
      "- Grados Medios (tras la ESO o mediante prueba de acceso, nivel técnico) " +
      "- Grados Superiores (tras Bachillerato o Grado Medio, nivel técnico superior) " +
      "- FP Dual (combinación de aula y empresa remunerada/becada) " +
      "- Familias profesionales de alta demanda (Informática y Comunicaciones, Sanidad, Administración, Fabricación Mecánica, Electricidad, Comercio, etc.). " +
      "Ofrece siempre consejos prácticos sobre asignaturas difíciles, el paso a la universidad, nivel de empleabilidad real y salarios promedio iniciales en España (aprox. 14.000€-18.000€ brutos anuales para principiantes, escalando según experiencia). " +
      "Sé directo, cercano, realista y muy útil. Si te preguntan algo no relacionado con la FP, redirígelos amablemente a la orientación vocacional o FP.";

    const contents = buildGeminiContents(normalizeChatHistory(history), message);

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    const replyText = response.text || "Lo siento, no he podido procesar tu consulta de orientación en este momento.";
    return res.json({ text: replyText, isFallback: false });
  } catch (error: any) {
    console.error("Error invoking Gemini on server:", error);
    return res.status(502).json({
      text: "No he podido generar una respuesta ahora mismo. Inténtalo de nuevo en unos segundos.",
      isFallback: true,
    });
  }
});

// Fallback logic when Gemini key is not configured
function generateUnbiasedFallbackResponse(message: string): string {
  const m = message.toLowerCase();
  if (m.includes("informát") || m.includes("dam") || m.includes("daw") || m.includes("asir") || m.includes("program")) {
    return "Informática y Comunicaciones suele tener buena salida laboral, especialmente si construyes proyectos reales fuera del aula. Lo que nadie te cuenta: exige bastante autoaprendizaje y tolerancia a la frustración. ¿Te interesa más desarrollo web, aplicaciones, datos o redes?";
  }
  if (m.includes("sanid") || m.includes("enfermer") || m.includes("odont") || m.includes("higien")) {
    return "Sanidad suele tener demanda alta y un entorno muy vocacional, pero también implica turnos, presión y mucha responsabilidad. Si te atrae el trato con personas o el trabajo técnico de laboratorio, puede encajar bien. ¿Te interesa más atención directa o laboratorio?";
  }
  if (m.includes("dual")) {
    return "La FP Dual combina aula y empresa y puede darte experiencia real antes de acabar el ciclo. La calidad depende mucho del centro y de la empresa: conviene revisar bien cómo tutorizan y qué tareas hacen realmente los alumnos.";
  }
  if (m.includes("universidad") || m.includes("carrera") || m.includes("acceder")) {
    return "Desde un Grado Superior puedes acceder a la universidad, aunque para carreras con nota alta puede interesar subir nota por la vía específica. La cantidad de créditos convalidables depende de la universidad y del grado, así que conviene revisarlo caso por caso.";
  }
  return "Puedo ayudarte a comparar familias de FP según tus intereses, tu nota y tu objetivo laboral. Dime si prefieres oficina, tecnología, trabajo de campo o atención a personas, y te orientaré con una recomendación práctica.";
}

// Setup Vite Dev Server / Static files
async function setupViteOrStatic() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("SerFP backend is running with Vite server middleware.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("SerFP backend is running in production mode, serving pre-built assets.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`SerFP application server listening on host 0.0.0.0, port ${PORT}`);
  });
}

setupViteOrStatic().catch((err) => {
  console.error("Failed to start SerFP server:", err);
});
