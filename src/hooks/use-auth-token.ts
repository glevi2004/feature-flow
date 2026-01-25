import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";

export function useAuthToken() {
  const { user } = useAuth();
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getToken() {
      if (!user) {
        setToken(null);
        setLoading(false);
        return;
      }

      try {
        const idToken = await user.getIdToken();
        setToken(idToken);
      } catch (error) {
        console.error("Error getting auth token:", error);
        setToken(null);
      } finally {
        setLoading(false);
      }
    }

    getToken();
    
    // Refresh token periodically (every 50 minutes, tokens expire after 1 hour)
    const interval = setInterval(getToken, 50 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [user]);

  return { token, loading };
}
