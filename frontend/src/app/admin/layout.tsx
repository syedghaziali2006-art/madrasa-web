"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    // If we're on the login page, don't check for token
    if (pathname === "/admin/login") {
      setAuthorized(true);
      return;
    }

    const token = localStorage.getItem("msz_admin_token");
    if (!token) {
      setAuthorized(false);
      router.push("/admin/login");
    } else {
      setAuthorized(true);
    }
  }, [pathname, router]);

  // Loading state while checking auth
  if (authorized === null) {
    return (
      <div className="min-h-screen bg-[#120A05] flex items-center justify-center font-urdu text-[#C9B38D]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#C9B38D]/30 border-t-[#C9B38D] rounded-full animate-spin" />
          <p className="text-sm">ایڈمن پینل لوڈ ہو رہا ہے...</p>
        </div>
      </div>
    );
  }

  // If on login page, render child directly without sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="admin-layout-shell min-h-screen text-[#FAF7F2] flex flex-row selection:bg-[#C9B38D] selection:text-[#120A05] relative">
      <AdminSidebar />
      <main className="admin-main-shell relative flex-1 flex flex-col min-w-0 overflow-y-auto overflow-x-hidden px-3 sm:px-4 lg:px-5 xl:px-8 py-4 lg:py-6">
        <div className="mx-auto w-full max-w-[min(100%,1600px)]">{children}</div>
      </main>
    </div>
  );
}
