import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Psychologists.services",
    template: "%s | Psychologists.services",
  },
  description:
    "Find and connect with experienced professional psychologists. Book a consultation, explore our catalog, and take the first step towards mental well-being and personal growth.",
  keywords: [
    "psychologist services",
    "online therapy",
    "book appointment with psychologist",
    "mental health support",
    "professional psychologists catalog",
    "psychological consultation",
  ],
  authors: [{ name: "Milena Karpenko" }],
  openGraph: {
    title: "Psychologists.services | Professional Psychological Help",
    description:
      "Explore our wide range of professional psychologists, read reviews, and book an appointment for your personal sessions today.",
    url: "https://your-site-url.com",
    siteName: "Psychologists.services",
    locale: "en_US",
    type: "website",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${inter.variable}`}>
        <Header/>
        {children}
      </body>
    </html>
  );
}
