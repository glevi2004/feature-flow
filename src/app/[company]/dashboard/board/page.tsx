"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Check,
  Plus,
  MessageSquare,
  User,
  Calendar,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { OnboardingService } from "@/lib/services/onboarding";
import {
  FeedbackService,
  FeedbackPost,
  FeedbackTag,
  FeedbackStatus,
} from "@/lib/services/feedback";

// Board column configuration
const BOARD_COLUMNS = [
  {
    id: "backlog",
    title: "Backlog",
    status: "Under Review" as FeedbackStatus,
    color: "bg-muted/30 border-border",
    headerColor: "bg-muted/50 border-border",
  },
  {
    id: "next-up",
    title: "Next Up",
    status: "Accepted" as FeedbackStatus,
    color: "bg-muted/30 border-border",
    headerColor: "bg-muted/50 border-border",
  },
  {
    id: "in-progress",
    title: "In Progress",
    status: "Planned" as FeedbackStatus,
    color: "bg-muted/30 border-border",
    headerColor: "bg-muted/50 border-border",
  },
  {
    id: "done",
    title: "Done",
    status: "Completed" as FeedbackStatus,
    color: "bg-muted/30 border-border",
    headerColor: "bg-muted/50 border-border",
  },
];

function BoardPage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<FeedbackPost[]>([]);
  const [tags, setTags] = useState<FeedbackTag[]>([]);
  const [loading, setLoading] = useState(true);
  const [companyName, setCompanyName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [draggedPost, setDraggedPost] = useState<FeedbackPost | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

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

        // Filter out rejected posts
        const filteredPosts = postsData.filter(
          (post) => post.status !== "Rejected"
        );
        setPosts(filteredPosts);
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

  const getPostsForColumn = (status: FeedbackStatus) => {
    return posts.filter((post) => post.status === status);
  };

  const handleDragStart = (e: React.DragEvent, post: FeedbackPost) => {
    setDraggedPost(post);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = async (
    e: React.DragEvent,
    targetStatus: FeedbackStatus
  ) => {
    e.preventDefault();

    if (!draggedPost || draggedPost.status === targetStatus) {
      setDraggedPost(null);
      return;
    }

    try {
      setUpdatingStatus(draggedPost.id!);

      // Update the post status
      await FeedbackService.updatePostStatus(draggedPost.id!, targetStatus);

      // Update local state
      setPosts(
        posts.map((post) =>
          post.id === draggedPost.id ? { ...post, status: targetStatus } : post
        )
      );
    } catch (error) {
      console.error("Error updating post status:", error);
    } finally {
      setUpdatingStatus(null);
      setDraggedPost(null);
    }
  };

  const filteredPosts = posts.filter((post) => {
    if (!searchQuery) return true;
    return (
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  });

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
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Board</h1>
            <p className="text-muted-foreground">
              Manage your feedback and feature requests
            </p>
          </div>
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
          </div>
        </div>

        {/* Board */}
        <div className="grid grid-cols-4 gap-4 h-[calc(100vh-200px)]">
          {BOARD_COLUMNS.map((column) => {
            const columnPosts = filteredPosts.filter(
              (post) => post.status === column.status
            );

            return (
              <div
                key={column.id}
                className={`flex flex-col border rounded-lg bg-background ${column.color}`}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, column.status)}
              >
                {/* Column Header */}
                <div
                  className={`p-3 border-b ${column.headerColor} rounded-t-lg`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-sm">{column.title}</h3>
                    <Badge variant="outline" className="text-xs">
                      {columnPosts.length}
                    </Badge>
                  </div>
                </div>

                {/* Column Content */}
                <div className="flex-1 p-3 overflow-y-auto space-y-2">
                  {columnPosts.map((post) => (
                    <Card
                      key={post.id}
                      className={`cursor-move hover:shadow-sm transition-all duration-200 border-border ${
                        updatingStatus === post.id ? "opacity-50" : ""
                      }`}
                      draggable={updatingStatus !== post.id}
                      onDragStart={(e) => handleDragStart(e, post)}
                    >
                      <CardContent className="p-3">
                        {/* Post Tags */}
                        {post.tags.length > 0 && (
                          <div className="mb-2 flex flex-wrap gap-1">
                            {post.tags.slice(0, 2).map((tag) => (
                              <Badge
                                key={tag}
                                className="px-2 py-0.5 rounded-full text-xs font-medium"
                                style={{ backgroundColor: getTagColor(tag) }}
                              >
                                {tag}
                              </Badge>
                            ))}
                            {post.tags.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{post.tags.length - 2}
                              </Badge>
                            )}
                          </div>
                        )}

                        {/* Post Title */}
                        <h4 className="font-semibold text-sm mb-2 line-clamp-2">
                          {post.title}
                        </h4>

                        {/* Post Description */}
                        <p className="text-xs text-muted-foreground mb-3 line-clamp-3">
                          {post.description}
                        </p>

                        {/* Post Footer */}
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <ArrowUp className="h-3 w-3" />
                            <span>{post.upvotesCount}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageSquare className="h-3 w-3" />
                            <span>{post.commentsCount}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>
                              {post.createdAt &&
                              typeof post.createdAt.toDate === "function"
                                ? formatDate(post.createdAt.toDate())
                                : post.createdAt &&
                                  typeof post.createdAt === "object" &&
                                  "seconds" in post.createdAt
                                ? formatDate(
                                    new Date(post.createdAt.seconds * 1000)
                                  )
                                : post.createdAt
                                ? formatDate(new Date(post.createdAt))
                                : "Recently"}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {columnPosts.length === 0 && (
                    <div className="text-center py-6 text-muted-foreground">
                      <p className="text-xs">No posts</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default BoardPage;
