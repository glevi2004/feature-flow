"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Timestamp } from "firebase/firestore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  MessageSquare,
  ArrowUp,
  User,
  Calendar,
  Send,
  Activity,
  X,
  LogIn,
} from "lucide-react";
import {
  FeedbackPost,
  FeedbackComment,
  FeedbackType,
  FeedbackStatus,
} from "@/lib/services/feedback";
import { FeedbackService } from "@/lib/services/feedback";
import { TagsService, FeedbackTag } from "@/lib/services/tags";
import { useAuth } from "@/contexts/AuthContext";
import { useAuthToken } from "@/hooks/use-auth-token";
import { useCompanyMembership } from "@/hooks/use-company-membership";

interface PostModalProps {
  post: FeedbackPost | null;
  types: FeedbackType[];
  companyId: string;
  isOpen: boolean;
  onClose: () => void;
  onPostUpdate: (updatedPost: FeedbackPost) => void;
}

const STATUS_OPTIONS = [
  { value: "Under Review", label: "Under Review", color: "bg-blue-400" },
  { value: "Accepted", label: "Accepted", color: "bg-green-400" },
  { value: "Rejected", label: "Rejected", color: "bg-red-400" },
  { value: "Planned", label: "Planned", color: "bg-purple-400" },
  { value: "Completed", label: "Completed", color: "bg-emerald-400" },
];

export function PostModal({
  post,
  types,
  companyId,
  isOpen,
  onClose,
  onPostUpdate,
}: PostModalProps) {
  const { user, signInWithGoogle } = useAuth();
  const { token } = useAuthToken();
  const { isMember } = useCompanyMembership(companyId);
  const [currentPost, setCurrentPost] = useState<FeedbackPost | null>(null);
  const [comments, setComments] = useState<FeedbackComment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loadingComments, setLoadingComments] = useState(false);
  const [submittingComment, setSubmittingComment] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [tags, setTags] = useState<FeedbackTag[]>([]);
  const [loadingTags, setLoadingTags] = useState(false);
  const [updatingTags, setUpdatingTags] = useState(false);

  // Update currentPost when post prop changes
  useEffect(() => {
    if (post) {
      setCurrentPost(post);
    }
  }, [post]);

  const loadComments = useCallback(async () => {
    if (!currentPost) return;
    try {
      setLoadingComments(true);
      const commentsData = await FeedbackService.getPostComments(
        currentPost.id!
      );
      setComments(commentsData);
    } catch (error) {
      console.error("Error loading comments:", error);
    } finally {
      setLoadingComments(false);
    }
  }, [currentPost]);

  const loadTags = useCallback(async () => {
    try {
      setLoadingTags(true);
      const allTags = await TagsService.getAllTags(companyId);
      setTags(allTags);
    } catch (error) {
      console.error("Error loading tags:", error);
    } finally {
      setLoadingTags(false);
    }
  }, [companyId]);

  useEffect(() => {
    if (currentPost && isOpen) {
      loadComments();
      loadTags();
    }
  }, [currentPost, isOpen, loadComments, loadTags]);

  const handleAddComment = async () => {
    if (!currentPost || !newComment.trim()) {
      alert("Please enter a comment");
      return;
    }

    if (!user) {
      alert("Please sign in to add comments");
      return;
    }

    try {
      setSubmittingComment(true);
      const newCommentData = await FeedbackService.addComment({
        postId: currentPost.id!,
        companyId,
        userId: user.uid,
        userName: user.displayName || "Anonymous User",
        content: newComment.trim(),
      });

      setComments([
        ...comments,
        { ...newCommentData, createdAt: Timestamp.now() },
      ]);
      setNewComment("");

      const updatedPost = {
        ...currentPost,
        commentsCount: currentPost.commentsCount + 1,
      };
      setCurrentPost(updatedPost);
      onPostUpdate(updatedPost);
    } catch (error) {
      console.error("Error adding comment:", error);
      alert("Failed to add comment");
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleStatusChange = async (newStatus: FeedbackStatus) => {
    if (!currentPost || !token || !isMember) return;

    try {
      setUpdatingStatus(true);
      await FeedbackService.updatePostStatus(
        currentPost.id!,
        newStatus,
        token
      );
      const updatedPost = { ...currentPost, status: newStatus };
      setCurrentPost(updatedPost);
      onPostUpdate(updatedPost);
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status");
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleTagsChange = async (tagIds: string[]) => {
    if (!currentPost || !token || !isMember) return;

    try {
      setUpdatingTags(true);
      await FeedbackService.updatePostTags(currentPost.id!, tagIds, token);
      const updatedPost = { ...currentPost, tags: tagIds };
      setCurrentPost(updatedPost);
      onPostUpdate(updatedPost);
    } catch (error) {
      console.error("Error updating tags:", error);
      alert("Failed to update tags");
    } finally {
      setUpdatingTags(false);
    }
  };

  const getTagNames = (tagIds: string[]) => {
    return tagIds
      .map((tagId) => tags.find((tag) => tag.id === tagId)?.name)
      .filter(Boolean);
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

  if (!currentPost || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-background border rounded-lg shadow-lg max-w-4xl max-h-[90vh] w-full mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold">{currentPost.title}</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex gap-6 h-full overflow-hidden">
          {/* Left Column - Post Content and Comments */}
          <div className="flex-1 flex flex-col overflow-hidden p-6">
            {/* Post Description */}
            <div className="mb-6">
              <p className="text-muted-foreground leading-relaxed">
                {currentPost.description}
              </p>
            </div>

            {/* Post Types */}
            {currentPost.types.length > 0 && (
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {currentPost.types.map((type) => {
                    const typeData = types.find((t) => t.id === type);
                    return (
                      <Badge
                        key={type}
                        className="px-3 py-1 rounded-full text-sm font-medium"
                        style={{
                          backgroundColor: typeData?.color,
                        }}
                      >
                        {typeData?.emoji} {typeData?.name || "Unknown Type"}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Post Meta */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>Anonymous User</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>
                  {currentPost.createdAt &&
                  typeof currentPost.createdAt.toDate === "function"
                    ? formatRelativeTime(currentPost.createdAt.toDate())
                    : currentPost.createdAt &&
                      typeof currentPost.createdAt === "object" &&
                      "seconds" in currentPost.createdAt
                    ? formatRelativeTime(
                        new Date(currentPost.createdAt.seconds * 1000)
                      )
                    : currentPost.createdAt
                    ? formatRelativeTime(new Date(currentPost.createdAt))
                    : "Recently"}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <ArrowUp className="h-4 w-4" />
                <span>{currentPost.upvotesCount} upvotes</span>
              </div>
            </div>

            {/* Comment Input */}
            <div className="mb-6">
              {user ? (
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    rows={3}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleAddComment}
                    disabled={submittingComment}
                    className="flex items-center gap-1"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="text-center py-4 border rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground mb-3">
                    Sign in to add comments
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => signInWithGoogle()}
                    className="flex items-center gap-2"
                  >
                    <LogIn className="h-4 w-4" />
                    Sign In with Google
                  </Button>
                </div>
              )}
            </div>

            {/* Comments Section */}
            <div className="flex-1 overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Comments ({comments.length})
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={loadComments}
                  disabled={loadingComments}
                >
                  <Activity className="h-4 w-4 mr-1" />
                  Refresh
                </Button>
              </div>

              <div className="space-y-3 overflow-y-auto max-h-64">
                {loadingComments ? (
                  <div className="text-center py-4 text-muted-foreground">
                    Loading comments...
                  </div>
                ) : comments.length === 0 ? (
                  <div className="text-center py-4 text-muted-foreground">
                    No comments yet. Be the first to comment!
                  </div>
                ) : (
                  comments.map((comment) => (
                    <Card key={comment.id}>
                      <CardContent className="p-3">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-sm">
                                {comment.userName}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {comment.createdAt &&
                                typeof comment.createdAt.toDate === "function"
                                  ? formatRelativeTime(
                                      comment.createdAt.toDate()
                                    )
                                  : comment.createdAt &&
                                    typeof comment.createdAt === "object" &&
                                    "seconds" in comment.createdAt
                                  ? formatRelativeTime(
                                      new Date(comment.createdAt.seconds * 1000)
                                    )
                                  : comment.createdAt
                                  ? formatRelativeTime(
                                      new Date(comment.createdAt)
                                    )
                                  : "Recently"}
                              </span>
                            </div>
                            <p className="text-sm">{comment.content}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Manage Post (only for company members) */}
          {isMember && (
            <div className="w-80 flex-shrink-0 border-l p-6">
              <h3 className="font-semibold mb-4">Manage Post</h3>

              <div className="space-y-4">
                {/* Status */}
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <Select
                    value={currentPost.status || "Under Review"}
                    onValueChange={handleStatusChange}
                    disabled={updatingStatus || !token}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUS_OPTIONS.map((status) => (
                        <SelectItem key={status.value} value={status.value}>
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-2 h-2 rounded-full ${status.color}`}
                            />
                            <span>{status.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Tags */}
                <div>
                  <Label className="text-sm font-medium">Tags</Label>
                  <Select
                    value=""
                    onValueChange={(tagId) => {
                      const currentTags = currentPost.tags || [];
                      if (!currentTags.includes(tagId)) {
                        handleTagsChange([...currentTags, tagId]);
                      }
                    }}
                    disabled={updatingTags || loadingTags || !token}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Add a tag..." />
                    </SelectTrigger>
                    <SelectContent>
                      {loadingTags ? (
                        <SelectItem value="loading" disabled>
                          Loading tags...
                        </SelectItem>
                      ) : tags.length === 0 ? (
                        <SelectItem value="no-tags" disabled>
                          No tags available
                        </SelectItem>
                      ) : (
                        tags
                          .filter(
                            (tag) => !(currentPost.tags || []).includes(tag.id!)
                          )
                          .map((tag) => (
                            <SelectItem key={tag.id} value={tag.id!}>
                              <div className="flex items-center gap-2">
                                <div
                                  className="w-3 h-3 rounded-full flex-shrink-0"
                                  style={{ backgroundColor: tag.color }}
                                />
                                <span>{tag.name}</span>
                              </div>
                            </SelectItem>
                          ))
                      )}
                    </SelectContent>
                  </Select>

                {/* Display current tags */}
                {(currentPost.tags || []).length > 0 && (
                  <div className="mt-2 space-y-1">
                    {getTagNames(currentPost.tags || []).map(
                      (tagName, index) => {
                        const tagId = currentPost.tags![index];
                        const tag = tags.find((t) => t.id === tagId);
                        return (
                          <div
                            key={tagId}
                            className="flex items-center justify-between p-2 bg-muted rounded-md"
                          >
                            <div className="flex items-center gap-2">
                              <div
                                className="w-3 h-3 rounded-full flex-shrink-0"
                                style={{
                                  backgroundColor: tag?.color || "#6B7280",
                                }}
                              />
                              <span className="text-sm">{tagName}</span>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                const updatedTags = (
                                  currentPost.tags || []
                                ).filter((id) => id !== tagId);
                                handleTagsChange(updatedTags);
                              }}
                              className="h-6 w-6 p-0"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        );
                      }
                    )}
                  </div>
                )}
              </div>

              {/* Upvotes */}
              <div>
                <Label className="text-sm font-medium">Upvotes</Label>
                <div className="mt-1 p-2 bg-muted rounded-md">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold">
                      {currentPost.upvotesCount}
                    </span>
                    <ArrowUp className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </div>

              {/* Comments Count */}
              <div>
                <Label className="text-sm font-medium">Comments</Label>
                <div className="mt-1 p-2 bg-muted rounded-md">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold">
                      {currentPost.commentsCount}
                    </span>
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </div>

              {/* Created Date */}
              <div>
                <Label className="text-sm font-medium">Created</Label>
                <div className="mt-1 p-2 bg-muted rounded-md">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      {currentPost.createdAt &&
                      typeof currentPost.createdAt.toDate === "function"
                        ? currentPost.createdAt.toDate().toLocaleDateString()
                        : currentPost.createdAt &&
                          typeof currentPost.createdAt === "object" &&
                          "seconds" in currentPost.createdAt
                        ? new Date(
                            currentPost.createdAt.seconds * 1000
                          ).toLocaleDateString()
                        : currentPost.createdAt
                        ? new Date(currentPost.createdAt).toLocaleDateString()
                        : "Recently"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          )}
        </div>
      </div>
    </div>
  );
}
