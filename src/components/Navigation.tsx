import { Compass, MessageSquareCode, GraduationCap, TrendingUp, BookOpen, Settings, MessageCircle, AlertCircle } from "lucide-react";

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  testimonialCount: number;
  cycleCount: number;
}

export default function Navigation({ activeTab, setActiveTab, testimonialCount, cycleCount }: NavigationProps) {
  const menuItems = [
    { id: "home", label: "Descubrir FP", icon: Compass },
    { id: "testimonials", label: "Testimonios Reales", icon: MessageSquareCode, badge: testimonialCount },
    { id: "employability", label: "Empleabilidad Real", icon: TrendingUp },
    { id: "compare", label: "Comparador y Guías", icon: GraduationCap },
    { id: "blog", label: "El Blog y Foro", icon: BookOpen },
    { id: "control", label: "Centro de Control", icon: Settings, highlight: true }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/90 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo and Slogan */}
        <div 
          className="flex items-center gap-2.5 cursor-pointer"
          onClick={() => setActiveTab("home")}
          id="nav-logo"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
            <span className="font-mono text-xl font-black tracking-tighter">FP</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-bold tracking-tight text-slate-900">SerFP</span>
              <span className="rounded-md bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700 border border-emerald-100 uppercase tracking-wider">Sin Humo</span>
            </div>
            <p className="text-[11px] font-medium text-slate-500">Orientación Real sobre FP en España</p>
          </div>
        </div>

        {/* Navigation Tabs (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1" id="nav-desktop-tabs">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`tab-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`relative flex items-center gap-2 px-3.5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                  isActive
                    ? "bg-slate-900 text-white shadow-sm border-slate-900"
                    : item.highlight
                    ? "text-blue-700 hover:bg-blue-50/70 hover:text-blue-800 border-transparent"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 border-transparent"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-white" : item.highlight ? "text-blue-600" : "text-slate-500"}`} />
                <span>{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className={`inline-flex items-center justify-center px-1.5 py-0.5 ml-1 text-[10px] font-semibold rounded-full ${isActive ? 'bg-white text-slate-900' : 'bg-blue-100 text-blue-700'}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Small Goal Indicator or community count indicator */}
        <div className="hidden sm:flex items-center gap-2" id="nav-right-indicator">
          <div className="text-right">
            <div className="flex items-center justify-end gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[12px] font-bold text-slate-800">Catálogo vivo</span>
            </div>
            <p className="text-[10px] text-slate-500">{cycleCount} ciclos · {testimonialCount} testimonios</p>
          </div>
        </div>
      </div>

      {/* Mobile Navigation bar and controls */}
      <div className="lg:hidden border-t border-slate-100 bg-slate-50/80 overflow-x-auto" id="nav-mobile-scroll">
        <div className="flex px-2 py-1.5 min-w-max gap-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`mobile-tab-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                  isActive
                    ? "bg-slate-900 text-white border-slate-900"
                    : "text-slate-600 hover:bg-slate-200 hover:text-slate-900 border-transparent"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className={`px-1 rounded-full text-[9px] font-bold ${isActive ? 'bg-white text-slate-900' : 'bg-slate-200 text-slate-700'}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
