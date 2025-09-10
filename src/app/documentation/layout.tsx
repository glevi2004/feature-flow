"use client";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { DocumentationSidebar } from "@/components/documentation-sidebar";
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
        <DocumentationSidebar />
        <SidebarInset>
          <div className="flex h-16 items-center gap-2 border-b px-4">
            <SidebarTrigger />
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold">Documentation</h1>
            </div>
          </div>
          <main className="flex-1 p-6">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
