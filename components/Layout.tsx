import React, { useState } from 'react';
import { LayoutDashboard, Users, Activity, Settings, Menu, X, Anchor } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'analysis', label: 'Analysis', icon: Activity },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-[#09090b] text-slate-200 font-sans selection:bg-blue-500/30">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-[#09090b] border-r border-[#27272a] transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0 lg:flex lg:flex-col
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center h-16 px-6 border-b border-[#27272a]">
          <Anchor className="w-5 h-5 text-blue-500 mr-2" />
          <span className="font-semibold text-white tracking-tight">OceanMind</span>
        </div>

        <nav className="p-4 space-y-1 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center px-3 py-2 rounded-md transition-all duration-200 text-sm font-medium
                  ${isActive 
                    ? 'bg-[#27272a] text-white' 
                    : 'text-slate-400 hover:text-white hover:bg-[#27272a]/50'
                  }
                `}
              >
                <Icon className={`w-4 h-4 mr-3 ${isActive ? 'text-blue-500' : 'text-slate-500'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#27272a]">
          <div className="flex items-center gap-3 px-2">
             <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white">
               KM
             </div>
             <div className="flex-1 min-w-0">
               <p className="text-sm font-medium text-white truncate">Kaivalya Maske</p>
               <p className="text-xs text-slate-500 truncate">Pro Plan</p>
             </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-[#09090b]">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between p-4 border-b border-[#27272a]">
          <div className="flex items-center">
            <Anchor className="w-5 h-5 text-blue-500 mr-2" />
            <span className="font-semibold text-white">OceanMind</span>
          </div>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-slate-400">
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;