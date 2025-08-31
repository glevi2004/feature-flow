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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 border rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Getting Started</h3>
          <p className="text-muted-foreground mb-4">
            Learn the basics of Feature Ship and set up your first project.
          </p>
          <Link
            href="/documentation/getting-started"
            className="text-blue-600 hover:underline"
          >
            Read more →
          </Link>
        </div>

        <div className="p-6 border rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Features</h3>
          <p className="text-muted-foreground mb-4">
            Explore all the features available in Feature Ship.
          </p>
          <Link
            href="/documentation/features"
            className="text-blue-600 hover:underline"
          >
            Read more →
          </Link>
        </div>

        <div className="p-6 border rounded-lg">
          <h3 className="text-lg font-semibold mb-2">API Reference</h3>
          <p className="text-muted-foreground mb-4">
            Complete API documentation for developers.
          </p>
          <Link
            href="/documentation/api"
            className="text-blue-600 hover:underline"
          >
            Read more →
          </Link>
        </div>

        <div className="p-6 border rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Integrations</h3>
          <p className="text-muted-foreground mb-4">
            Connect Feature Ship with your existing tools.
          </p>
          <Link
            href="/documentation/integrations"
            className="text-blue-600 hover:underline"
          >
            Read more →
          </Link>
        </div>

        <div className="p-6 border rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Tutorials</h3>
          <p className="text-muted-foreground mb-4">
            Step-by-step guides for common use cases.
          </p>
          <Link
            href="/documentation/tutorials"
            className="text-blue-600 hover:underline"
          >
            Read more →
          </Link>
        </div>

        <div className="p-6 border rounded-lg">
          <h3 className="text-lg font-semibold mb-2">FAQ</h3>
          <p className="text-muted-foreground mb-4">
            Frequently asked questions and troubleshooting.
          </p>
          <Link
            href="/documentation/faq"
            className="text-blue-600 hover:underline"
          >
            Read more →
          </Link>
        </div>
      </div>
    </div>
  );
}
