import { ExamResultData } from "../exam-result";
import { Diagnostic } from "./schema";

/**
 * Checks if a user has completed both math and verbal diagnostics
 * @param diagnostic The diagnostic record to check
 * @returns Boolean indicating if both diagnostics are completed
 */
export function hasBothDiagnostics(diagnostic: Diagnostic | null): boolean {
  if (!diagnostic) return false;
  return !!diagnostic.math_diagnostic_id && !!diagnostic.verbal_diagnostic_id;
}

/**
 * Checks if a user has completed the math diagnostic
 * @param diagnostic The diagnostic record to check
 * @returns Boolean indicating if math diagnostic is completed
 */
export function hasMathDiagnostic(diagnostic: Diagnostic | null): boolean {
  if (!diagnostic) return false;
  return !!diagnostic.math_diagnostic_id;
}

/**
 * Checks if a user has completed the verbal diagnostic
 * @param diagnostic The diagnostic record to check
 * @returns Boolean indicating if verbal diagnostic is completed
 */
export function hasVerbalDiagnostic(diagnostic: Diagnostic | null): boolean {
  if (!diagnostic) return false;
  return !!diagnostic.verbal_diagnostic_id;
}

/**
 * Gets the diagnostic status for a user
 * @param diagnostic The diagnostic record to check
 * @returns Object with status of each diagnostic type
 */
export function getDiagnosticStatus(diagnostic: Diagnostic | null): {
  hasMath: boolean;
  hasVerbal: boolean;
  hasProfile: boolean;
  isComplete: boolean;
} {
  if (!diagnostic) {
    return {
      hasMath: false,
      hasVerbal: false,
      hasProfile: false,
      isComplete: false,
    };
  }

  const hasMath = !!diagnostic.math_diagnostic_id;
  const hasVerbal = !!diagnostic.verbal_diagnostic_id;
  const hasProfile = !!diagnostic.user_profile_id;

  return {
    hasMath,
    hasVerbal,
    hasProfile,
    isComplete: hasMath && hasVerbal && hasProfile,
  };
}

/**
 * Calculates the overall diagnostic score from math and verbal results
 * @param mathResult Math diagnostic result data
 * @param verbalResult Verbal diagnostic result data
 * @returns Combined score or null if either result is missing
 */
export function calculateOverallScore(
  mathResult: ExamResultData | null | undefined,
  verbalResult: ExamResultData | null | undefined
): number | null {
  if (!mathResult || !verbalResult) return null;

  // Calculate overall score (example implementation)
  const mathScore = mathResult.score || 0;
  const verbalScore = verbalResult.score || 0;

  // Simple average for demonstration
  return (mathScore + verbalScore) / 2;
}

/**
 * Determines the recommended study path based on diagnostic results
 * @param mathResult Math diagnostic result data
 * @param verbalResult Verbal diagnostic result data
 * @returns Object with study recommendations
 */
export function getStudyRecommendations(
  mathResult: ExamResultData | null | undefined,
  verbalResult: ExamResultData | null | undefined
): {
  focusAreas: string[];
  recommendedExams: string[];
  studyTimePerWeek: number;
} {
  const focusAreas: string[] = [];
  const recommendedExams: string[] = [];
  let studyTimePerWeek = 10; // Default recommendation

  // Example logic - would be replaced with actual business logic
  if (mathResult) {
    if (mathResult.score < 600) {
      focusAreas.push("Algebra fundamentals");
      focusAreas.push("Problem-solving strategies");
      studyTimePerWeek += 5;
    } else if (mathResult.score < 700) {
      focusAreas.push("Advanced algebra");
      focusAreas.push("Data analysis");
    }

    recommendedExams.push("Math Practice Test 1");
  }

  if (verbalResult) {
    if (verbalResult.score < 600) {
      focusAreas.push("Reading comprehension");
      focusAreas.push("Vocabulary building");
      studyTimePerWeek += 5;
    } else if (verbalResult.score < 700) {
      focusAreas.push("Critical reading");
      focusAreas.push("Writing skills");
    }

    recommendedExams.push("Verbal Practice Test 1");
  }

  return {
    focusAreas,
    recommendedExams,
    studyTimePerWeek,
  };
}
