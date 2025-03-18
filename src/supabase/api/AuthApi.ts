import { createSupabaseServerClient } from "../server";

export const AuthApi = {
  signInAnonymously: async () => {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.auth.signInAnonymously();
    return { data, error };
  },
};
