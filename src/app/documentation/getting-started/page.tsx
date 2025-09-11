import Link from "next/link";
import { Play, ArrowRight, CheckCircle, Zap, Users, Settings } from "lucide-react";

export default function GettingStartedPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Getting Started</h1>
        <p className="text-xl text-muted-foreground mt-2">
          Welcome to Feature Ship! Get up and running in minutes.
        </p>
      </div>

      <div className="space-y-8">
        {/* Quick Start Steps */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Quick Start</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 border rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">1</span>
                </div>
                <h3 className="text-lg font-semibold">Create Account</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Sign up with your Google account to get started instantly.
              </p>
              <div className="bg-muted p-3 rounded text-sm">
                <code>Click "Sign In with Google" on the homepage</code>
              </div>
            </div>

            <div className="p-6 border rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-semibold">2</span>
                </div>
                <h3 className="text-lg font-semibold">Create Company</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Set up your company profile and invite team members.
              </p>
              <div className="bg-muted p-3 rounded text-sm">
                <code>Fill out company details in the setup wizard</code>
              </div>
            </div>

            <div className="p-6 border rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-semibold">3</span>
                </div>
                <h3 className="text-lg font-semibold">Start Managing</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Create your first feature request and start organizing your workflow.
              </p>
              <div className="bg-muted p-3 rounded text-sm">
                <code>Use the dashboard to create and manage features</code>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 border rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="h-6 w-6 text-blue-500" />
                <h3 className="text-lg font-semibold">Dashboard</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Centralized view of all your feature requests with powerful search and filtering.
              </p>
              <Link
                href="/documentation/dashboard"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
              >
                Learn more <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="p-6 border rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-6 w-6 text-green-500" />
                <h3 className="text-lg font-semibold">Kanban Board</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Visual workflow management with drag-and-drop functionality.
              </p>
              <Link
                href="/documentation/kanban"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
              >
                Learn more <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="p-6 border rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <Settings className="h-6 w-6 text-purple-500" />
                <h3 className="text-lg font-semibold">Settings</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Customize your workflow with statuses, types, and tags.
              </p>
              <Link
                href="/documentation/settings"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
              >
                Learn more <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="p-6 border rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <Play className="h-6 w-6 text-orange-500" />
                <h3 className="text-lg font-semibold">Public Feedback</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Collect feature requests directly from your users.
              </p>
              <Link
                href="/documentation/features"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
              >
                Learn more <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Next Steps</h2>
          <div className="bg-muted p-6 rounded-lg">
            <p className="text-muted-foreground mb-4">
              Ready to dive deeper? Here are some recommended next steps:
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <Link
                  href="/documentation/features"
                  className="text-blue-600 hover:text-blue-700"
                >
                  Explore all features
                </Link>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <Link
                  href="/documentation/tutorials"
                  className="text-blue-600 hover:text-blue-700"
                >
                  Follow step-by-step tutorials
                </Link>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <Link
                  href="/documentation/api"
                  className="text-blue-600 hover:text-blue-700"
                >
                  Integrate with our API
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}