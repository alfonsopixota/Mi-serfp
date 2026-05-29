import React, { useState } from "react";
import { MessageSquareCode, Filter, Plus, Heart, HelpCircle, Star, ThumbsUp, Calendar, AlertTriangle } from "lucide-react";
import { Testimonial, FpLevel, FpCycle } from "../types";

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  cycles: FpCycle[];
  onAddTestimonial: (newTestimonial: Testimonial) => void;
  onLikeTestimonial: (id: string) => void;
}

export default function TestimonialsSection({ testimonials, cycles, onAddTestimonial, onLikeTestimonial }: TestimonialsSectionProps) {
  // Filtering states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [selectedFamily, setSelectedFamily] = useState<string>("all");
  const [onlyDual, setOnlyDual] = useState<boolean>(false);
  const [minRating, setMinRating] = useState<number>(1);

  // Form states
  const [showForm, setShowForm] = useState(false);
  const [formName, setFormName] = useState("");
  const [formAge, setFormAge] = useState<number>(22);
  const [formGender, setFormGender] = useState<"Masculino" | "Femenino" | "Otro">("Masculino");
  const [formCycleCode, setFormCycleCode] = useState(cycles[0]?.code || "");
  const [formCenter, setFormCenter] = useState("");
  const [formCity, setFormCity] = useState("");
  const [formLevel, setFormLevel] = useState<FpLevel>(FpLevel.GRADO_SUPERIOR);
  const [formIsDual, setFormIsDual] = useState(false);
  const [formRating, setFormRating] = useState(4);
  const [formContent, setFormContent] = useState("");
  const [formTheTruth, setFormTheTruth] = useState("");
  const [formJobSearchTime, setFormJobSearchTime] = useState<number>(3);
  const [formStartingSalary, setFormStartingSalary] = useState<number>(16000);

  const [formSubmitted, setFormSubmitted] = useState(false);

  // Handle new submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formContent || !formTheTruth) {
      alert("Por favor, rellena todos los campos clave (Nombre, tu experiencia y 'la verdad' oculta).");
      return;
    }

    const matchedCycleObj = cycles.find(c => c.code === formCycleCode);

    const submission: Testimonial = {
      id: "custom-" + Date.now(),
      studentName: formName,
      age: Number(formAge),
      gender: formGender,
      cycleCode: formCycleCode,
      cycleName: matchedCycleObj ? matchedCycleObj.name : "Ciclo FP",
      familyId: matchedCycleObj ? matchedCycleObj.familyId : "administracion",
      centerName: formCenter || "IES No Especificado",
      city: formCity || "España",
      fpLevel: formLevel,
      isDual: formIsDual,
      rating: formRating,
      content: formContent,
      theTruth: formTheTruth,
      foundJobMonths: Number(formJobSearchTime),
      startingSalary: Number(formStartingSalary),
      likes: 0,
      isCustom: true,
      approved: true, // Auto-approved in UI but editable in server/control-center!
      createdAt: new Date().toISOString().split("T")[0]
    };

    onAddTestimonial(submission);
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setShowForm(false);
      // Reset form fields
      setFormName("");
      setFormContent("");
      setFormTheTruth("");
      setFormCenter("");
      setFormCity("");
    }, 2000);
  };

  // Extract unique families from cycles
  const families = Array.from(new Set(cycles.map(c => c.familyName)));

  // Filter list
  const filteredTestimonials = testimonials.filter(t => {
    // Only show approved
    if (!t.approved) return false;

    const matchesSearch = t.studentName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.cycleCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.cycleName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.centerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.city.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLevel = selectedLevel === "all" || t.fpLevel === selectedLevel;
    const matchesFamily = selectedFamily === "all" || t.familyId === selectedFamily;
    const matchesDual = !onlyDual || t.isDual;
    const matchesRating = t.rating >= minRating;

    return matchesSearch && matchesLevel && matchesFamily && matchesDual && matchesRating;
  });

  return (
    <div className="space-y-8 py-6 fade-in-up">
      {/* Intro Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">Voces de la vida real</span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">Testimonios de Alumnos y Exalumnos</h1>
          <p className="text-xs text-slate-500">Filtrados por familias profesionales de España de forma veraz sin censuras corporativas.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="rounded-xl bg-slate-900 border border-slate-900 px-4 py-2.5 text-xs font-bold text-white hover:bg-slate-800 transition flex items-center justify-center gap-2"
          id="toggle-add-testimonial-btn"
        >
          <Plus className="h-4 w-4" />
          {showForm ? "Cerrar Formulario" : "Añadir Mi Experiencia"}
        </button>
      </div>

      {/* Input Ingestion Form */}
      {showForm && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md transition-all space-y-5 relative" id="add-testimonial-form-block">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-base font-extrabold text-slate-900">Comparte tu experiencia con total libertad e independencia</h3>
            <p className="text-xs text-slate-500">SerFP no comparte tus datos con ningún instituto privado. Tu anonimato está protegido.</p>
          </div>

          {formSubmitted ? (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 rounded-xl text-center font-bold text-sm">
              ¡Gracias! Tu testimonio ha sido subido e ingresado con éxito de forma automática.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Nombre (o seudónimo)</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Roberto S."
                  value={formName}
                  onChange={e => setFormName(e.target.value)}
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Edad</label>
                  <input
                    type="number"
                    min="16"
                    max="99"
                    required
                    value={formAge}
                    onChange={e => setFormAge(Number(e.target.value))}
                    className="w-full text-xs p-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Género</label>
                  <select
                    value={formGender}
                    onChange={e => setFormGender(e.target.value as any)}
                    className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-600"
                  >
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Ciclo Cursado</label>
                <select
                  value={formCycleCode}
                  onChange={e => setFormCycleCode(e.target.value)}
                  className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none"
                >
                  {cycles.map(c => (
                    <option key={c.id} value={c.code}>{c.code} - {c.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Nivel de FP</label>
                  <select
                    value={formLevel}
                    onChange={e => setFormLevel(e.target.value as any)}
                    className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none"
                  >
                    <option value={FpLevel.GRADO_SUPERIOR}>Grado Superior</option>
                    <option value={FpLevel.GRADO_MEDIO}>Grado Medio</option>
                  </select>
                </div>
                <div className="space-y-1 flex items-end pb-3 ">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                    <input
                      type="checkbox"
                      checked={formIsDual}
                      onChange={e => setFormIsDual(e.target.checked)}
                      className="rounded border-slate-300 focus:ring-blue-500"
                    />
                    <span>¿Modalidad FP Dual?</span>
                  </label>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Centro de Estudios</label>
                <input
                  type="text"
                  placeholder="Ej. IES Francesc Tàrrega"
                  value={formCenter}
                  onChange={e => setFormCenter(e.target.value)}
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Ciudad/Provincia</label>
                <input
                  type="text"
                  placeholder="Ej. Castellón"
                  value={formCity}
                  onChange={e => setFormCity(e.target.value)}
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Puntuación General (1-5 estrellas)</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={formRating}
                    onChange={e => setFormRating(Number(e.target.value))}
                    className="w-full text-xs p-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Meses para hallar Empleo</label>
                  <input
                    type="number"
                    min="0"
                    max="24"
                    value={formJobSearchTime}
                    onChange={e => setFormJobSearchTime(Number(e.target.value))}
                    className="w-full text-xs p-2.5 border border-slate-200 rounded-lg focus:outline-none"
                    placeholder="Més recién graduado"
                  />
                </div>
              </div>

              <div className="space-y-1 md:col-span-1">
                <label className="text-xs font-bold text-slate-700 block">Salario Inicial bruto anual (€)</label>
                <input
                  type="number"
                  min="10000"
                  max="60000"
                  value={formStartingSalary}
                  onChange={e => setFormStartingSalary(Number(e.target.value))}
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 font-mono"
                />
              </div>

              <div className="md:col-span-2 space-y-1">
                <label className="text-xs font-bold text-slate-700 block">1. Lo Aprendido (El folleto general)</label>
                <textarea
                  required
                  rows={2}
                  placeholder="Describe la experiencia general, qué tal el trato, las asignaturas iniciales y si te resultó difícil."
                  value={formContent}
                  onChange={e => setFormContent(e.target.value)}
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="md:col-span-2 space-y-1">
                <div className="flex items-center gap-1.5 text-amber-700">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  <label className="text-xs font-bold block">2. Lo que Nadie te Cuenta (La verdad incómoda - pieza clave de SerFP)</label>
                </div>
                <textarea
                  required
                  rows={2}
                  placeholder="¿Salas con pocos medios? ¿Profesores vagos? ¿Convenios de prácticas deficientes? Habla claro."
                  value={formTheTruth}
                  onChange={e => setFormTheTruth(e.target.value)}
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="md:col-span-2 flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="rounded-lg bg-slate-100 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-200 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-5 py-2 text-xs font-bold text-white hover:bg-blue-700 transition"
                  id="submit-testimonial-btn"
                >
                  Confirmar e Ingresar
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Control Filter Bar */}
      <div 
        className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm space-y-3"
        id="testimonials-filter-bar"
      >
        <div className="flex items-center gap-2 text-slate-800 font-bold text-xs pb-2 border-b border-slate-100">
          <Filter className="h-4 w-4 text-slate-500" />
          <span>Filtro de Testimonios Neutrales</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500">Búsqueda rápida</label>
            <input
              type="text"
              placeholder="IES, ciclos, ciudades..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full text-xs p-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-600"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500">Nivel de FP</label>
            <select
              value={selectedLevel}
              onChange={e => setSelectedLevel(e.target.value)}
              className="w-full text-xs p-2 bg-white border border-slate-200 rounded-lg focus:outline-none"
            >
              <option value="all">Ver todos los niveles</option>
              <option value={FpLevel.GRADO_SUPERIOR}>Grado Superior</option>
              <option value={FpLevel.GRADO_MEDIO}>Grado Medio</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500">Familia Profesional</label>
            <select
              value={selectedFamily}
              onChange={e => setSelectedFamily(e.target.value)}
              className="w-full text-xs p-2 bg-white border border-slate-200 rounded-lg focus:outline-none"
            >
              <option value="all">Cualquier familia</option>
              <option value="informatica">Informática y Comunicaciones</option>
              <option value="sanidad">Sanidad</option>
              <option value="administracion">Administración y Gestión</option>
              <option value="energia">Energía y Agua</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500">Puntación mínima</label>
            <select
              value={minRating}
              onChange={e => setMinRating(Number(e.target.value))}
              className="w-full text-xs p-2 bg-white border border-slate-200 rounded-lg focus:outline-none"
            >
              <option value="1">1+ Estrellas</option>
              <option value="3">3+ Estrellas</option>
              <option value="4">4+ Estrellas</option>
              <option value="5">5 Estrellas fijas</option>
            </select>
          </div>

          <div className="flex items-center sm:pt-4">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
              <input
                type="checkbox"
                checked={onlyDual}
                onChange={e => setOnlyDual(e.target.checked)}
                className="rounded border-slate-300 focus:ring-blue-500"
              />
              <span>¿Solo FP Dual?</span>
            </label>
          </div>
        </div>
      </div>

      {/* Render Testimonials Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="testimonials-rendered-list">
        {filteredTestimonials.length > 0 ? (
          filteredTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm space-y-4 flex flex-col justify-between hover:border-slate-300 transition"
              id={`testimonial-card-${testimonial.id}`}
            >
              <div className="space-y-3">
                {/* Heading */}
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <span className="text-xs font-extrabold text-blue-600 block">{testimonial.cycleCode} - {testimonial.cycleName}</span>
                    <h3 className="font-bold text-sm text-slate-900 mt-0.5">{testimonial.studentName}, {testimonial.age} años</h3>
                    <p className="text-[10px] text-slate-500 font-medium">{testimonial.centerName} ({testimonial.city})</p>
                  </div>
                  <div className="flex flex-col items-end shrink-0">
                    <span className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < testimonial.rating ? "fill-amber-400 text-amber-400" : "text-slate-200"
                          }`}
                        />
                      ))}
                    </span>
                    <div className="flex gap-1 mt-1">
                      {testimonial.isDual && (
                        <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-[8px] font-bold px-1.5 py-0.5 rounded uppercase">Dual</span>
                      )}
                      <span className="bg-slate-100 text-slate-600 text-[8px] font-bold px-1.5 py-0.5 rounded uppercase">{testimonial.fpLevel}</span>
                    </div>
                  </div>
                </div>

                {/* Main Content (The promotional/general side) */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">1. Lo que sí se aprende:</span>
                  <p className="text-xs text-slate-700 leading-relaxed italic pr-1">
                    "{testimonial.content}"
                  </p>
                </div>

                {/* Uncensored Truth (The secret sauce of SerFP - honest and unbiased) */}
                <div className="bg-amber-50/50 border border-amber-200/70 p-3.5 rounded-xl space-y-1.5 text-amber-900">
                  <div className="flex items-center gap-1">
                    <AlertTriangle className="h-3.5 w-3.5 text-amber-700 shrink-0" />
                    <span className="text-[10px] font-extrabold text-amber-800 uppercase tracking-widest">2. Lo que nadie te cuenta:</span>
                  </div>
                  <p className="text-xs font-semibold leading-relaxed">
                    "{testimonial.theTruth}"
                  </p>
                </div>
              </div>

              {/* Bottom statistics and Likes */}
              <div className="border-t border-slate-100 pt-3 mt-4 flex justify-between items-center">
                <div className="flex gap-4 text-[10px] font-mono font-bold text-slate-500">
                  <span>Encontró empleo: <span className="text-slate-800">{testimonial.foundJobMonths === 0 ? "Inmediato" : `${testimonial.foundJobMonths} meses`}</span></span>
                  <span>Sueldo inicial: <span className="text-slate-800">{(testimonial.startingSalary / 12).toFixed(0)}€/m</span></span>
                </div>
                <button
                  onClick={() => onLikeTestimonial(testimonial.id)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-rose-600 transition text-[11px] font-semibold"
                >
                  <ThumbsUp className="h-3 w-3 shrink-0" />
                  <span>{testimonial.likes}</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-1 md:col-span-2 text-center py-12 border border-dashed border-slate-300 rounded-2xl bg-white space-y-2">
            <HelpCircle className="h-10 w-10 text-slate-400 mx-auto" />
            <h4 className="font-bold text-sm text-slate-800">No hay testimonios que coincidan con estos filtros</h4>
            <p className="text-xs text-slate-500">Prueba quitando filtros o cambiando la barra de búsqueda.</p>
          </div>
        )}
      </div>
    </div>
  );
}
