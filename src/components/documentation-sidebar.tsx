"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Play,
  Zap,
  Code,
  LayoutDashboard,
  Kanban,
  Settings,
  HelpCircle,
  FileText,
  Users,
  BarChart3,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const documentationSections = [
  {
    title: "Getting Started",
    items: [
      {
        title: "Getting Started",
        href: "/documentation/getting-started",
        icon: Play,
      },
    ],
  },
  {
    title: "Features",
    items: [
      {
        title: "Overview",
        href: "/documentation/features",
        icon: Zap,
      },
      {
        title: "Dashboard",
        href: "/documentation/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Kanban Board",
        href: "/documentation/kanban",
        icon: Kanban,
      },
      {
        title: "Settings",
        href: "/documentation/settings",
        icon: Settings,
      },
    ],
  },
  {
    title: "Development",
    items: [
      {
        title: "API Reference",
        href: "/documentation/api",
        icon: Code,
      },
      {
        title: "Integrations",
        href: "/documentation/integrations",
        icon: Users,
      },
      {
        title: "Analytics",
        href: "/documentation/analytics",
        icon: BarChart3,
      },
    ],
  },
  {
    title: "Help & Support",
    items: [
      {
        title: "FAQ",
        href: "/documentation/faq",
        icon: HelpCircle,
      },
      {
        title: "Tutorials",
        href: "/documentation/tutorials",
        icon: FileText,
      },
    ],
  },
];

export function DocumentationSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-2">
          <BookOpen className="h-6 w-6" />
          <span className="font-semibold">Documentation</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {documentationSections.map((section) => (
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href}
                    >
                      <Link href={item.href}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
