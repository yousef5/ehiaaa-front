import {
  Tajawal,
  IBM_Plex_Sans_Arabic,
  Cairo,
  Noto_Sans_Arabic,
  Amiri,
  Lateef,
} from "next/font/google";

// Main font: Tajawal - Modern, clean Arabic font with good legibility
export const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  variable: "--font-tajawal",
  display: "swap",
});

// Secondary font: IBM Plex Sans Arabic - Excellent for UI text
export const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  variable: "--font-ibm-plex",
  display: "swap",
});

// Additional Google Fonts for Arabic
export const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-cairo",
  display: "swap",
});

export const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-noto-sans",
  display: "swap",
});

// Traditional Arabic fonts
export const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
});

export const lateef = Lateef({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-lateef",
  display: "swap",
});
