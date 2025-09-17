import { Button } from "@/components/ui/button";
import Link from "next/link";
import { app_name } from "@/lib/constants";

export function CTASection() {
  return (
    <section className="bg-background py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-foreground mb-4">
          Ready to Transform Your Feedback Process?
        </h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join thousands of teams using {app_name} to build better products
          based on real customer feedback.
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
          <Button size="lg" variant="outline" className="text-lg px-8 py-3">
            Schedule Demo
          </Button>
        </div>
      </div>
    </section>
  );
}
