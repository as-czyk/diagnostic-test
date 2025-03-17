import { z } from "zod";

// Define the schema for the diagnostic table
export const DiagnosticSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  user_profile_id: z.string().uuid().optional(),
  math_diagnostic_id: z.string().uuid().optional(),
  verbal_diagnostic_id: z.string().uuid().optional(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
});
export type Diagnostic = z.infer<typeof DiagnosticSchema>;

// Define the schema for creating a new diagnostic record
export const CreateDiagnosticSchema = z.object({
  user_id: z.string().uuid(),
  user_profile_id: z.string().uuid().optional(),
  math_diagnostic_id: z.string().uuid().optional(),
  verbal_diagnostic_id: z.string().uuid().optional(),
});
export type CreateDiagnostic = z.infer<typeof CreateDiagnosticSchema>;

// Define the schema for updating a diagnostic record
export const UpdateDiagnosticSchema = z
  .object({
    user_profile_id: z.string().uuid().optional(),
    math_diagnostic_id: z.string().uuid().optional(),
    verbal_diagnostic_id: z.string().uuid().optional(),
  })
  .partial();
export type UpdateDiagnostic = z.infer<typeof UpdateDiagnosticSchema>;

// Database table name
export const DIAGNOSTIC_TABLE = "diagnostics";
