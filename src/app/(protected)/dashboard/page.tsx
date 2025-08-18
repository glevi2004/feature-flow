"use client";

import { useAuth } from "@/contexts/AuthContext";
import { OnboardingService, OnboardingData } from "@/lib/services/onboarding";
import { Button } from "@/components/ui/button";
import { Zap, LogOut, User } from "lucide-react";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { user, signOut } = useAuth();
  const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOnboardingData = async () => {
      if (user) {
        try {
          const data = await OnboardingService.getOnboardingData(user.uid);
          setOnboardingData(data);
        } catch (error) {
          console.error("Error fetching onboarding data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchOnboardingData();
  }, [user]);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-white">
                Feature Flow
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-white">
                <User className="w-4 h-4" />
                <span className="text-sm">
                  {user?.displayName || user?.email}
                </span>
              </div>
              <Button
                onClick={handleSignOut}
                variant="outline"
                className="text-white border-white/30 hover:bg-white/10"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Welcome to Feature Flow!
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            You&apos;re now signed in and ready to start collecting, organizing,
            and prioritizing customer feedback.
          </p>

          {/* Display Onboarding Data */}
          {loading ? (
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-300">Loading your data...</p>
            </div>
          ) : onboardingData ? (
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 max-w-2xl mx-auto mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Your Onboarding Information
              </h2>
              <div className="grid md:grid-cols-2 gap-4 text-left">
                <div>
                  <h3 className="font-semibold text-white mb-2">Company</h3>
                  <p className="text-gray-300">{onboardingData.companyName}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">Team Size</h3>
                  <p className="text-gray-300">{onboardingData.teamSize}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">Goals</h3>
                  <p className="text-gray-300">
                    {onboardingData.goals.join(", ")}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">Access Type</h3>
                  <p className="text-gray-300">{onboardingData.accessType}</p>
                </div>
              </div>
            </div>
          ) : null}

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Getting Started
            </h2>
            <p className="text-gray-300 mb-6">
              Your Feature Flow dashboard is being set up. Here&apos;s what you
              can do next:
            </p>

            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="bg-white/5 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">
                  1. Set up Feedback Collection
                </h3>
                <p className="text-sm text-gray-300">
                  Configure widgets, portals, and integrations to start
                  collecting feedback from your users.
                </p>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">
                  2. Invite Team Members
                </h3>
                <p className="text-sm text-gray-300">
                  Add your team members to collaborate on feedback organization
                  and prioritization.
                </p>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">
                  3. Configure Integrations
                </h3>
                <p className="text-sm text-gray-300">
                  Connect with your existing tools like Slack, Intercom, and
                  Jira for seamless workflow integration.
                </p>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">
                  4. Start Prioritizing
                </h3>
                <p className="text-sm text-gray-300">
                  Use AI-powered categorization and prioritization frameworks to
                  make data-driven decisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
