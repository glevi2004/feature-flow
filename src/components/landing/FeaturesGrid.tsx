import {
  MessageSquare,
  Users,
  BarChart3,
  Target,
  Package,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

export function FeaturesGrid() {
  return (
    <section
      id="features"
      className="bg-[#0d1117] container mx-auto px-4 py-20 scroll-mt-15"
    >
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4 text-white">
          Powerful Features for Modern Teams
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Everything you need to build a customer-centric product development
          process
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Collection */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 hover:bg-[#21262d]">
          <div className="w-12 h-12 bg-[#238636] rounded-lg flex items-center justify-center mb-6">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-4 text-white">
            Smart Feedback Collection
          </h3>
          <p className="text-gray-300 mb-4">
            Collect feedback through in-app widgets, portals, surveys, and
            integrations with Slack, Intercom, and more.
          </p>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-[#3fb950] mr-2" />
              AI-powered categorization
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-[#3fb950] mr-2" />
              Multi-channel collection
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-[#3fb950] mr-2" />
              Automatic duplicate detection
            </li>
          </ul>
        </div>

        {/* Engagement */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 hover:bg-[#21262d]">
          <div className="w-12 h-12 bg-[#7c3aed] rounded-lg flex items-center justify-center mb-6">
            <Users className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-4 text-white">
            User Engagement & Enrichment
          </h3>
          <p className="text-gray-300 mb-4">
            Foster community engagement with upvoting, commenting, and follow-up
            questions to surface real value.
          </p>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-[#3fb950] mr-2" />
              Upvote and comment system
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-[#3fb950] mr-2" />
              Contextual follow-ups
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-[#3fb950] mr-2" />
              Usage frequency tracking
            </li>
          </ul>
        </div>

        {/* Segmentation */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 hover:bg-[#21262d]">
          <div className="w-12 h-12 bg-[#238636] rounded-lg flex items-center justify-center mb-6">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-4 text-white">
            Smart Segmentation
          </h3>
          <p className="text-gray-300 mb-4">
            Filter and segment feedback by revenue contribution, customer
            segment, and company size.
          </p>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-[#3fb950] mr-2" />
              Revenue-based prioritization
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-[#3fb950] mr-2" />
              Customer segment filtering
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-[#3fb950] mr-2" />
              Company size analysis
            </li>
          </ul>
        </div>

        {/* Prioritization */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 hover:bg-[#21262d]">
          <div className="w-12 h-12 bg-[#f97316] rounded-lg flex items-center justify-center mb-6">
            <Target className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-4 text-white">
            Advanced Prioritization
          </h3>
          <p className="text-gray-300 mb-4">
            Custom scoring frameworks and visualization tools to prioritize what
            matters most.
          </p>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-[#3fb950] mr-2" />
              Value vs effort scoring
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-[#3fb950] mr-2" />
              Scatter and quadrant charts
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-[#3fb950] mr-2" />
              Custom frameworks
            </li>
          </ul>
        </div>

        {/* Integration */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 hover:bg-[#21262d]">
          <div className="w-12 h-12 bg-[#6366f1] rounded-lg flex items-center justify-center mb-6">
            <Package className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-4 text-white">
            Seamless Integrations
          </h3>
          <p className="text-gray-300 mb-4">
            Integrate with your existing workflow tools like Jira, Linear,
            Slack, and more.
          </p>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-[#3fb950] mr-2" />
              Jira & Linear integration
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-[#3fb950] mr-2" />
              Slack & Intercom sync
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-[#3fb950] mr-2" />
              HubSpot & Zendesk
            </li>
          </ul>
        </div>

        {/* Feedback Loop */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 hover:bg-[#21262d]">
          <div className="w-12 h-12 bg-[#ec4899] rounded-lg flex items-center justify-center mb-6">
            <ArrowRight className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-4 text-white">
            Complete Feedback Loop
          </h3>
          <p className="text-gray-300 mb-4">
            Close the loop with automated updates, changelogs, and roadmap
            sharing.
          </p>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-[#3fb950] mr-2" />
              Automated notifications
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-[#3fb950] mr-2" />
              Changelog publishing
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-[#3fb950] mr-2" />
              Roadmap sharing
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
