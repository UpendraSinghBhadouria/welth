import { ScrollToTop } from "@/components/ScrollToTop";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Welth",
    default: "Authentication",
  },
  description:
    "Access Welth to manage your finances securely. Sign in or create an account to get started.",

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "/sign-in",
  },

  openGraph: {
    title: "Welth Authentication",
    description:
      "Sign in or create a Welth account to manage your personal finances securely.",
    siteName: "Welth",
    type: "website",
  },

  twitter: {
    card: "summary",
    title: "Welth Authentication",
    description:
      "Securely access Welth to track transactions, budgets, and accounts.",
  },

  category: "finance",
};

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-center items-center bg-gray-50 mt-16 h-[calc(100vh-4rem)]">
      <ScrollToTop />
      {children}
    </div>
  );
};

export default AuthLayout;
