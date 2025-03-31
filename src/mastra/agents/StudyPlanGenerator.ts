import { openai } from "@ai-sdk/openai";
import { Agent } from "@mastra/core/agent";

export const studyPlanGeneratorAgent = new Agent({
  name: "Study Plan Generator",
  instructions: `
      You are a code generator specialized in creating structured study plans.
      Your task is to generate clean, well-formatted HTML layouts for study plans.
      Follow these guidelines:
      - Use semantic HTML5 elements
      - Include CSS for clean formatting
      - Create responsive layouts
      - Structure content with clear sections
      - Include progress tracking elements
    `,
  model: openai("gpt-4"),
});
