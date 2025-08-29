"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  House,
  Kanban,
  Globe,
  Bell,
  BarChart3,
  Settings,
  User,
  LogOut,
  X,
  ExternalLink,
  Radio,
  Circle,
  CheckCircle,
  XCircle,
  Tag,
  Sparkles,
  ChevronRight,
  FileText,
  Activity,
} from "lucide-react";
import { TagsService, FeedbackTag } from "@/lib/services/tags";
import { FeedbackService, FeedbackType } from "@/lib/services/feedback";
import { useAuth } from "@/contexts/AuthContext";
import { CompanyService } from "@/lib/services/company";
import { DropdownButton } from "@/components/ui/dropdown-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SideNavProps {
  onClose?: () => void;
}

// TypeScript interfaces for the different item types
interface BaseItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface StatusItem extends BaseItem {
  color: string;
}

interface QuickFilterItem extends BaseItem {
  hasArrow: boolean;
}

interface RegularItem extends BaseItem {
  // No additional properties
}

type QuickLinkItem = StatusItem | QuickFilterItem | RegularItem;

interface QuickLinkSection {
  title: string;
  items: QuickLinkItem[];
}

interface QuickLinks {
  title: string;
  sections: QuickLinkSection[];
}

export function SideNav({ onClose }: SideNavProps) {
  const { user, signOut } = useAuth();
  const pathname = usePathname();
  const [companyName, setCompanyName] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [tags, setTags] = useState<FeedbackTag[]>([]);
  const [tagsLoading, setTagsLoading] = useState(false);
  const [types, setTypes] = useState<FeedbackType[]>([]);
  const [typesLoading, setTypesLoading] = useState(false);

  useEffect(() => {
    if (user) {
      loadCompanyData();
    }
  }, [user]);

  const loadCompanyData = async () => {
    try {
      const userCompanies = await CompanyService.getUserCompanies(user!.uid);
      if (userCompanies.length > 0) {
        const companyId = userCompanies[0];
        const companyData = await CompanyService.getCompany(companyId);
        if (companyData) {
          setCompanyName(companyData.name);
          setCompanyId(companyId);
          // Load tags and types after company data is loaded
          loadTags(companyId);
          loadTypes(companyId);
        }
      }
    } catch (error) {
      console.error("Error loading company data:", error);
    }
  };

  const loadTags = async (companyId: string) => {
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

  const loadTypes = async (companyId: string) => {
    try {
      setTypesLoading(true);
      const allTypes = await FeedbackService.getCompanyTypes(companyId);
      setTypes(allTypes);
    } catch (error) {
      console.error("Error loading types:", error);
    } finally {
      setTypesLoading(false);
    }
  };

  const isActive = (path: string) => {
    return pathname.includes(path);
  };

  // Page-specific configurations
  const pageConfigs = {
    dashboard: {
      title: "Dashboard",
      sections: [
        {
          title: "Statuses",
          items: [
            { label: "Under Review", icon: Radio, color: "text-gray-400" },
            { label: "Planned", icon: Circle, color: "text-purple-400" },
            { label: "Active", icon: Activity, color: "text-blue-400" },
            { label: "Done", icon: CheckCircle, color: "text-green-400" },
            { label: "Closed", icon: XCircle, color: "text-red-400" },
          ],
        },
        {
          title: "Quick Filters",
          items: [
            { label: "Tags", icon: Tag, hasArrow: true },
            { label: "Types", icon: FileText, hasArrow: true },
          ],
        },
      ],
    },
    board: {
      title: "Board",
      sections: [
        {
          title: "Statuses",
          items: [
            { label: "Under Review", icon: Radio, color: "text-gray-400" },
            { label: "Planned", icon: Circle, color: "text-purple-400" },
            { label: "Active", icon: Activity, color: "text-blue-400" },
            { label: "Done", icon: CheckCircle, color: "text-green-400" },
            { label: "Closed", icon: XCircle, color: "text-red-400" },
          ],
        },
        {
          title: "Quick Filters",
          items: [
            { label: "My Tasks", icon: User, hasArrow: true },
            { label: "Priority", icon: Activity, hasArrow: true },
          ],
        },
      ],
    },
    analytics: {
      title: "Analytics",
      sections: [
        {
          title: "Metrics",
          items: [
            { label: "Overview", icon: BarChart3 },
            { label: "Trends", icon: Activity },
            { label: "Reports", icon: FileText },
          ],
        },
      ],
    },
    notifications: {
      title: "Notifications",
      sections: [
        {
          title: "Filters",
          items: [
            { label: "All", icon: Bell },
            { label: "Unread", icon: Circle },
            { label: "Important", icon: Activity },
          ],
        },
        {
          title: "Settings",
          items: [
            { label: "Preferences", icon: Settings },
            { label: "Email Alerts", icon: Bell },
          ],
        },
      ],
    },
    settings: {
      title: "Settings",
      sections: [
        {
          title: "General",
          items: [
            { label: "Profile", icon: User },
            { label: "Company", icon: Settings },
            { label: "Team", icon: User },
          ],
        },
        {
          title: "Dashboard & Boards",
          items: [
            { label: "Statuses", icon: Radio },
            { label: "Types", icon: FileText },
            { label: "Tags", icon: Tag },
          ],
        },
        {
          title: "Integrations",
          items: [
            { label: "Slack", icon: Settings },
            { label: "Email", icon: Settings },
            { label: "API Keys", icon: Settings },
          ],
        },
      ],
    },
  };

  const getQuickLinks = (): QuickLinks => {
    if (isActive("/board")) {
      return pageConfigs.board;
    } else if (isActive("/analytics")) {
      return pageConfigs.analytics;
    } else if (isActive("/notifications")) {
      return pageConfigs.notifications;
    } else if (isActive("/settings")) {
      return pageConfigs.settings;
    } else if (
      isActive("/dashboard") &&
      !isActive("/board") &&
      !isActive("/analytics") &&
      !isActive("/notifications") &&
      !isActive("/settings")
    ) {
      return pageConfigs.dashboard;
    }

    // Default fallback
    return pageConfigs.dashboard;
  };

  const quickLinks = getQuickLinks();

  return (
    <div className="flex h-full bg-background">
      {/* Fixed Left Navigation */}
      <div className="w-16 bg-muted/50 border-r border-border flex flex-col items-center py-4 space-y-6">
        {/* Close button */}
        {onClose && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}

        {/* Main Navigation Icons */}
        <TooltipProvider>
          <div className="flex flex-col items-center space-y-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={`/${encodeURIComponent(companyName || "")}/dashboard`}
                  className={`p-2 rounded-lg transition-colors ${
                    isActive("/dashboard") &&
                    !isActive("/board") &&
                    !isActive("/analytics") &&
                    !isActive("/notifications") &&
                    !isActive("/settings")
                      ? "bg-blue-100 dark:bg-blue-900/20"
                      : "hover:bg-muted"
                  }`}
                >
                  <House
                    className={`h-5 w-5 ${
                      isActive("/dashboard") &&
                      !isActive("/board") &&
                      !isActive("/analytics") &&
                      !isActive("/notifications") &&
                      !isActive("/settings")
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  />
                </Link>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className="bg-gray-800 text-gray-200 border-gray-700"
              >
                Home
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={`/${encodeURIComponent(
                    companyName || ""
                  )}/dashboard/board`}
                  className={`p-2 rounded-lg transition-colors ${
                    isActive("/board")
                      ? "bg-blue-100 dark:bg-blue-900/20"
                      : "hover:bg-muted"
                  }`}
                >
                  <Kanban
                    className={`h-5 w-5 ${
                      isActive("/board")
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  />
                </Link>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className="bg-gray-800 text-gray-200 border-gray-700"
              >
                Board
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={`/${encodeURIComponent(companyName || "")}`}
                  target="_blank"
                  className="p-2 rounded-lg transition-colors hover:bg-muted"
                >
                  <Globe className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </Link>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className="bg-gray-800 text-gray-200 border-gray-700"
              >
                Public Page
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={`/${encodeURIComponent(
                    companyName || ""
                  )}/dashboard/notifications`}
                  className={`p-2 rounded-lg transition-colors ${
                    isActive("/notifications")
                      ? "bg-blue-100 dark:bg-blue-900/20"
                      : "hover:bg-muted"
                  }`}
                >
                  <Bell
                    className={`h-5 w-5 ${
                      isActive("/notifications")
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  />
                </Link>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className="bg-gray-800 text-gray-200 border-gray-700"
              >
                Notifications
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={`/${encodeURIComponent(
                    companyName || ""
                  )}/dashboard/analytics`}
                  className={`p-2 rounded-lg transition-colors ${
                    isActive("/analytics")
                      ? "bg-blue-100 dark:bg-blue-900/20"
                      : "hover:bg-muted"
                  }`}
                >
                  <BarChart3
                    className={`h-5 w-5 ${
                      isActive("/analytics")
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  />
                </Link>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className="bg-gray-800 text-gray-200 border-gray-700"
              >
                Analytics
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={`/${encodeURIComponent(
                    companyName || ""
                  )}/dashboard/settings`}
                  className={`p-2 rounded-lg transition-colors ${
                    isActive("/settings")
                      ? "bg-blue-100 dark:bg-blue-900/20"
                      : "hover:bg-muted"
                  }`}
                >
                  <Settings
                    className={`h-5 w-5 ${
                      isActive("/settings")
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  />
                </Link>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className="bg-gray-800 text-gray-200 border-gray-700"
              >
                Settings
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>

        {/* User Profile at Bottom */}
        <div className="mt-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-10 w-10 p-0 rounded-full"
              >
                {user?.photoURL ? (
                  <Image
                    src={user.photoURL}
                    alt={user.displayName || "User"}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <User className="h-5 w-5" />
                  </div>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link href="/profile" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  My Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => signOut()}
                className="flex items-center gap-2 text-destructive focus:text-destructive"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Quick Links Panel */}
      <div className="w-56 bg-background border-r border-border py-5 px-4 overflow-y-auto relative">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">{quickLinks.title}</h2>
          <ExternalLink className="h-4 w-4 text-muted-foreground" />
        </div>

        <div className="space-y-8">
          {quickLinks.sections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide">
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex}>
                    {item.label === "Tags" && !isActive("/settings") ? (
                      <DropdownButton label="Tags" icon={Tag}>
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
                                <span className="text-sm flex-1">
                                  {tag.name}
                                </span>
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
                      </DropdownButton>
                    ) : item.label === "Types" && !isActive("/settings") ? (
                      <DropdownButton label="Types" icon={FileText}>
                        {typesLoading ? (
                          <div className="flex items-center justify-center w-full p-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900 dark:border-gray-100"></div>
                            <span className="ml-2 text-sm">Loading...</span>
                          </div>
                        ) : types.length === 0 ? (
                          <div className="p-2">
                            <span className="text-sm text-muted-foreground">
                              No types found
                            </span>
                          </div>
                        ) : (
                          <>
                            {types.map((type) => (
                              <button
                                key={type.id}
                                className="flex items-center gap-2 w-full p-2 rounded-md hover:bg-muted transition-colors text-left"
                              >
                                <span className="text-sm flex-shrink-0">
                                  {type.emoji}
                                </span>
                                <span className="text-sm flex-1">
                                  {type.name}
                                </span>
                              </button>
                            ))}
                            <button className="flex items-center w-full p-2 rounded-md hover:bg-muted transition-colors text-left">
                              <span className="text-sm">Manage Types</span>
                            </button>
                          </>
                        )}
                      </DropdownButton>
                    ) : item.label === "Tags" && isActive("/settings") ? (
                      <Link
                        href={`/${encodeURIComponent(
                          companyName || ""
                        )}/dashboard/settings/tags`}
                        className="flex items-center justify-between w-full p-2 rounded-md hover:bg-muted transition-colors text-left"
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{item.label}</span>
                        </div>
                      </Link>
                    ) : item.label === "Types" && isActive("/settings") ? (
                      <Link
                        href={`/${encodeURIComponent(
                          companyName || ""
                        )}/dashboard/settings/types`}
                        className="flex items-center justify-between w-full p-2 rounded-md hover:bg-muted transition-colors text-left"
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{item.label}</span>
                        </div>
                      </Link>
                    ) : item.label === "Statuses" && isActive("/settings") ? (
                      <Link
                        href={`/${encodeURIComponent(
                          companyName || ""
                        )}/dashboard/settings/statuses`}
                        className="flex items-center justify-between w-full p-2 rounded-md hover:bg-muted transition-colors text-left"
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{item.label}</span>
                        </div>
                      </Link>
                    ) : "hasArrow" in item && item.hasArrow ? (
                      <DropdownButton label={item.label} icon={item.icon}>
                        <div className="p-2">
                          <span className="text-sm text-muted-foreground">
                            {item.label} content will be implemented
                          </span>
                        </div>
                      </DropdownButton>
                    ) : (
                      <button className="flex items-center justify-between w-full p-2 rounded-md hover:bg-muted transition-colors text-left">
                        <div className="flex items-center gap-3">
                          <item.icon
                            className={`h-4 w-4 ${
                              "color" in item
                                ? item.color
                                : "text-muted-foreground"
                            }`}
                          />
                          <span className="text-sm">{item.label}</span>
                        </div>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
