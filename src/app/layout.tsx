import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Preloader } from "@/components/layout/Preloader";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Ari Rahman — Software Engineer Portfolio",
    template: "%s | Ari Rahman",
  },
  description:
    "Bilingual software engineering portfolio of Ari Rahman: Full-Stack Web, Mobile, UI/UX Design, and Spatial WebGIS projects.",
  icons: {
    icon: [
      {
        url: "/images/logo/black.webp",
        type: "image/webp",
      },
    ],
    shortcut: "/images/logo/black.webp",
    apple: "/images/logo/black.webp",
  },
};

const LOCALE_INIT_SCRIPT = `(function(){try{var l=localStorage.getItem("porto_lang");if(l==="en"||l==="id"){document.documentElement.dataset.portoLang=l;document.documentElement.lang=l;}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning className={inter.variable}>
      <head>
        <script>{LOCALE_INIT_SCRIPT}</script>
      </head>
      <body className="min-h-screen bg-primary-black font-sans text-white antialiased selection:bg-primary-blue-contrast selection:text-white">
        <LanguageProvider>
          <MotionProvider>
            <Preloader />
            <Navbar />
            <main>{children}</main>
            <Footer />
          </MotionProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
