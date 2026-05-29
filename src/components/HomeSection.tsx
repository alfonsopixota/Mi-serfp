import { useState } from "react";
import { Compass, ShieldAlert, BadgeCheck, GraduationCap, ChevronRight, RefreshCw, MessageCircle, Heart, Flame, TrendingUp } from "lucide-react";
import { FpCycle } from "../types";

interface HomeSectionProps {
  cycles: FpCycle[];
  onSelectCycle: (code: string) => void;
  onAskAI: (initialPrompt?: string) => void;
}

export default function HomeSection({ cycles, onSelectCycle, onAskAI }: HomeSectionProps) {
  // Quiz states
  const [quizStep, setQuizStep] = useState<0 | 1 | 2>(0);
  const [selectedInterest, setSelectedInterest] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [quizResult, setQuizResult] = useState<string | null>(null);

  // Myth carousel state
  const [activeMythIndex, setActiveMythIndex] = useState(0);

  const mythsList = [
    {
      myth: "La FP es para los estudiantes rezagados que no consiguen nota para la selectividad.",
      reality: "Hoy día, grados como DAM o Sanidad atraen a universitarios titulados y graduados de bachillerato con notas excelentes que buscan empleabilidad práctica inmediata. Su tasa de empleo supera al 60% de las carreras universitarias."
    },
    {
      myth: "Conseguirás un empleo remoto cobrando 3.000€ netos nada más terminar tus prácticas.",
      reality: "Al acabar, las consultoras tecnológicas o clínicas te ofrecerán entre 14k-18k€ anuales brutos. El éxito y los salarios altos llegan, pero requieren esfuerzo de formación autodidacta y 2-4 años de especialización real en la trinchera corporativa."
    },
    {
      myth: "Los folletos de los centros privados te prometen insertarte en multinacionales de inmediato.",
      reality: "Ciertos centros facturan miles de euros por alumno pero subcontratan prácticas mediocres en gestorías de barrio de baja formación. Investiga los convenios consolidados y desconfía del marketing agresivo."
    }
  ];

  const handleQuizSelection = (interest: string) => {
    setSelectedInterest(interest);
    setQuizStep(1);
  };

  const handleLevelSelection = (level: string) => {
    setSelectedLevel(level);
    calculateQuizResult(selectedInterest!, level);
    setQuizStep(2);
  };

  const calculateQuizResult = (interest: string, level: string) => {
    const isSuperior = level === "superior";
    let matchCode = "";

    if (interest === "tech") {
      matchCode = isSuperior ? "DAW" : "ASIR"; // fallback
    } else if (interest === "health") {
      matchCode = isSuperior ? "HBUCO" : "CAE";
    } else if (interest === "business") {
      matchCode = "ADFI";
    } else if (interest === "energy") {
      matchCode = "RENOV";
    }

    setQuizResult(matchCode);
  };

  const resetQuiz = () => {
    setQuizStep(0);
    setSelectedInterest(null);
    setSelectedLevel(null);
    setQuizResult(null);
  };

  // Find the selected cycle object
  const matchedCycle = cycles.find(c => c.code === quizResult);

  return (
    <div className="space-y-12 py-6 fade-in-up">
      {/* Dynamic Trust Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-950 p-6 md:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-300 border border-blue-500/20">
            <Flame className="h-3 w-3 fill-current animate-pulse text-amber-400" />
            <span>Orientación 100% Independiente</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
            La comunidad de FP española <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">que te cuenta la verdad</span> sin rodeos.
          </h1>
          <p className="text-sm md:text-base text-slate-300 max-w-lg leading-relaxed">
            Aquí no vendemos matrículas de academias privadas. Te explicamos los pros, los contras, los sueldos reales y los mitos de la Formación Profesional para que no cometas errores costosos.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => onAskAI("¿Qué FP tiene más salidas reales en informática y sanidad actualmente?")}
              className="rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-blue-500 transition shadow-sm"
              id="hero-ai-chat-btn"
            >
              Consultar Orientador Inteligente
            </button>
            <button
              onClick={() => {
                const quizSection = document.getElementById("pathfinder-quiz");
                if (quizSection) quizSection.scrollIntoView({ behavior: "smooth" });
              }}
              className="rounded-xl bg-white/10 px-4 py-2.5 text-xs font-bold text-white hover:bg-white/20 transition border border-white/10"
              id="hero-quiz-btn"
            >
              Test de Orientación Rápido
            </button>
          </div>
        </div>
      </div>

      {/* Trust Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5" id="trust-metrics">
        <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm flex gap-4 items-center">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <BadgeCheck className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">0% Enlaces de Afiliación</h3>
            <p className="text-xs text-slate-500">Neutralidad absoluta. No ganamos comisión de ningún centro de formación.</p>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm flex gap-4 items-center">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <Compass className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Testimonios Verificados</h3>
            <p className="text-xs text-slate-500">Opiniones descarnadas de alumnos reales contándote lo que los PDFs de folletos omiten.</p>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm flex gap-4 items-center">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Salarios Reales Transparentes</h3>
            <p className="text-xs text-slate-500">Datos contrastados del mercado laboral de España para evitar expectativas falsas.</p>
          </div>
        </div>
      </div>

      {/* Main Container - Quiz & Popular Paths */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Pathfinder Quiz Section */}
        <div 
          className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6"
          id="pathfinder-quiz"
        >
          <div className="space-y-1.5 border-b border-slate-100 pb-4">
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">¿No sabes qué grado elegir?</span>
            <h2 className="text-xl font-extrabold text-slate-900">Orientador Express</h2>
            <p className="text-xs text-slate-500">Encuentra el ciclo ideal según tus gustos e inclinaciones en apenas 2 clics.</p>
          </div>

          {quizStep === 0 && (
            <div className="space-y-4">
              <span className="text-sm font-bold text-slate-700 block">Paso 1: ¿Qué tipo de áreas de trabajo te atraen más?</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" id="quiz-options-interests">
                <button
                  onClick={() => handleQuizSelection("tech")}
                  className="flex flex-col items-start p-4 text-left border border-slate-200 rounded-xl hover:border-blue-600 hover:bg-blue-50/20 transition group"
                >
                  <span className="font-bold text-sm text-slate-900 group-hover:text-blue-600">Tecnología y Código</span>
                  <span className="text-xs text-slate-500 mt-1">Crear aplicaciones, páginas web, gestionar bases de datos y resolver lógica digital.</span>
                </button>
                <button
                  onClick={() => handleQuizSelection("health")}
                  className="flex flex-col items-start p-4 text-left border border-slate-200 rounded-xl hover:border-blue-600 hover:bg-blue-50/20 transition group"
                >
                  <span className="font-bold text-sm text-slate-900 group-hover:text-blue-600">Sanidad y Cuidado</span>
                  <span className="text-xs text-slate-500 mt-1">Interacción humana de ayuda directa, laboratorios clínicos y salud dental asistencial.</span>
                </button>
                <button
                  onClick={() => handleQuizSelection("business")}
                  className="flex flex-col items-start p-4 text-left border border-slate-200 rounded-xl hover:border-blue-600 hover:bg-blue-50/20 transition group"
                >
                  <span className="font-bold text-sm text-slate-900 group-hover:text-blue-600">Gestión y Administración</span>
                  <span className="text-xs text-slate-500 mt-1">Organización de despachos, control contable, nóminas, facturación y gestorías corporativas.</span>
                </button>
                <button
                  onClick={() => handleQuizSelection("energy")}
                  className="flex flex-col items-start p-4 text-left border border-slate-200 rounded-xl hover:border-blue-600 hover:bg-blue-50/20 transition group"
                >
                  <span className="font-bold text-sm text-slate-900 group-hover:text-blue-600">Técnico Exterior y Energías</span>
                  <span className="text-xs text-slate-500 mt-1">Montaje físico de ingeniería sostenible, paneles solares, mantenimiento exterior.</span>
                </button>
              </div>
            </div>
          )}

          {quizStep === 1 && (
            <div className="space-y-4">
              <span className="text-sm font-bold text-slate-700 block">Paso 2: ¿A qué nivel de estudios quieres acceder?</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="quiz-options-level">
                <button
                  onClick={() => handleLevelSelection("medio")}
                  className="flex flex-col items-start p-4 text-left border border-slate-200 rounded-xl hover:border-blue-600 hover:bg-blue-50/20 transition group"
                >
                  <span className="font-bold text-sm text-slate-900 group-hover:text-blue-600">Grado Medio</span>
                  <span className="text-xs text-slate-500 mt-1">Requiere graduado en ESO. Ideal para una rápida incorporación directa al mercado.</span>
                </button>
                <button
                  onClick={() => handleLevelSelection("superior")}
                  className="flex flex-col items-start p-4 text-left border border-slate-200 rounded-xl hover:border-blue-600 hover:bg-blue-50/20 transition group"
                >
                  <span className="font-bold text-sm text-slate-900 group-hover:text-blue-600">Grado Superior</span>
                  <span className="text-xs text-slate-500 mt-1">Requiere Bachillerato o un Grado Medio anterior. Abre las puertas a puestos de responsabilidad o Universidad.</span>
                </button>
              </div>
              <button
                onClick={() => setQuizStep(0)}
                className="text-xs font-bold text-slate-500 hover:text-slate-900 transition mt-2 display-block"
              >
                ← Volver al paso anterior
              </button>
            </div>
          )}

          {quizStep === 2 && matchedCycle && (
            <div className="space-y-5">
              <div className="rounded-xl bg-blue-50/80 p-5 border border-blue-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <span className="rounded bg-blue-100 px-2.5 py-1 text-[10px] font-extrabold text-blue-700 uppercase tracking-widest block w-fit mb-2">
                    Tu Opción Recomendada
                  </span>
                  <h3 className="font-bold text-lg text-slate-900">{matchedCycle.code} - {matchedCycle.name}</h3>
                  <p className="text-xs text-slate-500 mt-1">{matchedCycle.familyName} • {matchedCycle.level}</p>
                </div>
                <button
                  onClick={() => onSelectCycle(matchedCycle.code)}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-extrabold text-white hover:bg-blue-700 transition"
                >
                  Ver Ficha Completa
                </button>
              </div>

              {/* Truth snippet */}
              <div className="bg-amber-50 border border-amber-200/70 p-4 rounded-xl space-y-2">
                <div className="flex items-center gap-1 text-amber-800">
                  <ShieldAlert className="h-4 w-4" />
                  <span className="text-xs font-bold">La Verdad en este ciclo</span>
                </div>
                <p className="text-xs text-amber-900 leading-relaxed font-medium">
                  "{matchedCycle.myths[0].reality}"
                </p>
              </div>

              {/* Comparative Stats preview */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-slate-50 rounded-lg p-3 text-center border border-slate-200/60">
                  <span className="text-[10px] font-bold text-slate-500 block">Empleabilidad</span>
                  <span className="text-base font-extrabold text-emerald-600">{matchedCycle.employabilityRate}%</span>
                </div>
                <div className="bg-slate-50 rounded-lg p-3 text-center border border-slate-200/60">
                  <span className="text-[10px] font-bold text-slate-500 block font-mono">Sueldo Inicial</span>
                  <span className="text-base font-extrabold text-slate-800">~{(matchedCycle.avgStartingSalary / 12).toFixed(0)}€/m</span>
                </div>
                <div className="bg-slate-50 rounded-lg p-3 text-center border border-slate-200/60">
                  <span className="text-[10px] font-bold text-slate-500 block font-mono">Dificultad</span>
                  <span className="text-base font-extrabold text-amber-600">{matchedCycle.difficultyScore}/10</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  onClick={resetQuiz}
                  className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 transition"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  Volver a Empezar
                </button>
                <button
                  onClick={() => onAskAI(`Dime consejos honestos sobre cómo matricularse y aprobar el ciclo ${matchedCycle.code}`)}
                  className="text-xs font-bold text-slate-500 hover:text-slate-900 transition"
                >
                  Preguntar a la IA sobre {matchedCycle.code} →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right: Myths vs Reality Card Spot */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between h-full min-h-[380px]">
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div className="flex items-center gap-1.5 text-slate-800">
                <ShieldAlert className="h-4 w-4 text-rose-500" />
                <span className="text-sm font-extrabold text-slate-950">Mitos vs Realidad</span>
              </div>
              <span className="text-[10px] font-mono font-semibold text-slate-400">
                Respuesta Neutral
              </span>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">Lo que te dicen las academias:</span>
                <p className="text-xs font-bold text-rose-700 bg-rose-50/80 p-3 rounded-lg border border-rose-100/50 leading-relaxed italic">
                  "{mythsList[activeMythIndex].myth}"
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-extrabold text-emerald-600 uppercase tracking-widest block">La verdad sin humo:</span>
                <p className="text-xs font-medium text-slate-700 bg-emerald-50/50 p-3 rounded-lg border border-emerald-100/50 leading-relaxed">
                  {mythsList[activeMythIndex].reality}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-6">
            <div className="flex gap-1">
              {mythsList.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveMythIndex(i)}
                  className={`h-1.5 w-6 rounded-full transition-colors ${
                    i === activeMythIndex ? "bg-slate-900" : "bg-slate-200"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setActiveMythIndex((prev) => (prev + 1) % mythsList.length)}
              className="flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-slate-900 transition"
            >
              Siguiente Mito
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Popular Path Cards Grid */}
      <div className="space-y-5">
        <div className="flex justify-between items-end">
          <div>
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">Fichas técnicas y honestas</span>
            <h2 className="text-xl font-extrabold text-slate-950">Ciclos de FP Destacados</h2>
          </div>
          <span className="text-xs text-slate-500">Haz clic para explorar más</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" id="popular-cycles-list">
          {cycles.filter(c => c.isPopular).map((cycle) => (
            <div
              key={cycle.id}
              onClick={() => onSelectCycle(cycle.code)}
              className="rounded-xl border border-slate-200/80 bg-white p-5 cursor-pointer shadow-sm hover:shadow-md hover:border-slate-300 transition flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <span className="rounded bg-slate-100 px-2.5 py-1 text-[10px] font-extrabold text-slate-700 uppercase tracking-wider">
                    {cycle.code}
                  </span>
                  <div className="flex items-center gap-1 text-emerald-600">
                    <TrendingUp className="h-3 text-emerald-500" />
                    <span className="text-xs font-extrabold font-mono">{cycle.employabilityRate}% empleab.</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-sm text-slate-950 group-hover:text-blue-600 transition truncate-fit-width">
                    {cycle.name}
                  </h3>
                  <p className="text-xs text-slate-500 truncate-fit-width mt-1">
                    {cycle.familyName} • {cycle.level}
                  </p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {cycle.description}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 pt-3 mt-4">
                <span className="text-xs text-slate-500 font-medium">Starting: <span className="font-bold text-slate-800 font-mono">~{(cycle.avgStartingSalary / 12).toFixed(0)}€/mes</span></span>
                <span className="text-xs font-bold text-blue-600 group-hover:translate-x-0.5 transition flex items-center gap-0.5">
                  Ver Ficha
                  <ChevronRight className="h-3 w-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
