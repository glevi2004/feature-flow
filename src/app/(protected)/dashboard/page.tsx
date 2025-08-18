"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Zap, LogOut, User } from "lucide-react";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { user, signOut } = useAuth();
  const [loading, setLoading] = useState(true);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return <div>Hello World</div>;
}
