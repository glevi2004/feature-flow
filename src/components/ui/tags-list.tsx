"use client";

import { useState, useEffect, useCallback } from "react";
import { Tag as TagIcon, Loader2 } from "lucide-react";
import { TagsService, FeedbackTag } from "@/lib/services/tags";
import { AddTagDialog } from "./add-tag-dialog";

interface TagsListProps {
  companyId: string;
  onClose?: () => void;
}

export function TagsList({ companyId, onClose }: TagsListProps) {
  const [tags, setTags] = useState<FeedbackTag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadTags = useCallback(async () => {
    try {
      setLoading(true);
      const allTags = await TagsService.getAllTags(companyId);
      setTags(allTags);
    } catch (error) {
      console.error("Error loading tags:", error);
      setError("Failed to load tags");
    } finally {
      setLoading(false);
    }
  }, [companyId]);

  useEffect(() => {
    if (companyId) {
      loadTags();
    }
  }, [companyId, loadTags]);

  const handleTagAdded = () => {
    loadTags();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span className="ml-2 text-sm text-muted-foreground">
          Loading tags...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="text-sm text-red-600 dark:text-red-400">{error}</div>
        <button
          onClick={loadTags}
          className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Tags</h3>
        <button
          onClick={onClose}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ×
        </button>
      </div>

      <div className="space-y-2 mb-4">
        {tags.length === 0 ? (
          <div className="text-sm text-muted-foreground text-center py-4">
            No tags found. Create your first tag below.
          </div>
        ) : (
          tags.map((tag) => (
            <div
              key={tag.id}
              className="flex items-center gap-3 p-2 rounded-md hover:bg-muted transition-colors"
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: tag.color }}
              />
              <TagIcon className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm flex-1">{tag.name}</span>
              {!tag.companyId && (
                <span className="text-xs text-muted-foreground">Default</span>
              )}
            </div>
          ))
        )}
      </div>

      <AddTagDialog companyId={companyId} onTagAdded={handleTagAdded} />
    </div>
  );
}
