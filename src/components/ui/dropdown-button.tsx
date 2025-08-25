"use client";

import React, { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";

interface DropdownButtonProps {
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export function DropdownButton({
  label,
  icon: Icon,
  children,
  defaultOpen = false,
  className = "",
}: DropdownButtonProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className={`group/collapsible ${className}`}
    >
      <CollapsibleTrigger asChild>
        <button className="flex items-center justify-between w-full p-2 rounded-md hover:bg-muted transition-colors text-left">
          <div className="flex items-center gap-3">
            {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
            <span className="text-sm">{label}</span>
          </div>
          {isOpen ? (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          )}
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="ml-6 mt-1 space-y-1">{children}</div>
      </CollapsibleContent>
    </Collapsible>
  );
}
