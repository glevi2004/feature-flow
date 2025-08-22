"use client";

import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <div className="p-4 bg-muted rounded-full">
            <Settings className="h-12 w-12 text-muted-foreground" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-xl text-muted-foreground max-w-md">
            Settings page is coming soon. We're working hard to bring you a
            comprehensive settings experience.
          </p>
        </div>

        <div className="pt-4">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
            In Development
          </div>
        </div>
      </div>
    </div>
  );
}
