import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, X, Bot, Sparkles, User, RefreshCw, AlertCircle } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}

interface AIAdvisorProps {
  initialPrompt: string | null;
  onClosePrompt: () => void;
}

export default function AIAdvisor({ initialPrompt, onClosePrompt }: AIAdvisorProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "ai",
      text: "¡Hola! Soy SerFP AI, tu orientador virtual neutral y libre de publicidad o humo comercial. Estoy aquí para resolver tus dudas reales sobre Formación Profesional en España: salarios reales, la verdad sobre la FP Dual, convalidaciones con universidad o el nivel de dificultad. ¿Cómo te llamas y qué áreas te interesan?",
      timestamp: new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const listEndRef = useRef<HTMLDivElement>(null);

  // Auto-trigger if parent instructs an initial prompt
  useEffect(() => {
    if (initialPrompt) {
      setIsOpen(true);
      sendQuery(initialPrompt);
      onClosePrompt(); // reset parent state
    }
  }, [initialPrompt]);

  // Handle scroll to bottom
  useEffect(() => {
    listEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendQuery = async (queryText: string) => {
    if (!queryText.trim()) return;

    const userMsg: Message = {
      id: "u-" + Date.now(),
      sender: "user",
      text: queryText,
      timestamp: new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText("");
    setLoading(true);

    try {
      const chatHistory = messages.map(m => ({
        sender: m.sender === "user" ? "user" : "model",
        text: m.text
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: queryText,
          history: chatHistory
        })
      });

      const data = await res.json();
      const aiReplyText = data.text || "Lo siento, ha habido un problema al procesar la información de orientación.";

      const aiMsg: Message = {
        id: "ai-" + Date.now(),
        sender: "ai",
        text: aiReplyText,
        timestamp: new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })
      };

      setMessages(prev => [...prev, aiMsg]);

    } catch (err) {
      console.error("Failed to query API chat:", err);
      // Fallback message
      const errorMsg: Message = {
        id: "ai-err-" + Date.now(),
        sender: "ai",
        text: "Parece que hay un percance de red para consultar mi inteligencia artificial. No obstante, te aconsejo buscar centros públicos con buen renombre en tu zona o escribirme por el foro comunitario. ¿Quieres volver a intentarlo?",
        timestamp: new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendQuery(inputText);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Dynamic Pop-up chat */}
      {isOpen ? (
        <div 
          className="bg-white border border-slate-200/95 rounded-2xl shadow-2xl h-[480px] w-80 sm:w-96 flex flex-col justify-between overflow-hidden transition-all duration-300 transform scale-100"
          id="ai-advisor-panel"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-900 to-indigo-950 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500 text-white shadow-sm">
                <Bot className="h-4 w-4" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-xs font-bold leading-none">SerFP AI</span>
                  <Sparkles className="h-3 w-3 text-amber-400 fill-current" />
                </div>
                <span className="text-[10px] text-slate-300">Orientador Virtual Independiente</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded bg-white/10 hover:bg-white/20 text-white/80 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages list */}
          <div 
            className="flex-1 bg-slate-50 overflow-y-auto p-4 space-y-3 scroll-smooth"
            id="chat-messages-container"
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 max-w-[85%] ${m.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}
              >
                <div className={`h-6 w-6 rounded-full flex items-center justify-center shrink-0 ${
                  m.sender === "user" ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-700"
                }`}>
                  {m.sender === "user" ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
                </div>

                <div className={`p-3 rounded-2xl text-xs space-y-1 ${
                  m.sender === "user" 
                    ? "bg-blue-600 text-white rounded-tr-none shadow-sm"
                    : "bg-white text-slate-800 border border-slate-200/80 rounded-tl-none shadow-sm"
                }`}>
                  <p className="whitespace-pre-wrap font-semibold leading-relaxed">{m.text}</p>
                  <span className={`text-[9px] block text-right font-medium ${m.sender === "user" ? "text-blue-100" : "text-slate-400"}`}>
                    {m.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-2.5 items-center mr-auto max-w-[85%]">
                <div className="h-6 w-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center">
                  <Bot className="h-3.5 w-3.5" />
                </div>
                <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-slate-200/80 text-slate-400 text-xs flex items-center gap-1.5 font-bold shadow-sm">
                  <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  Redactando respuesta honesta...
                </div>
              </div>
            )}
            <div ref={listEndRef} />
          </div>

          {/* Input Panel Form */}
          <form onSubmit={handleFormSubmit} className="p-3 border-t border-slate-100 bg-white flex gap-2">
            <input
              type="text"
              placeholder="Pregunta sobre salarios, convalidaciones..."
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              disabled={loading}
              className="flex-1 text-xs p-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 disabled:bg-slate-100"
            />
            <button
              type="submit"
              disabled={loading || !inputText.trim()}
              className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white p-2.5 px-3.5 transition flex items-center justify-center disabled:bg-slate-200 shrink-0"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white h-12 px-4.5 rounded-full shadow-lg flex items-center gap-2 transition duration-300 hover:scale-105"
          id="open-ai-advisor-toggle-btn"
        >
          <Bot className="h-5 w-5 animate-pulse" />
          <span className="text-xs font-bold font-mono">Preguntar a SerFP AI</span>
        </button>
      )}
    </div>
  );
}
