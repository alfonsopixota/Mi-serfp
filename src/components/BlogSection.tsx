import React, { useState, useEffect } from "react";
import { BookOpen, UserCircle2, ArrowLeft, Calendar, FileText, ChevronRight, MessageSquare, ThumbsUp, Send, Filter, GraduationCap } from "lucide-react";
import { Article, CommunityQuestion } from "../types";
import { PRELOADED_ARTICLES, PRELOADED_QUESTIONS } from "../data";

export default function BlogSection() {
  // Articles states
  const [articles, setArticles] = useState<Article[]>(() => {
    const saved = localStorage.getItem("serfp_user_articles");
    return saved ? JSON.parse(saved) : PRELOADED_ARTICLES;
  });
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Questions states
  const [questions, setQuestions] = useState<CommunityQuestion[]>(() => {
    const saved = localStorage.getItem("serfp_user_questions");
    return saved ? JSON.parse(saved) : PRELOADED_QUESTIONS;
  });

  // Question Form
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [newQTitle, setNewQTitle] = useState("");
  const [newQAuthor, setNewQAuthor] = useState("");
  const [newQCategory, setNewQCategory] = useState("Orientación General");
  const [newQCycle, setNewQCycle] = useState("");
  const [newQContent, setNewQContent] = useState("");

  // Answer Forms
  const [answeringQId, setAnsweringQId] = useState<string | null>(null);
  const [newAnswerText, setNewAnswerText] = useState("");
  const [newAnswerAuthor, setNewAnswerAuthor] = useState("");

  // Article Comments Form
  const [newCommentText, setNewCommentText] = useState("");

  useEffect(() => {
    localStorage.setItem("serfp_user_articles", JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem("serfp_user_questions", JSON.stringify(questions));
  }, [questions]);

  const handleLikeQuestion = (qId: string) => {
    setQuestions(prev => prev.map(q => q.id === qId ? { ...q, likes: q.likes + 1 } : q));
  };

  const handlePostQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQTitle || !newQContent || !newQAuthor) return;

    const newQ: CommunityQuestion = {
      id: "q-custom-" + Date.now(),
      author: newQAuthor,
      cycleOfInterest: newQCycle || undefined,
      title: newQTitle,
      content: newQContent,
      category: newQCategory,
      answers: [],
      likes: 0,
      createdAt: new Date().toISOString().split("T")[0]
    };

    setQuestions(prev => [newQ, ...prev]);
    // reset
    setNewQTitle("");
    setNewQContent("");
    setNewQAuthor("");
    setNewQCycle("");
    setShowQuestionForm(false);
  };

  const handlePostAnswer = (e: React.FormEvent, qId: string) => {
    e.preventDefault();
    if (!newAnswerText || !newAnswerAuthor) return;

    setQuestions(prev => prev.map(q => {
      if (q.id === qId) {
        return {
          ...q,
          answers: [
            ...q.answers,
            {
              id: "ans-custom-" + Date.now(),
              author: newAnswerAuthor,
              role: "comunidad",
              content: newAnswerText,
              likes: 0,
              createdAt: new Date().toISOString().split("T")[0]
            }
          ]
        };
      }
      return q;
    }));

    setNewAnswerText("");
    setNewAnswerAuthor("");
    setAnsweringQId(null);
  };

  const handleLikeAnswer = (qId: string, ansId: string) => {
    setQuestions(prev => prev.map(q => {
      if (q.id === qId) {
        return {
          ...q,
          answers: q.answers.map(ans => ans.id === ansId ? { ...ans, likes: ans.likes + 1 } : ans)
        };
      }
      return q;
    }));
  };

  // Filter articles
  const filteredArticles = selectedCategory === "all" 
    ? articles 
    : articles.filter(art => art.category === selectedCategory);

  const selectedArticle = articles.find(art => art.id === selectedArticleId);

  return (
    <div className="space-y-12 py-6 fade-in-up">
      {/* Article Detail View OR Standard Hub */}
      {selectedArticle ? (
        <div className="space-y-6" id="article-detail-view">
          <button
            onClick={() => setSelectedArticleId(null)}
            className="rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold hover:bg-slate-50 transition flex items-center gap-1.5"
            id="back-to-blog-hub-btn"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al Blog
          </button>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm space-y-6">
            <div className="space-y-3.5 border-b border-slate-100 pb-5">
              <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded uppercase tracking-wider ${
                selectedArticle.category === "Mitos vs Realidad" ? "bg-rose-50 text-rose-700 border border-rose-100" :
                selectedArticle.category === "Empleabilidad" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" :
                "bg-blue-50 text-blue-700 border border-blue-100"
              }`}>
                {selectedArticle.category}
              </span>

              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight">
                {selectedArticle.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500">
                <span className="flex items-center gap-1.5">
                  <UserCircle2 className="h-4 w-4" />
                  {selectedArticle.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  Publicado: {selectedArticle.publishedAt}
                </span>
                <span>Lectura: {selectedArticle.readTime}</span>
              </div>
            </div>

            {/* Custom formatted rendered text content */}
            <div className="text-sm text-slate-700 leading-relaxed font-semibold space-y-4 max-w-none prose prose-slate">
              {selectedArticle.content.split("\n\n").map((paragraph, idx) => (
                <p key={idx} className="whitespace-pre-line">{paragraph}</p>
              ))}
            </div>

            {/* Comments Counter dummy block */}
            <div className="border-t border-slate-100 pt-6 space-y-4">
              <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Comentarios ({selectedArticle.commentsCount})
              </h3>

              {/* Pseudo active comments */}
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50">
                  <div className="flex justify-between text-[11px] font-bold text-slate-700 mb-1">
                    <span>Juan Antonio Pérez</span>
                    <span className="text-slate-400">Hace 2 días</span>
                  </div>
                  <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                    Totalmente de acuerdo con el artículo sobre FP privada. Me gasté 3.200€ en un grado superior de marketing y la mitad de los módulos de primero se limitaban a leer folios en PDF de leyes del 2011. En segundo las prácticas las tuve que buscar yo enviando emails fríos. El público tiene mil veces más cuidado y control.
                  </p>
                </div>
              </div>

              {/* Form placeholder */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">Deja tu comentario neutral:</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Escribe tu opinión respetuosa..."
                    className="w-full text-xs p-2.5 border border-slate-200 rounded-lg focus:outline-none"
                    value={newCommentText}
                    onChange={e => setNewCommentText(e.target.value)}
                  />
                  <button
                    onClick={() => {
                      if (!newCommentText) return;
                      setArticles(prev => prev.map(art => {
                        if (art.id === selectedArticle.id) {
                          return { ...art, commentsCount: art.commentsCount + 1 };
                        }
                        return art;
                      }));
                      setNewCommentText("");
                      alert("¡Comentario añadido en simulación local!");
                    }}
                    className="rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white p-2.5 px-4 text-xs font-bold transition flex items-center gap-1.5 shrink-0"
                  >
                    <Send className="h-3.5 w-3.5" />
                    Enviar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Block: Repository & news */}
          <div className="lg:col-span-7 space-y-6" id="blog-hub-block">
            <div className="border-b border-slate-200 pb-4 space-y-3">
              <div className="flex items-center gap-1.5 text-slate-800">
                <BookOpen className="h-5 w-5 text-blue-600" />
                <h2 className="text-lg font-extrabold text-slate-950">Guías del Orientador y Actualidad</h2>
              </div>
              
              {/* Category buttons */}
              <div className="flex flex-wrap gap-1.5">
                {["all", "Consejos", "Mitos vs Realidad", "Empleabilidad"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold border transition ${
                      selectedCategory === cat
                        ? "bg-slate-900 border-slate-900 text-white"
                        : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {cat === "all" ? "Todas las guías" : cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              {filteredArticles.map((article) => (
                <div
                  key={article.id}
                  onClick={() => setSelectedArticleId(article.id)}
                  className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm hover:shadow-md hover:border-slate-300 transition cursor-pointer flex flex-col justify-between group"
                >
                  <div className="space-y-2.5">
                    <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 font-mono">
                      <span>{article.publishedAt} • por {article.author}</span>
                      <span className="text-blue-600 uppercase tracking-wider">{article.category}</span>
                    </div>
                    <h3 className="font-extrabold text-sm text-slate-950 group-hover:text-blue-600 transition leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                      {article.summary}
                    </p>
                  </div>

                  <div className="border-t border-slate-100 pt-3 mt-4 flex justify-between items-center text-xs font-bold text-slate-500">
                    <span>Tiempo de Lectura: {article.readTime}</span>
                    <span className="text-blue-600 shrink-0 group-hover:translate-x-0.5 transition flex items-center gap-0.5">
                      Leer Guía Completa
                      <ChevronRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Block: Community QA Forum panel */}
          <div className="lg:col-span-5 space-y-6" id="forum-qa-block">
            <div className="border-b border-slate-200 pb-3 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-extrabold text-slate-950">Foro de la Comunidad</h2>
                <p className="text-xs text-slate-500">Resuelve tus dudas con alumnos actuales y profesionales del sector.</p>
              </div>
              <button
                onClick={() => setShowQuestionForm(!showQuestionForm)}
                className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-blue-700 transition"
              >
                {showQuestionForm ? "Cerrar" : "Preguntar"}
              </button>
            </div>

            {/* Ingestion Question Form */}
            {showQuestionForm && (
              <form onSubmit={handlePostQuestion} className="bg-slate-50 p-4 border border-slate-200 rounded-xl space-y-3 fade-in-up">
                <span className="text-xs font-bold text-slate-800 block border-b border-slate-200 pb-1">Nueva duda de orientación</span>
                
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 block uppercase">Tu Nombre o Alías</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Sofia M."
                    value={newQAuthor}
                    onChange={e => setNewQAuthor(e.target.value)}
                    className="w-full text-xs p-2 bg-white border border-slate-200 rounded focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 block uppercase">Tema/Categoría</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Convalidaciones, Acceso"
                      value={newQCategory}
                      onChange={e => setNewQCategory(e.target.value)}
                      className="w-full text-xs p-2 bg-white border border-slate-200 rounded focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 block uppercase">Ciclo de Interés (Opcional)</label>
                    <input
                      type="text"
                      placeholder="Ej. DAW, TCAE"
                      value={newQCycle}
                      onChange={e => setNewQCycle(e.target.value)}
                      className="w-full text-xs p-2 bg-white border border-slate-200 rounded focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 block uppercase font-mono">¿Cuál es tu duda principal?</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. ¿Merece la pena matricularse a distancia?"
                    value={newQTitle}
                    onChange={e => setNewQTitle(e.target.value)}
                    className="w-full text-xs p-2 bg-white border border-slate-200 rounded focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 block uppercase font-mono">Explica tu situación brevemente:</label>
                  <textarea
                    required
                    rows={2}
                    placeholder="Danos contexto, estudios previos, objetivos personales..."
                    value={newQContent}
                    onChange={e => setNewQContent(e.target.value)}
                    className="w-full text-xs p-2 bg-white border border-slate-200 rounded focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded bg-slate-900 text-white font-bold p-2 text-xs hover:bg-slate-800 transition"
                >
                  Publicar en el Foro
                </button>
              </form>
            )}

            {/* Questions list */}
            <div className="space-y-4" id="community-questions-list">
              {questions.map((q) => (
                <div
                  key={q.id}
                  className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm space-y-3"
                >
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <span className="text-[9px] font-extrabold text-blue-600 uppercase block font-mono">
                        {q.category} {q.cycleOfInterest ? `• con interés en ${q.cycleOfInterest}` : ""}
                      </span>
                      <h4 className="font-extrabold text-xs text-slate-900 mt-1 leading-tight">{q.title}</h4>
                      <p className="text-[10px] text-slate-400 font-medium">por {q.author} • {q.createdAt}</p>
                    </div>
                    <button
                      onClick={() => handleLikeQuestion(q.id)}
                      className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-50 text-slate-500 hover:text-rose-600 hover:bg-rose-50 border border-slate-100 text-[10px] font-bold transition font-mono"
                    >
                      <ThumbsUp className="h-3 w-3" />
                      <span>{q.likes}</span>
                    </button>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                    {q.content}
                  </p>

                  {/* Answers render */}
                  <div className="space-y-2.5 border-t border-slate-100 pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Co-Respuestas ({q.answers.length})</span>
                      <button
                        onClick={() => setAnsweringQId(answeringQId === q.id ? null : q.id)}
                        className="text-[10px] font-extrabold text-blue-600 hover:text-blue-700"
                      >
                        {answeringQId === q.id ? "Cancelar" : "Responder"}
                      </button>
                    </div>

                    {/* Answer post mini form */}
                    {answeringQId === q.id && (
                      <form onSubmit={(e) => handlePostAnswer(e, q.id)} className="bg-slate-50 p-2.5 rounded-lg border border-slate-200/80 space-y-2 text-xs">
                        <input
                          type="text"
                          required
                          placeholder="Tu nombre..."
                          className="w-full text-xs p-1.5 bg-white border border-slate-200 rounded focus:outline-none"
                          value={newAnswerAuthor}
                          onChange={e => setNewAnswerAuthor(e.target.value)}
                        />
                        <textarea
                          required
                          rows={2}
                          placeholder="Aporta tus consejos y experiencia real sobre FP..."
                          className="w-full text-xs p-1.5 bg-white border border-slate-200 rounded focus:outline-none"
                          value={newAnswerText}
                          onChange={e => setNewAnswerText(e.target.value)}
                        />
                        <button
                          type="submit"
                          className="w-full bg-blue-600 text-white font-bold py-1 px-2 rounded text-[10px] hover:bg-blue-700 transition"
                        >
                          Añadir Consejo
                        </button>
                      </form>
                    )}

                    {q.answers.map((ans) => (
                      <div key={ans.id} className="p-2.5 rounded bg-slate-50/70 border border-slate-100 flex flex-col justify-between">
                        <div className="flex justify-between text-[9px] font-bold text-slate-400 mb-0.5 font-mono">
                          <span>{ans.author} (<span className="text-blue-600 uppercase tracking-wider">{ans.role}</span>)</span>
                          <span>{ans.createdAt}</span>
                        </div>
                        <p className="text-xs text-slate-700 leading-relaxed font-medium">
                          {ans.content}
                        </p>
                        <div className="flex justify-end pt-1">
                          <button
                            onClick={() => handleLikeAnswer(q.id, ans.id)}
                            className="flex items-center gap-1 text-[9px] font-bold text-slate-400 hover:text-emerald-600"
                          >
                            <ThumbsUp className="h-2.5 w-2.5" />
                            <span>{ans.likes} Votos útiles</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
