import { StudyPlanWorkflow } from "@/mastra/workflows";
import { Routes } from "@/routes/Routes";
import { redirect } from "next/navigation";

export default async function GenerateResult() {
  //Logic to generate personalized Study Plan

  const { start } = StudyPlanWorkflow.createRun();
  const res = await start({
    triggerData: {
      studentName: "John Doe",
      examDate: "2025-05-01",
      targetScore: "1500",
      math_diagnostic_id: "123",
      verbal_diagnostic_id: "456",
    },
  });

  return redirect(Routes.BookingPage);
}
