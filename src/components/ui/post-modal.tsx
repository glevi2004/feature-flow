"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  X,
  MessageSquare,
  ArrowUp,
  User,
  Calendar,
  Lightbulb,
  Send,
  Activity,
  CheckCircle,
  Play,
  CheckSquare,
  Inbox,
} from "lucide-react";
import {
  FeedbackPost,
  FeedbackComment,
  FeedbackType,
  FeedbackStatus,
} from "@/lib/services/feedback";
import { FeedbackService } from "@/lib/services/feedback";

interface PostModalProps {
  post: FeedbackPost | null;
  types: FeedbackType[];
  isOpen: boolean;
  onClose: () => void;
  onPostUpdate: (updatedPost: FeedbackPost) => void;
}

// Status options
const STATUS_OPTIONS = [
  {
    value: "Under Review",
    label: "Under Review",
    color: "bg-blue-900/20 text-blue-400 border border-blue-800/30",
    dotColor: "bg-blue-400",
    icon: Inbox,
  },
  {
    value: "Accepted",
    label: "Accepted",
    color: "bg-green-900/20 text-green-400 border border-green-800/30",
    dotColor: "bg-green-400",
    icon: CheckCircle,
  },
  {
    value: "Rejected",
    label: "Rejected",
    color: "bg-red-900/20 text-red-400 border border-red-800/30",
    dotColor: "bg-red-400",
    icon: X,
  },
  {
    value: "Planned",
    label: "Planned",
    color: "bg-purple-900/20 text-purple-400 border border-purple-800/30",
    dotColor: "bg-purple-400",
    icon: Play,
  },
  {
    value: "Completed",
    label: "Completed",
    color: "bg-emerald-900/20 text-emerald-400 border border-emerald-800/30",
    dotColor: "bg-emerald-400",
    icon: CheckSquare,
  },
];

export function PostModal({
  post,
  types,
  isOpen,
  onClose,
  onPostUpdate,
}: PostModalProps) {
  const [comments, setComments] = useState<FeedbackComment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [userName, setUserName] = useState("");
  const [loadingComments, setLoadingComments] = useState(false);
  const [submittingComment, setSubmittingComment] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  useEffect(() => {
    if (post && isOpen) {
      loadComments();
    }
  }, [post, isOpen]);

  const loadComments = async () => {
    if (!post) return;

    try {
      setLoadingComments(true);
      const commentsData = await FeedbackService.getPostComments(post.id!);
      setComments(commentsData);
    } catch (error) {
      console.error("Error loading comments:", error);
    } finally {
      setLoadingComments(false);
    }
  };

  const handleAddComment = async () => {
    if (!post || !newComment.trim() || !userName.trim()) {
      alert("Please enter your name and comment");
      return;
    }

    try {
      setSubmittingComment(true);
      const newCommentData = await FeedbackService.addComment({
        postId: post.id!,
        userId: `anonymous-${Date.now()}`,
        userName: userName.trim(),
        content: newComment.trim(),
      });

      setComments([...comments, newCommentData]);
      setNewComment("");

      // Update post comment count
      const updatedPost = {
        ...post,
        commentsCount: post.commentsCount + 1,
      };
      onPostUpdate(updatedPost);
    } catch (error) {
      console.error("Error adding comment:", error);
      alert("Failed to add comment");
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleStatusChange = async (newStatus: FeedbackStatus) => {
    if (!post) return;

    try {
      setUpdatingStatus(true);
      await FeedbackService.updatePostStatus(post.id!, newStatus);

      const updatedPost = {
        ...post,
        status: newStatus,
      };
      onPostUpdate(updatedPost);
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status");
    } finally {
      setUpdatingStatus(false);
    }
  };

  const getTypeColor = (typeName: string) => {
    const type = types.find((t) => t.name === typeName);
    return type?.color || "#6B7280";
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

  if (!post) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <DialogTitle className="text-xl font-bold">{post.title}</DialogTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="flex gap-6 h-full overflow-hidden">
          {/* Left Column - Post Content and Comments */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Post Description */}
            <div className="mb-6">
              <p className="text-muted-foreground leading-relaxed">
                {post.description}
              </p>
            </div>

            {/* Post Types */}
            {post.types.length > 0 && (
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {post.types.map((type) => (
                    <Badge
                      key={type}
                      className="px-3 py-1 rounded-full text-sm font-medium"
                      style={{ backgroundColor: getTypeColor(type) }}
                    >
                      <Lightbulb className="h-3 w-3 mr-1" />
                      {type}
                    </Badge>
                  ))}
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
                  {post.createdAt && typeof post.createdAt.toDate === "function"
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
              <div className="flex items-center gap-1">
                <ArrowUp className="h-4 w-4" />
                <span>{post.upvotesCount} upvotes</span>
              </div>
            </div>

            {/* Comment Input */}
            <div className="mb-6">
              <div className="space-y-3">
                <Input
                  placeholder="Your name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="max-w-xs"
                />
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
              </div>
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

          {/* Right Column - Manage Post */}
          <div className="w-80 flex-shrink-0 border-l pl-6">
            <h3 className="font-semibold mb-4">Manage Post</h3>

            <div className="space-y-4">
              {/* Status */}
              <div>
                <Label className="text-sm font-medium">Status</Label>
                <Select
                  value={post.status || "Under Review"}
                  onValueChange={handleStatusChange}
                  disabled={updatingStatus}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUS_OPTIONS.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-2 h-2 rounded-full ${status.dotColor}`}
                          />
                          <span>{status.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Upvotes */}
              <div>
                <Label className="text-sm font-medium">Upvotes</Label>
                <div className="mt-1 p-2 bg-muted rounded-md">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold">
                      {post.upvotesCount}
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
                      {post.commentsCount}
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
                      {post.createdAt &&
                      typeof post.createdAt.toDate === "function"
                        ? post.createdAt.toDate().toLocaleDateString()
                        : post.createdAt &&
                          typeof post.createdAt === "object" &&
                          "seconds" in post.createdAt
                        ? new Date(
                            post.createdAt.seconds * 1000
                          ).toLocaleDateString()
                        : post.createdAt
                        ? new Date(post.createdAt).toLocaleDateString()
                        : "Recently"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
