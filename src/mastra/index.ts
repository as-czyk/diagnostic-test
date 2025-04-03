import { Mastra } from "@mastra/core/mastra";
import { createLogger } from "@mastra/core/logger";
import { SatStudyPlanAgent } from "./agents";
import { StudyPlanWorkflow } from "./workflows";
import { VercelDeployer } from "@mastra/deployer-vercel";

const deployer = new VercelDeployer({
  teamSlug: "aron-scheffczyks-projects",
  projectName: "diagnostic-test",
  token: process.env.MASTRA_VERCEL_TOKEN!,
});

export const mastra = new Mastra({
  deployer: deployer,
  agents: { SatStudyPlanAgent },
  workflows: { StudyPlanWorkflow },
  logger: createLogger({
    name: "Mastra",
    level: "info",
  }),
});
