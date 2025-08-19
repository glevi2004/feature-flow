"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FeedbackService,
  FeedbackPost,
  FeedbackTag,
} from "@/lib/services/feedback";
import {
  MessageSquare,
  User,
  ArrowUp,
  Calendar,
  Search,
  Filter,
  TrendingUp,
  Clock,
  Star,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { OnboardingService } from "@/lib/services/onboarding";

export default function PostsPage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<FeedbackPost[]>([]);
  const [tags, setTags] = useState<FeedbackTag[]>([]);
  const [loading, setLoading] = useState(true);
  const [companyName, setCompanyName] = useState("");

  // Filter/Sort states
  const [sortBy, setSortBy] = useState("upvotes"); // 'upvotes', 'new', 'trending'
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (user) {
      loadCompanyData();
    }
  }, [user, sortBy, searchQuery]);

  const loadCompanyData = async () => {
    try {
      setLoading(true);
      const onboardingData = await OnboardingService.getOnboardingData(
        user!.uid
      );
      if (onboardingData?.companyName) {
        setCompanyName(onboardingData.companyName);

        // Load posts and tags
        let [postsData, tagsData] = await Promise.all([
          FeedbackService.getCompanyPosts(onboardingData.companyName),
          FeedbackService.getCompanyTags(onboardingData.companyName),
        ]);

        // Apply search filter
        if (searchQuery) {
          postsData = postsData.filter(
            (post) =>
              post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              post.description
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
              post.tags.some((tag) =>
                tag.toLowerCase().includes(searchQuery.toLowerCase())
              )
          );
        }

        // Apply sorting
        if (sortBy === "new") {
          postsData.sort((a, b) => {
            const dateA =
              a.createdAt && typeof a.createdAt.toDate === "function"
                ? a.createdAt.toDate()
                : a.createdAt &&
                  typeof a.createdAt === "object" &&
                  "seconds" in a.createdAt
                ? new Date(a.createdAt.seconds * 1000)
                : new Date(a.createdAt || 0);
            const dateB =
              b.createdAt && typeof b.createdAt.toDate === "function"
                ? b.createdAt.toDate()
                : b.createdAt &&
                  typeof b.createdAt === "object" &&
                  "seconds" in b.createdAt
                ? new Date(b.createdAt.seconds * 1000)
                : new Date(b.createdAt || 0);
            return dateB.getTime() - dateA.getTime();
          });
        } else if (sortBy === "upvotes") {
          postsData.sort((a, b) => b.upvotesCount - a.upvotesCount);
        } else if (sortBy === "trending") {
          // Simple trending algorithm: upvotes + recency
          postsData.sort((a, b) => {
            const dateA =
              a.createdAt && typeof a.createdAt.toDate === "function"
                ? a.createdAt.toDate()
                : a.createdAt &&
                  typeof a.createdAt === "object" &&
                  "seconds" in a.createdAt
                ? new Date(a.createdAt.seconds * 1000)
                : new Date(a.createdAt || 0);
            const dateB =
              b.createdAt && typeof b.createdAt.toDate === "function"
                ? b.createdAt.toDate()
                : b.createdAt &&
                  typeof b.createdAt === "object" &&
                  "seconds" in b.createdAt
                ? new Date(b.createdAt.seconds * 1000)
                : new Date(b.createdAt || 0);

            const scoreA =
              a.upvotesCount +
              (new Date().getTime() - dateA.getTime()) /
                (1000 * 60 * 60 * 24 * 7);
            const scoreB =
              b.upvotesCount +
              (new Date().getTime() - dateB.getTime()) /
                (1000 * 60 * 60 * 24 * 7);
            return scoreB - scoreA;
          });
        }

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

  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 2592000)
      return `${Math.floor(diffInSeconds / 86400)} days ago`;
    if (diffInSeconds < 31536000)
      return `${Math.floor(diffInSeconds / 2592000)} months ago`;
    return `${Math.floor(diffInSeconds / 31536000)} years ago`;
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
    <div className="min-h-screen bg-background p-6 flex flex-col items-center w-[100%]">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">All Posts</h1>
          <p className="text-muted-foreground">
            View and manage all feedback posts for {companyName}
          </p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
          <div className="flex space-x-2">
            <Button
              variant={sortBy === "upvotes" ? "secondary" : "ghost"}
              onClick={() => setSortBy("upvotes")}
              className="flex items-center gap-2"
            >
              <ArrowUp className="h-4 w-4" />
              Most Upvoted
            </Button>
            <Button
              variant={sortBy === "trending" ? "secondary" : "ghost"}
              onClick={() => setSortBy("trending")}
              className="flex items-center gap-2"
            >
              <TrendingUp className="h-4 w-4" />
              Trending
            </Button>
            <Button
              variant={sortBy === "new" ? "secondary" : "ghost"}
              onClick={() => setSortBy("new")}
              className="flex items-center gap-2"
            >
              <Clock className="h-4 w-4" />
              Newest
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search posts..."
                className="pl-8 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="ghost" size="sm">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Posts List */}
        <div className="space-y-4">
          {posts.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Posts Yet</h3>
                <p className="text-muted-foreground">
                  No feedback posts have been submitted yet.
                </p>
              </CardContent>
            </Card>
          ) : (
            posts.map((post, index) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  {/* Post Header */}
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex flex-col">
                      {post.tags.length > 0 && (
                        <div className="mb-2 flex flex-wrap gap-1">
                          {post.tags.map((tag) => (
                            <Badge
                              key={tag}
                              className="px-2 py-0.5 rounded-full text-xs font-medium"
                              style={{ backgroundColor: getTagColor(tag) }}
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                      <CardTitle className="text-xl font-bold mb-2">
                        {post.title}
                      </CardTitle>
                      <p className="text-muted-foreground text-sm line-clamp-3">
                        {post.description}
                      </p>
                    </div>
                    {index === 0 && sortBy === "upvotes" && (
                      <div className="flex items-center gap-1 text-yellow-600">
                        <Star className="h-4 w-4" />
                        <span className="text-xs font-medium">TOP</span>
                      </div>
                    )}
                  </div>

                  {/* Post Footer */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-4 text-muted-foreground text-sm">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span>Anonymous User</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {post.createdAt &&
                          typeof post.createdAt.toDate === "function"
                            ? formatRelativeTime(post.createdAt.toDate())
                            : post.createdAt &&
                              typeof post.createdAt === "object" &&
                              "seconds" in post.createdAt
                            ? formatRelativeTime(
                                new Date(post.createdAt.seconds * 1000)
                              )
                            : post.createdAt
                            ? formatRelativeTime(new Date(post.createdAt))
                            : "Recently"}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <ArrowUp className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium">
                          {post.upvotesCount} upvotes
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MessageSquare className="h-4 w-4" />
                        <span className="text-sm text-muted-foreground">
                          {post.commentsCount} comments
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
