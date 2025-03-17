"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useQuestionControllerStore } from "@/stores/useQuestionControllerStore";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

export default function QuestionView(props: { question: any }) {
  const { question } = props;
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const {} = useQuestionControllerStore();

  // Handle answer selection
  const handleOptionSelect = (optionId: string) => setSelectedOption(optionId);

  // Handle next question
  const handleNextQuestion = () => {};

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white to-pink-50">
      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header with timer and progress */}

        {/* Main question content */}
        <main className="flex-grow container max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Question {questionNumber}
              </h2>
              <p className="text-gray-800">{question?.text}</p>
            </div>

            <div className="mt-6">
              <RadioGroup
                value={selectedOption || ""}
                onValueChange={handleOptionSelect}
              >
                <div className="space-y-4">
                  {question.choices.map((choice: any) => (
                    <div
                      key={choice.id}
                      className={`border rounded-lg p-4 transition-colors ${
                        selectedOption === choice.value
                          ? "border-[#DB5461] bg-pink-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-start">
                        <RadioGroupItem
                          value={choice.id}
                          id={`option-${choice.id}`}
                          className="mt-1"
                        />
                        <Label
                          htmlFor={`option-${choice.id}`}
                          className="ml-3 cursor-pointer flex-grow"
                        >
                          <div className="font-medium text-gray-700">
                            {choice.id.toUpperCase()}.
                          </div>
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

          {/* Navigation buttons */}
          <div className="flex justify-between">
            <Button
              onClick={handleNextQuestion}
              className="bg-[#DB5461] hover:bg-[#c64854] text-white flex items-center gap-2"
            >
              {questionNumber < totalQuestions ? (
                <>
                  Next
                  <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                "Finish Section"
              )}
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
