import Link from "next/link";

export default function DocumentationPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Documentation</h1>
        <p className="text-xl text-muted-foreground">
          Welcome to the Feature Ship documentation. Learn how to use our
          platform to streamline your feature development workflow.
        </p>
      </div>

      <div className="space-y-8">
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Getting Started</h2>
          <div className="p-6 border rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Getting Started Guide</h3>
            <p className="text-muted-foreground mb-4">
              Learn the basics of Feature Ship and get up and running in minutes
              with our simple getting started guide.
            </p>
            <Link
              href="/documentation/getting-started"
              className="text-blue-600 hover:underline"
            >
              Get Started →
            </Link>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Core Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 border rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Features Overview</h3>
              <p className="text-muted-foreground mb-4">
                Explore all the powerful features available in Feature Ship for
                managing your development workflow.
              </p>
              <Link
                href="/documentation/features"
                className="text-blue-600 hover:underline"
              >
                View Features →
              </Link>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Dashboard</h3>
              <p className="text-muted-foreground mb-4">
                Master the dashboard interface with advanced filtering, search,
                and feature management capabilities.
              </p>
              <Link
                href="/documentation/dashboard"
                className="text-blue-600 hover:underline"
              >
                Dashboard Guide →
              </Link>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Kanban Board</h3>
              <p className="text-muted-foreground mb-4">
                Learn how to effectively use the Kanban board for visual project
                management and workflow optimization.
              </p>
              <Link
                href="/documentation/kanban"
                className="text-blue-600 hover:underline"
              >
                Kanban Guide →
              </Link>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Configuration & Setup</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 border rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Settings</h3>
              <p className="text-muted-foreground mb-4">
                Configure your Feature Ship workspace, team settings, and
                customization options.
              </p>
              <Link
                href="/documentation/settings"
                className="text-blue-600 hover:underline"
              >
                Settings Guide →
              </Link>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Analytics</h3>
              <p className="text-muted-foreground mb-4">
                Gain insights into your development process with comprehensive
                analytics and reporting.
              </p>
              <Link
                href="/documentation/analytics"
                className="text-blue-600 hover:underline"
              >
                Analytics Guide →
              </Link>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Development & Integration</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 border rounded-lg">
              <h3 className="text-lg font-semibold mb-2">API Reference</h3>
              <p className="text-muted-foreground mb-4">
                Complete API documentation for integrating with Feature Ship and
                building custom solutions.
              </p>
              <Link
                href="/documentation/api"
                className="text-blue-600 hover:underline"
              >
                API Docs →
              </Link>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Integrations</h3>
              <p className="text-muted-foreground mb-4">
                Connect Feature Ship with your favorite tools like Slack, Jira,
                GitHub, and more.
              </p>
              <Link
                href="/documentation/integrations"
                className="text-blue-600 hover:underline"
              >
                Integrations →
              </Link>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Learning & Support</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 border rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Tutorials</h3>
              <p className="text-muted-foreground mb-4">
                Step-by-step guides to help you master Feature Ship and optimize
                your workflow.
              </p>
              <Link
                href="/documentation/tutorials"
                className="text-blue-600 hover:underline"
              >
                View Tutorials →
              </Link>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="text-lg font-semibold mb-2">FAQ</h3>
              <p className="text-muted-foreground mb-4">
                Find answers to frequently asked questions and get help with
                troubleshooting.
              </p>
              <Link
                href="/documentation/faq"
                className="text-blue-600 hover:underline"
              >
                View FAQ →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
