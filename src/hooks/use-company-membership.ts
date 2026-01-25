import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import { CompanyService } from "@/lib/services/company";

export function useCompanyMembership(companyId: string | null) {
  const { user } = useAuth();
  const [isMember, setIsMember] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkMembership() {
      if (!user || !companyId) {
        setIsMember(false);
        setLoading(false);
        return;
      }

      try {
        const company = await CompanyService.getCompany(companyId);
        if (company && company.members.includes(user.uid)) {
          setIsMember(true);
        } else {
          setIsMember(false);
        }
      } catch (error) {
        console.error("Error checking company membership:", error);
        setIsMember(false);
      } finally {
        setLoading(false);
      }
    }

    checkMembership();
  }, [user, companyId]);

  return { isMember, loading };
}
