"use client";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Zap } from "lucide-react";
import Link from "next/link";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-white">
              Feature Flow
            </span>
          </div>
          <div className="flex items-center space-x-6">
            <nav className="hidden md:flex space-x-6">
              <a
                href="#features"
                className="text-white hover:text-white/80 transition-colors font-medium"
              >
                Features
              </a>
              <a
                href="#workflow"
                className="text-white hover:text-white/80 transition-colors font-medium"
              >
                Workflow
              </a>
              <a
                href="#integrations"
                className="text-white hover:text-white/80 transition-colors font-medium"
              >
                Integrations
              </a>
            </nav>
            <ModeToggle />
            <Link href="/login">
              <Button
                variant="ghost"
                className="text-white hover:text-white/90 hover:bg-white/5 px-6 py-2 transition-all duration-200"
              >
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-white/20 hover:bg-white/30 text-white border border-white/30 rounded-full px-6 py-2 transition-all">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
