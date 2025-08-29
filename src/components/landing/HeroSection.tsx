import { Button } from "@/components/ui/button";
import Link from "next/link";
import { app_name } from "@/lib/constants";

export function HeroSection() {
  return (
    <section className="container mx-auto px-4 py-30 lg:mt-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-300 bg-clip-text text-transparent">
              Transform Customer Feedback Into Action
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto lg:mx-0">
              {app_name} is a modern feedback platform designed to help teams
              collect, organize, and prioritize customer feedback effectively.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/register">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-3"
                >
                  Start Free Trial
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg px-8 py-3">
                Watch Demo
              </Button>
            </div>
          </div>

          {/* App MVP Image Placeholder */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-[28rem] h-[28rem] bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl border border-slate-600 shadow-2xl flex items-center justify-center">
                <div className="text-center text-slate-400">
                  <div className="w-16 h-16 bg-slate-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <p className="text-sm font-medium">App MVP Screenshot</p>
                  <p className="text-xs text-slate-500 mt-1">448×448px</p>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 rounded-full opacity-20"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-500 rounded-full opacity-20"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
