import { z } from "zod";

// Define the schema for the result JSON field
export const ExamResultDataSchema = z.object({
  score: z.number().min(0),
  total_questions: z.number().int().positive(),
  correct_answers: z.number().int().min(0),
  incorrect_answers: z.number().int().min(0),
  skipped_questions: z.number().int().min(0),
  time_spent_seconds: z.number().min(0).optional(),
  question_results: z
    .array(
      z.object({
        question_id: z.string().uuid(),
        user_answer: z.string().optional(),
        is_correct: z.boolean().optional(),
        time_spent_seconds: z.number().min(0).optional(),
      })
    )
    .optional(),
  sections: z
    .array(
      z.object({
        name: z.string(),
        score: z.number().min(0),
        total_questions: z.number().int().positive(),
        correct_answers: z.number().int().min(0),
      })
    )
    .optional(),
  completed_at: z.string().datetime().optional(),
  percentile: z.number().min(0).max(100).optional(),
});
export type ExamResultData = z.infer<typeof ExamResultDataSchema>;

// Define the schema for the exam_result table
export const ExamResultSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  exam_id: z.string().uuid(),
  result: ExamResultDataSchema,
  result_link: z.string().url().optional(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
});
export type ExamResult = z.infer<typeof ExamResultSchema>;

// Define the schema for creating a new exam result
export const CreateExamResultSchema = z.object({
  user_id: z.string().uuid(),
  exam_id: z.string().uuid(),
  result: ExamResultDataSchema,
  result_link: z.string().url().optional(),
});
export type CreateExamResult = z.infer<typeof CreateExamResultSchema>;

// Define the schema for updating an exam result
export const UpdateExamResultSchema = z
  .object({
    result: ExamResultDataSchema.partial(),
    result_link: z.string().url().optional(),
  })
  .partial();
export type UpdateExamResult = z.infer<typeof UpdateExamResultSchema>;

// Database table name
export const EXAM_RESULT_TABLE = "exam_results";
