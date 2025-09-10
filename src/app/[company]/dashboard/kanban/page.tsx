"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Loading } from "@/components/ui/loading";
import { PostModal } from "@/components/ui/post-modal";
import { Card, CardContent } from "@/components/ui/card";
import {
  Search,
  ArrowUp,
  MessageSquare,
  Calendar,
  Inbox,
  CheckCircle,
  Play,
  CheckSquare,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useDashboardFilters } from "@/contexts/DashboardFilterContext";
import { CompanyService } from "@/lib/services/company";
import {
  FeedbackService,
  FeedbackPost,
  FeedbackType,
  FeedbackStatus,
} from "@/lib/services/feedback";
import { TagsService, FeedbackTag } from "@/lib/services/tags";

// Status options
const STATUS_OPTIONS = [
  {
    value: "Under Review",
    label: "Under Review",
    color: "bg-blue-900/20 text-blue-400 border border-blue-800/30",
    dotColor: "bg-blue-400",
  },
  {
    value: "Accepted",
    label: "Accepted",
    color: "bg-green-900/20 text-green-400 border border-green-800/30",
    dotColor: "bg-green-400",
  },
  {
    value: "Rejected",
    label: "Rejected",
    color: "bg-red-900/20 text-red-400 border border-red-800/30",
    dotColor: "bg-red-400",
  },
  {
    value: "Planned",
    label: "Planned",
    color: "bg-purple-900/20 text-purple-400 border border-purple-800/30",
    dotColor: "bg-purple-400",
  },
  {
    value: "Completed",
    label: "Completed",
    color: "bg-emerald-900/20 text-emerald-400 border border-emerald-800/30",
    dotColor: "bg-emerald-400",
  },
];

// Board column configuration
const BOARD_COLUMNS = [
  {
    id: "backlog",
    title: "Backlog",
    status: "Under Review" as FeedbackStatus,
    color: "bg-muted/30 border-border",
    headerColor: "bg-muted/50 border-border",
    badgeColor: "bg-blue-900/20 text-blue-400 border border-blue-800/30",
    icon: Inbox,
  },
  {
    id: "next-up",
    title: "Next Up",
    status: "Accepted" as FeedbackStatus,
    color: "bg-muted/30 border-border",
    headerColor: "bg-muted/50 border-border",
    badgeColor: "bg-green-900/20 text-green-400 border border-green-800/30",
    icon: CheckCircle,
  },
  {
    id: "in-progress",
    title: "In Progress",
    status: "Planned" as FeedbackStatus,
    color: "bg-muted/30 border-border",
    headerColor: "bg-muted/50 border-border",
    badgeColor: "bg-purple-900/20 text-purple-400 border border-purple-800/30",
    icon: Play,
  },
  {
    id: "done",
    title: "Done",
    status: "Completed" as FeedbackStatus,
    color: "bg-muted/30 border-border",
    headerColor: "bg-muted/50 border-border",
    badgeColor:
      "bg-emerald-900/20 text-emerald-400 border border-emerald-800/30",
    icon: CheckSquare,
  },
];

function BoardPage() {
  const { user } = useAuth();
  const { tagFilter } = useDashboardFilters();
  const [posts, setPosts] = useState<FeedbackPost[]>([]);
  const [types, setTypes] = useState<FeedbackType[]>([]);
  const [tags, setTags] = useState<FeedbackTag[]>([]);
  const [loading, setLoading] = useState(true);

  const [companyId, setCompanyId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [draggedPost, setDraggedPost] = useState<FeedbackPost | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<FeedbackPost | null>(null);
  const [showPostModal, setShowPostModal] = useState(false);

  const loadCompanyData = useCallback(async () => {
    try {
      setLoading(true);

      // Get user's companies
      const userCompanies = await CompanyService.getUserCompanies(user!.uid);

      if (userCompanies.length > 0) {
        // For now, use the first company
        const companyId = userCompanies[0];

        // Verify company exists and user has access
        const companyData = await CompanyService.getCompany(companyId);
        if (!companyData || !companyData.members.includes(user!.uid)) {
          throw new Error("Access denied to company");
        }

        setCompanyId(companyId);

        // Load posts, types, and tags
        const [postsData, typesData, tagsData] = await Promise.all([
          FeedbackService.getCompanyPosts(companyId),
          FeedbackService.getCompanyTypes(companyId),
          TagsService.getAllTags(companyId),
        ]);

        // Filter out rejected posts
        const filteredPosts = postsData.filter(
          (post) => post.status !== "Rejected"
        );
        setPosts(filteredPosts);
        setTypes(typesData);
        setTags(tagsData);
      } else {
        console.log("No companies found for user");
      }
    } catch (error) {
      console.error("Error loading company data:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      loadCompanyData();
    }
  }, [user, loadCompanyData]);

  const getTagColor = (tagId: string) => {
    const tag = tags.find((t) => t.id === tagId);
    return tag?.color || "#6B7280";
  };

  const getTagName = (tagId: string) => {
    const tag = tags.find((t) => t.id === tagId);
    return tag?.name || null;
  };

  const getStatusColor = (status: string) => {
    const statusOption = STATUS_OPTIONS.find(
      (option) => option.value === status
    );
    return statusOption?.color || "bg-gray-100 text-gray-800";
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
    });
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

  const handlePostClick = (post: FeedbackPost) => {
    setSelectedPost(post);
    setShowPostModal(true);
  };

  const handlePostUpdate = (updatedPost: FeedbackPost) => {
    setPosts(
      posts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
    );
    // Also update the selected post if it's the same post
    if (selectedPost && selectedPost.id === updatedPost.id) {
      setSelectedPost(updatedPost);
    }
  };

  const filteredPosts = posts.filter((post) => {
    // Apply search filter
    if (searchQuery) {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.types.some((type) =>
          type.toLowerCase().includes(searchQuery.toLowerCase())
        );
      if (!matchesSearch) return false;
    }

    // Apply tag filter
    if (tagFilter) {
      if (!post.tags || !post.tags.includes(tagFilter)) {
        return false;
      }
    }

    return true;
  });

  if (loading) {
    return (
      <div className="h-[70vh] flex items-center justify-center">
        <Loading size="lg" text="Loading kanban..." />
      </div>
    );
  }

  return (
    <div className="pb-6 px-6">
      <div className="w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Kanban</h1>
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
          </div>
        </div>

        {/* Kanban */}
        <div className="grid grid-cols-4 gap-2 h-[calc(100vh-200px)]">
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
                    <Badge
                      className={`text-xs font-medium ${column.badgeColor}`}
                    >
                      <column.icon className="h-3 w-3 mr-1" />
                      {column.title}
                    </Badge>
                    {columnPosts.length > 0 && (
                      <Badge variant="outline" className="text-xs">
                        {columnPosts.length}
                      </Badge>
                    )}
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
                      onClick={() => handlePostClick(post)}
                    >
                      <CardContent className="p-3">
                        {/* Post Badges - Status, Types, and Tags in one line */}
                        <div className="mb-2 flex flex-wrap gap-1">
                          {/* Status Badge */}
                          <Badge
                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                              post.status || "Under Review"
                            )}`}
                          >
                            {post.status || "Under Review"}
                          </Badge>

                          {/* Type Badges */}
                          {post.types.slice(0, 1).map((type) => {
                            const typeData = types.find((t) => t.id === type);
                            return (
                              <Badge
                                key={type}
                                className="px-2 py-0.5 rounded-full text-xs font-medium"
                                style={{
                                  backgroundColor: typeData?.color,
                                }}
                              >
                                {typeData?.emoji}{" "}
                                {typeData?.name || "Unknown Type"}
                              </Badge>
                            );
                          })}

                          {/* Tag Badges */}
                          {post.tags &&
                            post.tags
                              .map((tagId) => {
                                const tagName = getTagName(tagId);
                                return tagName
                                  ? { id: tagId, name: tagName }
                                  : null;
                              })
                              .filter(Boolean)
                              .slice(0, 1)
                              .map((tag) => (
                                <Badge
                                  key={tag!.id}
                                  variant="outline"
                                  className="px-2 py-0.5 rounded-full text-xs font-medium"
                                  style={{
                                    borderColor: getTagColor(tag!.id) + "40",
                                    color: getTagColor(tag!.id) + "CC",
                                    backgroundColor:
                                      getTagColor(tag!.id) + "10",
                                  }}
                                >
                                  {tag!.name}
                                </Badge>
                              ))}

                          {/* Overflow indicators */}
                          {(post.types.length > 1 ||
                            (post.tags &&
                              post.tags.filter((tagId) => getTagName(tagId))
                                .length > 1)) && (
                            <Badge variant="outline" className="text-xs">
                              +
                              {post.types.length -
                                1 +
                                (post.tags
                                  ? post.tags.filter((tagId) =>
                                      getTagName(tagId)
                                    ).length - 1
                                  : 0)}
                            </Badge>
                          )}
                        </div>

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
                              {post.createdAt
                                ? formatDate(post.createdAt.toDate())
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

      {/* Post Modal */}
      <PostModal
        post={selectedPost}
        types={types}
        companyId={companyId}
        isOpen={showPostModal}
        onClose={() => setShowPostModal(false)}
        onPostUpdate={handlePostUpdate}
      />
    </div>
  );
}

export default BoardPage;
