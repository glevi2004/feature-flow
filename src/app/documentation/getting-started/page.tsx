import Link from "next/link";
import { ArrowRight, Users, Zap, BarChart3, Settings } from "lucide-react";

export default function GettingStartedPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Getting Started</h1>
        <p className="text-xl text-muted-foreground">
          Welcome to Feature Ship! This guide will help you get up and running quickly with our feature management platform.
        </p>
      </div>

      <div className="space-y-8">
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">What is Feature Ship?</h2>
          <div className="bg-muted p-6 rounded-lg">
            <p className="text-muted-foreground mb-4">
              Feature Ship is a comprehensive platform for managing feature requests, tracking development progress, 
              and collaborating with your team. Whether you're a product manager, developer, or stakeholder, 
              Feature Ship helps streamline your feature development workflow.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="text-center p-4">
                <Users className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                <h3 className="font-medium">Team Collaboration</h3>
                <p className="text-sm text-muted-foreground">Work together seamlessly</p>
              </div>
              <div className="text-center p-4">
                <Zap className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                <h3 className="font-medium">Fast Development</h3>
                <p className="text-sm text-muted-foreground">Streamline your workflow</p>
              </div>
              <div className="text-center p-4">
                <BarChart3 className="h-8 w-8 mx-auto mb-2 text-green-500" />
                <h3 className="font-medium">Data-Driven</h3>
                <p className="text-sm text-muted-foreground">Make informed decisions</p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Quick Start Guide</h2>
          
          <div className="space-y-4">
            <div className="flex gap-4 p-6 border rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium mb-2">Create Your Account</h3>
                <p className="text-muted-foreground mb-4">
                  Sign up for Feature Ship using your email or Google account. 
                  You'll be guided through the onboarding process to set up your first project.
                </p>
                <div className="bg-background p-3 rounded border text-sm">
                  <code>Sign up at app.feature-ship.com</code>
                </div>
              </div>
            </div>

            <div className="flex gap-4 p-6 border rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium mb-2">Set Up Your Company</h3>
                <p className="text-muted-foreground mb-4">
                  Create your company profile and invite team members. 
                  Configure your organization settings and preferences.
                </p>
                <div className="bg-background p-3 rounded border text-sm">
                  <code>Company Settings → Organization → Add Members</code>
                </div>
              </div>
            </div>

            <div className="flex gap-4 p-6 border rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium mb-2">Create Your First Feature</h3>
                <p className="text-muted-foreground mb-4">
                  Start by creating a feature request. Add details, assign team members, 
                  and set priorities to get your development process started.
                </p>
                <div className="bg-background p-3 rounded border text-sm">
                  <code>Dashboard → Create Feature → Fill Details → Save</code>
                </div>
              </div>
            </div>

            <div className="flex gap-4 p-6 border rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold">
                4
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium mb-2">Organize with Kanban</h3>
                <p className="text-muted-foreground mb-4">
                  Use the Kanban board to visualize your feature development pipeline. 
                  Drag and drop features between status columns to track progress.
                </p>
                <div className="bg-background p-3 rounded border text-sm">
                  <code>Kanban → Drag Features → Update Status</code>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Key Concepts</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 border rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Features</h3>
              <p className="text-muted-foreground mb-4">
                Features are the core building blocks of your product. Each feature represents 
                a specific functionality or improvement to your application.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Title and description</li>
                <li>• Status tracking (Under Review, Accepted, etc.)</li>
                <li>• Priority levels</li>
                <li>• Tags and categories</li>
              </ul>
            </div>

            <div className="p-6 border rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Types & Tags</h3>
              <p className="text-muted-foreground mb-4">
                Organize your features using types (Bug, Enhancement, New Feature) 
                and custom tags for better categorization and filtering.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Predefined types</li>
                <li>• Custom tags</li>
                <li>• Color coding</li>
                <li>• Filtering capabilities</li>
              </ul>
            </div>

            <div className="p-6 border rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Status Workflow</h3>
              <p className="text-muted-foreground mb-4">
                Features move through different statuses during development. 
                Track progress from initial review to completion.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Under Review → Accepted</li>
                <li>• Accepted → Planned</li>
                <li>• Planned → Completed</li>
                <li>• Rejected (if not viable)</li>
              </ul>
            </div>

            <div className="p-6 border rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Team Collaboration</h3>
              <p className="text-muted-foreground mb-4">
                Work together with your team through comments, assignments, 
                and real-time updates on feature development.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Comments and discussions</li>
                <li>• User assignments</li>
                <li>• Activity tracking</li>
                <li>• Notifications</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Next Steps</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Installation Guide</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Learn how to install and configure Feature Ship in your environment.
              </p>
              <Link
                href="/documentation/installation"
                className="text-blue-600 hover:underline text-sm flex items-center gap-1"
              >
                View Installation <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Dashboard Guide</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Master the dashboard interface and learn advanced filtering techniques.
              </p>
              <Link
                href="/documentation/dashboard"
                className="text-blue-600 hover:underline text-sm flex items-center gap-1"
              >
                Explore Dashboard <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Kanban Board</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Learn how to effectively use the Kanban board for project management.
              </p>
              <Link
                href="/documentation/kanban"
                className="text-blue-600 hover:underline text-sm flex items-center gap-1"
              >
                Learn Kanban <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
