import {
  MessageSquare,
  Users,
  BarChart3,
  Target,
  Settings,
  CheckCircle,
  ArrowRight,
  Kanban,
  Bell,
  Tag,
} from "lucide-react";

export function FeaturesGrid() {
  return (
    <section
      id="features"
      className="bg-background container mx-auto px-4 py-20 scroll-mt-15"
    >
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4 text-foreground">
          Powerful Features for Modern Teams
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Everything you need to build a customer-centric product development
          process
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Feedback Management */}
        <div className="bg-card border border-border rounded-xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 hover:bg-accent">
          <div className="w-12 h-12 bg-[#238636] rounded-lg flex items-center justify-center mb-6">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-4 text-foreground">
            Feedback Management
          </h3>
          <p className="text-muted-foreground mb-4">
            Create, organize, and manage feedback posts with status tracking,
            categorization, and comprehensive filtering options.
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-[#3fb950] mr-2" />
              Create and edit feedback posts
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-[#3fb950] mr-2" />
              Status tracking (Under Review, Accepted, etc.)
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-[#3fb950] mr-2" />
              Advanced search and filtering
            </li>
          </ul>
        </div>

        {/* Kanban Board */}
        <div className="bg-card border border-border rounded-xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 hover:bg-accent">
          <div className="w-12 h-12 bg-[#7c3aed] rounded-lg flex items-center justify-center mb-6">
            <Kanban className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-4 text-foreground">
            Kanban Board
          </h3>
          <p className="text-muted-foreground mb-4">
            Visualize and manage feedback using a drag-and-drop kanban board
            organized by status for better workflow management.
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-[#3fb950] mr-2" />
              Drag-and-drop status updates
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-[#3fb950] mr-2" />
              Visual workflow management
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-[#3fb950] mr-2" />
              Status-based organization
            </li>
          </ul>
        </div>

        {/* Tags & Types */}
        <div className="bg-card border border-border rounded-xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 hover:bg-accent">
          <div className="w-12 h-12 bg-[#238636] rounded-lg flex items-center justify-center mb-6">
            <Tag className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-4 text-foreground">
            Tags & Types
          </h3>
          <p className="text-muted-foreground mb-4">
            Organize feedback with custom tags and types for better
            categorization and filtering across your feedback system.
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-[#3fb950] mr-2" />
              Custom tag management
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-[#3fb950] mr-2" />
              Feedback type categorization
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-[#3fb950] mr-2" />
              Color-coded organization
            </li>
          </ul>
        </div>

        {/* Settings & Configuration */}
        <div className="bg-card border border-border rounded-xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 hover:bg-accent">
          <div className="w-12 h-12 bg-[#f97316] rounded-lg flex items-center justify-center mb-6">
            <Settings className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-4 text-foreground">
            Settings & Configuration
          </h3>
          <p className="text-muted-foreground mb-4">
            Comprehensive settings to manage your company, organization,
            and feedback portal customization.
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-[#3fb950] mr-2" />
              Company & organization management
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-[#3fb950] mr-2" />
              Public feedback site customization
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-[#3fb950] mr-2" />
              User account management
            </li>
          </ul>
        </div>

        {/* Public Feedback Portal */}
        <div className="bg-card border border-border rounded-xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 hover:bg-accent">
          <div className="w-12 h-12 bg-[#6366f1] rounded-lg flex items-center justify-center mb-6">
            <Users className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-4 text-foreground">
            Public Feedback Portal
          </h3>
          <p className="text-muted-foreground mb-4">
            Share a public feedback portal where customers can submit,
            upvote, and comment on feedback directly.
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-[#3fb950] mr-2" />
              Public feedback collection
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-[#3fb950] mr-2" />
              Customer upvoting system
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-[#3fb950] mr-2" />
              Google authentication
            </li>
          </ul>
        </div>

        {/* Analytics (Coming Soon) */}
        <div className="bg-card border border-border rounded-xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 hover:bg-accent">
          <div className="w-12 h-12 bg-[#ec4899] rounded-lg flex items-center justify-center mb-6">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-4 text-foreground">
            Analytics Dashboard
          </h3>
          <p className="text-muted-foreground mb-4">
            Powerful insights and metrics to help you understand your feedback
            patterns and make data-driven decisions.
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-[#3fb950] mr-2" />
              Feedback trend analysis
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-[#3fb950] mr-2" />
              User engagement metrics
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-[#3fb950] mr-2" />
              Status tracking reports
            </li>
          </ul>
          <div className="mt-4">
            <div className="inline-flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
              Coming Soon
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
