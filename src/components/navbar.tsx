"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Zap, Menu, X } from "lucide-react";
import Link from "next/link";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex space-x-6">
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
                className="text-white hover:!bg-white/10 hover:!text-white/90 px-6 py-2 transition-all duration-200"
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

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ModeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:!bg-white/10"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4 space-y-3">
            <nav className="space-y-3">
              <a
                href="#features"
                className="block text-white hover:text-white/80 transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#workflow"
                className="block text-white hover:text-white/80 transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Workflow
              </a>
              <a
                href="#integrations"
                className="text-white hover:text-white/80 transition-colors font-medium py-2 block"
                onClick={() => setIsMenuOpen(false)}
              >
                Integrations
              </a>
            </nav>
            <div className="pt-3 border-t border-white/20 space-y-2">
              <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                <Button
                  variant="ghost"
                  className="w-full text-white hover:!bg-white/10 hover:!text-white/90 justify-start"
                >
                  Login
                </Button>
              </Link>
              <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30 justify-start">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
