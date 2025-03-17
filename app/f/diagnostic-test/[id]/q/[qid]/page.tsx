"use client";

import { useParams } from "next/navigation";

export default function QuestionPage() {
  const { qid } = useParams();
  return <div>QuestionPage for {qid}</div>;
}
