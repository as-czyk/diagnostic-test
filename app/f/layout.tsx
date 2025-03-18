export default function DiagnosticFlowLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col justify-between h-screen">
      <main>{children}</main>
      <footer>
        <div className="absolute bottom-8 left-0 right-0 text-center text-sm">
          © {new Date().getFullYear()} SAT Diagnostic Test | Helping students
          succeed
        </div>
      </footer>
    </div>
  );
}
