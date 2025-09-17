"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Package, Menu, X } from "lucide-react";
import Link from "next/link";
import { app_name } from "@/lib/constants";
import { ModeToggle } from "@/components/mode-toggle";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="px-6 fixed top-0 left-0 right-0 z-50 w-screen border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between px-4 w-full">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
            <Package className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-semibold">{app_name}</span>
        </div>

        {/* Desktop Navigation - Centered */}
        <div className="hidden lg:flex items-center justify-center flex-1">
          <nav className="flex space-x-6">
            <a
              href="#features"
              className="text-foreground hover:text-muted-foreground transition-colors text-sm"
            >
              Features
            </a>
            <a
              href="#workflow"
              className="text-foreground hover:text-muted-foreground transition-colors text-sm"
            >
              Workflow
            </a>
            <Link
              href="/documentation"
              className="text-foreground hover:text-muted-foreground transition-colors text-sm"
            >
              Documentation
            </Link>
          </nav>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden lg:flex items-center space-x-2">
          <Link href="/login">
            <Button
              variant="ghost"
              className="text-foreground hover:bg-accent hover:text-accent-foreground px-6 py-2 transition-all duration-200"
            >
              Login
            </Button>
          </Link>
          <Link href="/register">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground border border-border rounded-full px-6 py-2 transition-all">
              Get Started
            </Button>
          </Link>
          <ModeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-foreground hover:bg-accent"
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
        <div className="md:hidden absolute top-14 left-4 right-4 bg-background/95 backdrop-blur-lg border border-border rounded-lg p-4 space-y-3 shadow-lg">
          <nav className="space-y-3">
            <a
              href="#features"
              className="block text-foreground hover:bg-accent hover:text-accent-foreground rounded-md px-4 transition-colors font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#workflow"
              className="block text-foreground hover:bg-accent hover:text-accent-foreground rounded-md px-4 transition-colors font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Workflow
            </a>
            <Link
              href="/documentation"
              className="text-foreground hover:bg-accent hover:text-accent-foreground rounded-md px-4 transition-colors font-medium py-2 block"
              onClick={() => setIsMenuOpen(false)}
            >
              Documentation
            </Link>
          </nav>
          <div className="pt-3 border-t border-border space-y-2 ">
            <Link href="/login" onClick={() => setIsMenuOpen(false)}>
              <Button
                variant="ghost"
                className="mb-2 w-full text-foreground hover:bg-accent hover:text-accent-foreground justify-start"
              >
                Login
              </Button>
            </Link>
            <Link href="/register" onClick={() => setIsMenuOpen(false)}>
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground border border-border justify-start">
                Get Started
              </Button>
            </Link>
            <div className="flex justify-center pt-2">
              <ModeToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
