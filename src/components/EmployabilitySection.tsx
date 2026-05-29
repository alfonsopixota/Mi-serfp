import { useState } from "react";
import { TrendingUp, ShieldCheck, HeartPulse, UserCheck, Flame, Laptop, Calculator, Euro, HelpCircle } from "lucide-react";
import { FAMILIES_WITH_MEDIAN_DATA } from "../data";

export default function EmployabilitySection() {
  // Calculator states
  const [centerType, setCenterType] = useState<"public" | "private">("public");
  const [customCost, setCustomCost] = useState(0); // Aranceles adicionales
  const [monthlyHousing, setMonthlyHousing] = useState(0); // Alquiler si estudia fuera
  const [expectedMonthlySalary, setExpectedMonthlySalary] = useState(1350); // Net salary initial

  // Calculated values
  const totalEducationCost = (centerType === "public" ? 100 : 4500) + customCost + (monthlyHousing * 18); // 18 meses lectivos aprox.
  // Months to recover
  const surplusPerMonth = expectedMonthlySalary - 1000; // Assuming 1000€ is baseline survival/living cost
  const breakEvenMonths = surplusPerMonth > 0 ? (totalEducationCost / surplusPerMonth).toFixed(1) : "Infinito (ajusta tu salario o reduce gastos)";

  const [activeFamilyIndex, setActiveFamilyIndex] = useState<number>(0);

  const selectedFamilyData = FAMILIES_WITH_MEDIAN_DATA[activeFamilyIndex];

  return (
    <div className="space-y-10 py-6 fade-in-up">
      {/* Intro section */}
      <div>
        <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">Inserción Laboral contrastada</span>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">Mercado Laboral y Empleabilidad</h1>
        <p className="text-xs text-slate-500">¿Qué sectores contratan de verdad en España? Analizamos las estadísticas sin adornos de academias.</p>
      </div>

      {/* Modern Dashboard Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Custom SVG bar charts for Careers / Professional families */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm">Familias Profesionales en España</h3>
              <p className="text-xs text-slate-500">Haz clic en una familia para ver su análisis de empleabilidad real.</p>
            </div>
            <span className="text-[11px] font-mono text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">Datos oficiales SEPE</span>
          </div>

          {/* Interactive Stacked bars */}
          <div className="space-y-3.5" id="employability-barchart">
            {FAMILIES_WITH_MEDIAN_DATA.map((fam, idx) => (
              <div
                key={fam.name}
                onClick={() => setActiveFamilyIndex(idx)}
                className={`p-3.5 rounded-xl border transition cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  activeFamilyIndex === idx
                    ? "border-blue-500 bg-blue-50/20 shadow-sm"
                    : "border-slate-100 bg-slate-50/50 hover:bg-slate-100/50"
                }`}
              >
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                    <span className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: fam.color }} />
                      {fam.name}
                    </span>
                    <span className="font-mono">{fam.empleabilidad}% Empleo</span>
                  </div>
                  {/* Progress Bar background */}
                  <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        backgroundColor: fam.color,
                        width: `${fam.empleabilidad}%`
                      }}
                    />
                  </div>
                </div>

                <div className="sm:text-right shrink-0">
                  <span className="text-[10px] font-bold text-slate-400 block font-mono">Sueldo Inicial Promedio</span>
                  <span className="text-xs font-bold font-mono text-slate-800">~{fam.sueldoMedio}€ bruto/año</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Tab Component showing deep neutral comments on active sector */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block font-mono">Vista Sectorial</span>
              <h3 className="font-extrabold text-slate-900 text-base">{selectedFamilyData.name}</h3>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/50">
                <span className="text-[10px] text-slate-500 font-bold block">Tasa de Contratación</span>
                <span className="text-xl font-extrabold text-slate-900 font-mono">{selectedFamilyData.empleabilidad}%</span>
                <span className="text-[9px] text-emerald-600 block font-bold">Muy Alta demanda</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/50">
                <span className="text-[10px] text-slate-500 font-bold block">Sueldo Promedio</span>
                <span className="text-xl font-extrabold text-slate-900 font-mono">~{(selectedFamilyData.sueldoMedio / 12).toFixed(0)}€/m</span>
                <span className="text-[9px] text-slate-500 block font-medium">12 pagas ordinarias</span>
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-800 block">Análisis real del sector en España:</span>
              <ul className="text-xs text-slate-600 space-y-2 leading-relaxed font-semibold">
                {selectedFamilyData.name === "Informática y Comunicaciones" && (
                  <>
                    <li className="flex gap-2 items-start text-indigo-950">
                      <span className="text-blue-600 shrink-0">•</span>
                      <span>Hiring salvaje en consultoras tecnológicas de Madrid, Valencia y Barcelona.</span>
                    </li>
                    <li className="flex gap-2 items-start text-indigo-950">
                      <span className="text-blue-600 shrink-0">•</span>
                      <span>Se premia mucho poseer buen inglés y proyectos propios subidos a GitHub.</span>
                    </li>
                    <li className="flex gap-2 items-start text-indigo-950">
                      <span className="text-blue-600 shrink-0">•</span>
                      <span>La jornada media suele ser con teletrabajo flexible o híbrido.</span>
                    </li>
                  </>
                )}
                {selectedFamilyData.name === "Sanidad" && (
                  <>
                    <li className="flex gap-2 items-start text-emerald-950">
                      <span className="text-emerald-500 shrink-0">•</span>
                      <span>Contratos rápidos en bolsa de sanidad pública, pero temporales y rotatorios.</span>
                    </li>
                    <li className="flex gap-2 items-start text-emerald-950">
                      <span className="text-emerald-500 shrink-0">•</span>
                      <span>Demanda ininterrumpida por la pirámide demográfica española envejecida.</span>
                    </li>
                    <li className="flex gap-2 items-start text-emerald-950">
                      <span className="text-emerald-500 shrink-0">•</span>
                      <span>En clínicas dentales privadas el convenio colectivo estatal suele ser bajo.</span>
                    </li>
                  </>
                )}
                {selectedFamilyData.name !== "Sanidad" && selectedFamilyData.name !== "Informática y Comunicaciones" && (
                  <>
                    <li className="flex gap-2 items-start text-slate-900">
                      <span className="text-amber-500 shrink-0">•</span>
                      <span>Tasas estables de contratación centradas en pymes y mantenimiento local de primer nivel.</span>
                    </li>
                    <li className="flex gap-2 items-start text-slate-900">
                      <span className="text-amber-500 shrink-0">•</span>
                      <span>Modalidad FP Dual muy recomendada en esta familia para asentarse en plantilla fija.</span>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>

          <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 flex items-center gap-3">
            <span className="text-2xl">💡</span>
            <p className="text-[11px] text-blue-900 leading-relaxed font-bold">
              Tip SerFP: El título te da acceso a la entrevista técnica, pero tus habilidades de comunicación, perseverancia y la actitud deciden el contrato en el 80% de los casos.
            </p>
          </div>
        </div>
      </div>

      {/* Calculator Section: ROI of FP to avoid expensive mistakes */}
      <div 
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6"
        id="roi-calculator-widget"
      >
        <div className="border-b border-slate-100 pb-3">
          <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">Planificador Financiero Independiente</span>
          <h3 className="font-extrabold text-slate-950 text-lg">Calculadora de Retorno de Inversión de FP (ROI)</h3>
          <p className="text-xs text-slate-500">Compara lo que tardarás en recuperar tu inversión física y de tasas de secretaría si eliges un centro público vs uno privado o si tienes que alquilar piso.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Form inputs */}
          <div className="space-y-4 md:col-span-2">
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 block">1. Elegir Tipo de Centro educativo</span>
              <div className="grid grid-cols-2 gap-3" id="calc-center-type-selector">
                <button
                  type="button"
                  onClick={() => setCenterType("public")}
                  className={`p-3 text-xs font-bold border rounded-xl transition ${
                    centerType === "public"
                      ? "border-blue-600 bg-blue-50/30 text-blue-700"
                      : "border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  Público (Costes insignificantes: ~100€)
                </button>
                <button
                  type="button"
                  onClick={() => setCenterType("private")}
                  className={`p-3 text-xs font-bold border rounded-xl transition ${
                    centerType === "private"
                      ? "border-blue-600 bg-blue-50/30 text-blue-700"
                      : "border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  Privado (Tasas matrícula: ~4.500€/año)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Extras / Libros / Transporte (€ total)</label>
                <input
                  type="number"
                  min="0"
                  value={customCost}
                  onChange={e => setCustomCost(Number(e.target.value))}
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 font-mono"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Alquiler / Piso mensual (€/mes)</label>
                <input
                  type="number"
                  min="0"
                  placeholder="0 si vives con tus padres"
                  value={monthlyHousing}
                  onChange={e => setMonthlyHousing(Number(e.target.value))}
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 font-mono"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Sueldo neto mensual esperado (€)</label>
                <input
                  type="number"
                  min="1000"
                  max="5000"
                  value={expectedMonthlySalary}
                  onChange={e => setExpectedMonthlySalary(Number(e.target.value))}
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Calculations Results card */}
          <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 flex flex-col justify-between space-y-4">
            <div className="space-y-2.5">
              <span className="text-[10px] font-extrabold text-amber-800 uppercase tracking-widest block font-mono">Simulación de Retorno</span>
              
              <div>
                <span className="text-[10px] text-slate-500 font-bold block">Costes totales de Formación:</span>
                <span className="text-xl font-extrabold text-slate-900 font-mono">{totalEducationCost.toLocaleString("es-ES")} €</span>
              </div>

              <div>
                <span className="text-[10px] text-slate-500 font-bold block">Excedente ahorro mensual:</span>
                <span className="text-xs font-bold font-mono text-slate-800">
                  {surplusPerMonth > 0 ? `+${surplusPerMonth}€/mes` : `${surplusPerMonth}€ (no ahorras nada)`}
                </span>
                <p className="text-[9px] text-slate-400 mt-0.5">Asumiendo 1.000€ mensuales de gastos básicos de subsistencia.</p>
              </div>
            </div>

            <div className="border-t border-amber-200 pt-3">
              <span className="text-[10px] text-amber-900 font-bold block uppercase tracking-wider">Tiempo de recuperación física del dinero:</span>
              <span className="text-xl font-black text-rose-700 font-mono block mt-1">{breakEvenMonths} {typeof breakEvenMonths === "string" && breakEvenMonths.includes("Infinito") ? "" : "Meses"}</span>
              <p className="text-[10px] text-slate-500 mt-1">Ganas de vuelta tu inversión escolar.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
