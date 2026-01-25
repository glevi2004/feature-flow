import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import {
  Globe,
  Bell,
  BarChart3,
  Settings,
  User,
  LogOut,
  House,
  Kanban,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect, useCallback } from "react";
import { OnboardingService } from "@/lib/services/onboarding";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export function AppSidebar() {
  const { user, signOut } = useAuth();
  const [companyName, setCompanyName] = useState("");

  const loadCompanyName = useCallback(async () => {
    try {
      const onboardingData = await OnboardingService.getOnboardingData(
        user!.uid
      );
      if (onboardingData?.companyName) {
        setCompanyName(onboardingData.companyName);
      }
    } catch (error) {
      console.error("Error loading company name:", error);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      loadCompanyName();
    }
  }, [user, loadCompanyName]);

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="mt-15">
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href={`/`}>
                  <House className="h-4 w-4" />
                  Home
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link
                  href={`/${encodeURIComponent(
                    companyName || ""
                  )}/dashboard/kanban`}
                >
                  <Kanban className="h-4 w-4" />
                  Kanban
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link
                  href={`/${encodeURIComponent(companyName || "")}`}
                  target="_blank"
                >
                  <Globe className="h-4 w-4" />
                  Live Portal
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link
                  href={`/${encodeURIComponent(
                    companyName || ""
                  )}/dashboard/notifications`}
                >
                  <Bell className="h-4 w-4" />
                  <span>Notifications</span>
                  <Badge variant="secondary" className="ml-auto text-[10px] h-4 px-1 bg-blue-100 text-blue-700 border-blue-200">
                    Soon
                  </Badge>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link
                  href={`/${encodeURIComponent(
                    companyName || ""
                  )}/dashboard/analytics`}
                >
                  <BarChart3 className="h-4 w-4" />
                  <span>Analytics</span>
                  <Badge variant="secondary" className="ml-auto text-[10px] h-4 px-1 bg-blue-100 text-blue-700 border-blue-200">
                    Soon
                  </Badge>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link
                  href={`/${encodeURIComponent(
                    companyName || ""
                  )}/dashboard/settings`}
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex w-full items-center gap-3 px-3 py-2 hover:bg-accent hover:text-accent-foreground rounded-md transition-colors">
              {user?.photoURL ? (
                <Image
                  src={user.photoURL}
                  alt={user.displayName || "User"}
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-full"
                />
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                  <User className="h-4 w-4" />
                </div>
              )}
              <div className="flex flex-col text-left">
                <span className="text-sm font-medium">
                  {user?.displayName || "User"}
                </span>
                <span className="text-xs text-muted-foreground">
                  {user?.email}
                </span>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem asChild>
              <Link
                href={`/${encodeURIComponent(
                  companyName || ""
                )}/dashboard/settings/account`}
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
      </SidebarFooter>
    </Sidebar>
  );
}
