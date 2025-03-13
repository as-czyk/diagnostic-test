"use client";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  Calculator,
  Clock,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DiagnosticModules() {
  const router = useRouter();

  const startModule = (module: string) => {
    //router.push(`/diagnostic/test/${module}`);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white to-pink-50">
      {/* Animated background elements (same as previous screens for consistency) */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 rounded-full bg-pink-100 opacity-40"
          animate={{
            x: [0, 30, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-pink-100 opacity-50"
          animate={{
            x: [0, -20, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/3 w-40 h-40 rounded-full bg-pink-200 opacity-30"
          animate={{
            x: [0, 40, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-4xl mx-auto"
        >
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              SAT Diagnostic Test
            </h1>
            <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
              Select a module to begin your diagnostic assessment. Complete both
              modules for a comprehensive evaluation.
            </p>
            <div className="h-1 w-16 bg-[#DB5461] mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Verbal Module Card */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-[#DB5461]" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  Evidence-Based Reading & Writing
                </h2>
                <p className="text-gray-600 mb-4">
                  Assess your reading comprehension, grammar, and writing skills
                  through a series of passages and questions.
                </p>
                <div className="flex items-center text-gray-500 mb-6">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>Estimated time: 20 minutes</span>
                </div>
                <div className="flex flex-col space-y-2">
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-[#DB5461] text-white mt-0.5">
                        <span className="text-xs">✓</span>
                      </div>
                      <span className="ml-2 text-gray-600 text-sm">
                        Reading comprehension
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-[#DB5461] text-white mt-0.5">
                        <span className="text-xs">✓</span>
                      </div>
                      <span className="ml-2 text-gray-600 text-sm">
                        Grammar & language usage
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-[#DB5461] text-white mt-0.5">
                        <span className="text-xs">✓</span>
                      </div>
                      <span className="ml-2 text-gray-600 text-sm">
                        Vocabulary in context
                      </span>
                    </li>
                  </ul>
                  <Button
                    onClick={() => startModule("verbal")}
                    className="w-full bg-[#DB5461] hover:bg-[#c64854] text-white flex items-center justify-center gap-2"
                  >
                    Start Verbal Section
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Math Module Card */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center mb-4">
                  <Calculator className="w-6 h-6 text-[#DB5461]" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  Mathematics
                </h2>
                <p className="text-gray-600 mb-4">
                  Test your mathematical reasoning, problem-solving abilities,
                  and understanding of key concepts.
                </p>
                <div className="flex items-center text-gray-500 mb-6">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>Estimated time: 20 minutes</span>
                </div>
                <div className="flex flex-col space-y-2">
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-[#DB5461] text-white mt-0.5">
                        <span className="text-xs">✓</span>
                      </div>
                      <span className="ml-2 text-gray-600 text-sm">
                        Algebra & functions
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-[#DB5461] text-white mt-0.5">
                        <span className="text-xs">✓</span>
                      </div>
                      <span className="ml-2 text-gray-600 text-sm">
                        Problem solving & data analysis
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-[#DB5461] text-white mt-0.5">
                        <span className="text-xs">✓</span>
                      </div>
                      <span className="ml-2 text-gray-600 text-sm">
                        Geometry & trigonometry
                      </span>
                    </li>
                  </ul>
                  <Button
                    onClick={() => startModule("math")}
                    className="w-full bg-[#DB5461] hover:bg-[#c64854] text-white flex items-center justify-center gap-2"
                  >
                    Start Math Section
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="absolute bottom-8 left-0 right-0 text-center text-gray-500 text-sm"
        >
          © {new Date().getFullYear()} SAT Diagnostic Test | Helping students
          succeed
        </motion.div>
      </div>
    </div>
  );
}
