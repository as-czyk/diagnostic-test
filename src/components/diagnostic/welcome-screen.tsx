"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Routes } from "@/routes/Routes";

export default function WelcomeScreen() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white to-pink-50">
      {/* Animated background elements */}
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
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <div className="mb-2 text-sm font-medium tracking-wider text-pink-600 uppercase">
            Free Assessment
          </div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            SAT Diagnostic Test
          </h1>
          <div className="h-1 w-20 bg-[#DB5461] mx-auto mb-8 rounded-full"></div>
          <p className="mb-8 text-xl text-gray-600 sm:text-2xl">
            Discover your strengths and areas for improvement with our
            comprehensive SAT diagnostic assessment. This free test will help
            you understand where you stand and how to prepare effectively.
          </p>

          <div className="space-y-4">
            <ul className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 text-left mx-auto max-w-lg mb-8">
              <li className="flex items-start">
                <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-[#DB5461] text-white mt-1">
                  <span className="text-xs">✓</span>
                </div>
                <span className="ml-2 text-gray-600">
                  Personalized score report
                </span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-[#DB5461] text-white mt-1">
                  <span className="text-xs">✓</span>
                </div>
                <span className="ml-2 text-gray-600">Detailed analysis</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-[#DB5461] text-white mt-1">
                  <span className="text-xs">✓</span>
                </div>
                <span className="ml-2 text-gray-600">
                  Study recommendations
                </span>
              </li>
            </ul>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href={Routes.StudentProfile}>
                <Button className="px-8 py-6 text-lg font-medium text-white transition-colors bg-[#DB5461] hover:bg-[#c64854] rounded-xl">
                  Start Your Diagnostic Test
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </motion.div>

            <p className="mt-4 text-sm text-gray-500">
              No registration required. Your results will be available
              immediately.
            </p>
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
