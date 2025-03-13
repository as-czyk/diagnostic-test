"use client";

import { Progress } from "@radix-ui/react-progress";
import { SkipForward } from "lucide-react";
import { useState } from "react";
import Timer from "../timer/Timer";
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
} from "../ui/alert-dialog";
import { Button } from "../ui/button";

export default function QuestionViewHeader() {
  const [progress, setProgress] = useState((3 / 20) * 100);

  // Handle skip question
  const handleSkipQuestion = () => {};

  return (
    <header className="sticky top-0 z-20 bg-white shadow-sm">
      <div className="container max-w-4xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Timer />
          </div>

          <div className="flex items-center space-x-3">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 flex items-center gap-1"
                >
                  <SkipForward className="w-4 h-4" />
                  <span className="hidden sm:inline">Skip</span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Skip this question?</AlertDialogTitle>
                  <AlertDialogDescription>
                    You can return to skipped questions later if time permits.
                    Skipped questions will not count toward your score unless
                    answered.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleSkipQuestion}>
                    Skip Question
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        <div className="mt-2">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Question 1 of 12</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-1.5" />
        </div>
      </div>
    </header>
  );
}
