"use client";

import { useState } from "react";
import { User, Calendar, Target, MessageSquare, Clock } from "lucide-react";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import ProcessIndicator from "./process-indicator";

interface UserDetailProps {
  user: {
    id: string;
    name?: string;
    email: string;
    profileImage?: string;
    examDate?: Date;
    desiredScore?: number;
    motivation?: string;
    // Replace currentPhase with completion status for each step
    diagnosticProgress: {
      profile: boolean;
      verbal: boolean;
      math: boolean;
      results: boolean;
    };
    // Current active step (if any)
    activeStep?: "profile" | "verbal" | "math" | "results" | null;
    createdAt: Date;
  };
}

export default function UserDetailView({ user }: UserDetailProps) {
  const [expanded, setExpanded] = useState(false);

  // Format the exam date if it exists
  const formattedExamDate = user.examDate
    ? format(new Date(user.examDate), "MMMM d, yyyy")
    : "Not specified";

  // Calculate days until exam if exam date exists
  const daysUntilExam = user.examDate
    ? Math.ceil(
        (new Date(user.examDate).getTime() - new Date().getTime()) /
          (1000 * 60 * 60 * 24)
      )
    : null;

  // Get display name (name or email)
  const displayName = user.name || user.email.split("@")[0];

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      {/* User Card Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16 border-2 border-white shadow-sm">
            <AvatarImage src={user.profileImage} alt={displayName} />
            <AvatarFallback className="bg-gray-200 text-gray-600">
              <User className="h-8 w-8" />
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h2 className="text-xl font-bold">{displayName}</h2>
                {user.name && (
                  <p className="text-gray-500 text-sm">{user.email}</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className="flex items-center gap-1 px-2 py-1"
                >
                  <Clock className="h-3 w-3" />
                  <span>
                    Joined {format(new Date(user.createdAt), "MMM yyyy")}
                  </span>
                </Badge>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm font-medium">Exam Date</div>
                  <div className="text-sm text-gray-500">
                    {formattedExamDate}
                  </div>
                  {daysUntilExam !== null && daysUntilExam > 0 && (
                    <div className="text-xs text-blue-600 font-medium">
                      {daysUntilExam} days remaining
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <Target className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <div className="text-sm font-medium">Target Score</div>
                  <div className="text-sm text-gray-500">
                    {user.desiredScore || "Not specified"}
                    {user.desiredScore && (
                      <span className="text-xs text-green-600 font-medium ml-1">
                        / 1600
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Motivation Speech Bubble */}
        {user.motivation && (
          <div className="mt-6 relative">
            <div
              className="bg-gray-100 p-4 rounded-lg rounded-tl-none text-gray-700 text-sm"
              style={{
                maxHeight: expanded ? "none" : "80px",
                overflow: "hidden",
              }}
            >
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <MessageSquare className="h-4 w-4 text-gray-500" />
              </div>
              <div className="pl-4">{user.motivation}</div>

              {!expanded && user.motivation.length > 200 && (
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-100 to-transparent" />
              )}
            </div>

            {user.motivation.length > 200 && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="mt-2 text-sm text-[#DB5461] hover:underline focus:outline-none"
              >
                {expanded ? "Show less" : "Read more"}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Process Indicator */}
      <div className="border-t border-gray-200 p-6 pt-4 bg-gray-50">
        <h3 className="text-sm font-medium text-gray-700 mb-4">
          Diagnostic Progress
        </h3>
        <ProcessIndicator
          completedSteps={user.diagnosticProgress}
          activeStep={user.activeStep}
        />
      </div>
    </div>
  );
}
