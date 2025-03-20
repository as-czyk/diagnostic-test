import { ClientApi } from "@/supabase/ClientApi";
import { ExamResult } from "@/supabase/db/exam-result/schema";
import {
  SatQuestion,
  DifficultyLevel,
} from "@/supabase/db/sat-questions/schema";

// Interface structure expected by the ExamAnalysis component
interface QuestionResult {
  is_correct: boolean | null; // null means skipped
  time_taken: number; // in seconds
  question_id: string;
  question_number: number;
  user_answer: string | null; // null means skipped
  correct_answer: string;
  question_text: string;
  difficulty: "easy" | "medium" | "hard";
}

interface PreparedExamData {
  studentName: string;
  examDate: Date;
  examType: string;
  results: QuestionResult[];
}

/**
 * Converts difficulty level from SatQuestion to the expected format in ExamAnalysis
 */
function mapDifficultyLevel(
  level: DifficultyLevel
): "easy" | "medium" | "hard" {
  // Map the 0-5 scale to easy, medium, hard
  switch (level) {
    case "0":
    case "1":
      return "easy";
    case "2":
    case "3":
      return "medium";
    case "4":
    case "5":
      return "hard";
    default:
      return "medium"; // Default fallback
  }
}

/**
 * Prepares exam result data for rendering in the ExamAnalysis component
 * @param examResult Exam result data from getExamResultById
 * @param studentName Name of the student for display
 * @param examType Type of exam for display (e.g., "SAT Math Diagnostic")
 * @returns Formatted data ready for the ExamAnalysis component
 */
export async function prepareExamData(
  examResult: ExamResult,
  studentName: string,
  examType: string
): Promise<PreparedExamData> {
  if (!examResult || !examResult.single_result) {
    throw new Error("Invalid exam result data");
  }

  // Initialize results array
  const preparedResults: QuestionResult[] = [];

  // Process each question in the exam result
  for (let i = 0; i < examResult.single_result.length; i++) {
    const resultItem = examResult.single_result[i];

    // Get the question details from the question ID
    const { data: questionData, error } = await ClientApi.getQuestionById(
      resultItem.question_id
    );

    if (error || !questionData) {
      console.error(
        `Error fetching question ${resultItem.question_id}:`,
        error
      );
      // Add a placeholder question if we can't fetch the actual data
      preparedResults.push({
        is_correct: resultItem.is_correct,
        time_taken: resultItem.time_taken,
        question_id: resultItem.question_id,
        question_number: i + 1,
        user_answer: resultItem.user_answer,
        correct_answer: "Unknown", // Fallback
        question_text: "Question content unavailable",
        difficulty: "medium", // Default fallback
      });
      continue;
    }

    // Map the question data to the expected format
    preparedResults.push({
      is_correct: resultItem.is_correct,
      time_taken: resultItem.time_taken,
      question_id: resultItem.question_id,
      question_number: i + 1,
      user_answer: resultItem.user_answer,
      correct_answer: questionData.correct_answer,
      question_text: questionData.question.text,
      difficulty: mapDifficultyLevel(questionData.difficulty_level),
    });
  }

  return {
    studentName,
    examDate: new Date(examResult.created_at || Date.now()),
    examType,
    results: preparedResults,
  };
}

/**
 * Server-side version of the prepareExamData function that uses the server API
 * instead of the client API
 */
export async function prepareExamDataServer(
  examResult: ExamResult,
  studentName: string,
  examType: string,
  getSatQuestionById: (
    id: string
  ) => Promise<{ data: SatQuestion | null; error: Error | null }>
): Promise<PreparedExamData> {
  if (!examResult || !examResult.single_result) {
    throw new Error("Invalid exam result data");
  }

  // Initialize results array
  const preparedResults: QuestionResult[] = [];

  // Process each question in the exam result
  for (let i = 0; i < examResult.single_result.length; i++) {
    const resultItem = examResult.single_result[i];

    // Get the question details from the question ID
    const { data: questionData, error } = await getSatQuestionById(
      resultItem.question_id
    );

    if (error || !questionData) {
      console.error(
        `Error fetching question ${resultItem.question_id}:`,
        error
      );
      // Add a placeholder question if we can't fetch the actual data
      preparedResults.push({
        is_correct: resultItem.is_correct,
        time_taken: resultItem.time_taken,
        question_id: resultItem.question_id,
        question_number: i + 1,
        user_answer: resultItem.user_answer,
        correct_answer: "Unknown", // Fallback
        question_text: "Question content unavailable",
        difficulty: "medium", // Default fallback
      });
      continue;
    }

    // Map the question data to the expected format
    preparedResults.push({
      is_correct: resultItem.is_correct,
      time_taken: resultItem.time_taken,
      question_id: resultItem.question_id,
      question_number: i + 1,
      user_answer: resultItem.user_answer,
      correct_answer: questionData.correct_answer,
      question_text: questionData.question.text,
      difficulty: mapDifficultyLevel(questionData.difficulty_level),
    });
  }

  return {
    studentName,
    examDate: new Date(examResult.created_at || Date.now()),
    examType,
    results: preparedResults,
  };
}
