"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useParams } from "next/navigation";
import {
  House,
  Kanban,
  Globe,
  Settings,
  User,
  LogOut,
  X,
  Radio,
  Circle,
  CheckCircle,
  XCircle,
  Tag,
  FileText,
  Activity,
  PanelLeftIcon,
} from "lucide-react";
import { TagsService, FeedbackTag } from "@/lib/services/tags";
import { FeedbackService, FeedbackType } from "@/lib/services/feedback";
import { useAuth } from "@/contexts/AuthContext";
import { CompanyService } from "@/lib/services/company";
import { useDashboardFilters } from "@/contexts/DashboardFilterContext";
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

type RegularItem = BaseItem;

type QuickLinkItem = StatusItem | QuickFilterItem | RegularItem;

interface QuickLinkSection {
  title: string;
  items: QuickLinkItem[];
}

interface QuickLinks {
  title: string;
  sections: QuickLinkSection[];
}

// Map settings item labels to their route slugs
const settingsRouteMap: Record<string, string> = {
  Account: "account",
  Company: "company",
  Organization: "organization",
  "Feedback Site": "feedback-site",
  Statuses: "statuses",
  Types: "types",
  Tags: "tags",
};

export function SideNav({ onClose }: SideNavProps) {
  const { user, signOut } = useAuth();
  const {
    statusFilter,
    typeFilter,
    tagFilter,
    setStatusFilter,
    setTypeFilter,
    setTagFilter,
  } = useDashboardFilters();
  const pathname = usePathname();
  const params = useParams();
  const companySlug = typeof params.company === "string" ? params.company : "";
  const encodedCompany = encodeURIComponent(companySlug);

  const [companyId, setCompanyId] = useState("");
  const [tags, setTags] = useState<FeedbackTag[]>([]);
  const [types, setTypes] = useState<FeedbackType[]>([]);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Auto-collapse on small screens
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 768) {
        // md breakpoint is 768px
        setIsCollapsed(true);
      } else {
        // Auto-expand on larger screens
        setIsCollapsed(false);
      }
    };

    // Set initial state
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const loadTags = useCallback(async (id: string) => {
    try {
      const allTags = await TagsService.getAllTags(id);
      setTags(allTags);
    } catch (error) {
      console.error("Error loading tags:", error);
    }
  }, []);

  const loadTypes = useCallback(async (id: string) => {
    try {
      const allTypes = await FeedbackService.getCompanyTypes(id);
      setTypes(allTypes);
    } catch (error) {
      console.error("Error loading types:", error);
    }
  }, []);

  const loadCompanyData = useCallback(async () => {
    if (!user) return;
    try {
      const userCompanies = await CompanyService.getUserCompanies(user.uid);
      if (userCompanies.length > 0) {
        const id = userCompanies[0];
        setCompanyId(id);
        loadTags(id);
        loadTypes(id);
      }
    } catch (error) {
      console.error("Error loading company data:", error);
    }
  }, [user, loadTags, loadTypes]);

  useEffect(() => {
    if (user) {
      loadCompanyData();
    }
  }, [user, loadCompanyData]);

  // Check if a given path segment is the current active page
  const isActive = useCallback(
    (path: string) => {
      // Split pathname into segments and check if the path appears as a segment boundary
      const segments = pathname.split("/");
      const targetSegments = path.split("/").filter(Boolean);
      if (targetSegments.length === 0) return false;

      // Check if the target segments appear consecutively in the pathname segments
      for (let i = 0; i <= segments.length - targetSegments.length; i++) {
        const match = targetSegments.every(
          (seg, j) => segments[i + j] === seg
        );
        if (match) return true;
      }
      return false;
    },
    [pathname]
  );

  // Determine if the current page is exactly the dashboard home (not a sub-page)
  const isDashboardHome =
    isActive("dashboard") &&
    !isActive("kanban") &&
    !isActive("analytics") &&
    !isActive("notifications") &&
    !isActive("settings");

  // Add effect to reload tags when the dropdown is opened
  useEffect(() => {
    if (companyId && isActive("settings")) {
      loadTags(companyId);
    }
  }, [companyId, pathname, isActive, loadTags]);

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
    kanban: {
      title: "Kanban",
      sections: [
        {
          title: "Quick Filters",
          items: [
            { label: "My Tasks", icon: User, hasArrow: true },
            { label: "Tags", icon: Tag, hasArrow: true },
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
            { label: "Account", icon: User },
            { label: "Company", icon: Settings },
            { label: "Organization", icon: User },
            { label: "Feedback Site", icon: Globe },
          ],
        },
        {
          title: "Dashboard & Boards",
          items: [
            { label: "Types", icon: FileText },
            { label: "Tags", icon: Tag },
          ],
        },
      ],
    },
  };

  const getQuickLinks = (): QuickLinks => {
    if (isActive("kanban")) {
      return pageConfigs.kanban;
    } else if (isActive("settings")) {
      return pageConfigs.settings;
    } else if (isDashboardHome) {
      return pageConfigs.dashboard;
    }

    // Default fallback
    return pageConfigs.dashboard;
  };

  const quickLinks = getQuickLinks();

  const renderSettingsLink = (item: QuickLinkItem) => {
    const routeSlug = settingsRouteMap[item.label];
    if (!routeSlug) return null;

    return (
      <Link
        href={`/${encodedCompany}/dashboard/settings/${routeSlug}`}
        className="flex items-center justify-between w-full p-2 rounded-md hover:bg-muted transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <item.icon className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{item.label}</span>
        </div>
      </Link>
    );
  };

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
                  href={`/${encodedCompany}/dashboard`}
                  className={`p-2 rounded-lg transition-colors ${
                    isDashboardHome
                      ? "bg-blue-100 dark:bg-blue-900/20"
                      : "hover:bg-muted"
                  }`}
                >
                  <House
                    className={`h-5 w-5 ${
                      isDashboardHome
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
                  href={`/${encodedCompany}/dashboard/kanban`}
                  className={`p-2 rounded-lg transition-colors ${
                    isActive("kanban")
                      ? "bg-blue-100 dark:bg-blue-900/20"
                      : "hover:bg-muted"
                  }`}
                >
                  <Kanban
                    className={`h-5 w-5 ${
                      isActive("kanban")
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
                Kanban
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={`/${encodedCompany}`}
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
                  href={`/${encodedCompany}/dashboard/settings`}
                  className={`p-2 rounded-lg transition-colors ${
                    isActive("settings")
                      ? "bg-blue-100 dark:bg-blue-900/20"
                      : "hover:bg-muted"
                  }`}
                >
                  <Settings
                    className={`h-5 w-5 ${
                      isActive("settings")
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
                <Link
                  href={`/${encodedCompany}/dashboard/settings/account`}
                  className="flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  Account Settings
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

      {/* Collapsible Quick Links Panel */}
      <div className="relative">
        {/* Collapse Button - Positioned outside the panel */}
        <Button
          data-sidebar="trigger"
          data-slot="sidebar-trigger"
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-8 top-6 size-7 hover:bg-muted bg-background z-10"
        >
          <PanelLeftIcon className="h-4 w-4" />
          <span className="sr-only">Toggle Quick Links Panel</span>
        </Button>

        <div
          className={`bg-background border-r border-border py-5 overflow-hidden transition-all duration-300 h-full px-1 ${
            isCollapsed ? "w-0 px-0" : "w-56"
          }`}
        >
          <div className="flex items-center justify-between mb-6 px-4">
            <h2 className="text-xl font-bold">{quickLinks.title}</h2>
          </div>

          <div className="space-y-8 overflow-y-auto max-h-[calc(100vh-120px)] px-2">
            {quickLinks.sections.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide px-2">
                  {section.title}
                </h3>
                <div className="space-y-1">
                  {section.items.map((item, itemIndex) => (
                    <div key={itemIndex}>
                      {item.label === "Tags" && !isActive("settings") ? (
                        <DropdownButton
                          label="Tags"
                          icon={Tag}
                          onOpen={() => companyId && loadTags(companyId)}
                        >
                          {tags.length === 0 ? (
                            <div className="p-2">
                              <Link
                                href={`/${encodedCompany}/dashboard/settings/tags`}
                                className="flex items-center w-full p-2 rounded-md hover:bg-muted transition-colors text-left"
                              >
                                <span className="text-sm">Add Tags</span>
                              </Link>
                            </div>
                          ) : (
                            <>
                              {tags.map((tag) => (
                                <button
                                  key={tag.id}
                                  className={`flex items-center gap-2 w-full p-2 rounded-md transition-colors text-left ${
                                    tagFilter === tag.id
                                      ? "bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                                      : "hover:bg-muted"
                                  }`}
                                  onClick={() => {
                                    setTagFilter(
                                      tagFilter === tag.id ? null : tag.id!
                                    );
                                  }}
                                >
                                  <div
                                    className="w-3 h-3 rounded-full flex-shrink-0"
                                    style={{ backgroundColor: tag.color }}
                                  />
                                  <span className="text-sm flex-1">
                                    {tag.name}
                                  </span>
                                </button>
                              ))}
                              <Link
                                href={`/${encodedCompany}/dashboard/settings/tags`}
                                className="flex items-center w-full p-2 rounded-md hover:bg-muted transition-colors text-left"
                              >
                                <span className="text-sm">Manage Tags</span>
                              </Link>
                            </>
                          )}
                        </DropdownButton>
                      ) : item.label === "Types" && !isActive("settings") ? (
                        <DropdownButton
                          label="Types"
                          icon={FileText}
                          onOpen={() => companyId && loadTypes(companyId)}
                        >
                          {types.length === 0 ? (
                            <div className="p-2">
                              <Link
                                href={`/${encodedCompany}/dashboard/settings/types`}
                                className="flex items-center w-full p-2 rounded-md hover:bg-muted transition-colors text-left"
                              >
                                <span className="text-sm">Add Types</span>
                              </Link>
                            </div>
                          ) : (
                            <>
                              {types.map((type) => (
                                <button
                                  key={type.id}
                                  className={`flex items-center gap-2 w-full p-2 rounded-md transition-colors text-left ${
                                    typeFilter === type.id
                                      ? "bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                                      : "hover:bg-muted"
                                  }`}
                                  onClick={() => {
                                    setTypeFilter(
                                      typeFilter === type.id ? null : type.id!
                                    );
                                  }}
                                >
                                  <span className="text-sm flex-shrink-0">
                                    {type.emoji}
                                  </span>
                                  <span className="text-sm flex-1">
                                    {type.name}
                                  </span>
                                </button>
                              ))}
                              <Link
                                href={`/${encodedCompany}/dashboard/settings/types`}
                                className="flex items-center w-full p-2 rounded-md hover:bg-muted transition-colors text-left"
                              >
                                <span className="text-sm">Manage Types</span>
                              </Link>
                            </>
                          )}
                        </DropdownButton>
                      ) : isActive("settings") &&
                        item.label in settingsRouteMap ? (
                        renderSettingsLink(item)
                      ) : "hasArrow" in item && item.hasArrow ? (
                        <DropdownButton label={item.label} icon={item.icon}>
                          <div className="p-2">
                            <span className="text-sm text-muted-foreground">
                              {item.label} content will be implemented
                            </span>
                          </div>
                        </DropdownButton>
                      ) : (
                        <button
                          className={`flex items-center justify-between w-full p-2 rounded-md transition-colors text-left ${
                            statusFilter === item.label
                              ? "bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                              : "hover:bg-muted"
                          }`}
                          onClick={() => {
                            setStatusFilter(
                              statusFilter === item.label ? null : item.label
                            );
                          }}
                        >
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
    </div>
  );
}
