import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../components/admin/AdminLayout';
import {
  fetchAllBoxOptionsAdmin,
  saveBoxOption,
  deleteBoxOption,
  toggleBoxOptionActive,
  resetDefaultBoxOptions
} from '../services/boxSettings';
import { BoxSizeOption } from '../types';
import {
  Gift,
  PlusCircle,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  Save,
  X
} from 'lucide-react';

export const AdminBoxSizes: React.FC = () => {
  const [boxOptions, setBoxOptions] = useState<BoxSizeOption[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [sizeInput, setSizeInput] = useState<number>(6);
  const [labelInput, setLabelInput] = useState<string>('');
  const [activeInput, setActiveInput] = useState<boolean>(true);
  const [successMsg, setSuccessMsg] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const loadOptions = async () => {
    setLoading(true);
    try {
      const data = await fetchAllBoxOptionsAdmin();
      setBoxOptions(data);
    } catch (err: any) {
      setErrorMsg(err.message || 'Erro ao carregar opções.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOptions();
  }, []);

  const handleOpenNew = () => {
    setEditingId(null);
    setSizeInput(6);
    setLabelInput('Caixa Especial');
    setActiveInput(true);
    setIsEditing(true);
    setSuccessMsg('');
    setErrorMsg('');
  };

  const handleOpenEdit = (opt: BoxSizeOption) => {
    setEditingId(opt.id);
    setSizeInput(opt.size);
    setLabelInput(opt.label);
    setActiveInput(opt.active);
    setIsEditing(true);
    setSuccessMsg('');
    setErrorMsg('');
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingId(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sizeInput || sizeInput < 1) {
      setErrorMsg('Informe uma quantidade válida de unidades (mínimo 1).');
      return;
    }
    if (!labelInput.trim()) {
      setErrorMsg('Informe um nome ou rótulo para a caixa.');
      return;
    }

    try {
      await saveBoxOption({
        id: editingId || undefined,
        size: Number(sizeInput),
        label: labelInput.trim(),
        active: activeInput,
      });

      setSuccessMsg(editingId ? 'Tamanho de caixa atualizado com sucesso!' : 'Novo tamanho de caixa cadastrado!');
      setIsEditing(false);
      setEditingId(null);
      await loadOptions();
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Erro ao salvar configuração.');
    }
  };

  const handleToggleActive = async (id: string, currentActive: boolean) => {
    try {
      await toggleBoxOptionActive(id, !currentActive);
      setBoxOptions(prev => prev.map(o => o.id === id ? { ...o, active: !currentActive } : o));
    } catch (err: any) {
      alert(`Erro: ${err.message}`);
    }
  };

  const handleDelete = async (id: string, size: number) => {
    if (boxOptions.length <= 1) {
      alert('Você precisa manter pelo menos 1 tamanho de caixa cadastrado.');
      return;
    }

    if (!window.confirm(`Deseja realmente remover a opção de caixa com ${size} unidades?`)) {
      return;
    }

    try {
      await deleteBoxOption(id);
      setBoxOptions(prev => prev.filter(o => o.id !== id));
      setSuccessMsg('Opção de caixa removida com sucesso.');
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err: any) {
      alert(`Erro ao remover: ${err.message}`);
    }
  };

  const handleResetDefaults = async () => {
    if (!window.confirm('Deseja restaurar as opções de tamanhos de caixas padrão (4, 9, 16 e 25 unidades)?')) {
      return;
    }

    try {
      const defaults = await resetDefaultBoxOptions();
      setBoxOptions(defaults);
      setSuccessMsg('Tamanhos padrão restaurados com sucesso!');
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err: any) {
      alert(`Erro ao restaurar: ${err.message}`);
    }
  };

  return (
    <AdminLayout
      title="Tamanhos de Caixas de Presente"
      subtitle="Gerencie e reconfigure os tamanhos de caixas disponíveis para montagem personalizada pelos clientes."
    >
      {/* Alert Messages */}
      {successMsg && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-xs flex items-center justify-between animate-fadeIn">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{successMsg}</span>
          </div>
          <button onClick={() => setSuccessMsg('')}><X className="w-4 h-4" /></button>
        </div>
      )}

      {errorMsg && (
        <div className="mb-6 p-4 rounded-xl bg-red-950/80 border border-red-500/40 text-red-200 text-xs flex items-center justify-between animate-fadeIn">
          <div className="flex items-center space-x-2">
            <XCircle className="w-4 h-4 text-red-400" />
            <span>{errorMsg}</span>
          </div>
          <button onClick={() => setErrorMsg('')}><X className="w-4 h-4" /></button>
        </div>
      )}

      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h3 className="font-serif text-lg font-bold text-[#FAF7F2] flex items-center">
            <Gift className="w-5 h-5 text-[#D4AF37] mr-2" />
            Opções de Caixas Ativas
          </h3>
          <p className="text-xs text-[#E8DFD5]/70 mt-0.5">
            Essas opções aparecem no passo 1 do configurador "Montar Sua Caixa Personalizada".
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleResetDefaults}
            type="button"
            className="px-3.5 py-2.5 rounded-xl bg-[#2C1A14] hover:bg-[#382119] text-[#E8DFD5] hover:text-[#FAF7F2] border border-[#D4AF37]/30 text-xs font-medium transition-all flex items-center space-x-1.5"
            title="Restaurar tamanhos padrão (4, 9, 16, 25)"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restaurar Padrões</span>
          </button>

          <button
            onClick={handleOpenNew}
            type="button"
            className="px-4 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#C59B27] text-[#1F120E] text-xs font-semibold uppercase tracking-wider shadow-lg transition-all flex items-center space-x-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Novo Tamanho</span>
          </button>
        </div>
      </div>

      {/* Modal / Inline Form for Add or Edit */}
      {isEditing && (
        <div className="mb-8 bg-[#2C1A14] border border-[#D4AF37]/40 rounded-2xl p-6 animate-fadeIn shadow-2xl">
          <div className="flex items-center justify-between pb-4 border-b border-[#D4AF37]/20 mb-5">
            <h4 className="font-serif text-base font-bold text-[#FAF7F2] flex items-center">
              <Sparkles className="w-4 h-4 text-[#D4AF37] mr-2" />
              {editingId ? 'Editar Tamanho de Caixa' : 'Cadastrar Novo Tamanho de Caixa'}
            </h4>
            <button
              onClick={handleCancelEdit}
              className="text-[#E8DFD5]/60 hover:text-[#FAF7F2] p-1 rounded-lg hover:bg-[#1F120E]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase font-semibold text-[#D4AF37] mb-1.5">
                  Quantidade de Unidades (Tamanho) *
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  required
                  value={sizeInput}
                  onChange={(e) => setSizeInput(parseInt(e.target.value) || 0)}
                  className="w-full bg-[#1F120E] border border-[#D4AF37]/30 rounded-xl p-3 text-xs text-[#FAF7F2] focus:outline-none focus:border-[#D4AF37]"
                  placeholder="Ex: 6, 8, 12, 20"
                />
                <p className="text-[10px] text-[#E8DFD5]/60 mt-1">
                  Número exato de brigadeiros que cabem nesta caixa.
                </p>
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-[#D4AF37] mb-1.5">
                  Nome / Rótulo da Caixa *
                </label>
                <input
                  type="text"
                  required
                  value={labelInput}
                  onChange={(e) => setLabelInput(e.target.value)}
                  className="w-full bg-[#1F120E] border border-[#D4AF37]/30 rounded-xl p-3 text-xs text-[#FAF7F2] focus:outline-none focus:border-[#D4AF37]"
                  placeholder="Ex: Caixa Degustação, Caixa Especial, Caixa Luxo"
                />
                <p className="text-[10px] text-[#E8DFD5]/60 mt-1">
                  Nome descritivo exibido no botão para o cliente.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <input
                type="checkbox"
                id="activeBoxCheck"
                checked={activeInput}
                onChange={(e) => setActiveInput(e.target.checked)}
                className="w-4 h-4 rounded text-[#D4AF37] bg-[#1F120E] border-[#D4AF37]/30 focus:ring-[#D4AF37]"
              />
              <label htmlFor="activeBoxCheck" className="text-xs text-[#FAF7F2] cursor-pointer">
                Tamanho Ativo (visível no configurador da Landing Page)
              </label>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-[#D4AF37]/20">
              <button
                type="button"
                onClick={handleCancelEdit}
                className="px-4 py-2.5 rounded-xl bg-[#1F120E] text-[#E8DFD5] hover:text-[#FAF7F2] text-xs font-medium transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#E5C378] to-[#D4AF37] text-[#1F120E] text-xs font-semibold uppercase tracking-wider shadow-lg flex items-center space-x-2 hover:opacity-90 transition-opacity"
              >
                <Save className="w-4 h-4" />
                <span>Salvar Configuração</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Box Sizes Grid / Table */}
      <div className="bg-[#170D0B] border border-[#2C1A14] rounded-2xl overflow-hidden">
        {loading ? (
          <div className="text-center py-12 text-xs text-[#E8DFD5]/60">
            Carregando opções de tamanhos de caixas...
          </div>
        ) : boxOptions.length === 0 ? (
          <div className="text-center py-12 text-xs text-[#E8DFD5]/60 space-y-3">
            <p>Nenhum tamanho de caixa cadastrado.</p>
            <button
              onClick={handleResetDefaults}
              className="px-4 py-2 rounded-xl bg-[#D4AF37] text-[#1F120E] text-xs font-semibold"
            >
              Restaurar Padrões (4, 9, 16, 25)
            </button>
          </div>
        ) : (
          <div className="divide-y divide-[#2C1A14]">
            {boxOptions.map((opt) => (
              <div
                key={opt.id}
                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#1F120E]/50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2C1A14] to-[#1F120E] border border-[#D4AF37]/40 flex flex-col items-center justify-center text-center shrink-0">
                    <span className="font-serif text-lg font-bold text-[#D4AF37] leading-none">
                      {opt.size}
                    </span>
                    <span className="text-[9px] text-[#E8DFD5]/70 uppercase tracking-tighter">
                      unid.
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-serif text-sm sm:text-base font-bold text-[#FAF7F2]">
                        {opt.label}
                      </h4>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          opt.active
                            ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
                            : 'bg-red-950/80 text-red-300 border border-red-500/30'
                        }`}
                      >
                        {opt.active ? 'Ativa' : 'Inativa'}
                      </span>
                    </div>
                    <p className="text-xs text-[#E8DFD5]/60 mt-0.5">
                      Capacidade: <strong>{opt.size} brigadeiros</strong> gourmet
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 self-end sm:self-center">
                  <button
                    onClick={() => handleToggleActive(opt.id, opt.active)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                      opt.active
                        ? 'bg-[#2C1A14] text-[#E8DFD5]/80 hover:text-amber-300'
                        : 'bg-emerald-950/60 text-emerald-300 hover:bg-emerald-900/60'
                    }`}
                  >
                    {opt.active ? 'Desativar' : 'Ativar'}
                  </button>

                  <button
                    onClick={() => handleOpenEdit(opt)}
                    className="p-2 text-[#E8DFD5]/70 hover:text-[#D4AF37] hover:bg-[#2C1A14] rounded-xl transition-colors"
                    title="Editar tamanho"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDelete(opt.id, opt.size)}
                    className="p-2 text-[#E8DFD5]/60 hover:text-red-400 hover:bg-red-950/40 rounded-xl transition-colors"
                    title="Excluir tamanho"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </AdminLayout>
  );
};
