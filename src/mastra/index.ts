import { Mastra } from "@mastra/core/mastra";
import { createLogger } from "@mastra/core/logger";
import { SatStudyPlanAgent } from "./agents";
import { StudyPlanWorkflow } from "./workflows";

export const mastra = new Mastra({
  agents: { SatStudyPlanAgent },
  workflows: { StudyPlanWorkflow },
  logger: createLogger({
    name: "Mastra",
    level: "info",
  }),
});
