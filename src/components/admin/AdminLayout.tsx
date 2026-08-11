import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { signOut, getCurrentSession } from '../../services/auth';
import { BRAND_CONFIG } from '../../config/brand';
import {
  LayoutDashboard,
  ShoppingBag,
  PlusCircle,
  LogOut,
  ExternalLink,
  Sparkles,
  Menu,
  X,
  User,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { isSupabaseConfigured } from '../../lib/supabase';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title, subtitle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userEmail, setUserEmail] = useState<string>('admin@encantogourmet.pt');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    getCurrentSession().then(({ user, isDemo }) => {
      if (!user) {
        navigate('/admin/login');
      } else {
        setUserEmail(user.email || 'admin@encantogourmet.pt');
        setIsDemo(Boolean(isDemo));
      }
    });
  }, [navigate]);

  const handleLogout = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Visão Geral', path: '/admin', icon: LayoutDashboard },
    { label: 'Gerenciar Produtos', path: '/admin/products', icon: ShoppingBag },
    { label: 'Novo Produto', path: '/admin/products/new', icon: PlusCircle },
  ];

  return (
    <div className="min-h-screen bg-[#1F120E] text-[#FAF7F2] font-sans flex flex-col md:flex-row">
      
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex md:w-64 bg-[#170D0B] border-r border-[#2C1A14] flex-col justify-between p-6 shrink-0">
        <div>
          {/* Brand Logo */}
          <div className="flex items-center space-x-3 pb-6 border-b border-[#2C1A14] mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#9A7B1C] flex items-center justify-center text-[#1F120E] font-serif font-bold text-xl shadow-lg">
              E
            </div>
            <div>
              <h1 className="font-serif text-base font-bold text-[#FAF7F2] tracking-wide">
                {BRAND_CONFIG.name}
              </h1>
              <span className="text-[10px] uppercase font-semibold text-[#D4AF37] tracking-widest block">
                Painel Administrativo
              </span>
            </div>
          </div>

          {/* Warning Banner if Supabase env is not configured yet */}
          {!isSupabaseConfigured() && (
            <div className="mb-6 p-3 rounded-xl bg-amber-950/60 border border-amber-500/40 text-amber-200 text-[11px] leading-relaxed">
              <div className="flex items-center font-semibold text-amber-300 mb-1">
                <AlertTriangle className="w-3.5 h-3.5 mr-1 shrink-0" />
                <span>Supabase não ativo</span>
              </div>
              <p className="text-[10px] text-amber-200/80">
                Configure <code className="text-amber-100 bg-amber-900/80 px-1 rounded">VITE_SUPABASE_URL</code> e <code className="text-amber-100 bg-amber-900/80 px-1 rounded">VITE_SUPABASE_PUBLISHABLE_KEY</code> no Vercel ou <code className="text-amber-100 bg-amber-900/80 px-1 rounded">.env</code>.
              </p>
            </div>
          )}

          {/* Navigation Items */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path) && item.path !== '/admin/products/new');
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#2C1A14] text-[#D4AF37] border border-[#D4AF37]/30 shadow-md font-semibold'
                      : 'text-[#E8DFD5]/70 hover:text-[#FAF7F2] hover:bg-[#2C1A14]/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#D4AF37]' : 'text-[#E8DFD5]/50'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Sidebar info & Logout */}
        <div className="pt-6 border-t border-[#2C1A14] space-y-4">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#2C1A14]/40 hover:bg-[#2C1A14] text-xs text-[#E8DFD5]/80 hover:text-[#D4AF37] transition-colors"
          >
            <span className="flex items-center space-x-2">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Ver Landing Page</span>
            </span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-2 min-w-0">
              <div className="w-7 h-7 rounded-full bg-[#2C1A14] flex items-center justify-center text-[#D4AF37]">
                <User className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-medium text-[#FAF7F2] truncate">{userEmail}</p>
                <p className="text-[9px] text-[#D4AF37] uppercase font-semibold tracking-wider">
                  {isDemo ? 'Modo Demonstração' : 'Administrador'}
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-1.5 text-[#E8DFD5]/60 hover:text-red-400 hover:bg-red-950/40 rounded-lg transition-colors"
              title="Sair do painel"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Top Header */}
      <header className="md:hidden bg-[#170D0B] border-b border-[#2C1A14] p-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#9A7B1C] flex items-center justify-center text-[#1F120E] font-serif font-bold text-base">
            E
          </div>
          <div>
            <h1 className="font-serif text-sm font-bold text-[#FAF7F2]">{BRAND_CONFIG.name}</h1>
            <span className="text-[9px] uppercase font-semibold text-[#D4AF37]">CMS Admin</span>
          </div>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-[#E8DFD5] hover:text-[#D4AF37]"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#170D0B] border-b border-[#2C1A14] p-4 space-y-2 sticky top-[57px] z-30 shadow-2xl">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-medium ${
                  isActive ? 'bg-[#2C1A14] text-[#D4AF37]' : 'text-[#E8DFD5]/80'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
          <div className="pt-3 border-t border-[#2C1A14] flex justify-between items-center">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#D4AF37] flex items-center space-x-1"
            >
              <span>Ver Landing Page</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <button
              onClick={handleLogout}
              className="text-xs text-red-400 flex items-center space-x-1"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full">
        {/* Header Title Section */}
        <div className="mb-8 pb-4 border-b border-[#2C1A14] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif-display text-2xl sm:text-3xl text-[#FAF7F2] font-semibold">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xs text-[#E8DFD5]/70 mt-1 font-light">{subtitle}</p>
            )}
          </div>
        </div>

        {/* Dynamic Page Content */}
        {children}
      </main>

    </div>
  );
};
