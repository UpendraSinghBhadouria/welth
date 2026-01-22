"use client";

import { usePathname } from "next/navigation";

const Footer = () => {
  const path = usePathname();

  if (path === "/sign-up" || path === "/sign-in") {
    return null;
  }

  return (
    <footer className="bg-blue-50 py-5.5">
      <div className="container mx-auto px-4 text-center text-gray-600">
        <p>© {new Date().getFullYear()} Welth. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
