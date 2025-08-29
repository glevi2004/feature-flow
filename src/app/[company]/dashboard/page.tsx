"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Loading } from "@/components/ui/loading";
import { PostModal } from "@/components/ui/post-modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
  Eye,
  CheckCircle,
  XCircle,
  Calendar,
  CheckSquare,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { OnboardingService } from "@/lib/services/onboarding";
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

function DashboardPage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<FeedbackPost[]>([]);
  const [types, setTypes] = useState<FeedbackType[]>([]);
  const [tags, setTags] = useState<FeedbackTag[]>([]);
  const [loading, setLoading] = useState(true);
  const [companyName, setCompanyName] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
  const [statusSearch, setStatusSearch] = useState("");
  const [openStatusDropdown, setOpenStatusDropdown] = useState<string | null>(
    null
  );

  const [selectedPost, setSelectedPost] = useState<FeedbackPost | null>(null);
  const [showPostModal, setShowPostModal] = useState(false);

  useEffect(() => {
    if (user) {
      loadCompanyData();
    }
  }, [user]);

  const loadCompanyData = async () => {
    try {
      setLoading(true);

      // Get user's companies
      const userCompanies = await CompanyService.getUserCompanies(user!.uid);

      if (userCompanies.length > 0) {
        // For now, use the first company. In the future, you might want to handle multiple companies
        const companyId = userCompanies[0];

        // Verify company exists and user has access
        const companyData = await CompanyService.getCompany(companyId);
        if (!companyData || !companyData.members.includes(user!.uid)) {
          throw new Error("Access denied to company");
        }

        setCompanyName(companyData.name);
        setCompanyId(companyId);

        // Load posts, types, and tags using company ID
        const [postsData, typesData, tagsData] = await Promise.all([
          FeedbackService.getCompanyPosts(companyId),
          FeedbackService.getCompanyTypes(companyId),
          TagsService.getAllTags(companyId),
        ]);

        setPosts(postsData);
        setTypes(typesData);
        setTags(tagsData);
      } else {
        // No companies found for user
        console.log("No companies found for user");
      }
    } catch (error) {
      console.error("Error loading company data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getTypeColor = (typeId: string) => {
    const type = types.find((t) => t.id === typeId);
    return type?.color || "#6B7280";
  };

  const getTagColor = (tagId: string) => {
    const tag = tags.find((t) => t.id === tagId);
    return tag?.color || "#6B7280";
  };

  const getTagName = (tagId: string) => {
    const tag = tags.find((t) => t.id === tagId);
    if (!tag) {
      console.log(
        "Tag not found:",
        tagId,
        "Available tags:",
        tags.map((t) => ({ id: t.id, name: t.name }))
      );
    }
    return tag?.name || "Unknown Tag";
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

  const updatePostStatus = async (
    postId: string,
    newStatus: FeedbackStatus
  ) => {
    try {
      setUpdatingStatus(postId);
      await FeedbackService.updatePostStatus(postId, newStatus);

      // Update local state
      setPosts(
        posts.map((post) =>
          post.id === postId ? { ...post, status: newStatus } : post
        )
      );
    } catch (error) {
      console.error("Error updating post status:", error);
    } finally {
      setUpdatingStatus(null);
    }
  };

  const getStatusColor = (status: string) => {
    const statusOption = STATUS_OPTIONS.find(
      (option) => option.value === status
    );
    return statusOption?.color || "bg-gray-100 text-gray-800";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Under Review":
        return Eye;
      case "Accepted":
        return CheckCircle;
      case "Rejected":
        return XCircle;
      case "Planned":
        return Calendar;
      case "Completed":
        return CheckSquare;
      default:
        return Eye;
    }
  };

  const handlePostClick = (post: FeedbackPost) => {
    setSelectedPost(post);
    setShowPostModal(true);
  };

  const reloadTags = async () => {
    try {
      const tagsData = await TagsService.getAllTags(companyId);
      setTags(tagsData);
    } catch (error) {
      console.error("Error reloading tags:", error);
    }
  };

  const handlePostUpdate = async (updatedPost: FeedbackPost) => {
    setPosts(
      posts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
    );
    // Reload tags to ensure we have the latest tag data
    await reloadTags();
  };

  if (loading) {
    return (
      <div className="h-[70vh] flex items-center justify-center">
        <Loading size="lg" text="Loading dashboard..." />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Posts ({posts.length})</h1>
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
                className="flex items-center justify-between p-4 bg-card border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => handlePostClick(post)}
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
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {/* Type badges */}
                  {post.types.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {post.types.map((type) => {
                        const typeData = types.find((t) => t.id === type);
                        return (
                          <Badge
                            key={type}
                            className="px-2 py-0.5 rounded-full text-xs font-medium"
                            style={{ backgroundColor: typeData?.color }}
                          >
                            {typeData?.emoji} {typeData?.name || "Unknown Type"}
                          </Badge>
                        );
                      })}
                    </div>
                  )}

                  {/* Tag badges */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {post.tags.map((tagId) => (
                        <Badge
                          key={tagId}
                          variant="outline"
                          className="px-2 py-0.5 rounded-full text-xs font-medium"
                          style={{
                            borderColor: getTagColor(tagId) + "40", // 25% opacity
                            color: getTagColor(tagId) + "CC", // 80% opacity
                            backgroundColor: getTagColor(tagId) + "10", // 6% opacity background
                          }}
                        >
                          {getTagName(tagId)}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <DropdownMenu
                    open={openStatusDropdown === post.id}
                    onOpenChange={(open) => {
                      if (open) {
                        setOpenStatusDropdown(post.id!);
                        setStatusSearch("");
                      } else {
                        setOpenStatusDropdown(null);
                      }
                    }}
                  >
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className={`h-auto px-2 py-0.5 rounded-full text-xs font-medium transition-all duration-200 ${getStatusColor(
                          post.status || "Under Review"
                        )} hover:opacity-80 hover:scale-105`}
                        disabled={updatingStatus === post.id}
                      >
                        {(() => {
                          const StatusIcon = getStatusIcon(
                            post.status || "Under Review"
                          );
                          return (
                            <>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {post.status || "Under Review"}
                            </>
                          );
                        })()}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end">
                      <div className="p-2">
                        <div className="relative">
                          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Search status..."
                            value={statusSearch}
                            onChange={(e) => setStatusSearch(e.target.value)}
                            className="pl-8"
                          />
                        </div>
                      </div>
                      <div className="max-h-48 overflow-y-auto">
                        {STATUS_OPTIONS.filter((status) =>
                          status.label
                            .toLowerCase()
                            .includes(statusSearch.toLowerCase())
                        ).map((status) => (
                          <DropdownMenuItem
                            key={status.value}
                            onClick={() => {
                              updatePostStatus(
                                post.id!,
                                status.value as FeedbackStatus
                              );
                              setOpenStatusDropdown(null);
                            }}
                            className="flex items-center gap-3 cursor-pointer"
                          >
                            <div
                              className={`w-2 h-2 rounded-full ${status.dotColor}`}
                            />
                            <span>{status.label}</span>
                            {post.status === status.value && (
                              <Check className="h-4 w-4 ml-auto" />
                            )}
                          </DropdownMenuItem>
                        ))}
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))
          )}
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

export default DashboardPage;
