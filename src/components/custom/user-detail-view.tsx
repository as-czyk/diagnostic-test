"use client";

import { useState } from "react";
import {
  User as UserIcon,
  Calendar,
  Target,
  MessageSquare,
  Clock,
} from "lucide-react";
import { format, formatDate } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import ProcessIndicator from "./process-indicator";
import { User } from "@supabase/supabase-js";

interface UserDetailProps {
  userData: User;
  diagnostic: any;
  userProfile: any;
}

export default function UserDetailView({
  userData,
  diagnostic,
  userProfile,
}: any) {
  const { user } = userData;
  const [expanded, setExpanded] = useState(false);

  console.log(user);

  // Format the exam date if it exists
  const formattedExamDate = user.examDate
    ? format(new Date(user.examDate), "MMMM d, yyyy")
    : "Not specified";

  // Calculate days until exam if exam date exists
  const daysUntilExam = userProfile?.sat_metadata.exam_date
    ? Math.ceil(
        (new Date(userProfile?.sat_metadata.exam_date).getTime() -
          new Date().getTime()) /
          (1000 * 60 * 60 * 24)
      )
    : null;

  // Get display name (name or email)
  const displayName =
    user.user_metadata?.first_name + " " + user.user_metadata?.last_name ||
    user.email?.split("@")[0];

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden max-w-6xl ml-8">
      {/* User Card Header */}

      <div className="p-6 pb-4">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16 border-2 border-white shadow-sm">
            <AvatarImage src={user.profileImage} alt={displayName} />
            <AvatarFallback className="bg-gray-200 text-gray-600">
              <UserIcon className="h-8 w-8" />
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h2 className="text-xl font-bold">{displayName}</h2>
                <p className="text-gray-500 text-sm">{user.email}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="flex items-center gap-1 px-2 py-1 bg-[#DB5461] text-white">
                  <Clock className="h-3 w-3" />
                  <span>
                    Joined {formatDate(user.created_at, "dd.MM.yyyy")}
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
                  <div className="text-sm font-medium">Estimated Exam Date</div>
                  <div className="text-sm text-gray-500">
                    {formatDate(
                      userProfile?.sat_metadata.exam_date,
                      "dd.MM.yyyy"
                    )}
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
                    {userProfile?.sat_metadata.desired_score || "Not specified"}
                    {userProfile?.sat_metadata.desired_score && (
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
        {userProfile?.sat_metadata?.motivation && (
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
              <div className="pl-4">{userProfile.sat_metadata.motivation}</div>
            </div>
          </div>
        )}
      </div>

      {/* Process Indicator */}
      <div className="border-t border-gray-200 p-6 pt-4 bg-gray-50">
        <h3 className="text-sm font-medium text-gray-700 mb-4">
          Diagnostic Progress
        </h3>
        <ProcessIndicator
          completedSteps={{
            profile: Boolean(userProfile),
            verbal: Boolean(diagnostic?.verbal_diagnostic_id),
            math: Boolean(diagnostic?.math_diagnostic_id),
            results: Boolean(userProfile) && Boolean(diagnostic),
          }}
          activeStep={"profile"}
        />
      </div>
    </div>
  );
}
