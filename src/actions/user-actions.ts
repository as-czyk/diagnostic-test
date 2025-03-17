"use server";

import { createSupabaseAdminClient } from "@/supabase/admin";
import { SupabaseApi } from "@/supabase/SupabaseApi";

// Define the input type for the updateUserProfile action
type UpdateUserProfileInput = {
  firstName: string;
  lastName: string;
  email: string;
  examDate: Date;
  desiredScore: number;
  motivation?: string;
};

/**
 * Server action to update a user's profile
 */
export async function updateUserProfile(
  data: UpdateUserProfileInput,
  userId: string | undefined
) {
  try {
    // Get the server-side Supabase client
    const supabase = await createSupabaseAdminClient();

    // Update the user metadata and email
    const { data: userData, error } = await supabase.auth.admin.updateUserById(
      userId ?? "",
      {
        user_metadata: {
          first_name: data.firstName,
          last_name: data.lastName,
        },
        email: data.email,
      }
    );

    if (error) {
      console.error("Error updating user:", error);
      return { success: false, error: error?.message };
    }

    const { data: userProfileData, error: userProfileError } =
      await SupabaseApi.createUserProfile({
        user_id: userData.user?.id ?? "",
        sat_metadata: {
          exam_date: data.examDate.toISOString(),
          desired_score: data.desiredScore,
          motivation: data.motivation,
        },
      });

    if (userProfileError) {
      console.error("Error creating user profile:", userProfileError);
      return { success: false, error: userProfileError?.message };
    }

    // Return success
    return { success: true, data: userData, userProfileData };
  } catch (error) {
    console.error("Unexpected error updating user:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}
