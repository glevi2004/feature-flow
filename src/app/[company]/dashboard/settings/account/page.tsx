"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User, Settings } from "lucide-react";

export default function AccountSettingsPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-3">
        <User className="h-8 w-8 text-muted-foreground" />
        <div>
          <h1 className="text-3xl font-bold">Account Settings</h1>
          <p className="text-muted-foreground">
            Manage your account preferences and settings
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-muted-foreground" />
            Account Management
          </CardTitle>
          <CardDescription>
            Configure your account settings and preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 px-4 py-3 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <p className="font-medium">🚧 In Development</p>
                <p className="text-sm mt-1 text-yellow-700 dark:text-yellow-300">
                  Account settings are coming soon. This page is currently under
                  development.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
