import { Step, Workflow } from "@mastra/core";
import { z } from "zod";
import { PdfGeneratorAgent, SatStudyPlanAgent } from "../agents";
import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";

export const StudyPlanWorkflow = new Workflow({
  name: "Study Plan Workflow",
  triggerSchema: z.object({
    studentName: z.string(),
    examDate: z.string(),
    targetScore: z.string(),
    math_diagnostic_id: z.string(),
    verbal_diagnostic_id: z.string(),
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

    const result = await SatStudyPlanAgent.generate(`
        Generate a personalized study plan for ${studentName} to achieve a score of ${targetScore} on the SAT by ${examDate}.

        Use the following diagnostic results to create the study plan:
        Math Diagnostic ID: ${math_diagnostic_id}
        Verbal Diagnostic ID: ${verbal_diagnostic_id}
        
    `);

    return {
      success: true,
      message: "Study plan generated successfully",
      markdown: result.text,
    };
  },
});

const HTMLConversionStep = new Step({
  id: "html-conversion-step",
  execute: async ({ context }) => {
    const { markdown } = context.getStepResult("study-plan-step");

    const openai = createOpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const result = await generateText({
      model: openai("gpt-4"),
      prompt: `Convert the following markdown to HTML: ${markdown}`,
    });

    return {
      success: true,
      message: "HTML conversion successful",
      html: result.text,
    };
  },
});

const PDFGenerationStep = new Step({
  id: "pdf-generation-step",
  execute: async ({ context }) => {
    const { html } = context.getStepResult("html-conversion-step");

    const pdf = await PdfGeneratorAgent.generate(`
        Convert the following HTML to a PDF: ${html}
        `);

    console.log("PDF", pdf);

    return {
      success: true,
      message: "PDF generation successful",
      data: pdf,
    };
  },
});

StudyPlanWorkflow.step(StudyPlanStep)
  .then(HTMLConversionStep)
  .then(PDFGenerationStep)
  .commit();
