"use client";

import { motion } from "framer-motion";
import { Calendar, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import BackgroundAnimation from "./background-animation";

export default function BookAppointment() {
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Stop confetti after 5 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white to-pink-50">
      {/* Confetti animation */}
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.15}
          colors={["#DB5461", "#FFD166", "#06D6A0", "#118AB2", "#073B4C"]}
        />
      )}

      {/* Animated background elements (same as previous screens for consistency) */}
      <BackgroundAnimation />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-4xl mx-auto"
        >
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Congratulations!
            </h1>
            <p className="mt-2 text-xl text-gray-600 max-w-2xl mx-auto">
              You've completed both diagnostic modules. Schedule a free
              consultation to review your results.
            </p>
            <div className="h-1 w-16 bg-[#DB5461] mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Information Column */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Next Steps
              </h2>
              <p className="text-gray-600 mb-6">
                Based on your diagnostic test results, we recommend scheduling a
                free 30-minute consultation with one of our SAT experts to:
              </p>

              <ul className="space-y-4 mb-6">
                <li className="flex items-start">
                  <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-[#DB5461] text-white mt-0.5">
                    <span className="text-xs">✓</span>
                  </div>
                  <span className="ml-3 text-gray-600">
                    Review your diagnostic test results in detail
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-[#DB5461] text-white mt-0.5">
                    <span className="text-xs">✓</span>
                  </div>
                  <span className="ml-3 text-gray-600">
                    Identify your strengths and areas for improvement
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-[#DB5461] text-white mt-0.5">
                    <span className="text-xs">✓</span>
                  </div>
                  <span className="ml-3 text-gray-600">
                    Get your personalized study plan
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-[#DB5461] text-white mt-0.5">
                    <span className="text-xs">✓</span>
                  </div>
                  <span className="ml-3 text-gray-600">
                    Discuss tutoring options and strategies
                  </span>
                </li>
              </ul>

              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 mb-6">
                <p className="text-blue-800 text-sm">
                  <strong>Pro Tip:</strong> Come prepared with questions about
                  your results and goals for your SAT score.
                </p>
              </div>
            </div>

            {/* Calendar Embed Column */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 bg-gray-50 border-b border-gray-200">
                <h3 className="font-medium text-gray-900 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-[#DB5461]" />
                  Schedule Your Free Consultation
                </h3>
              </div>

              {/* Mock Calendar Embed */}
              <div className="p-4">Calendly embeeding</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
