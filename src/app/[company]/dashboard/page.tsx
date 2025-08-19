"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Filter,
  Clock,
  ChevronDown,
  X,
  Save,
  ArrowUp,
  Lightbulb,
  Radio,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { OnboardingService } from "@/lib/services/onboarding";
import {
  FeedbackService,
  FeedbackPost,
  FeedbackTag,
} from "@/lib/services/feedback";

function DashboardPage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<FeedbackPost[]>([]);
  const [tags, setTags] = useState<FeedbackTag[]>([]);
  const [loading, setLoading] = useState(true);
  const [companyName, setCompanyName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  useEffect(() => {
    if (user) {
      loadCompanyData();
    }
  }, [user]);

  const loadCompanyData = async () => {
    try {
      setLoading(true);
      const onboardingData = await OnboardingService.getOnboardingData(
        user!.uid
      );
      if (onboardingData?.companyName) {
        setCompanyName(onboardingData.companyName);

        // Load posts and tags
        const [postsData, tagsData] = await Promise.all([
          FeedbackService.getCompanyPosts(onboardingData.companyName),
          FeedbackService.getCompanyTags(onboardingData.companyName),
        ]);

        setPosts(postsData);
        setTags(tagsData);
      }
    } catch (error) {
      console.error("Error loading company data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getTagColor = (tagName: string) => {
    const tag = tags.find((t) => t.name === tagName);
    return tag?.color || "#6B7280";
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
    });
  };

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter));
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-8 mb-6">
          <h1 className="text-2xl font-bold">Posts ({posts.length})</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search posts..."
                className="pl-9 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button variant="outline" size="sm">
              <Clock className="h-4 w-4 mr-2" />
              Recent posts
              <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="flex items-center justify-between mb-4 p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2 flex-wrap">
              {activeFilters.map((filter) => (
                <Badge
                  key={filter}
                  variant="secondary"
                  className="flex items-center gap-1 px-3 py-1"
                >
                  <Radio className="h-3 w-3" />
                  Status {filter}
                  <button
                    onClick={() => removeFilter(filter)}
                    className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={clearAllFilters}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
              <Button variant="outline" size="sm">
                <Save className="h-4 w-4 mr-2" />
                Save filters
              </Button>
            </div>
          </div>
        )}

        {/* Posts List */}
        <div className="space-y-3">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No posts found</p>
            </div>
          ) : (
            posts.map((post, index) => (
              <div
                key={post.id}
                className="flex items-center justify-between p-4 bg-card border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <ArrowUp className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      {post.upvotesCount}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-medium text-foreground">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-sm text-muted-foreground">
                        {post.createdAt &&
                        typeof post.createdAt.toDate === "function"
                          ? formatDate(post.createdAt.toDate())
                          : post.createdAt &&
                            typeof post.createdAt === "object" &&
                            "seconds" in post.createdAt
                          ? formatDate(new Date(post.createdAt.seconds * 1000))
                          : post.createdAt
                          ? formatDate(new Date(post.createdAt))
                          : "Recently"}
                      </span>
                      {post.tags.length > 0 && (
                        <Badge
                          variant="outline"
                          className="flex items-center gap-1 px-2 py-0.5 text-xs"
                        >
                          <Lightbulb className="h-3 w-3" />
                          {post.tags[0]}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                    In Review
                  </Badge>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
