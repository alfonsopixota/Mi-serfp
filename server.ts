import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import { buildGeminiContents, normalizeChatHistory, validateChatMessage } from "./src/lib/chat";
import { errorHandler, validateEnv } from "./src/middleware";

dotenv.config();

const app = express();
const PORT = validateEnv().PORT;

// ============================================================================
// RATE LIMITING
// ============================================================================
const chatRateLimit = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutos
  limit: 30, // máximo 30 solicitudes
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Demasiadas solicitudes. Inténtalo de nuevo en unos minutos.",
  },
});

// ============================================================================
// GOOGLE GENAI INITIALIZATION
// ============================================================================
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
    console.log("✅ SerFP backend: Gemini API client initialized successfully.");
  } else {
    console.warn(
      "⚠️  SerFP backend WARNING: GEMINI_API_KEY not found. AI assistant will run in simulate/fallback mode."
    );
  }
} catch (error) {
  console.error("❌ Error initializing GoogleGenAI client:", error);
}

// ============================================================================
// MIDDLEWARE
// ============================================================================
app.disable("x-powered-by");
app.use(helmet());
app.use(express.json({ limit: "64kb" }));
app.set("trust proxy", 1);

// ============================================================================
// HEALTH CHECK
// ============================================================================
app.get("/healthz", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    aiConfigured: Boolean(process.env.GEMINI_API_KEY),
  });
});

// ============================================================================
// API: CHAT ENDPOINT
// ============================================================================
app.post("/api/chat", chatRateLimit, async (req: Request, res: Response) => {
  try {
    const { message, history } = req.body;

    // Validar mensaje
    const validationError = validateChatMessage(message);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    // Si no hay AI configurado, usar fallback
    if (!ai) {
      console.log("ℹ️  No Gemini API client. Using expert rule-based helper.");
      const reply = generateUnbiasedFallbackResponse(message);
      return res.json({ text: reply, isFallback: true });
    }

    // System instruction para Gemini
    const systemInstruction = getSystemInstruction();

    // Construir contenidos para Gemini
    const contents = buildGeminiContents(normalizeChatHistory(history), message);

    // Llamar a Gemini
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    const replyText =
      response.text ||
      "Lo siento, no he podido procesar tu consulta de orientación en este momento.";
    return res.json({ text: replyText, isFallback: false });
  } catch (error) {
    console.error("❌ Error invoking Gemini on server:", error);
    return res.status(500).json({
      error: "No he podido generar una respuesta ahora mismo. Inténtalo de nuevo en unos segundos.",
      isFallback: true,
    });
  }
});

// ============================================================================
// SYSTEM INSTRUCTION FOR GEMINI
// ============================================================================
function getSystemInstruction(): string {
  return `Eres 'SerFP AI', el orientador neutral e independiente de Formación Profesional (FP) en España.

Tu propósito es dar respuestas transparentes, claras, realistas y libres de humo (sin exagerar salarios, sin promocionar centros privados ni vender falsas expectativas).

Conoces a fondo el sistema educativo español:
- Grados Medios (tras la ESO o mediante prueba de acceso, nivel técnico)
- Grados Superiores (tras Bachillerato o Grado Medio, nivel técnico superior)
- FP Dual (combinación de aula y empresa remunerada/becada)
- Familias profesionales de alta demanda: Informática y Comunicaciones, Sanidad, Administración, Fabricación Mecánica, Electricidad, Comercio, Transporte, Hostelería, Turismo, etc.

Ofrece siempre:
1. Consejos prácticos sobre asignaturas difíciles
2. El paso a la universidad desde FP (convalidaciones, nota de acceso)
3. Nivel de empleabilidad real en cada familia profesional
4. Salarios promedio iniciales en España (aprox. 14.000€-18.000€ brutos para Grado Medio, 18.000€-24.000€ para Grado Superior)
5. Importancia del portfolio, prácticas en empresa y networking
6. Desmitificación: no todos los empleos son de alta demanda, hay competencia real

Sé directo, cercano, realista y muy útil. Si te preguntan algo no relacionado con la FP, redirígelos amablemente a la orientación vocacional o FP.`;
}

// ============================================================================
// FALLBACK RESPONSES (Sin API key)
// ============================================================================
function generateUnbiasedFallbackResponse(message: string): string {
  const m = message.toLowerCase();

  if (
    m.includes("informát") ||
    m.includes("dam") ||
    m.includes("daw") ||
    m.includes("asir") ||
    m.includes("program")
  ) {
    return `Informática y Comunicaciones suele tener buena salida laboral, especialmente si construyes proyectos reales fuera del aula.

Lo que nadie te cuenta:
- Exige bastante autoaprendizaje y dedicación personal
- La oferta es alta, pero también hay mucha competencia
- Un buen portfolio es más importante que la nota
- Salario inicial: 16.000€-20.000€ brutos en Grado Superior
- Oportunidades: startups, consultoras, grandes empresas tech, freelance

¿Hay algún ciclo específico que te interese?`;
  }

  if (
    m.includes("sanid") ||
    m.includes("enfermer") ||
    m.includes("odont") ||
    m.includes("higien")
  ) {
    return `Sanidad suele tener demanda alta y un entorno muy vocacional, pero también implica:
- Turnos, presión y mucha responsabilidad
- Contacto directo con personas en situaciones difíciles
- Necesidad de actualización continua
- Salario inicial: 15.000€-18.000€ brutos en Grado Medio, 18.000€-22.000€ en Grado Superior

Si te atrae el trato con personas o el trabajo técnico desde una perspectiva sanitaria, es una opción sólida.`;
  }

  if (m.includes("dual")) {
    return `La FP Dual combina aula y empresa y puede darte experiencia real antes de acabar el ciclo.

Puntos clave:
- La calidad depende mucho del centro y de la empresa
- Algunas empresas pagan, otras dan beca
- Conviene revisar bien cómo tutorizan y qué proyectos asignan
- Muy valorado por empleadores
- Posibilidad de contrato laboral después

Verifica que la empresa ofrezca proyectos reales, no solo tareas menores.`;
  }

  if (
    m.includes("universidad") ||
    m.includes("carrera") ||
    m.includes("acceder")
  ) {
    return `Desde un Grado Superior puedes acceder a la universidad.

Detalles importantes:
- Para carreras con nota alta puede interesar subir nota por la vía específica
- La cantidad de créditos convalidables varía mucho (a veces solo 30 ECTS de 180)
- Algunos grados superiores abren más puertas que otros
- Costo: tiempo y esfuerzo adicional, pero es viable

Consulta directamente con las universidades de tu zona sobre convalidaciones.`;
  }

  return `Puedo ayudarte a:
- Comparar familias de FP según tus intereses, nota y objetivo laboral
- Entender diferencias entre Grado Medio y Superior
- Evaluar FP Dual vs presencial
- Aclarar dudas sobre empleabilidad y salarios reales
- Orientarte hacia la universidad desde FP si es tu objetivo

Dime si prefieres: oficina, tecnología, trabajo de campo, atención a personas, o algo más específico.`;
}

// ============================================================================
// VITE DEV SERVER / STATIC FILES
// ============================================================================
async function setupViteOrStatic() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("ℹ️  SerFP backend is running with Vite server middleware.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("ℹ️  SerFP backend is running in production mode, serving pre-built assets.");
  }

  // Error handler middleware (al final)
  app.use(errorHandler);

  app.listen(PORT, "0.0.0.0", () => {
    console.log(
      `🚀 SerFP application server listening on http://0.0.0.0:${PORT}`
    );
  });
}

setupViteOrStatic().catch((err) => {
  console.error("❌ Failed to start SerFP server:", err);
  process.exit(1);
});
