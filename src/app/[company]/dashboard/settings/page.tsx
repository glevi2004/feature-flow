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
            Choose a section from the sidebar to manage settings.
          </p>
        </div>
      </div>
    </div>
  );
}
