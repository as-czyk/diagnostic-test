import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SAT Diagnostic Test",
  description: "Helping students succeed with SAT preparation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <footer>
          <div className="absolute bottom-8 left-0 right-0 text-center text-gray-700 text-sm">
            © {new Date().getFullYear()} SAT Diagnostic Test | Helping students
            succeed
          </div>
        </footer>
      </body>
    </html>
  );
}
