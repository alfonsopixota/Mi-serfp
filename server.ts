import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

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

// API: Handle Chat with SerFP AI Orientador
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;

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

    // Convert history to API structures
    const contents: any[] = [];
    if (Array.isArray(history)) {
      history.slice(-20).forEach((turn: any) => {
        if (!turn || typeof turn.text !== "string" || !turn.text.trim()) {
          return;
        }

        contents.push({
          role: turn.sender === "user" ? "user" : "model",
          parts: [{ text: turn.text }],
        });
      });
    }

    // Append current user message
    contents.push({
      role: "user",
      parts: [{ text: message }],
    });

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
    return "La familia de Informática y Comunicaciones (especialmente DAM, DAW y ASIR) tiene casi un 90% de empleabilidad. Lo que nadie te cuenta: Requiere muchas horas de autoaprendizaje fuera de clases y tolerancia a la frustración con el código. Las empresas valoran más tu portafolio de proyectos reales que el título en sí. ¿Te interesa el desarrollo web, las aplicaciones o las redes e infraestructura?";
  }
  if (m.includes("sanid") || m.includes("enfermer") || m.includes("odont") || m.includes("higien")) {
    return "Sanidad es la familia con mayor número de contratos anuales. Grados como Cuidados Auxiliares de Enfermería (TCAE) y Laboratorio Clínico tienen alta demanda inmediata. Lo que nadie te cuenta: Son sectores con alta rotación horaria, turnos cambiantes, gran carga emocional y a veces salarios iniciales ajustados al convenio básico. ¿Te gustaría trabajar de cara al paciente directo o en laboratorio?";
  }
  if (m.includes("dual")) {
    return "La FP Dual es una modalidad donde pasas alrededor del 33% al 50% de las horas formativas trabajando directamente en una empresa colaboradora, recibiendo una beca o contrato de formación. Es genial para ganar experiencia real. Lo que nadie te cuenta: Depende mucho de la calidad de tutorización de la empresa. Algunas te ponen a hacer tareas mecánicas y otras te forman de verdad. Elige centros públicos con buen convenio histórico.";
  }
  if (m.includes("universidad") || m.includes("carrera") || m.includes("acceder")) {
    return "Sí, desde cualquier Grado Superior puedes acceder directamente a la Universidad sin hacer la selectividad (EBAU) general. Tu nota media del ciclo cuenta como nota de acceso. Si necesitas subir nota para carreras competitivas (como Ingeniería o Medicina), puedes presentarte a la parte específica de la selectividad. Además, muchas universidades te convalidan hasta 36 o 48 créditos si la carrera está relacionada con tu ciclo.";
  }
  return "¡Hola! Como orientador neutral de SerFP, estoy listo para guiarte sin rodeos comerciales. Cuéntame: ¿prefieres trabajos de oficina (Administración, Tecnología), trabajos activos/de campo (Electricidad, Automoción) o atención a personas (Sanidad, Educación Infantil)? Describe tu situación actual (edad, estudios previos) y te guiaré con transparencia.";
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
