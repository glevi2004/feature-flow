export default function FeaturesPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Features</h1>
        <p className="text-xl text-muted-foreground">
          Explore all the powerful features available in Feature Ship.
        </p>
      </div>

      <div className="space-y-8">
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Core Features</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 border rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Feature Management</h3>
              <p className="text-muted-foreground mb-4">
                Create, organize, and track features with our intuitive
                management system.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Feature creation and editing</li>
                <li>• Status tracking</li>
                <li>• Priority management</li>
                <li>• Custom fields</li>
              </ul>
            </div>

            <div className="p-6 border rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Team Collaboration</h3>
              <p className="text-muted-foreground mb-4">
                Work together seamlessly with your team on feature development.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Real-time collaboration</li>
                <li>• Comments and discussions</li>
                <li>• Assignment management</li>
                <li>• Activity tracking</li>
              </ul>
            </div>

            <div className="p-6 border rounded-lg">
              <h3 className="text-lg font-semibold mb-3">
                Workflow Automation
              </h3>
              <p className="text-muted-foreground mb-4">
                Automate repetitive tasks and streamline your development
                process.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Automated status updates</li>
                <li>• Notification rules</li>
                <li>• Integration triggers</li>
                <li>• Custom workflows</li>
              </ul>
            </div>

            <div className="p-6 border rounded-lg">
              <h3 className="text-lg font-semibold mb-3">
                Analytics & Reporting
              </h3>
              <p className="text-muted-foreground mb-4">
                Get insights into your feature development process with detailed
                analytics.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Performance metrics</li>
                <li>• Team productivity</li>
                <li>• Feature velocity</li>
                <li>• Custom reports</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Advanced Features</h2>

          <div className="space-y-4">
            <div className="p-6 border rounded-lg">
              <h3 className="text-lg font-semibold mb-3">API Integration</h3>
              <p className="text-muted-foreground mb-4">
                Connect Feature Ship with your existing development tools and
                services.
              </p>
              <div className="bg-muted p-4 rounded">
                <code className="text-sm">
                  POST /api/features
                  <br />
                  Content-Type: application/json
                  <br />
                  <br />
                  {`{
  "name": "New Feature",
  "description": "Feature description",
  "priority": "high"
}`}
                </code>
              </div>
            </div>

            <div className="p-6 border rounded-lg">
              <h3 className="text-lg font-semibold mb-3">
                Custom Integrations
              </h3>
              <p className="text-muted-foreground mb-4">
                Build custom integrations with popular development tools.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  Slack
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  Jira
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  ClickUp
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  GitHub
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  GitLab
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Coming Soon</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg bg-muted/50">
              <h3 className="font-medium mb-2">AI-Powered Insights</h3>
              <p className="text-sm text-muted-foreground">
                Get intelligent suggestions and insights powered by AI.
              </p>
            </div>
            <div className="p-4 border rounded-lg bg-muted/50">
              <h3 className="font-medium mb-2">Advanced Analytics</h3>
              <p className="text-sm text-muted-foreground">
                Deeper analytics and predictive modeling capabilities.
              </p>
            </div>
            <div className="p-4 border rounded-lg bg-muted/50">
              <h3 className="font-medium mb-2">Mobile App</h3>
              <p className="text-sm text-muted-foreground">
                Native mobile applications for iOS and Android.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
