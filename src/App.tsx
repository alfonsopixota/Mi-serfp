import { useState, useEffect } from "react";

// Types and preloaded dataset
import { PRELOADED_CYCLES, PRELOADED_TESTIMONIALS } from "./data";
import { FpCycle, Testimonial } from "./types";
import {
  isValidCycleArray,
  isValidTestimonialArray,
  normalizeBackupPayload,
} from "./lib/validation";
import { parseStoredJson } from "./lib/storage";

// Modular Subviews
import Navigation from "./components/Navigation";
import HomeSection from "./components/HomeSection";
import TestimonialsSection from "./components/TestimonialsSection";
import EmployabilitySection from "./components/EmployabilitySection";
import CompareSection from "./components/CompareSection";
import BlogSection from "./components/BlogSection";
import ControlCenterSection from "./components/ControlCenterSection";
import AIAdvisor from "./components/AIAdvisor";

export default function App() {
  // Navigation active tab
  const [activeTab, setActiveTab] = useState<string>("home");

  // AI floating chat starter prompt state
  const [aiStarterPrompt, setAiStarterPrompt] = useState<string | null>(null);

  // Database states persisting in local storage
  const [cycles, setCycles] = useState<FpCycle[]>(() => {
    return parseStoredJson(localStorage.getItem("serfp_cycles"), isValidCycleArray, PRELOADED_CYCLES);
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    return parseStoredJson(localStorage.getItem("serfp_testimonials"), isValidTestimonialArray, PRELOADED_TESTIMONIALS);
  });

  // Persist back changes
  useEffect(() => {
    localStorage.setItem("serfp_cycles", JSON.stringify(cycles));
  }, [cycles]);

  useEffect(() => {
    localStorage.setItem("serfp_testimonials", JSON.stringify(testimonials));
  }, [testimonials]);

  // Handle addition of custom dynamic testimonies
  const handleAddTestimonial = (newTestimonial: Testimonial) => {
    setTestimonials((prev) => [newTestimonial, ...prev]);
  };

  // Upvote testmony review rating
  const handleLikeTestimonial = (id: string) => {
    setTestimonials((prev) =>
      prev.map((t) => (t.id === id ? { ...t, likes: t.likes + 1 } : t))
    );
  };

  // Toggle approval / visibility of reviews in Control panel
  const handleToggleApproval = (id: string) => {
    setTestimonials((prev) =>
      prev.map((t) => (t.id === id ? { ...t, approved: !t.approved } : t))
    );
  };

  // Delete an individual testimony
  const handleDeleteTestimonial = (id: string) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
  };

  // Add new Cycle Course to catalogue
  const handleAddCycle = (newCycle: FpCycle) => {
    setCycles((prev) => [...prev, newCycle]);
  };

  // Reset database values to preloaded standard
  const handleResetDatabase = () => {
    if (window.confirm("¿Seguro que quieres borrar tus cambios personalizados y restaurar el catálogo oficial de SerFP?")) {
      setCycles(PRELOADED_CYCLES);
      setTestimonials(PRELOADED_TESTIMONIALS);
      localStorage.removeItem("serfp_user_checklist");
      localStorage.removeItem("serfp_user_articles");
      localStorage.removeItem("serfp_user_questions");
      alert("Portal restaurado con éxito.");
    }
  };

  // Port JSON Backup Restore
  const handleImportBackup = (importedJsonStr: string) => {
    try {
      const data = normalizeBackupPayload(JSON.parse(importedJsonStr));
      if (!data) {
        throw new Error("Formato del backup inválido: debe contener las arrays de 'cycles' y 'testimonials'.");
      }

      setCycles(data.cycles);
      setTestimonials(data.testimonials);
    } catch (error) {
      const message = error instanceof Error ? error.message : "No se pudo importar el backup.";
      throw new Error(message);
    }
  };

  // Trigger focus of a custom cycle in Compare section
  const handleFocusCompareCycle = (cycleCode: string) => {
    setActiveTab("compare");
    // Trigger scroll
    setTimeout(() => {
      const topOfCompare = document.getElementById("side-by-side-compare-block");
      if (topOfCompare) topOfCompare.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };

  // Assist chatbot query
  const handleAskAIWithPrompt = (prompt?: string) => {
    if (prompt) {
      setAiStarterPrompt(prompt);
    } else {
      setAiStarterPrompt("¿Qué FP tiene más salidas?");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-blue-600 selection:text-white" id="serfp-app-container">
      <div>
        {/* Clean Header & Navigation */}
        <Navigation 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          testimonialCount={testimonials.filter(t => t.approved).length}
          cycleCount={cycles.length}
        />

        {/* Global Body Container */}
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
          {activeTab === "home" && (
            <HomeSection 
              cycles={cycles} 
              onSelectCycle={handleFocusCompareCycle} 
              onAskAI={handleAskAIWithPrompt}
            />
          )}

          {activeTab === "testimonials" && (
            <TestimonialsSection 
              testimonials={testimonials} 
              cycles={cycles}
              onAddTestimonial={handleAddTestimonial}
              onLikeTestimonial={handleLikeTestimonial}
            />
          )}

          {activeTab === "employability" && (
            <EmployabilitySection />
          )}

          {activeTab === "compare" && (
            <CompareSection cycles={cycles} />
          )}

          {activeTab === "blog" && (
            <BlogSection />
          )}

          {activeTab === "control" && (
            <ControlCenterSection 
              testimonials={testimonials}
              cycles={cycles}
              onToggleApproval={handleToggleApproval}
              onDeleteTestimonial={handleDeleteTestimonial}
              onAddCycle={handleAddCycle}
              onResetDatabase={handleResetDatabase}
              onImportBackup={handleImportBackup}
            />
          )}
        </main>
      </div>

      {/* Embedded Floating AI Advisor Orientation Widget */}
      <AIAdvisor 
        initialPrompt={aiStarterPrompt} 
        onClosePrompt={() => setAiStarterPrompt(null)}
      />

      {/* Premium Humble Footer Section */}
      <footer className="bg-white border-t border-slate-200/90 py-10" id="website-footer">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left space-y-1">
            <div className="flex items-center justify-center md:justify-start gap-1">
              <span className="font-bold text-slate-900 text-sm">SerFP España</span>
              <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1 rounded">Portal de Confianza Estudiantil</span>
            </div>
            <p className="text-xs text-slate-400">Por la transparencia educativa. Libertad de 'humo', publicidad afiliada o patrocinios ocultos.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-[11px] font-bold text-slate-500 font-mono">
            <span>Sección: {activeTab.toUpperCase()}</span>
            <span>Mantenido por y para Alumnos</span>
            <span>© 2026 SerFP</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
