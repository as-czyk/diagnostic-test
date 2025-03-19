import { createSupabaseAdminClient } from "../admin";
import { createSupabaseServerClient } from "../server";

export const AuthApi = {
  signInAnonymously: async () => {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.auth.signInAnonymously();
    return { data, error };
  },
  getUserById: async (id: string) => {
    const supabase = await createSupabaseAdminClient();
    const { data, error } = await supabase.auth.admin.getUserById(id);
    return { data, error };
  },
};
