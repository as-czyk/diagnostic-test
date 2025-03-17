import { User, UserAttributes } from "@supabase/supabase-js";
import { createClient } from "../client";

export const AuthApi = {
  signInAnonymously: async () => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInAnonymously();
    return { data, error };
  },
  updateUser: async (user: Partial<User>) => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.updateUser(user);
    return { data, error };
  },
};
