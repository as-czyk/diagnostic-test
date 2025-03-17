"use client";

import { createClient } from "./client";
import { Exam } from "./db/exam/schema";
import { SatQuestion } from "./db/sat-questions/schema";

export const ClientApi = {
  async getExamById(
    id: string
  ): Promise<{ data: Exam | null; error: Error | null }> {
    try {
      const supabase = createClient();

      const { data, error } = await supabase
        .from("exams")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        return { data: null, error: new Error(error.message) };
      }

      return { data, error: null };
    } catch (error) {
      console.error("Error getting exam:", error);
      return {
        data: null,
        error:
          error instanceof Error
            ? error
            : new Error("An unexpected error occurred"),
      };
    }
  },

  async getQuestionById(
    id: string
  ): Promise<{ data: SatQuestion | null; error: Error | null }> {
    try {
      const supabase = createClient();

      const { data, error } = await supabase
        .from("sat_questions")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        return { data: null, error: new Error(error.message) };
      }

      return { data, error: null };
    } catch (error) {
      console.error("Error getting question:", error);
      return {
        data: null,
        error:
          error instanceof Error
            ? error
            : new Error("An unexpected error occurred"),
      };
    }
  },

  // Add other client-side methods as needed
};
