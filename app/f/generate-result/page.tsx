import { Routes } from "@/routes/Routes";
import { redirect } from "next/navigation";

export default function GenerateResult() {
  //Logic to generate personalized Study Plan

  return redirect(Routes.BookingPage);
}
