import { Mastra } from "@mastra/core/mastra";
import { createLogger } from "@mastra/core/logger";
import { SatStudyPlanAgent } from "./agents";

export const mastra = new Mastra({
  agents: { SatStudyPlanAgent },
  logger: createLogger({
    name: "Mastra",
    level: "info",
  }),
});
