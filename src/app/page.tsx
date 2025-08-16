import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import DarkVeil from "@/components/DarkVeil";
import Link from "next/link";
import {
  MessageSquare,
  Users,
  BarChart3,
  Target,
  Zap,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen relative">
      {/* DarkVeil Background */}
      <div className="fixed inset-0 z-0">
        <DarkVeil
          hueShift={0}
          noiseIntensity={0.02}
          scanlineIntensity={0}
          speed={0.5}
          scanlineFrequency={0}
          warpAmount={0.1}
          resolutionScale={1}
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 pt-20">
        <Navbar />

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-30 text-center lg:mt-10 ">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-300 bg-clip-text text-transparent">
              Transform Customer Feedback Into Action
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto">
              Feature Flow is a modern feedback platform designed to help teams
              collect, organize, and prioritize customer feedback effectively.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-3"
                >
                  Start Free Trial
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg px-8 py-3">
                Watch Demo
              </Button>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section
          id="features"
          className="container mx-auto px-4 py-20 scroll-mt-15"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">
              Powerful Features for Modern Teams
            </h2>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Everything you need to build a customer-centric product
              development process
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Collection */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-6">
                <MessageSquare className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">
                Smart Feedback Collection
              </h3>
              <p className="text-gray-200 mb-4">
                Collect feedback through in-app widgets, portals, surveys, and
                integrations with Slack, Intercom, and more.
              </p>
              <ul className="space-y-2 text-sm text-gray-200">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  AI-powered categorization
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Multi-channel collection
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Automatic duplicate detection
                </li>
              </ul>
            </div>

            {/* Engagement */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4">
                User Engagement & Enrichment
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Foster community engagement with upvoting, commenting, and
                follow-up questions to surface real value.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Upvote and comment system
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Contextual follow-ups
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Usage frequency tracking
                </li>
              </ul>
            </div>

            {/* Segmentation */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Smart Segmentation</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Filter and segment feedback by revenue contribution, customer
                segment, and company size.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Revenue-based prioritization
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Customer segment filtering
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Company size analysis
                </li>
              </ul>
            </div>

            {/* Prioritization */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Advanced Prioritization
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Custom scoring frameworks and visualization tools to prioritize
                what matters most.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Value vs effort scoring
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Scatter and quadrant charts
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Custom frameworks
                </li>
              </ul>
            </div>

            {/* Integration */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Seamless Integrations
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Integrate with your existing workflow tools like Jira, Linear,
                Slack, and more.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Jira & Linear integration
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Slack & Intercom sync
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  HubSpot & Zendesk
                </li>
              </ul>
            </div>

            {/* Feedback Loop */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900 rounded-lg flex items-center justify-center mb-6">
                <ArrowRight className="w-6 h-6 text-pink-600 dark:text-pink-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Complete Feedback Loop
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Close the loop with automated updates, changelogs, and roadmap
                sharing.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Automated notifications
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Changelog publishing
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Roadmap sharing
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Workflow Section */}

        {/* Integrations Section */}
        <section
          id="integrations"
          className="container mx-auto px-4 py-20 scroll-mt-20"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Integrate with Your Workflow
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Feature Flow works seamlessly with the tools you already use
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {[
              { name: "Slack", icon: "💬" },
              { name: "Jira", icon: "🎯" },
              { name: "Linear", icon: "📋" },
              { name: "Intercom", icon: "💬" },
              { name: "HubSpot", icon: "📊" },
              { name: "Zendesk", icon: "🎧" },
            ].map((tool) => (
              <div
                key={tool.name}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-3xl mb-2">{tool.icon}</div>
                <div className="font-semibold text-gray-900 dark:text-white">
                  {tool.name}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Transform Your Feedback Process?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of teams using Feature Flow to build better
              products based on real customer feedback.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button
                  size="lg"
                  variant="secondary"
                  className="text-lg px-8 py-3"
                >
                  Start Free Trial
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-3 border-white text-white hover:bg-white"
              >
                Schedule Demo
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold">Feature Flow</span>
                </div>
                <p className="text-gray-400">
                  Modern feedback platform for teams to collect, organize, and
                  prioritize customer feedback effectively.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Product</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Features
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Integrations
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Changelog
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Company</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Careers
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Support</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      API
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Status
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2024 Feature Flow. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
