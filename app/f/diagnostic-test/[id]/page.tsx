"use client";

import QuestionView from "@/components/diagnostic/question-view";
import { Loader } from "@/components/ui/loader";
import { useQuestionControllerStore } from "@/stores/useQuestionControllerStore";
import { SupabaseApi } from "@/supabase/SupabaseApi";
import { useEffect } from "react";

type Params = {
  params: {
    id: string;
  };
};
export default async function DiagnosticTestPage({ params }: Params) {
  const { id } = params;

  const { setExam, setCurrentQuestion, currentQuestion, examId } =
    useQuestionControllerStore();

  useEffect(() => {
    const get = async () => {
      const { data, error } = await SupabaseApi.getExamById(id);
      if (data) {
        setExam(data);
      }
    };
    if (!examId) {
      get();
    }
  }, []);

  if (!currentQuestion) {
    return <Loader />;
  }

  return <QuestionView question={currentQuestion} />;
}
