import Link from "next/link";
import {
  Settings,
  Users,
  Building,
  Tag,
  Type,
  FileText,
  Bell,
  Shield,
  Palette,
} from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Settings</h1>
        <p className="text-xl text-muted-foreground">
          Configure your Feature Ship workspace to match your team&apos;s needs and
          preferences.
        </p>
      </div>

      <div className="space-y-8">
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Overview</h2>
          <div className="bg-muted p-6 rounded-lg">
            <p className="text-muted-foreground mb-4">
              The Settings section allows you to customize your Feature Ship
              experience. From account management to team organization, you can
              configure everything to work seamlessly with your development
              workflow.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="text-center p-4">
                <Users className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                <h3 className="font-medium">Team Management</h3>
                <p className="text-sm text-muted-foreground">
                  Organize your team
                </p>
              </div>
              <div className="text-center p-4">
                <Building className="h-8 w-8 mx-auto mb-2 text-green-500" />
                <h3 className="font-medium">Company Settings</h3>
                <p className="text-sm text-muted-foreground">
                  Configure organization
                </p>
              </div>
              <div className="text-center p-4">
                <Settings className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                <h3 className="font-medium">Customization</h3>
                <p className="text-sm text-muted-foreground">
                  Personalize experience
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Settings Categories</h2>

          <div className="space-y-6">
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted px-6 py-4 border-b">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5" />
                  <h3 className="text-lg font-semibold">Account Settings</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-muted-foreground mb-4">
                  Manage your personal account information, preferences, and
                  security settings.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded">
                    <h4 className="font-medium mb-2">Profile Information</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Update name and email</li>
                      <li>• Change profile picture</li>
                      <li>• Set timezone preferences</li>
                      <li>• Configure language settings</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded">
                    <h4 className="font-medium mb-2">Security & Privacy</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Change password</li>
                      <li>• Enable two-factor authentication</li>
                      <li>• Manage connected accounts</li>
                      <li>• Privacy settings</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted px-6 py-4 border-b">
                <div className="flex items-center gap-3">
                  <Building className="h-5 w-5" />
                  <h3 className="text-lg font-semibold">Company Settings</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-muted-foreground mb-4">
                  Configure your company profile, team structure, and
                  organizational preferences.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded">
                    <h4 className="font-medium mb-2">Company Profile</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Company name and description</li>
                      <li>• Logo and branding</li>
                      <li>• Contact information</li>
                      <li>• Industry and size</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded">
                    <h4 className="font-medium mb-2">Organization</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Team member management</li>
                      <li>• Role and permission settings</li>
                      <li>• Department organization</li>
                      <li>• Invitation management</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted px-6 py-4 border-b">
                <div className="flex items-center gap-3">
                  <Tag className="h-5 w-5" />
                  <h3 className="text-lg font-semibold">Types & Tags</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-muted-foreground mb-4">
                  Customize feature types and tags to match your team&apos;s workflow
                  and categorization needs.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded">
                    <h4 className="font-medium mb-2">Feature Types</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Create custom types</li>
                      <li>• Set type colors and emojis</li>
                      <li>• Define type descriptions</li>
                      <li>• Manage type hierarchy</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded">
                    <h4 className="font-medium mb-2">Tags Management</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Create and edit tags</li>
                      <li>• Set tag colors</li>
                      <li>• Organize tag categories</li>
                      <li>• Bulk tag operations</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted px-6 py-4 border-b">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5" />
                  <h3 className="text-lg font-semibold">Notifications</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-muted-foreground mb-4">
                  Configure notification preferences to stay informed about
                  important updates and changes.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded">
                    <h4 className="font-medium mb-2">Email Notifications</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Feature status changes</li>
                      <li>• New comments and mentions</li>
                      <li>• Weekly summary reports</li>
                      <li>• Team activity updates</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded">
                    <h4 className="font-medium mb-2">In-App Notifications</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Real-time updates</li>
                      <li>• Browser notifications</li>
                      <li>• Notification frequency</li>
                      <li>• Quiet hours settings</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Advanced Configuration</h2>

          <div className="space-y-4">
            <div className="p-6 border rounded-lg">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Feedback Site Settings
              </h3>
              <p className="text-muted-foreground mb-4">
                Configure your public feedback site where users can submit
                feature requests and feedback.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded">
                  <h4 className="font-medium mb-2">Site Configuration</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Custom domain setup</li>
                    <li>• Branding and theming</li>
                    <li>• Submission form customization</li>
                    <li>• Public visibility settings</li>
                  </ul>
                </div>
                <div className="p-4 bg-muted rounded">
                  <h4 className="font-medium mb-2">Moderation</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Auto-approval rules</li>
                    <li>• Spam filtering</li>
                    <li>• Content moderation</li>
                    <li>• User verification</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 border rounded-lg">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security & Permissions
              </h3>
              <p className="text-muted-foreground mb-4">
                Manage security settings and user permissions to ensure proper
                access control.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded">
                  <h4 className="font-medium mb-2">Access Control</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Role-based permissions</li>
                    <li>• Feature-level access</li>
                    <li>• IP restrictions</li>
                    <li>• Session management</li>
                  </ul>
                </div>
                <div className="p-4 bg-muted rounded">
                  <h4 className="font-medium mb-2">Data Protection</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Data encryption</li>
                    <li>• Backup settings</li>
                    <li>• Data retention policies</li>
                    <li>• GDPR compliance</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Customization Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 border rounded-lg">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Theme & Appearance
              </h3>
              <p className="text-muted-foreground mb-4">
                Customize the visual appearance of your Feature Ship workspace.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Light and dark themes</li>
                <li>• Custom color schemes</li>
                <li>• Logo and branding</li>
                <li>• Layout preferences</li>
              </ul>
            </div>

            <div className="p-6 border rounded-lg">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Type className="h-5 w-5" />
                Workflow Customization
              </h3>
              <p className="text-muted-foreground mb-4">
                Adapt Feature Ship to match your team&apos;s specific workflow and
                processes.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Custom status workflows</li>
                <li>• Approval processes</li>
                <li>• Automation rules</li>
                <li>• Integration settings</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Best Practices</h2>
          <div className="space-y-4">
            <div className="p-4 border-l-4 border-blue-500 bg-blue-50 rounded-r-lg">
              <h3 className="font-medium mb-2">Start with Company Setup</h3>
              <p className="text-sm text-muted-foreground">
                Begin by configuring your company profile and inviting team
                members. This establishes the foundation for your Feature Ship
                workspace.
              </p>
            </div>
            <div className="p-4 border-l-4 border-green-500 bg-green-50 rounded-r-lg">
              <h3 className="font-medium mb-2">Define Clear Types and Tags</h3>
              <p className="text-sm text-muted-foreground">
                Create meaningful types and tags that align with your team&apos;s
                workflow. This makes feature organization and filtering much
                more effective.
              </p>
            </div>
            <div className="p-4 border-l-4 border-purple-500 bg-purple-50 rounded-r-lg">
              <h3 className="font-medium mb-2">
                Configure Notifications Wisely
              </h3>
              <p className="text-sm text-muted-foreground">
                Set up notification preferences to stay informed without being
                overwhelmed. Consider your team&apos;s communication preferences and
                work patterns.
              </p>
            </div>
            <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50 rounded-r-lg">
              <h3 className="font-medium mb-2">Regular Settings Review</h3>
              <p className="text-sm text-muted-foreground">
                Periodically review and update your settings as your team grows
                and your workflow evolves. Settings should adapt to your
                changing needs.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Related Documentation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Getting Started</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Learn the basics of Feature Ship and initial setup.
              </p>
              <Link
                href="/documentation/getting-started"
                className="text-blue-600 hover:underline text-sm"
              >
                View Getting Started →
              </Link>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Features Overview</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Understand all available features and capabilities.
              </p>
              <Link
                href="/documentation/features"
                className="text-blue-600 hover:underline text-sm"
              >
                View Features Guide →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
