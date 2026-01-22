import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";
import { ClerkProvider } from "@clerk/nextjs";
import { baseUrl } from "@/helper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl as string),

  title: {
    default: "Welth",
    template: "%s | Welth",
  },

  description:
    "Welth is an all-in-one personal finance platform to track income, expenses, budgets, and accounts in one place.",

  applicationName: "Welth",

  keywords: [
    "personal finance",
    "expense tracker",
    "income tracking",
    "budgeting app",
    "finance management",
  ],

  authors: [{ name: "Welth Team" }],

  creator: "Welth",

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/logo-sm.png",
    shortcut: "/logo-sm.png",
    apple: "/logo-sm.png",
  },

  openGraph: {
    title: "Welth – Personal Finance Simplified",
    description:
      "Track expenses, manage budgets, and stay in control of your money with Welth.",
    url: "/",
    siteName: "Welth",
    type: "website",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "Welth – Personal Finance Simplified",
    description:
      "Track expenses, manage budgets, and stay in control of your money with Welth.",
  },

  category: "finance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/logo-sm.png" />
        </head>
        <body className={`${inter.className} min-h-screen flex flex-col`}>
          <Header />
          <main className="flex-1 min-h-screen">{children}</main>
          <Toaster richColors />
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
