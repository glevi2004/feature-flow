import { Tag as TagIcon } from "lucide-react";
import { FeedbackTag } from "@/lib/services/tags";

interface TagBadgeProps {
  tag: FeedbackTag;
  className?: string;
  showIcon?: boolean;
  size?: "sm" | "md" | "lg";
}

export function TagBadge({
  tag,
  className = "",
  showIcon = true,
  size = "md",
}: TagBadgeProps) {
  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-2.5 py-1 text-sm",
    lg: "px-3 py-1.5 text-base",
  };

  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-full border ${sizeClasses[size]} ${className}`}
      style={{
        backgroundColor: `${tag.color}20`,
        borderColor: tag.color,
        color: tag.color,
      }}
    >
      {showIcon && <TagIcon className={iconSizes[size]} />}
      <span className="font-medium">{tag.name}</span>
    </div>
  );
}
