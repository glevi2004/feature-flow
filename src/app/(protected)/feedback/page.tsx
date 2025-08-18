"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  FeedbackService,
  FeedbackPost,
  FeedbackTag,
} from "@/lib/services/feedback";
import { OnboardingService } from "@/lib/services/onboarding";
import { Plus, Tag, ExternalLink, MessageSquare, Heart } from "lucide-react";

export default function FeedbackPage() {
  const { user } = useAuth();
  const [companyName, setCompanyName] = useState("");
  const [posts, setPosts] = useState<FeedbackPost[]>([]);
  const [tags, setTags] = useState<FeedbackTag[]>([]);
  const [loading, setLoading] = useState(true);
  const [showTagForm, setShowTagForm] = useState(false);

  // Form states
  const [newTagName, setNewTagName] = useState("");
  const [newTagColor, setNewTagColor] = useState("#3B82F6");

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

        // Initialize default tags if none exist
        if (tagsData.length === 0) {
          await FeedbackService.initializeDefaultTags(
            onboardingData.companyName
          );
          const updatedTags = await FeedbackService.getCompanyTags(
            onboardingData.companyName
          );
          setTags(updatedTags);
        }
      }
    } catch (error) {
      console.error("Error loading company data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTag = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTagName.trim()) {
      alert("Please enter a tag name");
      return;
    }

    try {
      const newTag = await FeedbackService.createTag({
        companyName,
        name: newTagName.trim(),
        color: newTagColor,
      });

      setTags([...tags, newTag]);
      setNewTagName("");
      setNewTagColor("#3B82F6");
      setShowTagForm(false);
      alert("Tag created successfully!");
    } catch (error) {
      console.error("Error creating tag:", error);
      alert("Failed to create tag");
    }
  };

  const getPublicUrl = () => {
    if (typeof window !== "undefined") {
      return `${window.location.origin}/${encodeURIComponent(companyName)}`;
    }
    return "";
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
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Feedback Management</h1>
          <p className="text-gray-600">Manage your feedback portal and tags</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowTagForm(true)}
            className="flex items-center gap-2"
          >
            <Tag className="h-4 w-4" />
            Add Tag
          </Button>
          <Button
            onClick={() => window.open(getPublicUrl(), "_blank")}
            className="flex items-center gap-2"
          >
            <ExternalLink className="h-4 w-4" />
            View Public Portal
          </Button>
        </div>
      </div>

      {/* Public URL Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ExternalLink className="h-5 w-5" />
            Public Feedback Portal
          </CardTitle>
          <CardDescription>
            Share this URL with your users to collect feedback
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input value={getPublicUrl()} readOnly />
            <Button
              variant="outline"
              onClick={() => {
                navigator.clipboard.writeText(getPublicUrl());
                alert("URL copied to clipboard!");
              }}
            >
              Copy
            </Button>
            <Button
              variant="outline"
              onClick={() => window.open(getPublicUrl(), "_blank")}
            >
              Open
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Create Tag Form */}
      {showTagForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Tag</CardTitle>
            <CardDescription>
              Add a new tag to categorize feedback posts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateTag} className="space-y-4">
              <div>
                <Label htmlFor="tagName">Tag Name *</Label>
                <Input
                  id="tagName"
                  value={newTagName}
                  onChange={(e) => setNewTagName(e.target.value)}
                  placeholder="Enter tag name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="tagColor">Tag Color</Label>
                <Input
                  id="tagColor"
                  type="color"
                  value={newTagColor}
                  onChange={(e) => setNewTagColor(e.target.value)}
                  className="w-20 h-10"
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit">Create Tag</Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowTagForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Tags Management */}
      <Card>
        <CardHeader>
          <CardTitle>Available Tags</CardTitle>
          <CardDescription>
            Tags that users can select when submitting feedback
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge
                key={tag.id}
                style={{
                  backgroundColor: tag.color,
                  color: "white",
                }}
              >
                {tag.name}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Feedback Posts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Received Feedback ({posts.length})
          </CardTitle>
          <CardDescription>Feedback submitted by your users</CardDescription>
        </CardHeader>
        <CardContent>
          {posts.length === 0 ? (
            <div className="text-center py-8">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                No feedback received yet. Share your public portal URL to start
                collecting feedback!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <div key={post.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{post.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        {post.likesCount}
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        {post.commentsCount}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-3">{post.description}</p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {post.tags.map((tagName) => {
                      const tag = tags.find((t) => t.name === tagName);
                      return (
                        <Badge
                          key={tagName}
                          style={{
                            backgroundColor: tag?.color,
                            color: "white",
                          }}
                        >
                          {tagName}
                        </Badge>
                      );
                    })}
                  </div>
                  <p className="text-sm text-gray-500">
                    Posted{" "}
                    {post.createdAt?.toDate?.()
                      ? post.createdAt.toDate().toLocaleDateString()
                      : "Recently"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
