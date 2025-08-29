import { Button } from "@/components/ui/button";
import Link from "next/link";
import { app_name } from "@/lib/constants";

export function CTASection() {
  return (
    <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-white mb-4">
          Ready to Transform Your Feedback Process?
        </h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Join thousands of teams using {app_name} to build better products
          based on real customer feedback.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/register">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg px-8 py-3"
            >
              Start Free Trial
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
