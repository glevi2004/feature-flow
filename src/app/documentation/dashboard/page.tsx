import Link from "next/link";
import {
  Search,
  Filter,
  Eye,
  MessageSquare,
  Calendar,
  ArrowUp,
  Tag,
  CheckCircle,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <p className="text-xl text-muted-foreground">
          Master the dashboard interface to efficiently manage and track your
          feature requests.
        </p>
      </div>

      <div className="space-y-8">
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Overview</h2>
          <div className="bg-muted p-6 rounded-lg">
            <p className="text-muted-foreground mb-4">
              The dashboard is your central hub for managing feature requests.
              It provides a comprehensive view of all features, advanced
              filtering capabilities, and quick access to key actions. The
              dashboard is designed to help you stay organized and make informed
              decisions about your product development.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="text-center p-4">
                <Search className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                <h3 className="font-medium">Search & Filter</h3>
                <p className="text-sm text-muted-foreground">
                  Find features quickly
                </p>
              </div>
              <div className="text-center p-4">
                <Eye className="h-8 w-8 mx-auto mb-2 text-green-500" />
                <h3 className="font-medium">Visual Overview</h3>
                <p className="text-sm text-muted-foreground">
                  See all features at a glance
                </p>
              </div>
              <div className="text-center p-4">
                <CheckCircle className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                <h3 className="font-medium">Status Management</h3>
                <p className="text-sm text-muted-foreground">
                  Track progress easily
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Key Features</h2>

          <div className="space-y-6">
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted px-6 py-4 border-b">
                <div className="flex items-center gap-3">
                  <Search className="h-5 w-5" />
                  <h3 className="text-lg font-semibold">
                    Search Functionality
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-muted-foreground mb-4">
                  Use the search bar to quickly find features by title,
                  description, or type. The search is real-time and updates
                  results as you type.
                </p>
                <div className="bg-background p-4 rounded border">
                  <div className="flex items-center gap-2 text-sm">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      Search features...
                    </span>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Tip:</strong> Search supports partial matches and is
                    case-insensitive. Try searching for keywords like
                    &quot;authentication&quot; or &quot;mobile&quot;.
                  </p>
                </div>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted px-6 py-4 border-b">
                <div className="flex items-center gap-3">
                  <Filter className="h-5 w-5" />
                  <h3 className="text-lg font-semibold">Advanced Filtering</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-muted-foreground mb-4">
                  Filter features by status, type, and tags using the side
                  navigation. Click on any filter to apply it instantly.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Status Filters
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Under Review</li>
                      <li>• Accepted</li>
                      <li>• Planned</li>
                      <li>• Completed</li>
                      <li>• Rejected</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Tag className="h-4 w-4" />
                      Type Filters
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Bug</li>
                      <li>• Enhancement</li>
                      <li>• New Feature</li>
                      <li>• Custom Types</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Tag className="h-4 w-4" />
                      Tag Filters
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Custom tags</li>
                      <li>• Color-coded</li>
                      <li>• Multiple selection</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted px-6 py-4 border-b">
                <div className="flex items-center gap-3">
                  <Eye className="h-5 w-5" />
                  <h3 className="text-lg font-semibold">Feature Cards</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-muted-foreground mb-4">
                  Each feature is displayed as a card with essential information
                  and quick actions.
                </p>
                <div className="bg-background p-4 rounded border">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm font-medium">Under Review</span>
                      <div className="ml-auto flex gap-1">
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                          Enhancement
                        </span>
                      </div>
                    </div>
                    <h4 className="font-semibold">
                      User Authentication System
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Implement secure login and registration with OAuth
                      support...
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <ArrowUp className="h-3 w-3" />
                        <span>12</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" />
                        <span>5</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>2 days ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Active Filters</h2>
          <div className="bg-muted p-6 rounded-lg">
            <p className="text-muted-foreground mb-4">
              When filters are applied, you&apos;ll see them displayed as badges
              above the feature list. You can remove individual filters or clear
              all filters at once.
            </p>
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                <span>Status: Under Review</span>
                <button className="hover:bg-blue-200 rounded-full p-0.5">
                  ×
                </button>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                <span>Type: Enhancement</span>
                <button className="hover:bg-green-200 rounded-full p-0.5">
                  ×
                </button>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                <span>Tag: Mobile</span>
                <button className="hover:bg-purple-200 rounded-full p-0.5">
                  ×
                </button>
              </div>
              <button className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm hover:bg-gray-200">
                Clear All
              </button>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 border rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Create New Feature</h3>
              <p className="text-muted-foreground mb-4">
                Click the &quot;Create Feature&quot; button to add a new feature
                request. You&apos;ll be guided through a form to capture all
                necessary details.
              </p>
              <div className="bg-background p-3 rounded border text-sm">
                <code>Dashboard → Create Feature → Fill Form → Save</code>
              </div>
            </div>

            <div className="p-6 border rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Update Status</h3>
              <p className="text-muted-foreground mb-4">
                Click on the status dropdown in any feature card to quickly
                update its status. Changes are saved automatically.
              </p>
              <div className="bg-background p-3 rounded border text-sm">
                <code>Feature Card → Status Dropdown → Select Status</code>
              </div>
            </div>

            <div className="p-6 border rounded-lg">
              <h3 className="text-lg font-semibold mb-3">View Details</h3>
              <p className="text-muted-foreground mb-4">
                Click on any feature card to open the detailed view with full
                information, comments, and additional actions.
              </p>
              <div className="bg-background p-3 rounded border text-sm">
                <code>Feature Card → Click → View Details</code>
              </div>
            </div>

            <div className="p-6 border rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Apply Filters</h3>
              <p className="text-muted-foreground mb-4">
                Use the side navigation to quickly filter features by status,
                type, or tags. Multiple filters can be applied simultaneously.
              </p>
              <div className="bg-background p-3 rounded border text-sm">
                <code>Side Nav → Click Filter → View Filtered Results</code>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Best Practices</h2>
          <div className="space-y-4">
            <div className="p-4 border-l-4 border-blue-500 bg-blue-50 rounded-r-lg">
              <h3 className="font-medium mb-2">Organize with Tags</h3>
              <p className="text-sm text-muted-foreground">
                Use descriptive tags to categorize features by platform,
                priority, or team. This makes filtering and finding related
                features much easier.
              </p>
            </div>
            <div className="p-4 border-l-4 border-green-500 bg-green-50 rounded-r-lg">
              <h3 className="font-medium mb-2">Keep Statuses Updated</h3>
              <p className="text-sm text-muted-foreground">
                Regularly update feature statuses to maintain accurate project
                visibility. This helps stakeholders understand current progress.
              </p>
            </div>
            <div className="p-4 border-l-4 border-purple-500 bg-purple-50 rounded-r-lg">
              <h3 className="font-medium mb-2">Use Search Effectively</h3>
              <p className="text-sm text-muted-foreground">
                Combine search with filters for powerful feature discovery.
                Search for keywords while filtering by status or type for
                precise results.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Related Documentation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Kanban Board</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Learn how to use the Kanban board for visual project management.
              </p>
              <Link
                href="/documentation/kanban"
                className="text-blue-600 hover:underline text-sm"
              >
                View Kanban Guide →
              </Link>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Settings</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Configure your dashboard preferences and organization settings.
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
