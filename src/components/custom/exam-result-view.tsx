"use client";

import { useEffect, useState } from "react";
import { ClientApi } from "@/supabase/ClientApi";
import { prepareExamData } from "@/utils/prepare-exam-data";
import ExamAnalysis from "@/components/custom/exam-analysis";
import { Skeleton } from "@/components/ui/skeleton";

interface ExamResultViewProps {
  examId: string;
  studentName: string;
  examType: string;
}

export default function ExamResultView({
  examId,
  studentName,
  examType,
}: ExamResultViewProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [analysisData, setAnalysisData] = useState<any>(null);

  useEffect(() => {
    async function fetchExamResult() {
      setLoading(true);
      setError(null);

      try {
        // Fetch exam result from the API
        const { data: examResultData, error: examResultError } =
          await ClientApi.getExamResultById(examId);

        if (examResultError || !examResultData) {
          throw new Error(
            examResultError?.message || "Failed to fetch exam result"
          );
        }

        // Transform the data for the ExamAnalysis component
        const preparedData = await prepareExamData(
          examResultData,
          studentName,
          examType
        );

        setAnalysisData(preparedData);
      } catch (err) {
        console.error("Error preparing exam data:", err);
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred"
        );
      } finally {
        setLoading(false);
      }
    }

    if (examId) {
      fetchExamResult();
    }
  }, [examId, studentName, examType]);

  if (loading) {
    return (
      <div className="space-y-4 p-8">
        <Skeleton className="h-12 w-1/3" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold text-red-500 mb-4">
          Error Loading Exam Analysis
        </h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!analysisData) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold mb-4">No Data Available</h2>
        <p>Could not find exam analysis data for the specified exam.</p>
      </div>
    );
  }

  return <ExamAnalysis {...analysisData} />;
}
