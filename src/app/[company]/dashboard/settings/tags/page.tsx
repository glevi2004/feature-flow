"use client";

import { useState, useEffect } from "react";
import { FileText, Plus, Edit2, Trash2, Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { TagsService, FeedbackTag } from "@/lib/services/tags";
import { useAuth } from "@/contexts/AuthContext";
import { CompanyService } from "@/lib/services/company";

interface Tag extends FeedbackTag {
  count: number;
}

const colorOptions = [
  "#ef4444", // red
  "#3b82f6", // blue
  "#10b981", // green
  "#eab308", // yellow
  "#8b5cf6", // purple
  "#f97316", // orange
  "#ec4899", // pink
  "#6366f1", // indigo
  "#14b8a6", // teal
  "#06b6d4", // cyan
  "#84cc16", // lime
  "#f59e0b", // amber
];

export default function TagsSettingsPage() {
  const { user } = useAuth();
  const [companyId, setCompanyId] = useState<string>("");
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTag, setEditingTag] = useState<Tag | null>(null);
  const [newTagName, setNewTagName] = useState("");
  const [newTagColor, setNewTagColor] = useState("#3b82f6");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Load company and fetch tags
  useEffect(() => {
    const loadCompanyAndTags = async () => {
      if (!user) return;
      try {
        setLoading(true);
        const companies = await CompanyService.getUserCompanies(user.uid);
        if (companies.length === 0) return;
        const cid = companies[0];
        setCompanyId(cid);
        const allTags = await TagsService.getAllTags(cid);
        const transformedTags: Tag[] = allTags.map((tag) => ({
          ...tag,
          count: 0, // TODO: Implement actual count from feedback items
        }));
        setTags(transformedTags);
      } catch (error) {
        console.error("Error loading tags:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      loadCompanyAndTags();
    }
  }, [user]);

  const handleAddTag = async () => {
    if (!companyId || !newTagName.trim()) return;

    try {
      // Check if tag name already exists
      const nameExists = await TagsService.isTagNameExists(
        companyId,
        newTagName.trim()
      );
      if (nameExists) {
        alert("A tag with this name already exists.");
        return;
      }

      // Create the tag using the service
      const newTagData = await TagsService.createTag({
        companyId,
        name: newTagName.trim(),
        color: newTagColor,
      });

      // Add the new tag to the local state
      const newTag: Tag = {
        ...newTagData,
        count: 0,
      };

      setTags([...tags, newTag]);
      setNewTagName("");
      setNewTagColor("#3b82f6");
      setIsAddDialogOpen(false);
    } catch (error) {
      console.error("Error adding tag:", error);
      alert("Failed to create tag. Please try again.");
    }
  };

  const handleEditTag = async () => {
    if (!editingTag || !newTagName.trim() || !editingTag.id || !companyId)
      return;

    try {
      // Check if tag name already exists (excluding the current tag)
      const nameExists = await TagsService.isTagNameExists(
        companyId,
        newTagName.trim()
      );
      if (nameExists) {
        const existingTag = tags.find(
          (tag) => tag.name.toLowerCase() === newTagName.trim().toLowerCase()
        );
        if (existingTag && existingTag.id !== editingTag.id) {
          alert("A tag with this name already exists.");
          return;
        }
      }

      // Update the tag using the service
      await TagsService.updateTag(editingTag.id, {
        name: newTagName.trim(),
        color: newTagColor,
      });

      // Update the local state
      setTags(
        tags.map((tag) =>
          tag.id === editingTag.id
            ? { ...tag, name: newTagName.trim(), color: newTagColor }
            : tag
        )
      );
      setEditingTag(null);
      setNewTagName("");
      setNewTagColor("#3b82f6");
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error("Error updating tag:", error);
      alert("Failed to update tag. Please try again.");
    }
  };

  const handleDeleteTag = async (tagId: string) => {
    try {
      // Delete the tag using the service
      await TagsService.deleteTag(tagId, companyId);

      // Remove from local state
      setTags(tags.filter((tag) => tag.id !== tagId));
    } catch (error) {
      console.error("Error deleting tag:", error);
      alert("Failed to delete tag. Please try again.");
    }
  };

  const openEditDialog = (tag: Tag) => {
    setEditingTag(tag);
    setNewTagName(tag.name);
    setNewTagColor(tag.color);
    setIsEditDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading tags...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tags Management</h1>
          <p className="text-muted-foreground">Manage your feedback tags</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Tag
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Tag</DialogTitle>
              <DialogDescription>
                Create a new tag to categorize your feedback items.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Tag Name</label>
                <Input
                  value={newTagName}
                  onChange={(e) => setNewTagName(e.target.value)}
                  placeholder="Enter tag name"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Color</label>
                <div className="grid grid-cols-6 gap-2 mt-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color}
                      type="button"
                      className={`w-8 h-8 rounded-full border-2 ${
                        newTagColor === color
                          ? "border-black"
                          : "border-transparent"
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setNewTagColor(color)}
                    />
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleAddTag} disabled={!newTagName.trim()}>
                <Save className="h-4 w-4" />
                Add Tag
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tags List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-muted-foreground" />
            Tags
          </CardTitle>
          <CardDescription>Manage your feedback tags</CardDescription>
        </CardHeader>
        <CardContent>
          {tags.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No tags yet. Create your first tag to get started.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tags.map((tag) => (
                <div
                  key={tag.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: tag.color }}
                    />
                    <div>
                      <div className="font-medium">{tag.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {tag.count} items
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEditDialog(tag)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Tag</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete the tag &ldquo;
                            {tag.name}
                            &rdquo;? This action cannot be undone and will
                            remove the tag from all associated feedback items.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => tag.id && handleDeleteTag(tag.id)}
                            className="bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Tag Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Tag</DialogTitle>
            <DialogDescription>
              Update the name and color of your tag.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Tag Name</label>
              <Input
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                placeholder="Enter tag name"
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Color</label>
              <div className="grid grid-cols-6 gap-2 mt-2">
                {colorOptions.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={`w-8 h-8 rounded-full border-2 ${
                      newTagColor === color
                        ? "border-black"
                        : "border-transparent"
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setNewTagColor(color)}
                  />
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleEditTag} disabled={!newTagName.trim()}>
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
