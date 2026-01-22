import DashboardPage from "./page";
import { BarLoader } from "react-spinners";
import { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Welth dashboard for managing personal finances. Track accounts, budgets, spending, and recent transactions in one secure place.",

  applicationName: "Welth",

  robots: {
    index: false,
    follow: false,
    nocache: true,
  },

  alternates: {
    canonical: "/dashboard",
  },

  openGraph: {
    title: "Welth Dashboard",
    description:
      "Secure financial dashboard to monitor accounts, budgets, expenses, and transactions.",
    url: "/dashboard",
    siteName: "Welth",
    type: "website",
  },

  twitter: {
    card: "summary",
    title: "Welth Dashboard",
    description:
      "Manage your accounts, budgets, and spending securely with Welth.",
  },

  category: "finance",
};

export default function DashBoardLayout() {
  return (
    <div className="px-5">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-6xl font-bold tracking-tight gradient-title">
          Dashboard
        </h1>
      </div>
      <Suspense
        fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea" />}
      >
        <DashboardPage />
      </Suspense>
    </div>
  );
}
