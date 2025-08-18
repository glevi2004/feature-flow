"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MessageSquare, ExternalLink, BarChart3, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { OnboardingService } from "@/lib/services/onboarding";
import { FeedbackService } from "@/lib/services/feedback";
import Link from "next/link";

export default function DashboardPage() {
  const { user } = useAuth();
  const [companyName, setCompanyName] = useState("");
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalComments: 0,
    totalLikes: 0,
  });

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    try {
      const onboardingData = await OnboardingService.getOnboardingData(
        user!.uid
      );
      if (onboardingData?.companyName) {
        setCompanyName(onboardingData.companyName);

        // Load feedback stats
        const posts = await FeedbackService.getCompanyPosts(
          onboardingData.companyName
        );
        const totalLikes = posts.reduce(
          (sum, post) => sum + post.likesCount,
          0
        );
        const totalComments = posts.reduce(
          (sum, post) => sum + post.commentsCount,
          0
        );

        setStats({
          totalPosts: posts.length,
          totalComments,
          totalLikes,
        });
      }
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    }
  };

  const getPublicUrl = () => {
    if (typeof window !== "undefined" && companyName) {
      return `${window.location.origin}/${encodeURIComponent(companyName)}`;
    }
    return "";
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Welcome Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold">Welcome back!</h1>
        <p className="text-gray-600 mt-2">
          Manage your feedback portal and track user engagement
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPosts}</div>
            <p className="text-xs text-muted-foreground">
              Feedback items created
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Comments
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalComments}</div>
            <p className="text-xs text-muted-foreground">User interactions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalLikes}</div>
            <p className="text-xs text-muted-foreground">User engagement</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Feedback Management
            </CardTitle>
            <CardDescription>
              Create posts, manage tags, and view all feedback
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/feedback">
              <Button className="w-full">Manage Feedback</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ExternalLink className="h-5 w-5" />
              Public Portal
            </CardTitle>
            <CardDescription>
              Share your feedback portal with users
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={getPublicUrl()}
                readOnly
                className="flex-1 px-3 py-2 border rounded-md text-sm"
                placeholder="Loading..."
              />
              <Button
                variant="outline"
                onClick={() => {
                  navigator.clipboard.writeText(getPublicUrl());
                  alert("URL copied to clipboard!");
                }}
              >
                Copy
              </Button>
            </div>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => window.open(getPublicUrl(), "_blank")}
            >
              Open Portal
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Coming Soon */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="opacity-60">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Analytics
            </CardTitle>
            <CardDescription>Detailed insights and reports</CardDescription>
          </CardHeader>
          <CardContent>
            <Button disabled className="w-full">
              Coming Soon
            </Button>
          </CardContent>
        </Card>

        <Card className="opacity-60">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Settings
            </CardTitle>
            <CardDescription>Configure your feedback portal</CardDescription>
          </CardHeader>
          <CardContent>
            <Button disabled className="w-full">
              Coming Soon
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
