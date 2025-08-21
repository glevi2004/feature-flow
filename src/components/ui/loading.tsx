import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface LoadingProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  text?: string;
}

export function Loading({
  size = "md",
  className,
  text = "Loading...",
}: LoadingProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  const textSizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3",
        className
      )}
    >
      <Loader2 className={cn("animate-spin text-primary", sizeClasses[size])} />
      {text && (
        <p className={cn("text-muted-foreground font-medium", textSizes[size])}>
          {text}
        </p>
      )}
    </div>
  );
}
