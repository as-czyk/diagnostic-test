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
import { Card } from "../ui/card";
import { Separator } from "../ui/separator";

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

        const { data: exams, error: examError } =
          await ClientApi.getExamsForUser();
        const examArray = exams?.map((exam) => exam.id) ?? [];

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

        if (
          examArray?.includes(ExamId.math) &&
          examArray?.includes(ExamId.verbal)
        ) {
          router.push(Routes.GenerateResult);
          return;
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

  const { question } = currentQuestion;

  return (
    <div className="flex flex-col">
      {/* Content */}
      <div className="flex flex-col">
        {/* Main question content */}
        <main className="flex-grow container max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-6 h-full">
            {/* Question Panel - Left Side */}
            <Card className="flex-1 lg:w-1/2 overflow-hidden">
              <div className="p-6 flex flex-col h-full">
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">
                    Question {getCurrentQuestionIndex() + 1}
                  </h2>
                </div>

                <Separator className="mb-4" />

                {/* Scrollable Question Container */}
                <div className="overflow-y-auto flex-grow pr-2 mb-4 max-h-[calc(100vh-300px)]">
                  <p className="text-gray-800 text-lg leading-relaxed">
                    {question?.text}
                  </p>
                </div>
              </div>
            </Card>

            {/* Answer Panel - Right Side */}
            <Card className="flex-1 lg:w-1/2">
              <div className="p-6 flex flex-col h-full">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Select Your Answer
                </h3>

                <RadioGroup
                  value={selectedOption || ""}
                  onValueChange={handleOptionSelect}
                  className="flex-grow"
                >
                  <div className="space-y-3">
                    {currentQuestion.choices.map((option: any) => (
                      <div
                        key={option.value}
                        className={`border rounded-lg p-4 transition-colors ${
                          selectedOption === option.value
                            ? "border-gray-300 bg-gray-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-start">
                          <RadioGroupItem
                            value={option.value}
                            id={`option-${option.value}`}
                            className="mt-1"
                          />
                          <Label
                            htmlFor={`option-${option.value}`}
                            className="ml-3 cursor-pointer flex-grow"
                          >
                            <div className="text-gray-600 mt-1">
                              {option.display_text}
                            </div>
                          </Label>
                        </div>
                      </div>
                    ))}
                  </div>
                </RadioGroup>

                <div className="mt-6 pt-4 border-t border-gray-100">
                  <Button
                    onClick={handleNextQuestion}
                    disabled={!selectedOption}
                    className="w-full bg-[#DB5461] hover:bg-[#c64854] text-white flex items-center justify-center gap-2 py-6"
                    size="lg"
                  >
                    {!isLastQuestion ? (
                      <>
                        Submit & Continue
                        <ArrowRight className="w-4 h-4" />
                      </>
                    ) : (
                      "Submit & Finish Section"
                    )}
                  </Button>

                  <p className="text-xs text-center text-gray-500 mt-2">
                    {!selectedOption
                      ? "Please select an answer to continue"
                      : "Your answer will be saved automatically"}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
