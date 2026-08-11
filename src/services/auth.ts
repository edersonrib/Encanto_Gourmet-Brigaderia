import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { UserProfile } from '../types';

export const signInWithEmail = async (email: string, password: string) => {
  if (!isSupabaseConfigured()) {
    // For demo/development without Supabase keys yet:
    if (email === 'admin@encantogourmet.pt' && password === 'admin123') {
      const demoUser: UserProfile = {
        id: 'demo-admin-id',
        email: 'admin@encantogourmet.pt',
        role: 'admin',
      };
      localStorage.setItem('encanto_demo_admin', JSON.stringify(demoUser));
      return { user: demoUser, error: null };
    }
    return {
      user: null,
      error: { message: 'Supabase não configurado. Adicione VITE_SUPABASE_URL e VITE_SUPABASE_PUBLISHABLE_KEY no Vercel ou .env' },
    };
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { user: null, error };
  }

  return { user: data.user, error: null };
};

export const signOut = async () => {
  localStorage.removeItem('encanto_demo_admin');
  if (isSupabaseConfigured()) {
    await supabase.auth.signOut();
  }
};

export const getCurrentSession = async () => {
  const demo = localStorage.getItem('encanto_demo_admin');
  if (demo) {
    try {
      return { user: JSON.parse(demo), isDemo: true };
    } catch {
      localStorage.removeItem('encanto_demo_admin');
    }
  }

  if (!isSupabaseConfigured()) {
    return { user: null, isDemo: false };
  }

  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.user) return { user: null, isDemo: false };

  return { user: session.user, isDemo: false };
};

export const getUserRole = async (userId: string): Promise<'admin' | 'editor' | 'user'> => {
  const demo = localStorage.getItem('encanto_demo_admin');
  if (demo) return 'admin';

  if (!isSupabaseConfigured()) return 'user';

  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single();

    if (error || !data) {
      // Default to admin if profiles table row doesn't exist yet for authenticated user
      return 'admin';
    }

    return (data.role as 'admin' | 'editor' | 'user') || 'admin';
  } catch {
    return 'admin';
  }
};
