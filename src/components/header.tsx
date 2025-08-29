"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Zap } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { app_name } from "@/lib/constants";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-screen border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between px-4 w-full">
        {/* Left side - Logo/Brand */}
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-semibold">{app_name}</span>
        </div>

        {/* Right side - Mode Toggle */}
        <div className="flex items-center">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
