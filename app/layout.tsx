import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ScrollToTop } from "@/components/shared/ScrollToTop";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "From Cells to Circuits | Smart Health Systems Workshop",
    template: "%s | Cells2Circuits",
  },
  description:
    "A 5-Day Hands-on Biomedical Engineering Workshop for Class XII Science Students. Experience the journey from cells to circuits at Shobhit Institute of Engineering & Technology, Meerut.",
  keywords: [
    "biomedical engineering workshop",
    "Class XII science students",
    "smart health systems",
    "cells to circuits",
    "Shobhit University",
    "Meerut",
    "ECG",
    "biosignals",
    "medical technology",
    "healthcare innovation",
  ],
  authors: [{ name: "School of Biomedical Engineering & Health Sciences" }],
  creator: "Shobhit Institute of Engineering & Technology",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://cell2circuits.vercel.app",
    title: "From Cells to Circuits – A Smart Health Systems Journey",
    description:
      "5-Day Hands-on Biomedical Engineering Workshop for Class XII Students. Blood Grouping, ECG, Circuits, AI in Healthcare & more.",
    siteName: "Cells2Circuits Workshop",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "From Cells to Circuits Workshop" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "From Cells to Circuits – Smart Health Systems Workshop",
    description: "5-Day Biomedical Engineering Workshop for Class XII Students at Shobhit University, Meerut.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Inline script prevents flash of wrong theme before React hydrates */}
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.remove('dark')}else{document.documentElement.classList.add('dark')}}catch(e){}})()`,
          }}
        />
      </head>
      <body className={`${inter.variable} ${syne.variable} antialiased transition-colors duration-300`}>
        <ThemeProvider>
          <LenisProvider>
            <Navigation />
            <main>{children}</main>
            <Footer />
            <ScrollToTop />
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
