"use server";

import { createSupabaseServerClient } from "./../supabase/server";
import { Routes } from "@/routes/Routes";
import { SupabaseApi } from "@/supabase/SupabaseApi";

export async function SignInAndCreateDiagnosticAction() {
  try {
    const { data: userData, error } = await SupabaseApi.signInAnonymously();

    if (error) {
      console.error("Sign in error:", error);
      return { success: false, error: "Failed to sign in anonymously" };
    }

    if (!userData?.user?.id) {
      console.error("No user ID returned from sign in");
      return { success: false, error: "No user ID returned" };
    }

    const { error: createError } = await SupabaseApi.createDiagnostic(
      userData.user.id
    );

    if (createError) {
      console.error("Create diagnostic error:", createError);
      return { success: false, error: "Failed to create diagnostic" };
    }

    // Return a success response with the redirect path
    // The client will handle the actual redirect
    return { success: true, redirectTo: Routes.StudentProfile };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function updateDiagnostic() {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: loggedInUser } = await supabase.auth.getUser();
  } catch (e) {}
}
