"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  FeedbackService,
  FeedbackPost,
  FeedbackComment,
  FeedbackType,
} from "@/lib/services/feedback";
import { CompanyService, CompanyData } from "@/lib/services/company";
import {
  MessageSquare,
  Send,
  User,
  Plus,
  Search,
  Filter,
  ArrowUp,
  Calendar,
  LogIn,
  LogOut,
} from "lucide-react";

import { Loading } from "@/components/ui/loading";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ToastContainer, useToast } from "@/components/ui/toast";
import { usePublicAuth } from "@/contexts/PublicAuthContext";

import Image from "next/image";
import { capitalizeCompanyName } from "@/lib/utils";

export default function PublicFeedbackPage() {
  const params = useParams();
  const companyName = decodeURIComponent(params.company as string);
  const { toasts, removeToast, showSuccess, showError } = useToast();
  const {
    user,
    loading: authLoading,
    signInWithGoogle,
    signOut,
  } = usePublicAuth();

  const [posts, setPosts] = useState<FeedbackPost[]>([]);
  const [types, setTypes] = useState<FeedbackType[]>([]);
  const [loading, setLoading] = useState(true);
  const [companyId, setCompanyId] = useState<string>("");
  const [companyData, setCompanyData] = useState<CompanyData | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [comments, setComments] = useState<FeedbackComment[]>([]);
  const [showComments, setShowComments] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [commentContent, setCommentContent] = useState("");

  // Filter/Sort states
  const [sortBy] = useState("trending"); // 'trending', 'top', 'new'
  const [searchQuery, setSearchQuery] = useState("");

  const loadCompanyData = useCallback(async () => {
    try {
      setLoading(true);

      // First get the company ID from the company name
      const companyData = await CompanyService.getCompanyByName(companyName);
      if (!companyData) {
        console.error("Company not found:", companyName);
        return;
      }

      setCompanyId(companyData.id);
      setCompanyData(companyData);

      const [initialPostsData, typesData] = await Promise.all([
        FeedbackService.getCompanyPosts(companyData.id),
        FeedbackService.getCompanyTypes(companyData.id),
      ]);
      let postsData = initialPostsData;

      // Apply search filter
      if (searchQuery) {
        postsData = postsData.filter(
          (post) =>
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.description
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            post.types.some((type) =>
              type.toLowerCase().includes(searchQuery.toLowerCase())
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
      } else if (sortBy === "top") {
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
      setTypes(typesData);
    } catch (error) {
      console.error("Error loading company data:", error);
    } finally {
      setLoading(false);
    }
  }, [companyName, sortBy, searchQuery]);

  useEffect(() => {
    loadCompanyData();
  }, [loadCompanyData]);

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      showError("Validation Error", "Please fill in all required fields");
      return;
    }

    if (!user) {
      showError(
        "Authentication Required",
        "Please sign in with Google to create a post"
      );
      return;
    }

    try {
      const newPost = await FeedbackService.createPost({
        companyId,
        userId: user.uid,
        userName: user.displayName,
        title: title.trim(),
        description: description.trim(),
        types: selectedTypes,
        tags: [], // Initialize with empty tags array
        status: "Under Review",
      });

      setPosts([newPost as FeedbackPost, ...posts]);
      setTitle("");
      setDescription("");
      setSelectedTypes([]);
      setShowCreateModal(false);
      showSuccess("Success!", "Your post has been created successfully");
    } catch (error) {
      console.error("Error creating post:", error);
      showError("Error", "Failed to create post. Please try again.");
    }
  };

  const handleToggleUpvote = async (postId: string) => {
    if (!user) {
      showError(
        "Authentication Required",
        "Please sign in with Google to upvote"
      );
      return;
    }

    try {
      const userId = user.uid;
      await FeedbackService.toggleUpvote(postId, userId);

      setPosts(
        posts.map((post) => {
          if (post.id === postId) {
            const isUpvoted = post.upvotes.includes(userId);
            return {
              ...post,
              upvotes: isUpvoted
                ? post.upvotes.filter((id: string) => id !== userId)
                : [...post.upvotes, userId],
              upvotesCount: isUpvoted
                ? post.upvotesCount - 1
                : post.upvotesCount + 1,
            };
          }
          return post;
        })
      );
    } catch (error) {
      console.error("Error toggling upvote:", error);
      showError("Error", "Failed to update upvote");
    }
  };

  const handleAddComment = async (postId: string) => {
    if (!commentContent.trim()) {
      showError("Validation Error", "Please enter a comment");
      return;
    }

    if (!user) {
      showError(
        "Authentication Required",
        "Please sign in with Google to comment"
      );
      return;
    }

    try {
      const newComment = await FeedbackService.addComment({
        postId,
        companyId,
        userId: user.uid,
        userName: user.displayName,
        content: commentContent.trim(),
      });

      setComments([...comments, newComment as FeedbackComment]);
      setCommentContent("");

      setPosts(
        posts.map((post) => {
          if (post.id === postId) {
            return { ...post, commentsCount: post.commentsCount + 1 };
          }
          return post;
        })
      );

      showSuccess("Success!", "Comment added successfully");
    } catch (error) {
      console.error("Error adding comment:", error);
      showError("Error", "Failed to add comment");
    }
  };

  const loadComments = async (postId: string) => {
    try {
      const commentsData = await FeedbackService.getPostComments(postId);
      setComments(commentsData);
      setShowComments(showComments === postId ? null : postId);
    } catch (error) {
      console.error("Error loading comments:", error);
    }
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

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
      showSuccess("Welcome!", "Successfully signed in with Google");
    } catch (error) {
      console.error("Error signing in:", error);
      showError(
        "Sign In Failed",
        "Failed to sign in with Google. Please try again."
      );
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      showSuccess("Signed Out", "You have been signed out successfully");
    } catch (error) {
      console.error("Error signing out:", error);
      showError("Sign Out Failed", "Failed to sign out. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="h-[100vh] flex items-center justify-center">
        <Loading size="lg" text="Loading feedback..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex w-full">
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      {/* Main Content Area */}
      <div className="flex-1 max-w-4xl mx-auto p-3 sm:p-6 w-full">
        {/* Company Header */}
        <div className="flex items-center gap-4 mb-8 pb-6 border-b">
          {companyData?.logo ? (
            <div className="relative w-16 h-16 flex-shrink-0">
              <Image
                src={companyData.logo}
                alt={`${companyData.name} logo`}
                fill
                className="object-contain rounded-lg"
              />
            </div>
          ) : (
            <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
              <User className="h-8 w-8 text-muted-foreground" />
            </div>
          )}
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {companyData?.name
                ? capitalizeCompanyName(companyData.name)
                : capitalizeCompanyName(companyName)}
            </h1>
            <p className="text-muted-foreground">
              Share your feedback and help us improve
            </p>
          </div>
        </div>

        {/* Header/Navigation */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search"
                className="pl-8 w-full sm:w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="ghost" size="sm">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            {/* Authentication Section */}
            {user ? (
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2">
                  {user.photoURL ? (
                    <Image
                      src={user.photoURL}
                      alt={user.displayName}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                  <span className="text-sm font-medium hidden sm:inline">
                    {user.displayName}
                  </span>
                </div>
                <Button variant="ghost" size="sm" onClick={handleSignOut}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button variant="outline" size="sm" onClick={handleSignIn}>
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            )}

            <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Create A New Post
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl mx-4">
                <DialogHeader>
                  <DialogTitle>Create a New Post</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreatePost} className="space-y-4">
                  {/* Types Selection */}
                  <div>
                    <Label htmlFor="types">Types</Label>
                    <div className="flex flex-wrap gap-2 p-2 border rounded-md min-h-[40px]">
                      {types.map((type) => (
                        <Badge
                          key={type.id}
                          className={`cursor-pointer text-xs sm:text-sm ${
                            selectedTypes.includes(type.id!)
                              ? "text-white"
                              : "bg-muted hover:bg-muted/80 text-foreground"
                          }`}
                          style={{
                            backgroundColor: selectedTypes.includes(type.id!)
                              ? type.color
                              : undefined,
                          }}
                          onClick={() => {
                            setSelectedTypes((prev) =>
                              prev.includes(type.id!)
                                ? prev.filter((t) => t !== type.id)
                                : [...prev, type.id!]
                            );
                          }}
                        >
                          {type.emoji} {type.name}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Post Title */}
                  <div>
                    <Label htmlFor="title">Post Title</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter post title"
                      required
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe your feedback or feature request"
                      rows={4}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Submit Post
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Posts List */}
        <div className="space-y-3 sm:space-y-4">
          {posts.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8 sm:py-12 px-4 sm:px-6">
                <MessageSquare className="h-8 w-8 sm:h-12 sm:w-12 text-muted-foreground mx-auto mb-3 sm:mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold mb-2">
                  No Submissions Yet
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
                  Be the first to share your thoughts!
                </p>
                <Button
                  onClick={() => setShowCreateModal(true)}
                  className="flex items-center gap-2 mx-auto"
                >
                  <Plus className="h-4 w-4" />
                  Create first post
                </Button>
              </CardContent>
            </Card>
          ) : (
            posts.map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4 sm:p-6">
                  {/* Post Header with PINNED label for first post */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-0 mb-3">
                    <div className="flex flex-col w-full">
                      {post.types.length > 0 && (
                        <div className="mb-2 flex flex-wrap gap-1">
                          {post.types.map((type) => {
                            const typeData = types.find((t) => t.id === type);
                            return (
                              <Badge
                                key={type}
                                className="px-2 py-0.5 rounded-full text-xs font-medium"
                                style={{ backgroundColor: typeData?.color }}
                              >
                                {typeData?.emoji}{" "}
                                {typeData?.name || "Unknown Type"}
                              </Badge>
                            );
                          })}
                        </div>
                      )}
                      <CardTitle className="text-lg sm:text-xl font-bold mb-2">
                        {post.title}
                      </CardTitle>
                      <p className="text-sm sm:text-base text-muted-foreground line-clamp-3">
                        {post.description}
                      </p>
                    </div>
                  </div>

                  {/* Post Footer */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mt-4">
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 text-muted-foreground text-xs sm:text-sm">
                      <div className="flex items-center space-x-2">
                        <User className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span>
                          {post.userName || "Anonymous User"} from{" "}
                          {capitalizeCompanyName(companyName)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span>
                          {(() => {
                            try {
                              if (
                                post.createdAt &&
                                typeof post.createdAt.toDate === "function"
                              ) {
                                return formatRelativeTime(
                                  post.createdAt.toDate()
                                );
                              } else if (
                                post.createdAt &&
                                typeof post.createdAt === "object" &&
                                "seconds" in post.createdAt
                              ) {
                                return formatRelativeTime(
                                  new Date(post.createdAt.seconds * 1000)
                                );
                              } else if (post.createdAt) {
                                const date = new Date(post.createdAt);
                                if (!isNaN(date.getTime())) {
                                  return formatRelativeTime(date);
                                }
                              }
                              return "Just now";
                            } catch (error) {
                              console.error("Error formatting date:", error);
                              return "Just now";
                            }
                          })()}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-1 flex-1 sm:flex-none"
                        onClick={() => handleToggleUpvote(post.id!)}
                      >
                        <ArrowUp className="h-4 w-4" />
                        <span className="text-sm">
                          {post.upvotesCount || 0}
                        </span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-1 flex-1 sm:flex-none"
                        onClick={() => loadComments(post.id!)}
                      >
                        <MessageSquare className="h-4 w-4" />
                        <span className="text-sm">
                          {post.commentsCount || 0}
                        </span>
                      </Button>
                    </div>
                  </div>

                  {/* Comments Section */}
                  {showComments === post.id && (
                    <div className="mt-4 pt-4 border-t">
                      <h4 className="font-semibold mb-3 text-sm sm:text-base">
                        Comments
                      </h4>

                      {/* Add Comment */}
                      <div className="space-y-2 mb-4">
                        {user ? (
                          <div className="flex flex-col sm:flex-row gap-2">
                            <Textarea
                              placeholder="Add a comment..."
                              value={commentContent}
                              onChange={(e) =>
                                setCommentContent(e.target.value)
                              }
                              rows={2}
                              className="flex-1"
                            />
                            <Button
                              onClick={() => handleAddComment(post.id!)}
                              className="flex items-center justify-center gap-1 w-full sm:w-auto"
                            >
                              <Send className="h-4 w-4" />
                              <span className="sm:hidden">Send</span>
                            </Button>
                          </div>
                        ) : (
                          <div className="text-center py-4">
                            <p className="text-sm text-muted-foreground mb-2">
                              Sign in with Google to add comments
                            </p>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={handleSignIn}
                            >
                              <LogIn className="h-4 w-4 mr-2" />
                              Sign In
                            </Button>
                          </div>
                        )}
                      </div>

                      {/* Comments List */}
                      <div className="space-y-3">
                        {comments
                          .filter((comment) => comment.postId === post.id)
                          .map((comment) => (
                            <div
                              key={comment.id}
                              className="bg-muted p-3 rounded-lg"
                            >
                              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                                <div className="flex items-center gap-2">
                                  <User className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                                  <span className="font-medium text-xs sm:text-sm">
                                    {comment.userName}
                                  </span>
                                </div>
                                <span className="text-xs text-muted-foreground">
                                  {comment.createdAt &&
                                  typeof comment.createdAt.toDate === "function"
                                    ? comment.createdAt
                                        .toDate()
                                        .toLocaleDateString()
                                    : comment.createdAt &&
                                      typeof comment.createdAt === "object" &&
                                      "seconds" in comment.createdAt
                                    ? new Date(
                                        comment.createdAt.seconds * 1000
                                      ).toLocaleDateString()
                                    : comment.createdAt
                                    ? new Date(
                                        comment.createdAt
                                      ).toLocaleDateString()
                                    : "Recently"}
                                </span>
                              </div>
                              <p className="text-xs sm:text-sm">
                                {comment.content}
                              </p>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
