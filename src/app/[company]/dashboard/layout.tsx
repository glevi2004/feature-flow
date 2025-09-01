"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { SideNav } from "@/components/side-nav";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Loading } from "@/components/ui/loading";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading size="lg" text="Loading..." />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Header />
      <div
        className="flex bg-background w-full"
        style={{ height: "calc(100vh - 3.5rem)", marginTop: "3.5rem" }}
      >
        <div className="mr-8">
          <SideNav />
        </div>

        <div className="flex-1 overflow-auto bg-background">
          <div className="p-4"></div>
          {children}
        </div>
      </div>
    </ThemeProvider>
  );
}
