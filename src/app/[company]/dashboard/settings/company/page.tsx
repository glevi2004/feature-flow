"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { CompanyService, CompanyData } from "@/lib/services/company";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AddCompanyDialog } from "@/components/ui/add-company-dialog";
import { LogoUpload } from "@/components/ui/logo-upload";
import { Loader2, Trash2, Save } from "lucide-react";

export default function CompanySettingsPage() {
  const params = useParams();
  const { user } = useAuth();
  const companySlugName = decodeURIComponent(params.company as string);

  const [loading, setLoading] = useState(true);
  const [company, setCompany] = useState<CompanyData | null>(null);

  const [newCompanyName, setNewCompanyName] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [updatingCompany, setUpdatingCompany] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);

  const [showAddCompany, setShowAddCompany] = useState(false);
  const [confirmDeleteCompany, setConfirmDeleteCompany] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!user) return;
      try {
        setLoading(true);
        const found = await CompanyService.getCompanyByName(companySlugName);
        if (!found) {
          setLoading(false);
          return;
        }
        setCompany(found);
        setNewCompanyName(found.name);
        setCompanyWebsite(found.website || "");
        setTeamSize(found.teamSize || "");
      } catch (e) {
        console.error("Error loading company:", e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user, companySlugName]);

  const handleSaveAll = async () => {
    if (!user || !company) return;
    try {
      setUpdatingCompany(true);

      // Save company name if it changed
      if (newCompanyName !== company.name) {
        await CompanyService.updateCompanyName(
          company.id,
          newCompanyName,
          user.uid
        );
      }

      // Save other company details
      await CompanyService.updateCompany(
        company.id,
        {
          website: companyWebsite || undefined,
          teamSize: teamSize || undefined,
        },
        user.uid
      );

      // Update local state
      setCompany({
        ...company,
        name: newCompanyName,
        website: companyWebsite || undefined,
        teamSize: teamSize || undefined,
      });

      alert("Company information saved successfully");
    } catch (e: unknown) {
      const error = e as { message?: string };
      alert(error?.message || "Failed to save company information");
    } finally {
      setUpdatingCompany(false);
    }
  };

  const handleLogoUpload = async (file: File) => {
    if (!user || !company) return;
    try {
      setUploadingLogo(true);
      const logoUrl = await CompanyService.uploadCompanyLogo(
        company.id,
        file,
        user.uid
      );
      setCompany({ ...company, logo: logoUrl });
      alert("Logo uploaded successfully");
    } catch (e: unknown) {
      const error = e as { message?: string };
      alert(error?.message || "Failed to upload logo");
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleLogoRemove = async () => {
    if (!user || !company) return;
    try {
      setUploadingLogo(true);
      await CompanyService.removeCompanyLogo(company.id, user.uid);
      setCompany({ ...company, logo: undefined });
      alert("Logo removed successfully");
    } catch (e: unknown) {
      const error = e as { message?: string };
      alert(error?.message || "Failed to remove logo");
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleDeleteCompany = async () => {
    if (!user || !company) return;
    try {
      setUpdatingCompany(true);
      await CompanyService.deleteCompany(company.id, user.uid);
      alert("Company deleted");
      setConfirmDeleteCompany(false);
    } catch (e: unknown) {
      const error = e as { message?: string };
      alert(error?.message || "Failed to delete company");
    } finally {
      setUpdatingCompany(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading company settings...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Company Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Logo Upload Section */}
          <LogoUpload
            currentLogo={company?.logo}
            onUpload={handleLogoUpload}
            onRemove={handleLogoRemove}
            loading={uploadingLogo}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Company Name</label>
              <Input
                value={newCompanyName}
                onChange={(e) => setNewCompanyName(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Website</label>
              <Input
                value={companyWebsite}
                onChange={(e) => setCompanyWebsite(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Team Size</label>
              <Select
                value={teamSize}
                onValueChange={(value) => setTeamSize(value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select team size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-10">1-10 employees</SelectItem>
                  <SelectItem value="11-50">11-50 employees</SelectItem>
                  <SelectItem value="51-200">51-200 employees</SelectItem>
                  <SelectItem value="201-500">201-500 employees</SelectItem>
                  <SelectItem value="500+">500+ employees</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={handleSaveAll}
              disabled={updatingCompany}
              className="flex items-center gap-2"
            >
              {updatingCompany ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save Company
                </>
              )}
            </Button>
            <Button variant="secondary" onClick={() => setShowAddCompany(true)}>
              Add Company
            </Button>
            <Button
              variant="destructive"
              onClick={() => setConfirmDeleteCompany(true)}
              className="ml-auto flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" /> Delete Company
            </Button>
          </div>
        </CardContent>
      </Card>

      {user && (
        <AddCompanyDialog
          isOpen={showAddCompany}
          onClose={() => setShowAddCompany(false)}
          userId={user.uid}
          onCompanyCreated={(c) => {
            alert(`Company ${c.name} created`);
          }}
        />
      )}

      <Dialog
        open={confirmDeleteCompany}
        onOpenChange={setConfirmDeleteCompany}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Company</DialogTitle>
            <DialogDescription>
              This action cannot be undone. If this is your only company,
              deletion will be blocked.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setConfirmDeleteCompany(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteCompany}
              disabled={updatingCompany}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
