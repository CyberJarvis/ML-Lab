import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { PyodideProvider } from "@/components/PyodideProvider";
import { ThemeProvider, THEME_INIT_SCRIPT } from "@/components/ThemeProvider";
import SiteMenu from "@/components/SiteMenu";
import Footer from "@/components/Footer";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Machine Learning | SIES Graduate School of Technology",
  description:
    "Comprehensive Machine Learning Theory & Virtual Laboratory for Mumbai University / SIES GST (CEL701 / CSL7001). Full syllabus theory, quizzes, and live Python browser experiments with Pyodide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jetbrainsMono.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="font-sans">
        <ThemeProvider>
          <PyodideProvider>
            <div className="jd-layout">
              <SiteMenu />
              <main id="layout-content">
                {children}
                <Footer />
              </main>
            </div>
          </PyodideProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
