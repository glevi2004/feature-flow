"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Header } from "@/components/header";

export default function DocumentationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="mb-20">
        <Header />
      </div>
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger />
        <main className="p-4">{children}</main>
      </SidebarProvider>
    </>
  );
}
