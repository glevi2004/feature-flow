"use client";

import React, { useState, useEffect } from "react";
import { Tag as TagIcon, ChevronRight } from "lucide-react";
import { TagsService, FeedbackTag } from "@/lib/services/tags";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";

interface TagsDropdownProps {
  companyId: string;
}

export function TagsDropdown({ companyId }: TagsDropdownProps) {
  const [tags, setTags] = useState<FeedbackTag[]>([]);
  const [tagsLoading, setTagsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="group/collapsible"
    >
      <CollapsibleTrigger asChild>
        <button className="flex items-center justify-between w-full p-2 rounded-md hover:bg-muted transition-colors text-left">
          <div className="flex items-center gap-3">
            <TagIcon className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Tags</span>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-data-[state=open]:rotate-90" />
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="ml-6 mt-1 space-y-1">
          {tagsLoading ? (
            <div className="flex items-center justify-center w-full p-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900 dark:border-gray-100"></div>
              <span className="ml-2 text-sm">Loading...</span>
            </div>
          ) : tags.length === 0 ? (
            <div className="p-2">
              <span className="text-sm text-muted-foreground">
                No tags found
              </span>
            </div>
          ) : (
            <>
              {tags.map((tag) => (
                <button
                  key={tag.id}
                  className="flex items-center gap-2 w-full p-2 rounded-md hover:bg-muted transition-colors text-left"
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
                </button>
              ))}
              <button className="flex items-center w-full p-2 rounded-md hover:bg-muted transition-colors text-left">
                <span className="text-sm">Manage Tags</span>
              </button>
            </>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
