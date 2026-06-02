# SerFP - Orientación IA en Formación Profesional 🎓

<div align="center">
<img width="1200" height="475" alt="SerFP Banner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />

**Orientación neutral, independiente y realista sobre Formación Profesional en España**

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![Express](https://img.shields.io/badge/Express-4-green.svg)](https://expressjs.com/)

</div>

---

## 📋 Tabla de Contenidos

- [Descripción](#descripción)
- [Stack Tecnológico](#stack-tecnológico)
- [Características](#características)
- [Instalación](#instalación)
- [Desarrollo](#desarrollo)
- [API Documentation](#api-documentation)
- [Arquitectura](#arquitectura)
- [Tests](#tests)
- [Despliegue](#despliegue)
- [Contribuir](#contribuir)
- [Licencia](#licencia)

---

## 📖 Descripción

**SerFP** es una aplicación web full-stack que proporciona **asesoría neutral e independiente** sobre Formación Profesional (FP) en España.

Utiliza **Google Gemini AI** para ofrecer respuestas transparentes, realistas y libres de sesgos comerciales sobre:

- 🎓 Grados Medios y Superiores
- 💼 FP Dual (aula + empresa)
- 📊 Empleabilidad y salarios reales
- 🎯 Familias profesionales de alta demanda
- 🔄 Acceso a la universidad desde FP
- 📚 Asignaturas difíciles y recursos

### Misión

Eliminar la brecha de información sobre FP: muchos estudiantes no conocen estas opciones o tienen ideas preconcebidas. SerFP da respuestas claras, sin humo, sin vender falsas expectativas.

---

## 🛠️ Stack Tecnológico

### Frontend
- **React 19** - Framework UI moderno
- **Vite** - Build tool ultrarrápido
- **Tailwind CSS** - Diseño responsivo
- **Motion** - Animaciones fluidas
- **Lucide React** - Iconografía

### Backend
- **Express 4** - Servidor HTTP
- **Node.js** - Runtime JavaScript
- **Google Gemini API** - IA conversacional
- **Helmet** - Seguridad (headers HTTP)
- **express-rate-limit** - Protección contra abuse

### Desarrollo
- **TypeScript 5.8** - Type safety
- **tsx** - Ejecución TypeScript nativa
- **ESBuild** - Bundler rápido
- **Node Test Runner** - Tests sin dependencias externas

---

## ✨ Características

✅ **Asistente IA basado en Gemini**
- Respuestas contextuales y personalizadas
- Historial de conversación
- Fallback rule-based si no hay API key

✅ **Seguridad**
- Rate limiting (30 req/10min)
- Validación de input
- Headers de seguridad (Helmet)
- CORS configurado

✅ **Rendimiento**
- Frontend optimizado con Vite
- Compresión automática
- Caching inteligente

✅ **Desarrollo**
- Hot Module Replacement (HMR)
- TypeScript strict mode
- Tests automatizados
- Linting con tsc

---

## 🚀 Instalación

### Requisitos Previos

- **Node.js** 18+ ([descargar](https://nodejs.org/))
- **npm** 9+ (incluido con Node.js)
- **Clave API de Gemini** ([obtener gratis](https://ai.google.dev/))

### Pasos

1. **Clonar repositorio**
   ```bash
   git clone https://github.com/alfonsopixota/Mi-serfp.git
   cd Mi-serfp
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env.local
   ```
   Editar `.env.local` y agregar tu clave de Gemini:
   ```env
   GEMINI_API_KEY=tu_clave_aqui
   PORT=3000
   ```

4. **Iniciar servidor de desarrollo**
   ```bash
   npm run dev
   ```

5. **Abrir en navegador**
   ```
   http://localhost:3000
   ```

---

## 💻 Desarrollo

### Scripts Disponibles

```bash
# Desarrollo con Vite
npm run dev

# Compilar TypeScript
npm run lint

# Watch mode para TypeScript
npm run lint:fix

# Ejecutar tests
npm run test

# Watch mode para tests
npm run test:watch

# Build para producción
npm run build

# Iniciar servidor de producción
npm start

# Limpiar carpeta dist
npm run clean
```

### Estructura del Proyecto

```
Mi-serfp/
├── src/
│   ├── lib/
│   │   └── chat.ts                 # Lógica de validación y chat
│   ├── middleware.ts               # Middlewares y validación env
│   ├── main.tsx                    # Entry point React
│   └── components/                 # Componentes React (en desarrollo)
├── tests/
│   ├── chat.test.ts               # Tests para chat
│   ├── middleware.test.ts          # Tests para middleware
│   └── server.test.ts              # Tests para endpoints
├── server.ts                       # Servidor Express
├── index.html                      # HTML principal
├── vite.config.ts                  # Configuración Vite
├── tsconfig.json                   # Configuración TypeScript
├── package.json                    # Dependencias
└── README.md                       # Este archivo
```

---

## 🔌 API Documentation

### Health Check

**Endpoint:** `GET /healthz`

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-06-02T10:30:00.000Z",
  "aiConfigured": true
}
```

### Chat Endpoint

**Endpoint:** `POST /api/chat`

**Rate Limit:** 30 solicitudes por 10 minutos

**Request Body:**
```json
{
  "message": "¿Qué ciclos de FP son más demandados?",
  "history": [
    {
      "sender": "user",
      "text": "Hola, quiero orientación en FP"
    },
    {
      "sender": "model",
      "text": "¡Claro! Soy SerFP AI, tu orientador neutral..."
    }
  ]
}
```

**Response (Success):**
```json
{
  "text": "Basándome en datos actuales de empleabilidad en España...",
  "isFallback": false
}
```

**Response (Fallback - sin API key):**
```json
{
  "text": "Informática y Comunicaciones suele tener buena salida laboral...",
  "isFallback": true
}
```

**Error Response:**
```json
{
  "error": "El mensaje debe tener al menos 3 caracteres.",
  "timestamp": "2026-06-02T10:30:00.000Z"
}
```

---

## 🏗️ Arquitectura

### Flujo de Solicitud

```
┌─────────────────────────────────────────────────────────────┐
│ Cliente (React)                                             │
│ - Escribe mensaje en chat                                  │
│ - Envía POST /api/chat con history                         │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────────┐
│ Express Server                                              │
│ 1. Rate Limiting (express-rate-limit)                      │
│ 2. Validación de mensaje (validateChatMessage)             │
│ 3. Normalización de historia (normalizeChatHistory)        │
│ 4. Construcción de contenidos (buildGeminiContents)        │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   ▼
      ┌────────────────────────────┐
      │ Gemini API?                │
      └────────────────────────────┘
         Sí          │          No
         │           └─────► Fallback response
         ▼                   (rule-based)
   ┌──────────────┐
   │ Gemini API   │
   │ (generateContent) │
   └──────┬───────┘
          │
          ▼
   ┌──────────────┐
   │ Respuesta IA │
   └──────┬───────┘
          │
          ▼
   ┌──────────────────────────────┐
   │ Response al Cliente           │
   │ { text, isFallback }          │
   └──────────────────────────────┘
```

### Módulos Clave

**`src/lib/chat.ts`**
- `validateChatMessage()` - Valida entrada de usuario
- `normalizeChatHistory()` - Filtra y limita historia
- `buildGeminiContents()` - Construye payload para Gemini

**`src/middleware.ts`**
- `validateEnv()` - Valida variables de entorno
- `errorHandler()` - Middleware de errores global

**`server.ts`**
- `GET /healthz` - Health check
- `POST /api/chat` - Endpoint principal de chat
- `getSystemInstruction()` - Prompt system para Gemini
- `generateUnbiasedFallbackResponse()` - Respuestas sin API key

---

## 🧪 Tests

El proyecto incluye tests exhaustivos para validar funcionalidad:

```bash
# Ejecutar todos los tests
npm test

# Watch mode
npm run test:watch
```

### Cobertura

- ✅ **Validación de chat** - `tests/chat.test.ts`
  - Mensaje válido/inválido
  - Normalizacion de historia
  - Construcción de contenidos

- ✅ **Middleware** - `tests/middleware.test.ts`
  - Validación de environment
  - Error handling

- ✅ **Endpoints** - `tests/server.test.ts`
  - GET /healthz
  - POST /api/chat (con y sin API key)
  - Rate limiting

### Ejemplo de Test

```typescript
import { test } from "node:test";
import assert from "node:assert";
import { validateChatMessage } from "../src/lib/chat";

test("validateChatMessage - válido", () => {
  const result = validateChatMessage("Hola, ¿qué es FP Dual?");
  assert.strictEqual(result, null);
});

test("validateChatMessage - muy corto", () => {
  const result = validateChatMessage("Hi");
  assert.strictEqual(
    result,
    "El mensaje debe tener al menos 3 caracteres."
  );
});
```

---

## 🌐 Despliegue

### Google Cloud Run (Recomendado para AI Studio)

1. **Instalar Google Cloud CLI**
   ```bash
   curl https://sdk.cloud.google.com | bash
   gcloud init
   ```

2. **Crear imagen Docker**
   ```bash
   # En desarrollo, usar Cloud Run con source
   gcloud run deploy serfp \
     --source . \
     --runtime nodejs20 \
     --region europe-west1 \
     --allow-unauthenticated \
     --set-env-vars GEMINI_API_KEY=$GEMINI_API_KEY
   ```

3. **Variables de entorno**
   ```bash
   gcloud run services update serfp \
     --update-env-vars GEMINI_API_KEY=$GEMINI_API_KEY
   ```

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

```bash
# Build
docker build -t serfp .

# Run
docker run -p 3000:3000 -e GEMINI_API_KEY=$GEMINI_API_KEY serfp
```

---

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. **Fork** el repositorio
2. **Crear rama** (`git checkout -b feature/nueva-feature`)
3. **Commit** cambios (`git commit -am 'Add nueva feature'`)
4. **Push** a la rama (`git push origin feature/nueva-feature`)
5. **Abrir Pull Request** con descripción detallada

### Guía de Estilo

- Usar **TypeScript** strict mode
- Seguir **Prettier** (si está configurado)
- Escribir **tests** para nuevas funcionalidades
- Documentar **cambios importantes** en comentarios

---

## 📝 Licencia

MIT - Ver [LICENSE](LICENSE) para detalles.

---

## 👥 Autores

- **Alfonso Pixota** - Creador inicial

---

## 🙏 Agradecimientos

- [Google AI Studio](https://ai.studio) - Plataforma base
- [Gemini API](https://ai.google.dev/) - Motor IA
- [Comunidad de FP en España](https://www.educacionyfp.gob.es/)

---

## 📧 Contacto

- GitHub: [@alfonsopixota](https://github.com/alfonsopixota)
- Issues: [Reportar bug](https://github.com/alfonsopixota/Mi-serfp/issues)

---

**Última actualización:** 2 de junio de 2026  
**Versión:** 0.1.0
