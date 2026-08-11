import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabasePublishableKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  '';

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl &&
    supabasePublishableKey &&
    supabaseUrl !== 'https://your-supabase-project.supabase.co' &&
    supabasePublishableKey !== 'your-supabase-publishable-key' &&
    supabasePublishableKey !== 'your-supabase-anon-key'
  );
};

// Initialize the Supabase client safely
export const supabase = createClient(
  isSupabaseConfigured() ? supabaseUrl : 'https://placeholder.supabase.co',
  isSupabaseConfigured() ? supabasePublishableKey : 'placeholder-key'
);

/**
 * Diagnostic helper function to check Supabase configuration status at runtime.
 * Returns availability flags and masked representations without revealing secret values.
 */
export const getSupabaseConfigStatus = () => {
  const urlConfigured = Boolean(
    supabaseUrl && supabaseUrl !== 'https://your-supabase-project.supabase.co'
  );
  const keyConfigured = Boolean(
    supabasePublishableKey &&
    supabasePublishableKey !== 'your-supabase-publishable-key' &&
    supabasePublishableKey !== 'your-supabase-anon-key'
  );

  const maskedUrl = urlConfigured
    ? supabaseUrl.replace(/(https?:\/\/[^.]+)\..*/, '$1.supabase.co')
    : 'NÃO CONFIGURADO';

  const maskedKey = keyConfigured
    ? `${supabasePublishableKey.substring(0, 10)}...${supabasePublishableKey.substring(Math.max(0, supabasePublishableKey.length - 4))}`
    : 'NÃO CONFIGURADO';

  return {
    isConfigured: urlConfigured && keyConfigured,
    urlStatus: urlConfigured ? `Disponível (${maskedUrl})` : 'Ausente (VITE_SUPABASE_URL)',
    keyStatus: keyConfigured ? `Disponível (${maskedKey})` : 'Ausente (VITE_SUPABASE_PUBLISHABLE_KEY)',
  };
};

// Safe diagnostic log on application startup
if (import.meta.env.DEV || !isSupabaseConfigured()) {
  const status = getSupabaseConfigStatus();
  console.log('[Encanto Gourmet] Diagnóstico Supabase Build/Runtime:', {
    isConfigured: status.isConfigured,
    url: status.urlStatus,
    key: status.keyStatus,
  });
}
