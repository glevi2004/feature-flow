import Link from "next/link";
import { HelpCircle, ChevronDown, ChevronUp, MessageSquare, Users, Settings, Zap } from "lucide-react";

export default function FAQPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Frequently Asked Questions</h1>
        <p className="text-xl text-muted-foreground">
          Find answers to common questions about Feature Ship and get help with troubleshooting.
        </p>
      </div>

      <div className="space-y-8">
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Getting Started</h2>
          
          <div className="space-y-4">
            <div className="border rounded-lg">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-blue-500" />
                  How do I create my first feature request?
                </h3>
                <p className="text-muted-foreground">
                  To create your first feature request, navigate to the Dashboard and click the "Create Feature" button. 
                  Fill in the title, description, and select appropriate types and tags. You can also assign the feature 
                  to team members and set priority levels.
                </p>
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Tip:</strong> Use descriptive titles and detailed descriptions to help your team understand 
                    the feature requirements better.
                  </p>
                </div>
              </div>
            </div>

            <div className="border rounded-lg">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Users className="h-5 w-5 text-green-500" />
                  How do I invite team members to my company?
                </h3>
                <p className="text-muted-foreground">
                  Go to Settings → Company → Organization and click "Add Members". Enter the email addresses of 
                  the people you want to invite. They'll receive an invitation email with instructions to join your team.
                </p>
                <div className="mt-4 p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800">
                    <strong>Note:</strong> Team members need to create a Feature Ship account before they can accept invitations.
                  </p>
                </div>
              </div>
            </div>

            <div className="border rounded-lg">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Settings className="h-5 w-5 text-purple-500" />
                  How do I customize feature types and tags?
                </h3>
                <p className="text-muted-foreground">
                  Navigate to Settings → Types & Tags to create custom feature types and tags. You can set colors, 
                  emojis, and descriptions for each type and tag to match your team's workflow and categorization needs.
                </p>
                <div className="mt-4 p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm text-purple-800">
                    <strong>Best Practice:</strong> Create meaningful types and tags that align with your development process 
                    and make filtering easier.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Features & Functionality</h2>
          
          <div className="space-y-4">
            <div className="border rounded-lg">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  How does the Kanban board work?
                </h3>
                <p className="text-muted-foreground">
                  The Kanban board visualizes your feature development pipeline with columns for different statuses. 
                  You can drag and drop features between columns to update their status. The board automatically 
                  syncs with your dashboard and provides real-time updates.
                </p>
                <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Pro Tip:</strong> Use the search and filter functionality in the Kanban board to focus 
                    on specific features or team members.
                  </p>
                </div>
              </div>
            </div>

            <div className="border rounded-lg">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-blue-500" />
                  How do comments and discussions work?
                </h3>
                <p className="text-muted-foreground">
                  Click on any feature to open the detailed view where you can add comments, mention team members, 
                  and have discussions. Comments support rich text formatting and can include attachments. 
                  All team members with access to the feature can participate in discussions.
                </p>
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Notification:</strong> You'll receive notifications when someone mentions you or replies 
                    to your comments.
                  </p>
                </div>
              </div>
            </div>

            <div className="border rounded-lg">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-green-500" />
                  How do I set up a public feedback site?
                </h3>
                <p className="text-muted-foreground">
                  Go to Settings → Feedback Site to configure your public feedback portal. You can customize the 
                  appearance, set up a custom domain, and configure submission forms. Users can then submit 
                  feature requests directly to your site.
                </p>
                <div className="mt-4 p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800">
                    <strong>Integration:</strong> Submitted feedback automatically appears in your dashboard 
                    for review and processing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Integrations & API</h2>
          
          <div className="space-y-4">
            <div className="border rounded-lg">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-purple-500" />
                  How do I integrate with Slack?
                </h3>
                <p className="text-muted-foreground">
                  Go to Settings → Integrations → Slack and click "Connect Slack Workspace". Authorize Feature Ship 
                  in Slack and choose which channels should receive notifications. You can configure different 
                  notification types for different events.
                </p>
                <div className="mt-4 p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm text-purple-800">
                    <strong>Customization:</strong> You can set up different notification rules for different 
                    types of features or team members.
                  </p>
                </div>
              </div>
            </div>

            <div className="border rounded-lg">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-orange-500" />
                  How do I use the API?
                </h3>
                <p className="text-muted-foreground">
                  Feature Ship provides a RESTful API for programmatic access. Get your API key from Settings → API Keys, 
                  then make HTTP requests to our endpoints. All requests require authentication via the Authorization header.
                </p>
                <div className="mt-4 p-4 bg-orange-50 rounded-lg">
                  <p className="text-sm text-orange-800">
                    <strong>Documentation:</strong> Check our API documentation for detailed endpoint information 
                    and example requests.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Troubleshooting</h2>
          
          <div className="space-y-4">
            <div className="border rounded-lg">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-red-500" />
                  I can't see my features in the dashboard
                </h3>
                <p className="text-muted-foreground">
                  This could be due to several reasons: check if you have the correct company selected, verify your 
                  user permissions, or try refreshing the page. If you're using filters, try clearing them to see 
                  all features.
                </p>
                <div className="mt-4 p-4 bg-red-50 rounded-lg">
                  <p className="text-sm text-red-800">
                    <strong>Still having issues?</strong> Contact support with your company ID and user email for assistance.
                  </p>
                </div>
              </div>
            </div>

            <div className="border rounded-lg">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-yellow-500" />
                  Notifications aren't working
                </h3>
                <p className="text-muted-foreground">
                  Check your notification settings in Settings → Notifications. Ensure your email address is correct 
                  and that you haven't disabled notifications. For Slack notifications, verify the integration is 
                  properly connected and the bot has the necessary permissions.
                </p>
                <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Test:</strong> Try triggering a test notification to verify your setup is working correctly.
                  </p>
                </div>
              </div>
            </div>

            <div className="border rounded-lg">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-blue-500" />
                  API requests are failing
                </h3>
                <p className="text-muted-foreground">
                  Verify your API key is correct and has the necessary permissions. Check that you're using the 
                  correct base URL and that your request format matches our API documentation. Rate limiting may 
                  also cause failures if you're making too many requests.
                </p>
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Debug:</strong> Check the response headers for error details and rate limit information.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Account & Billing</h2>
          
          <div className="space-y-4">
            <div className="border rounded-lg">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-green-500" />
                  How do I change my plan?
                </h3>
                <p className="text-muted-foreground">
                  Go to Settings → Billing to view your current plan and available upgrades. You can upgrade or 
                  downgrade your plan at any time. Changes take effect immediately, and billing is prorated.
                </p>
                <div className="mt-4 p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800">
                    <strong>Note:</strong> Downgrading may affect access to certain features depending on your new plan limits.
                  </p>
                </div>
              </div>
            </div>

            <div className="border rounded-lg">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-purple-500" />
                  How do I export my data?
                </h3>
                <p className="text-muted-foreground">
                  You can export your data in several formats from Settings → Data Export. Choose between CSV, JSON, 
                  or PDF formats. Large exports may take some time to process, and you'll receive an email when ready.
                </p>
                <div className="mt-4 p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm text-purple-800">
                    <strong>Backup:</strong> Regular data exports are recommended for backup purposes and compliance requirements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Still Need Help?</h2>
          <div className="bg-muted p-6 rounded-lg">
            <p className="text-muted-foreground mb-4">
              Can't find the answer you're looking for? We're here to help!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded">
                <h4 className="font-medium mb-2">Contact Support</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Get help from our support team for technical issues and account questions.
                </p>
                <a href="mailto:support@feature-ship.com" className="text-blue-600 hover:underline text-sm">
                  support@feature-ship.com →
                </a>
              </div>
              <div className="p-4 border rounded">
                <h4 className="font-medium mb-2">Community Forum</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Connect with other users and share tips and best practices.
                </p>
                <a href="https://community.feature-ship.com" className="text-blue-600 hover:underline text-sm">
                  Visit Community →
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Related Documentation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Getting Started</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Learn the basics of Feature Ship and set up your first project.
              </p>
              <Link
                href="/documentation/getting-started"
                className="text-blue-600 hover:underline text-sm"
              >
                View Getting Started Guide →
              </Link>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Tutorials</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Follow step-by-step tutorials for common use cases and workflows.
              </p>
              <Link
                href="/documentation/tutorials"
                className="text-blue-600 hover:underline text-sm"
              >
                View Tutorials →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
