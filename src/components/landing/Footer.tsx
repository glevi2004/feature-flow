import { Package } from "lucide-react";
import { app_name } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-background text-foreground py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">{app_name}</span>
          </div>
          <div className="text-muted-foreground">
            <p>&copy; 2024 {app_name}. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
