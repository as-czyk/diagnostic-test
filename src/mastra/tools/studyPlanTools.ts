import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import fs from "fs";
import path from "path";

export const fillStudyPlanTemplateTool = createTool({
  id: "fill-study-plan-template",
  description: "Fills the study plan HTML template with personalized content",
  inputSchema: z.object({
    // Student info
    studentName: z.string().describe("Student's full name"),
    examDate: z.string().describe("Target exam date (format: YYYY-MM-DD)"),
    targetScore: z.string().describe("Target SAT score"),

    // Overview
    overviewText: z.string().describe("Overall description of the study plan"),
    weeklyScheduleSummary: z.string().describe("Summary of weekly schedule"),

    // Math sections
    algebraDescription: z.string().describe("Description of algebra concepts"),
    algebraTopics: z
      .array(z.string())
      .min(3)
      .describe("List of algebra topics"),

    geometryDescription: z
      .string()
      .describe("Description of geometry concepts"),
    geometryTopics: z
      .array(z.string())
      .min(3)
      .describe("List of geometry topics"),

    advancedMathDescription: z
      .string()
      .describe("Description of advanced math concepts"),
    advancedMathTopics: z
      .array(z.string())
      .min(3)
      .describe("List of advanced math topics"),

    mathPracticePlan: z.string().describe("Detailed math practice plan"),

    // Verbal sections
    readingDescription: z
      .string()
      .describe("Description of reading comprehension"),
    readingTopics: z
      .array(z.string())
      .min(3)
      .describe("List of reading topics"),

    writingDescription: z
      .string()
      .describe("Description of writing & language"),
    writingTopics: z
      .array(z.string())
      .min(3)
      .describe("List of writing topics"),

    vocabularyDescription: z
      .string()
      .describe("Description of vocabulary & grammar"),
    vocabularyTopics: z
      .array(z.string())
      .min(3)
      .describe("List of vocabulary topics"),

    verbalPracticePlan: z.string().describe("Detailed verbal practice plan"),

    // Resources
    bookResources: z
      .array(z.string())
      .min(3)
      .describe("List of recommended books"),
    onlineResources: z
      .array(z.string())
      .min(3)
      .describe("List of online resources"),
    practiceTests: z
      .array(z.string())
      .min(3)
      .describe("List of practice tests"),
  }),
  outputSchema: z.object({
    success: z.boolean(),
    filledTemplate: z.string().optional(),
    error: z.string().optional(),
  }),
  execute: async ({ context }) => {
    try {
      // Read the template file
      const templatePath = path.join(
        process.cwd(),
        "src/templates/study-plan.html"
      );
      let templateContent = fs.readFileSync(templatePath, "utf8");

      // Current date for creation date
      const creationDate = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      // Replace placeholders with content
      const replacements = {
        // Student info
        "[STUDENT_NAME]": context.studentName,
        "[EXAM_DATE]": new Date(context.examDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        "[TARGET_SCORE]": context.targetScore,
        "[CREATION_DATE]": creationDate,

        // Overview
        "[OVERVIEW_TEXT]": context.overviewText,
        "[WEEKLY_SCHEDULE_SUMMARY]": context.weeklyScheduleSummary,

        // Math sections
        "[ALGEBRA_DESCRIPTION]": context.algebraDescription,
        "[ALGEBRA_TOPIC_1]": context.algebraTopics[0] || "",
        "[ALGEBRA_TOPIC_2]": context.algebraTopics[1] || "",
        "[ALGEBRA_TOPIC_3]": context.algebraTopics[2] || "",

        "[GEOMETRY_DESCRIPTION]": context.geometryDescription,
        "[GEOMETRY_TOPIC_1]": context.geometryTopics[0] || "",
        "[GEOMETRY_TOPIC_2]": context.geometryTopics[1] || "",
        "[GEOMETRY_TOPIC_3]": context.geometryTopics[2] || "",

        "[ADVANCED_MATH_DESCRIPTION]": context.advancedMathDescription,
        "[ADVANCED_MATH_TOPIC_1]": context.advancedMathTopics[0] || "",
        "[ADVANCED_MATH_TOPIC_2]": context.advancedMathTopics[1] || "",
        "[ADVANCED_MATH_TOPIC_3]": context.advancedMathTopics[2] || "",

        "[MATH_PRACTICE_PLAN]": context.mathPracticePlan,

        // Verbal sections
        "[READING_DESCRIPTION]": context.readingDescription,
        "[READING_TOPIC_1]": context.readingTopics[0] || "",
        "[READING_TOPIC_2]": context.readingTopics[1] || "",
        "[READING_TOPIC_3]": context.readingTopics[2] || "",

        "[WRITING_DESCRIPTION]": context.writingDescription,
        "[WRITING_TOPIC_1]": context.writingTopics[0] || "",
        "[WRITING_TOPIC_2]": context.writingTopics[1] || "",
        "[WRITING_TOPIC_3]": context.writingTopics[2] || "",

        "[VOCABULARY_DESCRIPTION]": context.vocabularyDescription,
        "[VOCABULARY_TOPIC_1]": context.vocabularyTopics[0] || "",
        "[VOCABULARY_TOPIC_2]": context.vocabularyTopics[1] || "",
        "[VOCABULARY_TOPIC_3]": context.vocabularyTopics[2] || "",

        "[VERBAL_PRACTICE_PLAN]": context.verbalPracticePlan,

        // Resources
        "[BOOK_RESOURCE_1]": context.bookResources[0] || "",
        "[BOOK_RESOURCE_2]": context.bookResources[1] || "",
        "[BOOK_RESOURCE_3]": context.bookResources[2] || "",

        "[ONLINE_RESOURCE_1]": context.onlineResources[0] || "",
        "[ONLINE_RESOURCE_2]": context.onlineResources[1] || "",
        "[ONLINE_RESOURCE_3]": context.onlineResources[2] || "",

        "[PRACTICE_TEST_1]": context.practiceTests[0] || "",
        "[PRACTICE_TEST_2]": context.practiceTests[1] || "",
        "[PRACTICE_TEST_3]": context.practiceTests[2] || "",
      };

      // Apply all replacements
      for (const [placeholder, value] of Object.entries(replacements)) {
        templateContent = templateContent.replace(
          new RegExp(placeholder, "g"),
          value
        );
      }

      return {
        success: true,
        filledTemplate: templateContent,
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      };
    }
  },
});
