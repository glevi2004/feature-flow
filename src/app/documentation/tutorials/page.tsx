import Link from "next/link";
import {
  BookOpen,
  Play,
  Users,
  Zap,
  Settings,
  BarChart3,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

export default function TutorialsPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Tutorials</h1>
        <p className="text-xl text-muted-foreground">
          Step-by-step guides to help you master Feature Ship and optimize your
          feature development workflow.
        </p>
      </div>

      <div className="space-y-8">
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Getting Started Tutorials</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 border rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <Play className="h-8 w-8 text-blue-500" />
                <h3 className="text-lg font-semibold">
                  Setting Up Your First Project
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Learn how to create your company, invite team members, and set
                up your first feature request in Feature Ship.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Create company account</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Invite team members</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Create first feature</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Set up basic workflow</span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Duration:</strong> 15 minutes
                </p>
              </div>
            </div>

            <div className="p-6 border rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-8 w-8 text-green-500" />
                <h3 className="text-lg font-semibold">
                  Team Collaboration Setup
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Configure your team structure, roles, and permissions to enable
                effective collaboration on feature development.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Set up team roles</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Configure permissions</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Enable notifications</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Test collaboration</span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-green-800">
                  <strong>Duration:</strong> 20 minutes
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">
            Feature Management Tutorials
          </h2>

          <div className="space-y-6">
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted px-6 py-4 border-b">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-5 w-5" />
                  <h3 className="text-lg font-semibold">
                    Creating and Managing Features
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-muted-foreground mb-4">
                  Master the art of creating, organizing, and managing feature
                  requests effectively.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Step-by-Step Process</h4>
                    <ol className="text-sm text-muted-foreground space-y-2">
                      <li>1. Navigate to Dashboard</li>
                      <li>2. Click &quot;Create Feature&quot;</li>
                      <li>3. Fill in feature details</li>
                      <li>4. Assign types and tags</li>
                      <li>5. Set priority and assignee</li>
                      <li>6. Save and review</li>
                    </ol>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3">Best Practices</h4>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• Use clear, descriptive titles</li>
                      <li>• Provide detailed descriptions</li>
                      <li>• Choose appropriate types</li>
                      <li>• Add relevant tags</li>
                      <li>• Set realistic priorities</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Pro Tip:</strong> Use templates for common feature
                    types to speed up the creation process.
                  </p>
                </div>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted px-6 py-4 border-b">
                <div className="flex items-center gap-3">
                  <Zap className="h-5 w-5" />
                  <h3 className="text-lg font-semibold">
                    Advanced Filtering and Search
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-muted-foreground mb-4">
                  Learn how to use advanced filtering and search capabilities to
                  find and organize features efficiently.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Search Techniques</h4>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• Use keywords in titles</li>
                      <li>• Search by description content</li>
                      <li>• Filter by feature types</li>
                      <li>• Search by tags</li>
                      <li>• Combine multiple filters</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3">Filter Combinations</h4>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• Status + Type filters</li>
                      <li>• Tag + Priority filters</li>
                      <li>• Assignee + Date filters</li>
                      <li>• Custom filter sets</li>
                      <li>• Saved filter presets</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800">
                    <strong>Example:</strong> Search for &quot;mobile&quot; + filter by
                    &quot;Enhancement&quot; type + &quot;In Progress&quot; status.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Workflow Optimization</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 border rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <BarChart3 className="h-8 w-8 text-purple-500" />
                <h3 className="text-lg font-semibold">Kanban Board Mastery</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Optimize your Kanban workflow for maximum productivity and clear
                project visibility.
              </p>
              <div className="space-y-3">
                <div className="p-3 bg-muted rounded">
                  <h4 className="font-medium text-sm mb-1">
                    Column Management
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Organize features by development stage
                  </p>
                </div>
                <div className="p-3 bg-muted rounded">
                  <h4 className="font-medium text-sm mb-1">
                    Drag & Drop Workflow
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Move features between status columns
                  </p>
                </div>
                <div className="p-3 bg-muted rounded">
                  <h4 className="font-medium text-sm mb-1">
                    Progress Tracking
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Monitor development velocity
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 border rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <Settings className="h-8 w-8 text-orange-500" />
                <h3 className="text-lg font-semibold">Custom Workflows</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Create custom workflows that match your team&apos;s development
                process and requirements.
              </p>
              <div className="space-y-3">
                <div className="p-3 bg-muted rounded">
                  <h4 className="font-medium text-sm mb-1">
                    Status Customization
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Define custom status workflows
                  </p>
                </div>
                <div className="p-3 bg-muted rounded">
                  <h4 className="font-medium text-sm mb-1">
                    Approval Processes
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Set up review and approval steps
                  </p>
                </div>
                <div className="p-3 bg-muted rounded">
                  <h4 className="font-medium text-sm mb-1">Automation Rules</h4>
                  <p className="text-xs text-muted-foreground">
                    Automate repetitive tasks
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Integration Tutorials</h2>

          <div className="space-y-4">
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted px-6 py-4 border-b">
                <h3 className="text-lg font-semibold">
                  Slack Integration Setup
                </h3>
              </div>
              <div className="p-6">
                <p className="text-muted-foreground mb-4">
                  Connect Feature Ship with Slack to receive real-time
                  notifications and updates.
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
                <h3 className="text-lg font-semibold">API Integration</h3>
              </div>
              <div className="p-6">
                <p className="text-muted-foreground mb-4">
                  Learn how to integrate Feature Ship with your existing tools
                  using our REST API.
                </p>
                <div className="bg-background p-4 rounded border">
                  <pre className="text-sm">
                    {`// Example: Create a feature via API
const response = await fetch('https://api.feature-ship.com/v1/features', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: 'New Feature Request',
    description: 'Feature description',
    type: 'enhancement',
    priority: 'medium'
  })
});`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Advanced Topics</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 border rounded-lg">
              <h3 className="text-lg font-semibold mb-3">
                Analytics and Reporting
              </h3>
              <p className="text-muted-foreground mb-4">
                Use analytics to gain insights into your development process and
                team performance.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Track development velocity</li>
                <li>• Monitor team productivity</li>
                <li>• Identify bottlenecks</li>
                <li>• Generate custom reports</li>
                <li>• Set performance goals</li>
              </ul>
            </div>

            <div className="p-6 border rounded-lg">
              <h3 className="text-lg font-semibold mb-3">
                Public Feedback Site
              </h3>
              <p className="text-muted-foreground mb-4">
                Set up a public feedback portal to collect feature requests from
                your users.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Configure public site</li>
                <li>• Customize branding</li>
                <li>• Set up moderation</li>
                <li>• Manage submissions</li>
                <li>• Integrate with workflow</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Troubleshooting Guides</h2>

          <div className="space-y-4">
            <div className="p-4 border-l-4 border-blue-500 bg-blue-50 rounded-r-lg">
              <h3 className="font-medium mb-2">Common Issues and Solutions</h3>
              <p className="text-sm text-muted-foreground">
                Learn how to resolve common issues like missing features,
                notification problems, and integration failures.
              </p>
            </div>
            <div className="p-4 border-l-4 border-green-500 bg-green-50 rounded-r-lg">
              <h3 className="font-medium mb-2">Performance Optimization</h3>
              <p className="text-sm text-muted-foreground">
                Tips for optimizing Feature Ship performance with large datasets
                and many team members.
              </p>
            </div>
            <div className="p-4 border-l-4 border-purple-500 bg-purple-50 rounded-r-lg">
              <h3 className="font-medium mb-2">Data Migration</h3>
              <p className="text-sm text-muted-foreground">
                Guide for migrating data from other tools and platforms to
                Feature Ship.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Next Steps</h2>
          <div className="bg-muted p-6 rounded-lg">
            <p className="text-muted-foreground mb-4">
              Ready to put your knowledge into practice? Here are some
              recommended next steps:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded">
                <h4 className="font-medium mb-2">Practice with Sample Data</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Create sample features and practice the workflows you&apos;ve
                  learned.
                </p>
                <Link
                  href="/documentation/getting-started"
                  className="text-blue-600 hover:underline text-sm flex items-center gap-1"
                >
                  Start Practicing <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
              <div className="p-4 border rounded">
                <h4 className="font-medium mb-2">Explore Advanced Features</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Dive deeper into advanced features and customization options.
                </p>
                <Link
                  href="/documentation/features"
                  className="text-blue-600 hover:underline text-sm flex items-center gap-1"
                >
                  Explore Features <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Related Documentation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">FAQ</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Find answers to frequently asked questions and common issues.
              </p>
              <Link
                href="/documentation/faq"
                className="text-blue-600 hover:underline text-sm"
              >
                View FAQ →
              </Link>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">API Reference</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Learn about our API for building custom integrations.
              </p>
              <Link
                href="/documentation/api"
                className="text-blue-600 hover:underline text-sm"
              >
                View API Docs →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
