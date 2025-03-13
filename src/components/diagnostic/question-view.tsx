"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  SkipForward,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";

// Dummy data for the question
const dummyQuestion = {
  id: 1,
  text: "Based on the passage, what can be inferred about the author's attitude toward traditional farming methods?",
  options: [
    {
      id: "a",
      text: "They are outdated and should be replaced with modern techniques.",
    },
    {
      id: "b",
      text: "They have valuable ecological wisdom that modern agriculture has overlooked.",
    },
    {
      id: "c",
      text: "They are inefficient but culturally significant and worth preserving.",
    },
    {
      id: "d",
      text: "They are only suitable for small-scale farming operations.",
    },
  ],
  correctAnswer: "b", // This would be used for scoring but not shown to the user during the test
};

export default function QuestionView({
  moduleType = "verbal", // "verbal" or "math"
  questionNumber = 1,
  totalQuestions = 10,
}) {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // Handle answer selection
  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
  };

  // Handle next question
  const handleNextQuestion = () => {
    // In a real implementation, this would save the answer and load the next question
    if (questionNumber < totalQuestions) {
      // Navigate to next question
      router.push(
        `/diagnostic/test/${moduleType}/question/${questionNumber + 1}`
      );
    } else {
      // Navigate to results page if this is the last question
      router.push(`/diagnostic/results/${moduleType}`);
    }
  };

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
              <p className="text-gray-800">{dummyQuestion.text}</p>
            </div>

            <div className="mt-6">
              <RadioGroup
                value={selectedOption || ""}
                onValueChange={handleOptionSelect}
              >
                <div className="space-y-4">
                  {dummyQuestion.options.map((option) => (
                    <div
                      key={option.id}
                      className={`border rounded-lg p-4 transition-colors ${
                        selectedOption === option.id
                          ? "border-[#DB5461] bg-pink-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-start">
                        <RadioGroupItem
                          value={option.id}
                          id={`option-${option.id}`}
                          className="mt-1"
                        />
                        <Label
                          htmlFor={`option-${option.id}`}
                          className="ml-3 cursor-pointer flex-grow"
                        >
                          <div className="font-medium text-gray-700">
                            {option.id.toUpperCase()}.
                          </div>
                          <div className="text-gray-600 mt-1">
                            {option.text}
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
