import "./globals.css";
import type { Metadata } from "next";
import { tajawal, ibmPlexSansArabic } from "@/app/font";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "إحياء | تبرع بالدم",
  description: "موقع إحياء للتبرع بالدم",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ar"
      suppressHydrationWarning
      className={`${tajawal.variable} ${ibmPlexSansArabic.variable}`}
      dir="rtl"
    >
      <body className={tajawal.className}>
        <QueryProvider>
          <ThemeProvider defaultTheme="light" storageKey="ehiaaa-theme">
            {children}
            <ThemeSwitcher />
            <Toaster position="top-left" />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
