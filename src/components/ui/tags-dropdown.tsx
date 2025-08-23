"use client";

import { useState, useEffect } from "react";
import { Tag as TagIcon, ChevronRight } from "lucide-react";
import { TagsService, FeedbackTag } from "@/lib/services/tags";
import {
  SimpleDropdown,
  SimpleDropdownItem,
  SimpleDropdownLabel,
  SimpleDropdownSeparator,
} from "@/components/ui/inline-dropdown";

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

  const trigger = (
    <button className="flex items-center justify-between w-full p-2 rounded-md hover:bg-muted transition-colors text-left">
      <div className="flex items-center gap-3">
        <TagIcon className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm">Tags</span>
      </div>
      <ChevronRight className="h-4 w-4 text-muted-foreground" />
    </button>
  );

  return (
    <SimpleDropdown trigger={trigger}>
      {tagsLoading ? (
        <SimpleDropdownItem disabled>
          <span style={{ fontSize: "14px", color: "var(--muted-foreground)" }}>
            Loading...
          </span>
        </SimpleDropdownItem>
      ) : tags.length === 0 ? (
        <SimpleDropdownItem disabled>
          <span style={{ fontSize: "14px", color: "var(--muted-foreground)" }}>
            No tags found
          </span>
        </SimpleDropdownItem>
      ) : (
        <>
          {tags.map((tag) => (
            <SimpleDropdownItem key={tag.id}>
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: tag.color,
                    flexShrink: 0,
                  }}
                />
                <span style={{ fontSize: "14px" }}>{tag.name}</span>
              </div>
            </SimpleDropdownItem>
          ))}
        </>
      )}
    </SimpleDropdown>
  );
}
