import Link from "next/link";
import {
  ArrowRight,
  Move,
  Eye,
  Search,
  Filter,
  CheckCircle,
  Clock,
  Play,
  CheckSquare,
} from "lucide-react";

export default function KanbanPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Kanban Board</h1>
        <p className="text-xl text-muted-foreground">
          Master the Kanban board to visualize and manage your feature
          development workflow effectively.
        </p>
      </div>

      <div className="space-y-8">
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Overview</h2>
          <div className="bg-muted p-6 rounded-lg">
            <p className="text-muted-foreground mb-4">
              The Kanban board provides a visual representation of your feature
              development pipeline. Features are organized into columns based on
              their current status, making it easy to track progress and
              identify bottlenecks in your development process.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
              <div className="text-center p-4">
                <div className="w-8 h-8 bg-blue-500 rounded mx-auto mb-2 flex items-center justify-center">
                  <Clock className="h-4 w-4 text-white" />
                </div>
                <h3 className="font-medium">Backlog</h3>
                <p className="text-sm text-muted-foreground">Under Review</p>
              </div>
              <div className="text-center p-4">
                <div className="w-8 h-8 bg-green-500 rounded mx-auto mb-2 flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
                <h3 className="font-medium">Next Up</h3>
                <p className="text-sm text-muted-foreground">Accepted</p>
              </div>
              <div className="text-center p-4">
                <div className="w-8 h-8 bg-purple-500 rounded mx-auto mb-2 flex items-center justify-center">
                  <Play className="h-4 w-4 text-white" />
                </div>
                <h3 className="font-medium">In Progress</h3>
                <p className="text-sm text-muted-foreground">Planned</p>
              </div>
              <div className="text-center p-4">
                <div className="w-8 h-8 bg-emerald-500 rounded mx-auto mb-2 flex items-center justify-center">
                  <CheckSquare className="h-4 w-4 text-white" />
                </div>
                <h3 className="font-medium">Done</h3>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Board Columns</h2>

          <div className="space-y-6">
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-blue-50 px-6 py-4 border-b">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-blue-900">
                    Backlog (Under Review)
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-muted-foreground mb-4">
                  Features that are being reviewed or evaluated. This is where
                  new feature requests start their journey through your
                  development pipeline.
                </p>
                <div className="bg-background p-4 rounded border">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm font-medium">
                        User Authentication
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm font-medium">
                        Mobile App Design
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm font-medium">
                        API Integration
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <div className="bg-green-50 px-6 py-4 border-b">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-green-900">
                    Next Up (Accepted)
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-muted-foreground mb-4">
                  Features that have been approved and are ready to be planned
                  for development. These features have passed the review process
                  and are prioritized for implementation.
                </p>
                <div className="bg-background p-4 rounded border">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium">
                        Dashboard Redesign
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium">
                        Notification System
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <div className="bg-purple-50 px-6 py-4 border-b">
                <div className="flex items-center gap-3">
                  <Play className="h-5 w-5 text-purple-600" />
                  <h3 className="text-lg font-semibold text-purple-900">
                    In Progress (Planned)
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-muted-foreground mb-4">
                  Features that are currently being developed. This column shows
                  active work and helps track development progress in real-time.
                </p>
                <div className="bg-background p-4 rounded border">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-sm font-medium">
                        Search Functionality
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-sm font-medium">
                        User Profile Management
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <div className="bg-emerald-50 px-6 py-4 border-b">
                <div className="flex items-center gap-3">
                  <CheckSquare className="h-5 w-5 text-emerald-600" />
                  <h3 className="text-lg font-semibold text-emerald-900">
                    Done (Completed)
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-muted-foreground mb-4">
                  Features that have been completed and are ready for deployment
                  or testing. This column shows your team&apos;s accomplishments
                  and completed work.
                </p>
                <div className="bg-background p-4 rounded border">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm font-medium">Login System</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm font-medium">Data Export</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Drag & Drop Functionality</h2>
          <div className="bg-muted p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <Move className="h-6 w-6 text-blue-500" />
              <h3 className="text-lg font-semibold">
                Move Features Between Columns
              </h3>
            </div>
            <p className="text-muted-foreground mb-4">
              The Kanban board supports drag and drop functionality, allowing
              you to easily move features between columns to update their
              status. This provides an intuitive way to track progress and
              manage your development workflow.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded">
                <h4 className="font-medium mb-2">How to Drag & Drop</h4>
                <ol className="text-sm text-muted-foreground space-y-1">
                  <li>1. Click and hold on a feature card</li>
                  <li>2. Drag it to the desired column</li>
                  <li>3. Release to drop the feature</li>
                  <li>4. Status updates automatically</li>
                </ol>
              </div>
              <div className="p-4 border rounded">
                <h4 className="font-medium mb-2">Visual Feedback</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Cards become semi-transparent when dragging</li>
                  <li>• Drop zones highlight on hover</li>
                  <li>• Smooth animations during transitions</li>
                  <li>• Loading states during updates</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Search & Filtering</h2>
          <div className="space-y-4">
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted px-6 py-4 border-b">
                <div className="flex items-center gap-3">
                  <Search className="h-5 w-5" />
                  <h3 className="text-lg font-semibold">Search Features</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-muted-foreground mb-4">
                  Use the search bar to quickly find specific features across
                  all columns. Search works on feature titles, descriptions, and
                  types.
                </p>
                <div className="bg-background p-4 rounded border">
                  <div className="flex items-center gap-2 text-sm">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      Search posts...
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted px-6 py-4 border-b">
                <div className="flex items-center gap-3">
                  <Filter className="h-5 w-5" />
                  <h3 className="text-lg font-semibold">Tag Filtering</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-muted-foreground mb-4">
                  Filter features by tags using the side navigation. This allows
                  you to focus on specific categories or types of features
                  across all columns.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    Mobile
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    API
                  </span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                    UI/UX
                  </span>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                    Performance
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Feature Cards</h2>
          <div className="bg-muted p-6 rounded-lg">
            <p className="text-muted-foreground mb-4">
              Each feature is displayed as a card with essential information and
              visual indicators.
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
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                      Mobile
                    </span>
                  </div>
                </div>
                <h4 className="font-semibold">User Authentication System</h4>
                <p className="text-sm text-muted-foreground">
                  Implement secure login and registration with OAuth support and
                  two-factor authentication...
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <ArrowRight className="h-3 w-3" />
                    <span>12 upvotes</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    <span>5 comments</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>2 days ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Best Practices</h2>
          <div className="space-y-4">
            <div className="p-4 border-l-4 border-blue-500 bg-blue-50 rounded-r-lg">
              <h3 className="font-medium mb-2">Limit Work in Progress</h3>
              <p className="text-sm text-muted-foreground">
                Keep the number of features in the &quot;In Progress&quot;
                column manageable. Too many active features can lead to context
                switching and delays.
              </p>
            </div>
            <div className="p-4 border-l-4 border-green-500 bg-green-50 rounded-r-lg">
              <h3 className="font-medium mb-2">Regular Status Updates</h3>
              <p className="text-sm text-muted-foreground">
                Move features through columns as work progresses. This keeps the
                board accurate and helps identify bottlenecks quickly.
              </p>
            </div>
            <div className="p-4 border-l-4 border-purple-500 bg-purple-50 rounded-r-lg">
              <h3 className="font-medium mb-2">Use Tags for Organization</h3>
              <p className="text-sm text-muted-foreground">
                Apply relevant tags to features for better organization and
                filtering. This makes it easier to find related features across
                columns.
              </p>
            </div>
            <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50 rounded-r-lg">
              <h3 className="font-medium mb-2">Review Completed Work</h3>
              <p className="text-sm text-muted-foreground">
                Regularly review the &quot;Done&quot; column to celebrate
                achievements and identify patterns in successful feature
                development.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Related Documentation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Dashboard</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Learn about the dashboard interface and advanced filtering
                capabilities.
              </p>
              <Link
                href="/documentation/dashboard"
                className="text-blue-600 hover:underline text-sm"
              >
                View Dashboard Guide →
              </Link>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Features Overview</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Understand the core features and capabilities of Feature Ship.
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
