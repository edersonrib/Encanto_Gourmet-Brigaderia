import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { BoxSizeOption } from '../types';

export const DEFAULT_BOX_OPTIONS: BoxSizeOption[] = [
  { id: 'box-4', size: 4, label: 'Caixa Degustação', basePrice: 22.00, active: true, display_order: 1 },
  { id: 'box-9', size: 9, label: 'Caixa Presente', basePrice: 48.00, active: true, display_order: 2 },
  { id: 'box-16', size: 16, label: 'Caixa Elegance', basePrice: 85.00, active: true, display_order: 3 },
  { id: 'box-25', size: 25, label: 'Caixa Festiva', basePrice: 130.00, active: true, display_order: 4 },
];

const LOCAL_STORAGE_KEY = 'encanto_box_size_options';

const getLocalStorageBoxOptions = (): BoxSizeOption[] => {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Erro ao ler tamanhos de caixa do localStorage:', e);
  }
  return DEFAULT_BOX_OPTIONS;
};

const saveLocalStorageBoxOptions = (options: BoxSizeOption[]): void => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(options));
  } catch (e) {
    console.warn('Erro ao salvar tamanhos de caixa no localStorage:', e);
  }
};

// Fetch active box sizes for the Landing Page / Builder
export const fetchActiveBoxOptions = async (): Promise<BoxSizeOption[]> => {
  if (!isSupabaseConfigured()) {
    const local = getLocalStorageBoxOptions();
    return local.filter(opt => opt.active !== false).sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0) || a.size - b.size);
  }

  try {
    const { data, error } = await supabase
      .from('box_sizes')
      .select('*')
      .eq('active', true)
      .order('display_order', { ascending: true })
      .order('size', { ascending: true });

    if (error || !data || data.length === 0) {
      const local = getLocalStorageBoxOptions();
      return local.filter(opt => opt.active !== false);
    }

    return data.map((row: any) => ({
      id: String(row.id),
      size: Number(row.size),
      label: row.label || `Caixa com ${row.size} unid.`,
      basePrice: Number(row.base_price || 0),
      active: Boolean(row.active),
      display_order: Number(row.display_order ?? 0),
      created_at: row.created_at,
      updated_at: row.updated_at,
    }));
  } catch (err) {
    console.warn('Erro ao buscar box_sizes no Supabase:', err);
    return getLocalStorageBoxOptions().filter(opt => opt.active !== false);
  }
};

// Fetch all box sizes for Admin CMS
export const fetchAllBoxOptionsAdmin = async (): Promise<BoxSizeOption[]> => {
  if (!isSupabaseConfigured()) {
    return getLocalStorageBoxOptions().sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0) || a.size - b.size);
  }

  try {
    const { data, error } = await supabase
      .from('box_sizes')
      .select('*')
      .order('display_order', { ascending: true })
      .order('size', { ascending: true });

    if (error || !data || data.length === 0) {
      return getLocalStorageBoxOptions();
    }

    return data.map((row: any) => ({
      id: String(row.id),
      size: Number(row.size),
      label: row.label || `Caixa com ${row.size} unid.`,
      basePrice: Number(row.base_price || 0),
      active: Boolean(row.active),
      display_order: Number(row.display_order ?? 0),
      created_at: row.created_at,
      updated_at: row.updated_at,
    }));
  } catch (err) {
    return getLocalStorageBoxOptions();
  }
};

// Save (create or update) box size option
export const saveBoxOption = async (option: Partial<BoxSizeOption>): Promise<BoxSizeOption> => {
  const currentList = getLocalStorageBoxOptions();
  const id = option.id || `box-${option.size || Date.now()}`;
  const now = new Date().toISOString();

  const newOption: BoxSizeOption = {
    id,
    size: Number(option.size) || 4,
    label: option.label?.trim() || `Caixa com ${option.size} unid.`,
    basePrice: Number(option.basePrice) || 0,
    active: option.active !== undefined ? option.active : true,
    display_order: Number(option.display_order) || (currentList.length + 1),
    updated_at: now,
  };

  // Update in localStorage
  const existingIdx = currentList.findIndex(item => item.id === id);
  let updatedList: BoxSizeOption[];
  if (existingIdx >= 0) {
    updatedList = [...currentList];
    updatedList[existingIdx] = { ...updatedList[existingIdx], ...newOption };
  } else {
    updatedList = [...currentList, newOption];
  }
  saveLocalStorageBoxOptions(updatedList);

  if (isSupabaseConfigured()) {
    try {
      const payload = {
        size: newOption.size,
        label: newOption.label,
        base_price: newOption.basePrice,
        active: newOption.active,
        display_order: newOption.display_order,
        updated_at: now,
      };

      if (option.id && !option.id.startsWith('box-')) {
        await supabase
          .from('box_sizes')
          .update(payload)
          .eq('id', option.id);
      } else {
        await supabase
          .from('box_sizes')
          .insert([payload]);
      }
    } catch (e) {
      console.warn('Erro ao sincronizar box_size no Supabase:', e);
    }
  }

  return newOption;
};

// Delete box size option
export const deleteBoxOption = async (id: string): Promise<void> => {
  const currentList = getLocalStorageBoxOptions();
  const updatedList = currentList.filter(item => item.id !== id);
  saveLocalStorageBoxOptions(updatedList);

  if (isSupabaseConfigured() && !id.startsWith('box-')) {
    try {
      await supabase
        .from('box_sizes')
        .delete()
        .eq('id', id);
    } catch (e) {
      console.warn('Erro ao deletar box_size no Supabase:', e);
    }
  }
};

// Toggle active state
export const toggleBoxOptionActive = async (id: string, active: boolean): Promise<void> => {
  const currentList = getLocalStorageBoxOptions();
  const updatedList = currentList.map(item => item.id === id ? { ...item, active } : item);
  saveLocalStorageBoxOptions(updatedList);

  if (isSupabaseConfigured() && !id.startsWith('box-')) {
    try {
      await supabase
        .from('box_sizes')
        .update({ active, updated_at: new Date().toISOString() })
        .eq('id', id);
    } catch (e) {
      console.warn('Erro ao atualizar active de box_size no Supabase:', e);
    }
  }
};

// Reset to default box options
export const resetDefaultBoxOptions = async (): Promise<BoxSizeOption[]> => {
  saveLocalStorageBoxOptions(DEFAULT_BOX_OPTIONS);
  return DEFAULT_BOX_OPTIONS;
};
