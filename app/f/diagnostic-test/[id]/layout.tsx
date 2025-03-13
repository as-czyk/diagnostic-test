import QuestionViewHeader from "@/components/diagnostic/question-view-header";

export default function DiagnosticTestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header>
        <QuestionViewHeader />
      </header>
      <main>{children}</main>
    </>
  );
}
