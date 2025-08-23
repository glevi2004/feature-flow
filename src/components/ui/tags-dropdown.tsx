"use client";

import { useState, useEffect } from "react";
import { Tag as TagIcon, ChevronRight } from "lucide-react";
import { TagsService, FeedbackTag } from "@/lib/services/tags";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

interface TagsDropdownProps {
  companyId: string;
}

export function TagsDropdown({ companyId }: TagsDropdownProps) {
  const [tags, setTags] = useState<FeedbackTag[]>([]);
  const [tagsLoading, setTagsLoading] = useState(false);

  useEffect(() => {
    if (companyId) {
      loadTags();
    }
  }, [companyId]);

  const loadTags = async () => {
    try {
      setTagsLoading(true);
      const allTags = await TagsService.getAllTags(companyId);
      setTags(allTags);
    } catch (error) {
      console.error("Error loading tags:", error);
    } finally {
      setTagsLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center justify-between w-full p-2 rounded-md hover:bg-muted transition-colors text-left">
          <div className="flex items-center gap-3">
            <TagIcon className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Tags</span>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="bottom"
        align="start"
        className="w-64 z-50"
        sideOffset={4}
        avoidCollisions={true}
      >
        <DropdownMenuLabel>Tags</DropdownMenuLabel>
        {tagsLoading ? (
          <DropdownMenuItem disabled>
            <div className="flex items-center justify-center w-full">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900 dark:border-gray-100"></div>
              <span className="ml-2 text-sm">Loading...</span>
            </div>
          </DropdownMenuItem>
        ) : tags.length === 0 ? (
          <DropdownMenuItem disabled>
            <span className="text-sm text-muted-foreground">No tags found</span>
          </DropdownMenuItem>
        ) : (
          <>
            {tags.map((tag) => (
              <DropdownMenuItem
                key={tag.id}
                className="flex items-center gap-2"
              >
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: tag.color }}
                />
                <span className="text-sm flex-1">{tag.name}</span>
                {!tag.companyId && (
                  <span className="text-xs text-muted-foreground flex-shrink-0">
                    Default
                  </span>
                )}
              </DropdownMenuItem>
            ))}
          </>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem>Manage Tags</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
