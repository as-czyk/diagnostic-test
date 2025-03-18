"use client";

import { updateDiagnostic } from "@/actions/diagnostic-actions";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ExamId } from "@/constants/Constants";
import { Routes } from "@/routes/Routes";
import { useResultStore } from "@/stores";
import { useQuestionControllerStore } from "@/stores/useQuestionControllerStore";
import { useTimerStore } from "@/stores/useTimerStore";
import { ClientApi } from "@/supabase/ClientApi";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

export default function QuestionView() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [questionTimer, setQuestionTimer] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const {
    currentQuestion,
    getNextQuestionId,
    examId,
    exam,
    getCurrentQuestionIndex,
    clearCurrentQuestion,
  } = useQuestionControllerStore();

  const { addResult, getResults } = useResultStore();

  const { resetTimerStore } = useTimerStore();
  const router = useRouter();

  const isLastQuestion =
    getCurrentQuestionIndex() === exam?.questions.length - 1;

  // Start timer when component mounts
  useEffect(() => {
    // Start timer
    timerRef.current = setInterval(() => {
      setQuestionTimer((prev) => prev + 1);
    }, 1000);

    // Reset timer when unmounting
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Reset timer when question changes
  useEffect(() => {
    setQuestionTimer(0);
  }, [currentQuestion?.id]);

  // Handle answer selection
  const handleOptionSelect = (optionId: string) => setSelectedOption(optionId);

  // Handle next question
  const handleNextQuestion = async () => {
    const nextQuestionId = getNextQuestionId();

    // Stop timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    addResult({
      question_id: currentQuestion?.id,
      user_answer: selectedOption,
      time_taken: questionTimer,
      is_correct: selectedOption === currentQuestion?.correct_answer,
    });

    try {
      if (isLastQuestion) {
        clearCurrentQuestion();
        resetTimerStore();

        const results = getResults();

        const { data, error } = await ClientApi.createExamResult(
          examId,
          results
        );

        if (data?.id) {
          // Determine which diagnostic type to update based on exam ID
          if (examId === ExamId.math) {
            await updateDiagnostic({
              math_diagnostic_id: data.id,
            });
          } else {
            await updateDiagnostic({
              verbal_diagnostic_id: data.id,
            });
          }
        }

        if (error) {
          console.error(error);
        }

        router.push(Routes.DiagnosticTest);
        return;
      }

      if (nextQuestionId) {
        router.push(`/f/diagnostic-test/${examId}/q/${nextQuestionId}`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Content */}
      <div className="flex flex-col">
        {/* Main question content */}
        <main className="flex container max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="mb-6">
              <p className="text-gray-800">{currentQuestion?.question?.text}</p>
            </div>

            <div className="mt-6">
              <RadioGroup
                value={selectedOption || ""}
                onValueChange={handleOptionSelect}
              >
                <div className="space-y-4">
                  {currentQuestion?.choices.map((choice: any) => (
                    <div
                      key={choice.value}
                      className={`border rounded-lg p-4 transition-colors ${
                        selectedOption === choice.value
                          ? "border-[#DB5461] bg-pink-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-start">
                        <RadioGroupItem
                          value={choice.value}
                          id={`option-${choice.value}`}
                          className="mt-1"
                        />
                        <Label
                          htmlFor={`option-${choice.value}`}
                          className="ml-3 cursor-pointer flex-grow"
                        >
                          <div className="text-gray-600 mt-1">
                            {choice.display_text}
                          </div>
                        </Label>
                      </div>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          </div>
        </main>
      </div>
      {/* Navigation buttons */}
      <div className="flex justify-end px-4">
        <Button
          onClick={handleNextQuestion}
          className="bg-[#DB5461] hover:bg-[#c64854] text-white flex items-center gap-2"
          disabled={!selectedOption}
        >
          {!isLastQuestion ? (
            <>
              Submit
              <ArrowRight className="w-4 h-4" />
            </>
          ) : (
            "Finish Section"
          )}
        </Button>
      </div>
    </div>
  );
}
