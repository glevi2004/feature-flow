import { Button } from "@/components/ui/button";
import Link from "next/link";
import { app_name } from "@/lib/constants";

export function HeroSection() {
  return (
    <section className="bg-background container mx-auto px-4 py-20 lg:mt-0">
      <div className="max-w-4xl mx-auto">
        <div className="text-center">
          {/* Text Content */}
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-[#58a6ff]">
              Transform Customer Feedback Into Action
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              {app_name} is a modern feedback platform designed to help teams
              collect, organize, and prioritize customer feedback effectively.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-600/80 text-white text-lg px-8 py-3"
                >
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
