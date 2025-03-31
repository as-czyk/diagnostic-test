import { createClient } from "@/supabase/client";
import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import htmlPdf from "html-pdf-node";
import path from "path";
import fs from "fs";
import { fillStudyPlanTemplateTool } from "./studyPlanTools";

export { fillStudyPlanTemplateTool };

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

export const htmlToPdfTool = createTool({
  id: "html-to-pdf",
  description: "Converts HTML content to a PDF file and saves it",
  inputSchema: z.object({
    htmlContent: z.string().describe("The HTML content to convert to PDF"),
    filename: z
      .string()
      .describe("The filename for the PDF (without extension)"),
    options: z
      .object({
        format: z.enum(["A4", "Letter", "Legal"]).optional().default("A4"),
        landscape: z.boolean().optional().default(false),
      })
      .optional(),
  }),
  outputSchema: z.object({
    success: z.boolean(),
    filePath: z.string().optional(),
    error: z.string().optional(),
  }),
  execute: async ({ context }) => {
    try {
      // Ensure the public/pdfs directory exists
      const pdfDir = path.join(process.cwd(), "public", "pdfs");
      if (!fs.existsSync(pdfDir)) {
        fs.mkdirSync(pdfDir, { recursive: true });
      }

      // Set up the options
      const options = {
        format: context.options?.format || "A4",
        landscape: context.options?.landscape || false,
      };

      // Create the PDF
      const file = { content: context.htmlContent };
      const pdfBuffer = await htmlPdf.generatePdf(file, options);

      // Save the PDF
      const sanitizedFilename = context.filename
        .replace(/[^a-z0-9]/gi, "_")
        .toLowerCase();
      const filePath = path.join(pdfDir, `${sanitizedFilename}.pdf`);
      fs.writeFileSync(filePath, pdfBuffer);

      // Return success and the relative path to the PDF
      return {
        success: true,
        filePath: `/pdfs/${sanitizedFilename}.pdf`,
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      };
    }
  },
});
