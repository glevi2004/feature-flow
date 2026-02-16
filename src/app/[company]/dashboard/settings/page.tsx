"use client";

import {
  Settings,
  Building2,
  Users,
  Globe,
  Tag,
  FileText,
  Radio,
  Bell,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function SettingsPage() {
  const params = useParams();
  const companySlug = typeof params.company === "string" ? params.company : "";
  const encodedCompany = encodeURIComponent(companySlug);

  const settingsOptions = [
    {
      title: "Company",
      description: "Manage company information, branding, and general settings",
      icon: Building2,
      href: `/${encodedCompany}/dashboard/settings/company`,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Organization",
      description: "Manage team members, roles, and permissions",
      icon: Users,
      href: `/${encodedCompany}/dashboard/settings/organization`,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Feedback Site",
      description: "Customize your public feedback portal and branding",
      icon: Globe,
      href: `/${encodedCompany}/dashboard/settings/feedback-site`,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "Statuses",
      description: "Configure workflow statuses and their colors",
      icon: Radio,
      href: `/${encodedCompany}/dashboard/settings/statuses`,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    {
      title: "Types",
      description: "Manage feedback types and categories",
      icon: FileText,
      href: `/${encodedCompany}/dashboard/settings/types`,
      color: "text-indigo-500",
      bgColor: "bg-indigo-500/10",
    },
    {
      title: "Tags",
      description: "Create and manage tags for organizing feedback",
      icon: Tag,
      href: `/${encodedCompany}/dashboard/settings/tags`,
      color: "text-pink-500",
      bgColor: "bg-pink-500/10",
    },
    {
      title: "Notifications",
      description: "Configure email alerts and notification preferences",
      icon: Bell,
      href: `/${encodedCompany}/dashboard/settings/notifications`,
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10",
    },
  ];

  return (
    <div className="pb-6 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground mt-2">
            Manage your workspace configuration and preferences
          </p>
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {settingsOptions.map((option) => {
            const Icon = option.icon;
            return (
              <Link key={option.title} href={option.href}>
                <Card className="h-40 hover:shadow-md transition-all duration-200 cursor-pointer group border-border hover:border-border/60 hover:-translate-y-1">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${option.bgColor}`}>
                        <Icon className={`h-5 w-5 ${option.color}`} />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg group-hover:text-foreground transition-colors">
                          {option.title}
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-sm leading-relaxed">
                      {option.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-12 p-6 bg-muted/30 rounded-lg border border-border">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-muted rounded-lg">
              <Settings className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-medium mb-2">Need help with settings?</h3>
              <p className="text-sm text-muted-foreground">
                Each section contains detailed configuration options. Changes
                are saved automatically, and you can always revert to previous
                settings if needed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
