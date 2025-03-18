"use client";

import LoaderPage from "@/components/diagnostic/loading-page";
import { Routes } from "@/routes/Routes";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function GenerateResult() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  if (loading) {
    return <LoaderPage />;
  }

  return redirect(Routes.BookingPage);
}
