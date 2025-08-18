"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  FeedbackComment,
  FeedbackTag,
} from "@/lib/services/feedback";
import {
  Heart,
  MessageSquare,
  Send,
  User,
  Plus,
  Lightbulb,
  X,
  Search,
  Filter,
  TrendingUp,
  ArrowUp,
  Clock,
  Star,
  Activity,
  Bookmark,
  Calendar,
  Zap,
  Link as LinkIcon,
  HelpCircle,
  BarChart3,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function PublicFeedbackPage() {
  const params = useParams();
  const companyName = decodeURIComponent(params.company as string);

  const [posts, setPosts] = useState<FeedbackPost[]>([]);
  const [tags, setTags] = useState<FeedbackTag[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [comments, setComments] = useState<FeedbackComment[]>([]);
  const [showComments, setShowComments] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [commentContent, setCommentContent] = useState("");
  const [userName, setUserName] = useState("");

  // Filter/Sort states
  const [sortBy, setSortBy] = useState("trending"); // 'trending', 'top', 'new'
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadCompanyData();
  }, [companyName, sortBy, searchQuery]);

  const loadCompanyData = async () => {
    try {
      setLoading(true);
      let [postsData, tagsData] = await Promise.all([
        FeedbackService.getCompanyPosts(companyName),
        FeedbackService.getCompanyTags(companyName),
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
        postsData.sort((a, b) => b.createdAt.toDate() - a.createdAt.toDate());
      } else if (sortBy === "top") {
        postsData.sort((a, b) => b.likesCount - a.likesCount);
      } else if (sortBy === "trending") {
        // Simple trending algorithm: likes + recency
        postsData.sort((a, b) => {
          const scoreA =
            a.likesCount +
            (new Date().getTime() - a.createdAt.toDate().getTime()) /
              (1000 * 60 * 60 * 24 * 7);
          const scoreB =
            b.likesCount +
            (new Date().getTime() - b.createdAt.toDate().getTime()) /
              (1000 * 60 * 60 * 24 * 7);
          return scoreB - scoreA;
        });
      }

      setPosts(postsData);
      setTags(tagsData);
    } catch (error) {
      console.error("Error loading company data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !userName.trim()) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const newPost = await FeedbackService.createPost({
        companyName,
        userId: `anonymous-${Date.now()}`,
        title: title.trim(),
        description: description.trim(),
        tags: selectedTags,
      });

      setPosts([newPost, ...posts]);
      setTitle("");
      setDescription("");
      setSelectedTags([]);
      setShowCreateModal(false);
      alert("Post created successfully!");
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post");
    }
  };

  const handleToggleLike = async (postId: string) => {
    try {
      const userId = `anonymous-${Date.now()}`;
      await FeedbackService.toggleLike(postId, userId);

      setPosts(
        posts.map((post) => {
          if (post.id === postId) {
            const isLiked = post.likes.includes(userId);
            return {
              ...post,
              likes: isLiked
                ? post.likes.filter((id) => id !== userId)
                : [...post.likes, userId],
              likesCount: isLiked ? post.likesCount - 1 : post.likesCount + 1,
            };
          }
          return post;
        })
      );
    } catch (error) {
      console.error("Error toggling like:", error);
      alert("Failed to update like");
    }
  };

  const handleAddComment = async (postId: string) => {
    if (!commentContent.trim() || !userName.trim()) {
      alert("Please enter your name and comment");
      return;
    }

    try {
      const newComment = await FeedbackService.addComment({
        postId,
        userId: `anonymous-${Date.now()}`,
        userName: userName.trim(),
        content: commentContent.trim(),
      });

      setComments([...comments, newComment]);
      setCommentContent("");

      setPosts(
        posts.map((post) => {
          if (post.id === postId) {
            return { ...post, commentsCount: post.commentsCount + 1 };
          }
          return post;
        })
      );

      alert("Comment added successfully!");
    } catch (error) {
      console.error("Error adding comment:", error);
      alert("Failed to add comment");
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
    <div className="min-h-screen bg-background flex">
      {/* Main Content Area */}
      <div className="flex-1 max-w-4xl mx-auto p-6">
        {/* Header/Navigation */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex space-x-2">
            <Button
              variant={sortBy === "trending" ? "secondary" : "ghost"}
              onClick={() => setSortBy("trending")}
              className="flex items-center gap-2"
            >
              <Zap className="h-4 w-4" />
              Trending
            </Button>
            <Button
              variant={sortBy === "top" ? "secondary" : "ghost"}
              onClick={() => setSortBy("top")}
              className="flex items-center gap-2"
            >
              <ArrowUp className="h-4 w-4" />
              Top
            </Button>
            <Button
              variant={sortBy === "new" ? "secondary" : "ghost"}
              onClick={() => setSortBy("new")}
              className="flex items-center gap-2"
            >
              <Clock className="h-4 w-4" />
              New
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search"
                className="pl-8 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="ghost" size="sm">
              <Filter className="h-4 w-4" />
            </Button>
            <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Create A New Post
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create a New Post</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreatePost} className="space-y-4">
                  {/* Tags Selection */}
                  <div>
                    <Label htmlFor="tags">Tags</Label>
                    <div className="flex flex-wrap gap-2 p-2 border rounded-md min-h-[40px]">
                      {tags.map((tag) => (
                        <Badge
                          key={tag.id}
                          className={`cursor-pointer ${
                            selectedTags.includes(tag.name)
                              ? "bg-blue-600 text-white"
                              : "bg-muted hover:bg-muted/80"
                          }`}
                          style={{
                            backgroundColor: selectedTags.includes(tag.name)
                              ? tag.color
                              : undefined,
                          }}
                          onClick={() => {
                            setSelectedTags((prev) =>
                              prev.includes(tag.name)
                                ? prev.filter((t) => t !== tag.name)
                                : [...prev, tag.name]
                            );
                          }}
                        >
                          {tag.name}
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
        <div className="space-y-4">
          {posts.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  No Submissions Yet
                </h3>
                <p className="text-muted-foreground mb-6">
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
            posts.map((post, index) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  {/* Post Header with PINNED label for first post */}
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
                    {index === 0 && (
                      <div className="flex items-center gap-1 text-yellow-600">
                        <Star className="h-4 w-4" />
                        <span className="text-xs font-medium">PINNED</span>
                      </div>
                    )}
                  </div>

                  {/* Post Footer */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-4 text-muted-foreground text-sm">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span>Anonymous User from {companyName}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {post.createdAt
                            ? formatRelativeTime(post.createdAt.toDate())
                            : "Recently"}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => handleToggleLike(post.id!)}
                      >
                        <ArrowUp className="h-4 w-4" />
                        <span className="text-sm">{post.likesCount}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => loadComments(post.id!)}
                      >
                        <MessageSquare className="h-4 w-4" />
                        <span className="text-sm">{post.commentsCount}</span>
                      </Button>
                    </div>
                  </div>

                  {/* "How important is this to you?" section for second post */}
                  {index === 1 && (
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-sm font-semibold mb-2">
                        How important is this to you?
                      </p>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <span
                            role="img"
                            aria-label="winking face"
                            className="mr-1"
                          >
                            😉
                          </span>
                          Nice to have
                        </Button>
                        <Button variant="outline" size="sm">
                          <span
                            role="img"
                            aria-label="smiling face"
                            className="mr-1"
                          >
                            😊
                          </span>
                          Important
                        </Button>
                        <Button variant="outline" size="sm">
                          <span
                            role="img"
                            aria-label="red face"
                            className="mr-1"
                          >
                            😡
                          </span>
                          Essential
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Comments Section */}
                  {showComments === post.id && (
                    <div className="mt-4 pt-4 border-t">
                      <h4 className="font-semibold mb-3">Comments</h4>

                      {/* Add Comment */}
                      <div className="space-y-2 mb-4">
                        <Input
                          placeholder="Your name"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          className="max-w-xs"
                        />
                        <div className="flex gap-2">
                          <Textarea
                            placeholder="Add a comment..."
                            value={commentContent}
                            onChange={(e) => setCommentContent(e.target.value)}
                            rows={2}
                            className="flex-1"
                          />
                          <Button
                            onClick={() => handleAddComment(post.id!)}
                            className="flex items-center gap-1"
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
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
                              <div className="flex items-center gap-2 mb-1">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium text-sm">
                                  {comment.userName}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {comment.createdAt?.toDate?.()
                                    ? comment.createdAt
                                        .toDate()
                                        .toLocaleDateString()
                                    : "Recently"}
                                </span>
                              </div>
                              <p className="text-sm">{comment.content}</p>
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

      {/* Right Sidebar */}
      <div className="w-72 flex-shrink-0 p-6 border-l">
        <div className="mb-8">
          <div className="flex items-center text-muted-foreground text-sm mb-2">
            <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
            Dashboard is not loading
          </div>
          <a
            href="#"
            className="text-blue-600 hover:text-blue-700 text-sm flex items-center"
          >
            View all your activity <Activity className="h-3 w-3 ml-1" />
          </a>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Boards</h3>
          <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-start">
              <MessageSquare className="h-4 w-4 mr-2" />
              View all posts
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Lightbulb className="h-4 w-4 mr-2 text-yellow-500" />
              Feature Request
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Zap className="h-4 w-4 mr-2 text-green-500" />
              Bugs
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Bookmark className="h-4 w-4 mr-2 text-blue-500" />
              Feedback
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <LinkIcon className="h-4 w-4 mr-2 text-gray-500" />
              Integrations
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <HelpCircle className="h-4 w-4 mr-2 text-orange-500" />
              Question
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
