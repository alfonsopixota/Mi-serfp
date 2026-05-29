import React, { useState } from "react";
import { Settings, ShieldCheck, Database, Calendar, Trash2, Edit2, Play, RefreshCw, BarChart2, Plus, Users, GraduationCap, Download, Upload } from "lucide-react";
import { Testimonial, FpCycle, FpLevel } from "../types";

interface ControlCenterSectionProps {
  testimonials: Testimonial[];
  cycles: FpCycle[];
  onToggleApproval: (id: string) => void;
  onDeleteTestimonial: (id: string) => void;
  onAddCycle: (newCycle: FpCycle) => void;
  onResetDatabase: () => void;
  onImportBackup: (imported: string) => void;
}

export default function ControlCenterSection({
  testimonials,
  cycles,
  onToggleApproval,
  onDeleteTestimonial,
  onAddCycle,
  onResetDatabase,
  onImportBackup
}: ControlCenterSectionProps) {

  // New Cycle form states
  const [showAddCycle, setShowAddCycle] = useState(false);
  const [cycleCode, setCycleCode] = useState("");
  const [cycleName, setCycleName] = useState("");
  const [cycleFamilyId, setCycleFamilyId] = useState("informatica");
  const [cycleFamilyName, setCycleFamilyName] = useState("Informática y Comunicaciones");
  const [cycleLevel, setCycleLevel] = useState<FpLevel>(FpLevel.GRADO_SUPERIOR);
  const [cycleDuration, setCycleDuration] = useState(2000);
  const [cycleEmployability, setCycleEmployability] = useState(85);
  const [cycleSalary, setCycleSalary] = useState(16500);
  const [cycleSatisfaction, setCycleSatisfaction] = useState(7.5);
  const [cycleDifficulty, setCycleDifficulty] = useState(6.0);
  const [cycleDescription, setCycleDescription] = useState("");
  const [cycleKeySubjects, setCycleKeySubjects] = useState("Asignatura 1, Asignatura 2");
  const [cycleMythText, setCycleMythText] = useState("Se aprende todo jugando.");
  const [cycleRealityText, setCycleRealityText] = useState("Requiere estudiar código y memorizar protocolos reales.");

  const [importText, setImportText] = useState("");
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const handleAddNewCycle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cycleCode || !cycleName || !cycleDescription) {
      alert("Por favor rellene Código, Nombre y Descripción del grado.");
      return;
    }

    const newCycle: FpCycle = {
      id: cycleCode.toLowerCase().trim(),
      code: cycleCode.toUpperCase().trim(),
      name: cycleName.trim(),
      familyId: cycleFamilyId,
      familyName: cycleFamilyName,
      level: cycleLevel,
      durationHours: Number(cycleDuration),
      employabilityRate: Number(cycleEmployability),
      avgStartingSalary: Number(cycleSalary),
      satisfactionRate: Number(cycleSatisfaction),
      difficultyScore: Number(cycleDifficulty),
      keySubjects: cycleKeySubjects.split(",").map(sub => sub.trim()).filter(Boolean),
      description: cycleDescription.trim(),
      myths: [{ myth: cycleMythText.trim(), reality: cycleRealityText.trim() }],
      unspokenTruths: ["Ciclo añadido de forma dinámica en tiempo de ingestión de datos por el administrador de SerFP.", "Verifica los convenios del centro local antes de matricularte."],
      careerOutlets: ["Técnico Especialista Junior", "Ayudante de Taller"],
      suitabilityQuizPoints: ["Te interesa la especialidad de forma práctica", "Buscas colocación en pymes"],
      isPopular: false
    };

    onAddCycle(newCycle);
    alert("¡Ciclo de FP añadido e ingresado de forma dinámica al catálogo general!");
    
    // Reset Form
    setCycleCode("");
    setCycleName("");
    setCycleDescription("");
    setShowAddCycle(false);
  };

  // Calculations for Admin analytical visualizer
  const totalTestimonials = testimonials.length;
  const approvedCount = testimonials.filter(t => t.approved).length;
  const pendingCount = testimonials.filter(t => !t.approved).length;
  const averageReviewRating = totalTestimonials > 0 
    ? (testimonials.reduce((sum, t) => sum + t.rating, 0) / totalTestimonials).toFixed(2)
    : "0.00";

  // Average salaries
  const averageSalaryEarned = totalTestimonials > 0
    ? (testimonials.reduce((sum, t) => sum + t.startingSalary, 0) / totalTestimonials).toFixed(0)
    : "0";

  // Export database as portable JSON
  const handleExportData = () => {
    const backupObj = {
      testimonials,
      cycles,
      exportTimestamp: new Date().toISOString()
    };
    const jsonStr = JSON.stringify(backupObj, null, 2);
    // Create an anchor download
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `serfp_database_export_${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportData = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!importText) return;
      onImportBackup(importText);
      setImportStatus("Importación completada con éxito. Base de datos sincronizada.");
      setImportText("");
      setTimeout(() => setImportStatus(null), 3000);
    } catch (err: any) {
      setImportStatus(`Error de parseo JSON: ${err?.message || "Estructura inválida"}`);
    }
  };

  return (
    <div className="space-y-10 py-6 fade-in-up">
      {/* Title */}
      <div>
        <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">Panel de Administración</span>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">Núcleo de Control de Datos e Ingesta</h1>
        <p className="text-xs text-slate-500">Permite, almacena y visualiza toda la infraestructura informativa del portal SerFP.</p>
      </div>

      {/* Analytical Visualizer metric cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4" id="admin-kpi-cards">
        <div className="rounded-xl border border-slate-200 bg-white p-4.5 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Testimonios Totales</span>
            <Users className="h-4 w-4 text-blue-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black font-mono text-slate-900">{totalTestimonials}</span>
            <span className="text-[10px] text-emerald-600 font-bold font-mono">+{approvedCount} activos</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4.5 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Valoración Media</span>
            <Database className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black font-mono text-slate-900">{averageReviewRating}</span>
            <span className="text-[10px] text-slate-500 font-bold">de 5.00 estrellas</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4.5 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Ciclos en Catálogo</span>
            <GraduationCap className="h-4 w-4 text-amber-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black font-mono text-slate-900">{cycles.length}</span>
            <span className="text-[10px] text-indigo-600 font-bold">Grados activos</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4.5 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Sueldo Inicial Medio</span>
            <BarChart2 className="h-4 w-4 text-purple-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black font-mono text-slate-900">{Number(averageSalaryEarned).toLocaleString("es-ES")}€</span>
            <span className="text-[10px] text-slate-500 font-bold">bruto anual</span>
          </div>
        </div>
      </div>

      {/* Main visual interface - Manage entries list & Dynamic course adder */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Testimonial/opinion control moderator table */}
        <div className="lg:col-span-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-5">
          <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm">Moderador y Control de Testimonios Ingeridos</h3>
              <p className="text-xs text-slate-500">Controla el almacenamiento y visualización del feedback de alumnos.</p>
            </div>
            <span className="text-[10px] font-mono text-slate-400 font-semibold uppercase">{pendingCount} pendientes</span>
          </div>

          <div className="overflow-x-auto" id="admin-testimonials-table-container">
            <table className="w-full text-xs text-left text-slate-500 border-collapse">
              <thead className="text-[10px] text-slate-400 uppercase bg-slate-50/80 font-bold border-b border-slate-100">
                <tr>
                  <th scope="col" className="px-3 py-2.5">Alumno</th>
                  <th scope="col" className="px-3 py-2.5">Ciclo</th>
                  <th scope="col" className="px-3 py-2.5">Salario</th>
                  <th scope="col" className="px-3 py-2.5">Estado</th>
                  <th scope="col" className="px-3 py-2.5 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold">
                {testimonials.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50/50">
                    <td className="px-3 py-3">
                      <div className="font-bold text-slate-900">{t.studentName}</div>
                      <div className="text-[10px] text-slate-400">{t.city || "España"}</div>
                    </td>
                    <td className="px-3 py-3 font-mono">{t.cycleCode}</td>
                    <td className="px-3 py-3 font-mono">{(t.startingSalary / 12).toFixed(0)}€/m</td>
                    <td className="px-3 py-3">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold tracking-wider ${
                        t.approved 
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-100" 
                          : "bg-amber-50 text-amber-700 border border-amber-100"
                      }`}>
                        {t.approved ? "VIVO / VISIBLE" : "BLOQUEADO"}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-right space-x-2">
                      <button
                        onClick={() => onToggleApproval(t.id)}
                        className={`text-[10px] font-bold px-2 py-1 rounded border hover:opacity-85 transition ${
                          t.approved 
                            ? "border-amber-200 bg-amber-50 text-amber-700" 
                            : "border-emerald-200 bg-emerald-50 text-emerald-700"
                        }`}
                      >
                        {t.approved ? "Bloquear" : "Aprobar"}
                      </button>
                      <button
                        onClick={() => onDeleteTestimonial(t.id)}
                        className="text-[10px] font-bold border border-rose-200 bg-rose-50 text-rose-700 px-2 py-1 rounded hover:bg-rose-100/50 transition"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Dynamic cycle FP course adder */}
        <div className="lg:col-span-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
          <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
            <div>
              <h4 className="font-extrabold text-slate-900 text-sm">Añadir Ciclo FP Oficial</h4>
              <p className="text-xs text-slate-500">Expande los grados curriculares de España.</p>
            </div>
            <button
              onClick={() => setShowAddCycle(!showAddCycle)}
              className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          {showAddCycle ? (
            <form onSubmit={handleAddNewCycle} className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 block">Código Grado</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. SMR"
                    value={cycleCode}
                    onChange={e => setCycleCode(e.target.value)}
                    className="w-full text-xs p-2.5 border border-slate-200 rounded focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 block">Nivel Educativo</label>
                  <select
                    value={cycleLevel}
                    onChange={e => setCycleLevel(e.target.value as any)}
                    className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded"
                  >
                    <option value={FpLevel.GRADO_SUPERIOR}>Grado Superior</option>
                    <option value={FpLevel.GRADO_MEDIO}>Grado Medio</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 block">Nombre del Título Oficial</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Sistemas Microinformáticos y Redes"
                  value={cycleName}
                  onChange={e => setCycleName(e.target.value)}
                  className="w-full text-xs p-2.5 border border-slate-200 rounded focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 block">Empleabilidad (%)</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={cycleEmployability}
                    onChange={e => setCycleEmployability(Number(e.target.value))}
                    className="w-full text-xs p-2.5 border border-slate-200 rounded focus:outline-none font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 block">Sueldo Inicial Anual (€)</label>
                  <input
                    type="number"
                    min="10000"
                    max="60000"
                    value={cycleSalary}
                    onChange={e => setCycleSalary(Number(e.target.value))}
                    className="w-full text-xs p-2.5 border border-slate-200 rounded focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 block">Descripción del Título</label>
                <textarea
                  required
                  rows={2}
                  value={cycleDescription}
                  onChange={e => setCycleDescription(e.target.value)}
                  placeholder="Escribe brevemente la orientación del título..."
                  className="w-full text-xs p-2 border border-slate-200 rounded focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold p-2 text-xs rounded transition"
              >
                Ingresar Ciclo
              </button>
            </form>
          ) : (
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-4.5 space-y-4 text-xs">
              <p className="text-slate-500 font-medium">Pulsa el botón de sumar (+) arriba para dar de alta títulos oficiales con estadísticas personalizadas que se integran en el quiz y comparador.</p>
              
              <div className="border-t border-slate-200 pt-3 space-y-2">
                <span className="text-[9px] font-bold text-slate-400 uppercase font-mono block">Backup de Almacenamiento Local</span>
                <div className="flex gap-2">
                  <button
                    onClick={handleExportData}
                    className="flex-1 bg-white border border-slate-200 p-2 rounded hover:bg-slate-50 transition text-center flex items-center justify-center gap-1.5 font-bold"
                  >
                    <Download className="h-3 w-3" />
                    <span>Exportar</span>
                  </button>
                  <button
                    onClick={onResetDatabase}
                    className="flex-1 bg-white border border-rose-200 p-2 rounded hover:bg-rose-50 text-rose-700 transition text-center flex items-center justify-center gap-1.5 font-bold"
                  >
                    <RefreshCw className="h-3 w-3" />
                    <span>Restaurar</span>
                  </button>
                </div>
              </div>

              {/* Import box */}
              <form onSubmit={handleImportData} className="space-y-2 border-t border-slate-200 pt-3">
                <span className="text-[9px] font-bold text-slate-400 uppercase font-mono block">Importar copia JSON</span>
                <input
                  type="text"
                  placeholder="Pega las líneas JSON del backup..."
                  value={importText}
                  onChange={e => setImportText(e.target.value)}
                  className="w-full text-[10px] p-2 bg-white border border-slate-200 rounded focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-bold py-1.5 rounded transition flex items-center justify-center gap-1.5"
                >
                  <Upload className="h-3 w-3" />
                  Sincronizar Backup
                </button>
                {importStatus && (
                  <p className="text-[9px] font-bold text-amber-700">{importStatus}</p>
                )}
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
