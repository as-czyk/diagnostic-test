"use server";

import { createSupabaseServerClient } from "@/supabase/server";

export async function createPersonalizedPlan() {
  const supabase = await createSupabaseServerClient();
}
