"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { CompanyService, CompanyData } from "@/lib/services/company";
import {
  OrganizationService,
  OrganizationData,
} from "@/lib/services/organization";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, Trash2, Building2 } from "lucide-react";

export default function OrganizationSettingsPage() {
  const params = useParams();
  const { user } = useAuth();
  const companySlugName = decodeURIComponent(params.company as string);

  const [loading, setLoading] = useState(true);
  const [organization, setOrganization] = useState<OrganizationData | null>(
    null
  );
  const [companies, setCompanies] = useState<CompanyData[]>([]);

  const [newOrgName, setNewOrgName] = useState("");
  const [orgTeamSize, setOrgTeamSize] = useState("");
  const [updatingOrg, setUpdatingOrg] = useState(false);
  const [confirmDeleteOrg, setConfirmDeleteOrg] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!user) return;
      try {
        setLoading(true);
        const foundCompany = await CompanyService.getCompanyByName(
          companySlugName
        );
        if (!foundCompany) {
          setLoading(false);
          return;
        }

        const orgsWithCompany =
          await OrganizationService.getOrganizationsByCompanyId(
            foundCompany.id
          );
        if (orgsWithCompany && orgsWithCompany.length > 0) {
          const org = orgsWithCompany[0];
          setOrganization(org);
          setNewOrgName(org.name);
          setOrgTeamSize(org.teamSize || "");
          
          // Load companies for this organization
          const orgCompanies = await CompanyService.getCompaniesByOrganizationId(org.id);
          setCompanies(orgCompanies);
        } else {
          // Fallback to user's first organization
          const userOrgIds = await OrganizationService.getUserOrganizations(
            user.uid
          );
          if (userOrgIds.length > 0) {
            const org = await OrganizationService.getOrganization(
              userOrgIds[0]
            );
            if (org) {
              setOrganization(org);
              setNewOrgName(org.name);
              setOrgTeamSize(org.teamSize || "");
              
              // Load companies for this organization
              const orgCompanies = await CompanyService.getCompaniesByOrganizationId(org.id);
              setCompanies(orgCompanies);
            }
          }
        }
      } catch (e) {
        console.error("Error loading organization:", e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user, companySlugName]);

  const handleSaveOrgName = async () => {
    if (!user || !organization) return;
    try {
      setUpdatingOrg(true);
      await OrganizationService.updateOrganizationName(
        organization.id,
        newOrgName,
        user.uid
      );
      setOrganization({ ...organization, name: newOrgName });
      alert("Organization name updated");
    } catch (e: any) {
      alert(e?.message || "Failed to update organization name");
    } finally {
      setUpdatingOrg(false);
    }
  };

  const handleSaveOrgDetails = async () => {
    if (!user || !organization) return;
    try {
      setUpdatingOrg(true);
      await OrganizationService.updateOrganization(
        organization.id,
        { teamSize: orgTeamSize || undefined },
        user.uid
      );
      setOrganization({
        ...organization,
        teamSize: orgTeamSize || undefined,
      } as OrganizationData);
      alert("Organization details updated");
    } catch (e: any) {
      alert(e?.message || "Failed to update organization");
    } finally {
      setUpdatingOrg(false);
    }
  };

  const handleDeleteOrg = async () => {
    if (!user || !organization) return;
    try {
      setUpdatingOrg(true);
      await OrganizationService.deleteOrganization(organization.id, user.uid);
      alert("Organization deleted");
      setConfirmDeleteOrg(false);
    } catch (e: any) {
      alert(e?.message || "Failed to delete organization");
    } finally {
      setUpdatingOrg(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading organization settings...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Organization Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Organization Name</label>
              <div className="mt-1 flex gap-2">
                <Input
                  value={newOrgName}
                  onChange={(e) => setNewOrgName(e.target.value)}
                />
                <Button
                  onClick={handleSaveOrgName}
                  disabled={updatingOrg || !newOrgName.trim()}
                >
                  Save
                </Button>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Team Size</label>
              <Input
                value={orgTeamSize}
                onChange={(e) => setOrgTeamSize(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={handleSaveOrgDetails}
              disabled={updatingOrg}
            >
              Save Details
            </Button>
            <Button
              variant="destructive"
              onClick={() => setConfirmDeleteOrg(true)}
              className="ml-auto flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" /> Delete Organization
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Companies Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Organization Companies ({companies.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {companies.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Building2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No companies found in this organization.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {companies.map((company) => (
                <div
                  key={company.id}
                  className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{company.name}</h3>
                      {company.website && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {company.website}
                        </p>
                      )}
                      {company.teamSize && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Team: {company.teamSize}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={confirmDeleteOrg} onOpenChange={setConfirmDeleteOrg}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Organization</DialogTitle>
            <DialogDescription>
              This action cannot be undone. If this is your only organization,
              deletion will be blocked.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setConfirmDeleteOrg(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteOrg}
              disabled={updatingOrg}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
