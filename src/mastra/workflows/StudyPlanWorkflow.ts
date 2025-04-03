import { createOpenAI } from "@ai-sdk/openai";
import { Step, Workflow } from "@mastra/core/workflows";
import { z } from "zod";
import { PdfGeneratorAgent, SatStudyPlanAgent } from "../agents";
import { generateText } from "ai";
import { marked } from "marked";

export const StudyPlanWorkflow = new Workflow({
  name: "Study Plan Workflow",
  triggerSchema: z.object({
    studentName: z.string(),
    examDate: z.string(),
    targetScore: z.number(),
    math_diagnostic_id: z.string(),
    verbal_diagnostic_id: z.string(),
    userId: z.string(),
  }),
});

const StudyPlanStep = new Step({
  id: "study-plan-step",
  execute: async ({ context }) => {
    const {
      studentName,
      examDate,
      targetScore,
      math_diagnostic_id,
      verbal_diagnostic_id,
    } = context.triggerData;

    const result = await SatStudyPlanAgent.generate(
      `
        Generate a personalized study plan for ${studentName} to achieve a score of ${targetScore} on the SAT by ${examDate}.

        Use the following diagnostic results to create the study plan:

        Math Diagnostic ID: ${math_diagnostic_id}
        Verbal Diagnostic ID: ${verbal_diagnostic_id}

        Analyse the performances of the student in each of the sections and draft a study plans as your instructions say.
        
    `
    );

    return {
      success: true,
      message: "Study plan generated successfully",
      studyPlan: result.text,
    };
  },
});

const HTMLConversionStep = new Step({
  id: "html-conversion-step",
  execute: async ({ context }) => {
    const { studyPlan } = context.getStepResult("study-plan-step");

    const html = await marked.parse(studyPlan);
    console.log(html);

    return {
      success: true,
      message: "HTML conversion successful",
      html: html,
    };
  },
});

const PDFGenerationStep = new Step({
  id: "pdf-generation-step",
  execute: async ({ context }) => {
    const { html } = context.getStepResult("html-conversion-step");
    const { userId } = context.triggerData;

    const result = await PdfGeneratorAgent.generate(`
        Generate a PDF document with the name ${userId}.pdf and save it to the studyplan bucket in supabase.
        Use the following HTML as the content for the PDF: ${html}
        `);

    return {
      success: true,
      message: "PDF generation successful",
      data: result,
    };
  },
});

StudyPlanWorkflow.step(StudyPlanStep)
  .then(HTMLConversionStep)
  .then(PDFGenerationStep)
  .commit();
