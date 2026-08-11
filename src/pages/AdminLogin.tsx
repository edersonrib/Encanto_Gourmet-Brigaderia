import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmail } from '../services/auth';
import { BRAND_CONFIG } from '../config/brand';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, Info } from 'lucide-react';
import { isSupabaseConfigured } from '../lib/supabase';

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !password) {
      setErrorMessage('Por favor, preencha o e-mail e a senha.');
      return;
    }

    setLoading(true);

    try {
      const { user, error } = await signInWithEmail(email, password);

      if (error) {
        setErrorMessage(error.message || 'Falha na autenticação. Verifique suas credenciais.');
      } else if (user) {
        navigate('/admin');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Erro inesperado ao conectar.');
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmail('admin@encantogourmet.pt');
    setPassword('admin123');
  };

  return (
    <div className="min-h-screen bg-[#1F120E] text-[#FAF7F2] font-sans flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#170D0B] border border-[#2C1A14] rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        
        {/* Glow Decoration */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#9A7B1C] flex items-center justify-center text-[#1F120E] font-serif font-bold text-2xl shadow-xl mb-4">
            E
          </div>
          <h1 className="font-serif text-2xl font-bold text-[#FAF7F2]">
            {BRAND_CONFIG.name}
          </h1>
          <p className="text-xs text-[#D4AF37] uppercase tracking-widest font-semibold mt-1">
            Painel Administrativo CMS
          </p>
          <p className="text-xs text-[#E8DFD5]/70 mt-2 font-light">
            Entre com as suas credenciais para gerenciar produtos e fotos.
          </p>
        </div>

        {/* Supabase Notice Banner */}
        {!isSupabaseConfigured() && (
          <div className="mb-6 p-3.5 rounded-xl bg-amber-950/60 border border-amber-500/40 text-xs text-amber-200 leading-relaxed">
            <div className="flex items-center font-semibold text-amber-300 mb-1">
              <Info className="w-4 h-4 mr-1.5 shrink-0" />
              <span>Acesso em Modo de Teste</span>
            </div>
            <p className="text-[11px] text-amber-200/90 mb-2">
              As chaves do Supabase (<code className="bg-amber-900/80 px-1 rounded">VITE_SUPABASE_URL</code> e <code className="bg-amber-900/80 px-1 rounded">VITE_SUPABASE_PUBLISHABLE_KEY</code>) ainda não foram identificadas neste ambiente.
            </p>
            <button
              type="button"
              onClick={handleFillDemo}
              className="px-3 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 font-semibold rounded-lg text-[10px] border border-amber-500/40 transition-colors"
            >
              Preencher credenciais de teste (admin@encantogourmet.pt)
            </button>
          </div>
        )}

        {/* Error Feedback */}
        {errorMessage && (
          <div className="mb-6 p-3.5 rounded-xl bg-red-950/80 border border-red-500/50 text-xs text-red-200 flex items-start space-x-2 animate-fadeIn">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#E8DFD5] mb-1.5">
              E-mail do Administrador:
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-3 text-[#E8DFD5]/40" />
              <input
                type="email"
                placeholder="ex: admin@encantogourmet.pt"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[#1F120E] border border-[#2C1A14] focus:border-[#D4AF37] rounded-xl py-2.5 pl-10 pr-3 text-xs text-[#FAF7F2] placeholder-[#E8DFD5]/30 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#E8DFD5] mb-1.5">
              Senha:
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-3 text-[#E8DFD5]/40" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-[#1F120E] border border-[#2C1A14] focus:border-[#D4AF37] rounded-xl py-2.5 pl-10 pr-3 text-xs text-[#FAF7F2] placeholder-[#E8DFD5]/30 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 mt-2 bg-gradient-to-r from-[#D4AF37] to-[#B89428] hover:from-[#E5C148] hover:to-[#D4AF37] text-[#1F120E] font-semibold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {loading ? (
              <span>Autenticando...</span>
            ) : (
              <>
                <span>Acessar Painel</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-4 border-t border-[#2C1A14] text-center">
          <a
            href="/"
            className="text-xs text-[#E8DFD5]/60 hover:text-[#D4AF37] transition-colors inline-flex items-center space-x-1"
          >
            <span>← Voltar para a Landing Page</span>
          </a>
        </div>

      </div>
    </div>
  );
};
