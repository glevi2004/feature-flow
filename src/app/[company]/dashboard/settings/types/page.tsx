"use client";

import { useState, useEffect } from "react";
import { FileText, Plus, Edit2, Trash2, Loader2, Save } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { CompanyService } from "@/lib/services/company";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Timestamp } from "firebase/firestore";

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
import { FeedbackService, FeedbackType } from "@/lib/services/feedback";

interface Type extends FeedbackType {
  count: number;
}

const emojiOptions = [
  "💡",
  "🚀",
  "🐛",
  "⭐",
  "📝",
  "🔧",
  "📱",
  "🌟",
  "💭",
  "🎯",
  "🔥",
  "⚡",
  "📊",
  "🎨",
  "🔒",
  "📈",
  "🚨",
  "💎",
  "🎉",
  "🤝",
  "🔍",
  "📋",
  "⚙️",
  "🏆",
];

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

export default function TypesSettingsPage() {
  const { user } = useAuth();
  const [companyId, setCompanyId] = useState<string>("");
  const [types, setTypes] = useState<Type[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingType, setEditingType] = useState<Type | null>(null);
  const [newTypeName, setNewTypeName] = useState("");
  const [newTypeEmoji, setNewTypeEmoji] = useState("💡");
  const [newTypeColor, setNewTypeColor] = useState("#3b82f6");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Load company data and then fetch types
  useEffect(() => {
    const loadCompanyData = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const userCompanies = await CompanyService.getUserCompanies(user.uid);
        if (userCompanies.length > 0) {
          const companyId = userCompanies[0];
          setCompanyId(companyId);

          // Fetch types for this company
          const allTypes = await FeedbackService.getCompanyTypes(companyId);

          // Transform the types to include count properties
          const transformedTypes: Type[] = allTypes.map((type) => ({
            ...type,
            count: 0, // TODO: Implement actual count from feedback items
          }));

          setTypes(transformedTypes);
        }
      } catch (error) {
        console.error("Error loading company data and types:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      loadCompanyData();
    }
  }, [user]);

  const handleAddType = async () => {
    if (!companyId || !newTypeName.trim()) return;

    try {
      // Check if type name already exists
      const nameExists = await FeedbackService.isTypeNameExists(
        companyId,
        newTypeName.trim()
      );
      if (nameExists) {
        alert("A type with this name already exists.");
        return;
      }

      // Create the type using the service
      const newTypeData = await FeedbackService.createType({
        companyId,
        name: newTypeName.trim(),
        emoji: newTypeEmoji,
        color: newTypeColor,
      });

      // Add the new type to the local state with count
      const newType: Type = {
        ...newTypeData,
        count: 0,
        createdAt: Timestamp.now(), // Add createdAt since it's not returned by createType
      };

      setTypes([...types, newType]);
      setNewTypeName("");
      setNewTypeEmoji("💡");
      setNewTypeColor("#3b82f6");
      setIsAddDialogOpen(false);
    } catch (error) {
      console.error("Error adding type:", error);
      alert("Failed to create type. Please try again.");
    }
  };

  const handleEditType = async () => {
    if (!editingType || !newTypeName.trim() || !editingType.id || !companyId)
      return;

    try {
      // Check if type name already exists (excluding the current type)
      const nameExists = await FeedbackService.isTypeNameExists(
        companyId,
        newTypeName.trim()
      );
      if (nameExists) {
        const existingType = types.find(
          (type) => type.name.toLowerCase() === newTypeName.trim().toLowerCase()
        );
        if (existingType && existingType.id !== editingType.id) {
          alert("A type with this name already exists.");
          return;
        }
      }

      // Update the type using the service
      await FeedbackService.updateType(editingType.id, {
        name: newTypeName.trim(),
        emoji: newTypeEmoji,
        color: newTypeColor,
      });

      // Update the local state
      setTypes(
        types.map((type) =>
          type.id === editingType.id
            ? {
                ...type,
                name: newTypeName.trim(),
                emoji: newTypeEmoji,
                color: newTypeColor,
              }
            : type
        )
      );
      setEditingType(null);
      setNewTypeName("");
      setNewTypeEmoji("💡");
      setNewTypeColor("#3b82f6");
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error("Error updating type:", error);
      alert("Failed to update type. Please try again.");
    }
  };

  const handleDeleteType = async (typeId: string) => {
    try {
      // Delete the type using the service
      await FeedbackService.deleteType(typeId, companyId);

      // Remove from local state
      setTypes(types.filter((type) => type.id !== typeId));
    } catch (error) {
      console.error("Error deleting type:", error);
      alert("Failed to delete type. Please try again.");
    }
  };

  const openEditDialog = (type: Type) => {
    setEditingType(type);
    setNewTypeName(type.name);
    setNewTypeEmoji(type.emoji);
    setNewTypeColor(type.color || "#3b82f6");
    setIsEditDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading types...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Types Management</h1>
          <p className="text-muted-foreground">
            Organize your feedback with custom types and categories
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Type
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Type</DialogTitle>
              <DialogDescription>
                Create a new type to categorize your feedback items.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Type Name</label>
                <Input
                  value={newTypeName}
                  onChange={(e) => setNewTypeName(e.target.value)}
                  placeholder="Enter type name"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Emoji</label>
                <div className="grid grid-cols-8 gap-2 mt-2">
                  {emojiOptions.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      className={`w-8 h-8 rounded border-2 flex items-center justify-center text-lg hover:bg-muted ${
                        newTypeEmoji === emoji
                          ? "border-blue-500 bg-blue-50"
                          : "border-transparent"
                      }`}
                      onClick={() => setNewTypeEmoji(emoji)}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Color</label>
                <div className="grid grid-cols-6 gap-2 mt-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color}
                      type="button"
                      className={`w-8 h-8 rounded-full border-2 ${
                        newTypeColor === color
                          ? "border-black"
                          : "border-transparent"
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setNewTypeColor(color)}
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
              <Button onClick={handleAddType} disabled={!newTypeName.trim()}>
                <Save className="h-4 w-4" />
                Save Type
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Types List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-muted-foreground" />
            Custom Types
          </CardTitle>
          <CardDescription>
            Your custom types that you can edit or delete as needed.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {types.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No types yet. Create your first type to get started.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {types.map((type) => (
                <div
                  key={type.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{type.emoji}</span>
                      {type.color && (
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: type.color }}
                        />
                      )}
                    </div>
                    <div>
                      <div className="font-medium">{type.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {type.count} items
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEditDialog(type)}
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
                          <AlertDialogTitle>Delete Type</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete the type &ldquo;
                            {type.name}
                            &rdquo;? This action cannot be undone and will
                            remove the type from all associated feedback items.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => type.id && handleDeleteType(type.id)}
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

      {/* Edit Type Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Type</DialogTitle>
            <DialogDescription>
              Update the name, emoji, and color of your type.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Type Name</label>
              <Input
                value={newTypeName}
                onChange={(e) => setNewTypeName(e.target.value)}
                placeholder="Enter type name"
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Emoji</label>
              <div className="grid grid-cols-8 gap-2 mt-2">
                {emojiOptions.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    className={`w-8 h-8 rounded border-2 flex items-center justify-center text-lg hover:bg-muted ${
                      newTypeEmoji === emoji
                        ? "border-blue-500 bg-blue-50"
                        : "border-transparent"
                    }`}
                    onClick={() => setNewTypeEmoji(emoji)}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Color</label>
              <div className="grid grid-cols-6 gap-2 mt-2">
                {colorOptions.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={`w-8 h-8 rounded-full border-2 ${
                      newTypeColor === color
                        ? "border-black"
                        : "border-transparent"
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setNewTypeColor(color)}
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
            <Button onClick={handleEditType} disabled={!newTypeName.trim()}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
