import React, { useState, useEffect } from "react";
import { GraduationCap, ArrowRight, CheckSquare, Plus, Trash2, HelpCircle, Shuffle, HeartCrack, Bookmark } from "lucide-react";
import { FpCycle, ChecklistItem } from "../types";
import { PRELOADED_CHECKLISTS } from "../data";

interface CompareSectionProps {
  cycles: FpCycle[];
}

export default function CompareSection({ cycles }: CompareSectionProps) {
  // Cycle Comparison state
  const [leftCycleCode, setLeftCycleCode] = useState<string>("DAW");
  const [rightCycleCode, setRightCycleCode] = useState<string>("DAM");

  // Checklist items state (persisting locally)
  const [checklist, setChecklist] = useState<ChecklistItem[]>(() => {
    const saved = localStorage.getItem("serfp_user_checklist");
    return saved ? JSON.parse(saved) : PRELOADED_CHECKLISTS;
  });

  // Custom checklist task inputs
  const [newTaskText, setNewTaskText] = useState("");
  const [newTaskCategory, setNewTaskCategory] = useState<"Requisitos" | "Matriculación" | "Primeros Días" | "Dual" | "Consejos Practicos">("Requisitos");
  const [newTaskDesc, setNewTaskDesc] = useState("");

  useEffect(() => {
    localStorage.setItem("serfp_user_checklist", JSON.stringify(checklist));
  }, [checklist]);

  const leftCycle = cycles.find(c => c.code === leftCycleCode) || cycles[0];
  const rightCycle = cycles.find(c => c.code === rightCycleCode) || cycles[1] || cycles[0];

  const toggleChecklistTask = (taskId: string) => {
    setChecklist(prev =>
      prev.map(item => (item.id === taskId ? { ...item, completed: !item.completed } : item))
    );
  };

  const deleteChecklistTask = (taskId: string) => {
    setChecklist(prev => prev.filter(item => item.id !== taskId));
  };

  const addCustomChecklistTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText) return;

    const newItem: ChecklistItem = {
      id: "ch-custom-" + Date.now(),
      task: newTaskText,
      category: newTaskCategory,
      description: newTaskDesc || "Tarea añadida de forma manual por el alumno.",
      completed: false
    };

    setChecklist(prev => [...prev, newItem]);
    setNewTaskText("");
    setNewTaskDesc("");
  };

  return (
    <div className="space-y-12 py-6 fade-in-up">
      {/* Compare title */}
      <div>
        <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">Decisiones Informadas</span>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">Comparador de Ciclos de FP</h1>
        <p className="text-xs text-slate-500">¿Tienes dudas entre dos itinerarios formativos? Contrasta las materias, mitos y realidades cara a cara.</p>
      </div>

      {/* Comparison Grid UI block */}
      <div 
        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-6"
        id="side-by-side-compare-block"
      >
        {/* Dropdowns selectors Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4 border-b border-slate-100 items-center">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 uppercase font-mono block">Ciclo Izquierda</label>
            <select
              value={leftCycleCode}
              onChange={e => setLeftCycleCode(e.target.value)}
              className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 font-bold"
            >
              {cycles.map(c => (
                <option key={c.id} value={c.code}>{c.code} - {c.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 uppercase font-mono block">Ciclo Derecha</label>
            <select
              value={rightCycleCode}
              onChange={e => setRightCycleCode(e.target.value)}
              className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 font-bold"
            >
              {cycles.map(c => (
                <option key={c.id} value={c.code}>{c.code} - {c.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Side-by-side content rendering */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-200/90 gap-y-8 md:gap-y-0 text-xs text-slate-600 pt-2">
          
          {/* Left Cycle Column */}
          <div className="space-y-5 pr-2">
            <div>
              <span className="rounded bg-blue-50 text-blue-700 px-2 py-0.5 text-[9px] font-black">{leftCycle.level}</span>
              <h3 className="font-extrabold text-slate-900 text-sm mt-1.5">{leftCycle.code} - {leftCycle.name}</h3>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5">{leftCycle.familyName} • {leftCycle.durationHours} horas</p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="bg-slate-50 p-2 border border-slate-100 rounded-lg">
                <span className="text-[10px] text-slate-400 font-bold block">Inserción SEPE</span>
                <span className="text-sm font-extrabold text-slate-800">{leftCycle.employabilityRate}%</span>
              </div>
              <div className="bg-slate-50 p-2 border border-slate-100 rounded-lg">
                <span className="text-[10px] text-slate-400 font-bold block font-mono">Dificultad</span>
                <span className="text-sm font-extrabold text-slate-800 font-mono">{leftCycle.difficultyScore}/10</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block font-mono">Lo que nadie te cuenta</span>
              <ul className="space-y-1 bg-amber-50/40 p-3 rounded-lg border border-amber-100 text-amber-950 font-semibold leading-relaxed">
                {leftCycle.unspokenTruths.map((truth, i) => (
                  <li key={i} className="flex gap-2 items-start">
                    <span className="text-[9px] text-amber-600 mt-0.5">⚠️</span>
                    <span>{truth}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono">Asignaturas Clave de primero y segundo</span>
              <div className="flex flex-wrap gap-1">
                {leftCycle.keySubjects.map((subject, i) => (
                  <span key={i} className="bg-slate-100 text-slate-700 font-medium text-[10px] px-2 py-0.5 rounded">
                    {subject}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Cycle Column */}
          <div className="space-y-5 pl-0 md:pl-8 pt-6 md:pt-0">
            <div>
              <span className="rounded bg-blue-50 text-blue-700 px-2 py-0.5 text-[9px] font-black">{rightCycle.level}</span>
              <h3 className="font-extrabold text-slate-900 text-sm mt-1.5">{rightCycle.code} - {rightCycle.name}</h3>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5">{rightCycle.familyName} • {rightCycle.durationHours} horas</p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="bg-slate-50 p-2 border border-slate-100 rounded-lg">
                <span className="text-[10px] text-slate-400 font-bold block">Inserción SEPE</span>
                <span className="text-sm font-extrabold text-slate-800">{rightCycle.employabilityRate}%</span>
              </div>
              <div className="bg-slate-50 p-2 border border-slate-100 rounded-lg">
                <span className="text-[10px] text-slate-400 font-bold block font-mono">Dificultad</span>
                <span className="text-sm font-extrabold text-slate-800 font-mono">{rightCycle.difficultyScore}/10</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block font-mono">Lo que nadie te cuenta</span>
              <ul className="space-y-1 bg-amber-50/40 p-3 rounded-lg border border-amber-100 text-amber-950 font-semibold leading-relaxed">
                {rightCycle.unspokenTruths.map((truth, i) => (
                  <li key={i} className="flex gap-2 items-start">
                    <span className="text-[9px] text-amber-600 mt-0.5">⚠️</span>
                    <span>{truth}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono">Asignaturas Clave de primero y segundo</span>
              <div className="flex flex-wrap gap-1">
                {rightCycle.keySubjects.map((subject, i) => (
                  <span key={i} className="bg-slate-100 text-slate-700 font-medium text-[10px] px-2 py-0.5 rounded">
                    {subject}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Practical resources & Checklists to avoid cost in matriculation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Playable user checklist */}
        <div 
          className="lg:col-span-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6"
          id="matriculation-checklist-block"
        >
          <div className="border-b border-slate-101 pb-3">
            <h3 className="font-extrabold text-slate-900 text-base">Checklist para Matricularte en FP con éxito</h3>
            <p className="text-xs text-slate-500">Haz el seguimiento de tus trámites para evitar sustos de fechas o pérdidas de plaza.</p>
          </div>

          <div className="space-y-3.5" id="checklist-rendered-items">
            {checklist.map((item) => (
              <div
                key={item.id}
                onClick={() => toggleChecklistTask(item.id)}
                className={`p-3.5 rounded-xl border flex items-start gap-3.5 cursor-pointer transition select-none ${
                  item.completed
                    ? "bg-slate-50/70 border-slate-200 line-through text-slate-400 opacity-70"
                    : "bg-white border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="pt-0.5 shrink-0">
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => {}} // Hanled by parent div click
                    className="rounded text-blue-600 focus:ring-blue-500 cursor-pointer h-4 w-4"
                  />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                      item.category === "Requisitos" ? "bg-purple-50 text-purple-700 border border-purple-100" :
                      item.category === "Matriculación" ? "bg-rose-50 text-rose-700 border border-rose-100" :
                      item.category === "Primeros Días" ? "bg-blue-50 text-blue-700 border border-blue-100" :
                      item.category === "Dual" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" :
                      "bg-amber-50 text-amber-700 border border-amber-100"
                    }`}>
                      {item.category}
                    </span>
                    <h4 className="font-bold text-xs text-slate-900">{item.task}</h4>
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-500 font-medium">
                    {item.description}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteChecklistTask(item.id);
                  }}
                  className="p-1 text-slate-400 hover:text-rose-500 rounded transition shrink-0 self-center"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Form to add custom checklist task */}
        <div className="lg:col-span-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h4 className="font-extrabold text-slate-900 text-sm">Añadir tu propio Trámite</h4>
            <p className="text-xs text-slate-500">¿Tienes un examen específico o una visita?</p>
          </div>

          <form onSubmit={addCustomChecklistTask} className="space-y-3.5">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 block uppercase">Tarea / Trámite</label>
              <input
                type="text"
                required
                placeholder="Ej. Solicitar certificado oficial de notas de ESO"
                value={newTaskText}
                onChange={e => setNewTaskText(e.target.value)}
                className="w-full text-xs p-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-600"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 block uppercase">Categoría</label>
              <select
                value={newTaskCategory}
                onChange={e => setNewTaskCategory(e.target.value as any)}
                className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none"
              >
                <option value="Requisitos">Requisitos básicos</option>
                <option value="Matriculación">Trámite de Matriculación</option>
                <option value="Primeros Días">Primeros días en el centro</option>
                <option value="Dual">FP Dual o Prácticas</option>
                <option value="Consejos Practicos">Nota personal / Consejos</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 block uppercase">Notas / Detalles</label>
              <textarea
                rows={2}
                placeholder="Añade instrucciones de ayuda, horarios de ventanilla o teléfonos..."
                value={newTaskDesc}
                onChange={e => setNewTaskDesc(e.target.value)}
                className="w-full text-xs p-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-600"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold p-2.5 text-xs transition flex items-center justify-center gap-2"
              id="add-custom-task-btn"
            >
              <Plus className="h-4 w-4" />
              Añadir a Mi Lista
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
