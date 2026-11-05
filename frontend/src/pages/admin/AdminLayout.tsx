import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("msz_admin_token");
    if (!token) {
      setAuthorized(false);
      navigate("/admin/login");
    } else {
      setAuthorized(true);
    }
  }, [pathname, navigate]);

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

  return (
    <div className="min-h-screen text-[#FAF7F2] flex flex-row selection:bg-[#C9B38D] selection:text-[#120A05] relative" style={{ backgroundImage: "url('/images/hero-banner.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className="absolute inset-0 backdrop-blur-md bg-[#120A05]/70" />
      <AdminSidebar />
      <main className="relative flex-1 flex flex-col min-w-0 overflow-y-auto backdrop-blur-md">
        <Outlet />
      </main>
    </div>
  );
}
