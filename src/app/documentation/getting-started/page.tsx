export default function GettingStartedPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Getting Started</h1>
        <p className="text-xl text-muted-foreground">
          Learn how to set up Feature Ship and create your first project.
        </p>
      </div>

      <div className="space-y-6">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Quick Start</h2>
          <div className="bg-muted p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-4">1. Create an Account</h3>
            <p className="text-muted-foreground mb-4">
              Sign up for a Feature Ship account to get started with your
              feature development workflow.
            </p>
            <div className="bg-background p-4 rounded border">
              <code className="text-sm">npm install feature-ship</code>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Installation</h2>
          <div className="space-y-4">
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Using npm</h3>
              <div className="bg-background p-4 rounded border">
                <code className="text-sm">npm install feature-ship</code>
              </div>
            </div>

            <div className="bg-muted p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Using yarn</h3>
              <div className="bg-background p-4 rounded border">
                <code className="text-sm">yarn add feature-ship</code>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Configuration</h2>
          <div className="bg-muted p-6 rounded-lg">
            <p className="text-muted-foreground mb-4">
              Configure Feature Ship with your project settings and preferences.
            </p>
            <div className="bg-background p-4 rounded border">
              <pre className="text-sm">
                {`{
  "project": {
    "name": "my-feature-project",
    "version": "1.0.0"
  },
  "features": {
    "autoSave": true,
    "notifications": true
  }
}`}
              </pre>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Next Steps</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Explore Features</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Learn about all the features available in Feature Ship.
              </p>
              <a
                href="/documentation/features"
                className="text-blue-600 hover:underline text-sm"
              >
                View Features →
              </a>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Check Tutorials</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Follow step-by-step tutorials for common use cases.
              </p>
              <a
                href="/documentation/tutorials"
                className="text-blue-600 hover:underline text-sm"
              >
                View Tutorials →
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
