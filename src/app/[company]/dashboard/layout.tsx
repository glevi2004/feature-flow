"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
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
      <SidebarProvider>
        <Header />
        <div className="flex h-screen bg-background mt-20 w-full">
          <AppSidebar />
          <SidebarInset className="flex-1 overflow-auto bg-background">
            <div className="p-4">
              <SidebarTrigger />
            </div>
            {children}
          </SidebarInset>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}
