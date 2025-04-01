import { createClient } from "@/supabase/client";
import { createMastraSupabaseAdminClient } from "@/supabase/mastra";
import { createTool } from "@mastra/core/tools";
import htmlPdf from "html-pdf-node";
import { z } from "zod";

export const getQuestionDetailsTool = createTool({
  id: "get-question-details",
  description: "Get the details of a question",
  inputSchema: z.object({
    questionId: z.string().describe("The id of the question"),
  }),
  outputSchema: z.object({
    data: z.any(),
    error: z.string().optional(),
  }),
  execute: async ({ context }) => {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("sat_questions")
      .select("*")
      .eq("id", context.questionId)
      .single();
    return {
      data,
      error: error?.message || undefined,
    };
  },
});

export const getExamResultTool = createTool({
  id: "get-exam-result",
  description: "Get the result of an exam for an id.",
  inputSchema: z.object({
    examId: z.string().describe("The id of the exam"),
  }),
  outputSchema: z.object({
    data: z.any(),
    error: z.string().optional(),
  }),
  execute: async ({ context }) => {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("exam_results")
      .select("*")
      .eq("id", context.examId)
      .single();

    if (data) {
      const enhancedData = [];
      const { single_result } = data;

      for (const result of single_result) {
        const { data: questionData, error: questionError } = await supabase
          .from("sat_questions")
          .select("question, subtopic, difficulty_level, choices")
          .eq("id", result.question_id)
          .single();

        const questionString = `Question Subtopic: ${questionData?.subtopic}, Difficulty Level: ${questionData?.difficulty_level}`;

        enhancedData.push({ ...result, question: questionString });
      }

      return {
        data: enhancedData,
        error: error?.message || undefined,
      };
    }

    return {
      data,
      error: error?.message || undefined,
    };
  },
});

export const generateAndSavePdfTool = createTool({
  id: "generate-and-save-pdf",
  description:
    "Generates PDF from HTML and saves it directly to Supabase storage",
  inputSchema: z.object({
    htmlContent: z.string().describe("The HTML content to convert to PDF"),
    fileName: z.string().describe("Name to save the file as in the bucket"),
    options: z
      .object({
        format: z.enum(["A4", "Letter", "Legal"]).optional().default("A4"),
        landscape: z.boolean().optional().default(false),
      })
      .optional(),
  }),
  outputSchema: z.object({
    success: z.boolean(),
    url: z.string().optional(),
    error: z.string().optional(),
  }),
  execute: async ({ context }) => {
    try {
      const supabase = await createMastraSupabaseAdminClient();

      // Set up the options
      const options = {
        format: context.options?.format || "A4",
        landscape: context.options?.landscape || false,
      };

      // Generate PDF buffer
      const file = { content: context.htmlContent };
      const pdfBuffer = await htmlPdf.generatePdf(file, options);

      // Convert buffer to blob
      const pdfBlob = new Blob([pdfBuffer], { type: "application/pdf" });

      // Upload to Supabase
      const { data, error } = await supabase.storage
        .from("studyplan")
        .upload(`studyplan/${context?.fileName}`, pdfBlob, {
          contentType: "application/pdf",
        });

      console.log("DATA", data);
      console.log("ERROR", error);

      if (error) throw error;

      // Get the public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("studyplan").getPublicUrl(context.fileName);

      return {
        success: true,
        url: publicUrl,
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to generate and save PDF",
      };
    }
  },
});
