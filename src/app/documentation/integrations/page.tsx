import Link from "next/link";
import { Users, MessageSquare, CheckSquare, Github, Zap, Settings } from "lucide-react";

export default function IntegrationsPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Integrations</h1>
        <p className="text-xl text-muted-foreground">
          Connect Feature Ship with your favorite tools to streamline your development workflow.
        </p>
      </div>

      <div className="space-y-8">
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Available Integrations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 border rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <MessageSquare className="h-8 w-8 text-green-500" />
                <h3 className="text-lg font-semibold">Slack</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Get real-time notifications about feature updates, comments, and status changes directly in your Slack channels.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Feature status notifications</li>
                <li>• Comment mentions</li>
                <li>• Daily/weekly summaries</li>
                <li>• Custom channel routing</li>
              </ul>
            </div>

            <div className="p-6 border rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <CheckSquare className="h-8 w-8 text-blue-500" />
                <h3 className="text-lg font-semibold">Jira</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Sync features with Jira issues for seamless project management and development tracking.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Automatic issue creation</li>
                <li>• Status synchronization</li>
                <li>• Bidirectional updates</li>
                <li>• Custom field mapping</li>
              </ul>
            </div>

            <div className="p-6 border rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <CheckSquare className="h-8 w-8 text-purple-500" />
                <h3 className="text-lg font-semibold">ClickUp</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Integrate with ClickUp to manage features alongside your tasks and projects.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Task creation from features</li>
                <li>• Progress tracking</li>
                <li>• Team collaboration</li>
                <li>• Time tracking integration</li>
              </ul>
            </div>

            <div className="p-6 border rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <Github className="h-8 w-8 text-gray-800" />
                <h3 className="text-lg font-semibold">GitHub</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Connect with GitHub repositories to link features with pull requests and commits.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• PR linking</li>
                <li>• Commit tracking</li>
                <li>• Release management</li>
                <li>• Branch integration</li>
              </ul>
            </div>

            <div className="p-6 border rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="h-8 w-8 text-yellow-500" />
                <h3 className="text-lg font-semibold">Zapier</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Connect with 5000+ apps through Zapier for unlimited integration possibilities.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Custom workflows</li>
                <li>• Multi-app automation</li>
                <li>• Conditional triggers</li>
                <li>• Data transformation</li>
              </ul>
            </div>

            <div className="p-6 border rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <Settings className="h-8 w-8 text-orange-500" />
                <h3 className="text-lg font-semibold">Custom API</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Build custom integrations using our REST API and webhooks for any tool or service.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• REST API access</li>
                <li>• Webhook support</li>
                <li>• Custom endpoints</li>
                <li>• Real-time events</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Setting Up Integrations</h2>
          
          <div className="space-y-4">
            <div className="p-6 border rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Step 1: Access Integration Settings</h3>
              <p className="text-muted-foreground mb-4">
                Navigate to your settings and find the Integrations section to begin setting up connections.
              </p>
              <div className="bg-background p-4 rounded border">
                <code className="text-sm">Settings → Integrations → Add Integration</code>
              </div>
            </div>

            <div className="p-6 border rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Step 2: Choose Your Integration</h3>
              <p className="text-muted-foreground mb-4">
                Select from available integrations or explore custom options for your specific needs.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded">
                  <h4 className="font-medium mb-2">Popular Integrations</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Slack for notifications</li>
                    <li>• Jira for project management</li>
                    <li>• GitHub for development</li>
                    <li>• ClickUp for task management</li>
                  </ul>
                </div>
                <div className="p-4 bg-muted rounded">
                  <h4 className="font-medium mb-2">Custom Options</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Webhook configuration</li>
                    <li>• API key setup</li>
                    <li>• Custom endpoints</li>
                    <li>• Zapier workflows</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 border rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Step 3: Configure Settings</h3>
              <p className="text-muted-foreground mb-4">
                Customize your integration settings to match your workflow and preferences.
              </p>
              <div className="bg-background p-4 rounded border">
                <pre className="text-sm">
                  {`// Example webhook configuration
{
  "url": "https://your-app.com/webhook",
  "events": ["feature.created", "feature.updated"],
  "secret": "your-webhook-secret",
  "retry_policy": "exponential_backoff"
}`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Integration Examples</h2>
          
          <div className="space-y-4">
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted px-6 py-4 border-b">
                <h3 className="text-lg font-semibold">Slack Notification Setup</h3>
              </div>
              <div className="p-6">
                <p className="text-muted-foreground mb-4">
                  Set up Slack notifications to keep your team informed about feature updates.
                </p>
                <div className="bg-background p-4 rounded border">
                  <pre className="text-sm">
                    {`1. Go to Settings → Integrations → Slack
2. Click "Connect Slack Workspace"
3. Authorize Feature Ship in Slack
4. Choose notification channels
5. Configure notification types:
   - Feature status changes
   - New comments
   - Daily summaries
6. Test the integration`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted px-6 py-4 border-b">
                <h3 className="text-lg font-semibold">Jira Synchronization</h3>
              </div>
              <div className="p-6">
                <p className="text-muted-foreground mb-4">
                  Sync features with Jira issues for comprehensive project management.
                </p>
                <div className="bg-background p-4 rounded border">
                  <pre className="text-sm">
                    {`1. Navigate to Settings → Integrations → Jira
2. Enter your Jira URL and credentials
3. Map Feature Ship fields to Jira fields:
   - Feature title → Issue summary
   - Feature description → Issue description
   - Feature status → Issue status
4. Set up automatic issue creation
5. Configure bidirectional sync`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Webhooks</h2>
          <div className="bg-muted p-6 rounded-lg">
            <p className="text-muted-foreground mb-4">
              Use webhooks to receive real-time notifications about events in Feature Ship. 
              This allows you to build custom integrations and automate workflows.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded">
                <h4 className="font-medium mb-2">Available Events</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• feature.created</li>
                  <li>• feature.updated</li>
                  <li>• feature.status_changed</li>
                  <li>• comment.added</li>
                  <li>• user.mentioned</li>
                </ul>
              </div>
              <div className="p-4 border rounded">
                <h4 className="font-medium mb-2">Webhook Payload</h4>
                <div className="bg-background p-3 rounded border text-xs">
                  <pre>
                    {`{
  "event": "feature.updated",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "feature_id": "feat_123",
    "changes": {...}
  }
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Best Practices</h2>
          <div className="space-y-4">
            <div className="p-4 border-l-4 border-blue-500 bg-blue-50 rounded-r-lg">
              <h3 className="font-medium mb-2">Start Simple</h3>
              <p className="text-sm text-muted-foreground">
                Begin with basic integrations like Slack notifications before moving to more complex setups. 
                This helps you understand the integration patterns.
              </p>
            </div>
            <div className="p-4 border-l-4 border-green-500 bg-green-50 rounded-r-lg">
              <h3 className="font-medium mb-2">Test Thoroughly</h3>
              <p className="text-sm text-muted-foreground">
                Always test your integrations in a development environment before deploying to production. 
                Use webhook testing tools to verify payloads.
              </p>
            </div>
            <div className="p-4 border-l-4 border-purple-500 bg-purple-50 rounded-r-lg">
              <h3 className="font-medium mb-2">Monitor Performance</h3>
              <p className="text-sm text-muted-foreground">
                Keep an eye on integration performance and error rates. Set up monitoring and alerts 
                to catch issues early.
              </p>
            </div>
            <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50 rounded-r-lg">
              <h3 className="font-medium mb-2">Document Your Setup</h3>
              <p className="text-sm text-muted-foreground">
                Document your integration configurations and workflows. This helps with troubleshooting 
                and onboarding new team members.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Related Documentation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">API Reference</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Learn about our REST API for building custom integrations.
              </p>
              <Link
                href="/documentation/api"
                className="text-blue-600 hover:underline text-sm"
              >
                View API Documentation →
              </Link>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Settings</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Configure your integration settings and preferences.
              </p>
              <Link
                href="/documentation/settings"
                className="text-blue-600 hover:underline text-sm"
              >
                View Settings Guide →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
