"use client";
import "jsvectormap/dist/css/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  // const pathname = usePathname();
  const router = useRouter()

  useEffect(() => {
    const cookies = Cookies.get('accessToken');
    const localStorage = window.localStorage.getItem('accessToken');
    if (!localStorage && !cookies) {
      router.push('/admin/login')
    }
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Toaster position="top-center" containerClassName="mt-4"/>
        {loading ? <Loader /> : children}
      </body>
    </html>
  );
}
