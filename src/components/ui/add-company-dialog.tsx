"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CompanyService, CompanyData } from "@/lib/services/company";
import { FeedbackService } from "@/lib/services/feedback";
import { TagsService } from "@/lib/services/tags";
import { OrganizationService } from "@/lib/services/organization";

interface AddCompanyDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCompanyCreated?: (company: CompanyData) => void;
  userId: string;
  attachToOrganizationId?: string;
}

export function AddCompanyDialog({
  isOpen,
  onClose,
  onCompanyCreated,
  userId,
  attachToOrganizationId,
}: AddCompanyDialogProps) {
  const [companyName, setCompanyName] = useState("");
  const [website, setWebsite] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [creating, setCreating] = useState(false);

  const handleCreateCompany = async () => {
    if (!companyName.trim()) return;
    try {
      setCreating(true);

      // Create company
      const company = await CompanyService.createCompany(
        companyName.trim(),
        userId,
        {
          website: website.trim() || undefined,
          teamSize: teamSize.trim() || undefined,
        }
      );

      // Initialize defaults
      await Promise.all([
        FeedbackService.initializeDefaultTypes(company.id),
        TagsService.initializeDefaultTags(company.id),
      ]);

      // Optionally attach to organization
      if (attachToOrganizationId) {
        await OrganizationService.addCompanyToOrganization(
          attachToOrganizationId,
          company.id
        );
      }

      onCompanyCreated?.(company as CompanyData);
      // Reset state and close
      setCompanyName("");
      setWebsite("");
      setTeamSize("");
      onClose();
    } catch (error) {
      console.error("Error creating company:", error);
      // Surface a simple alert for now
      alert((error as Error)?.message || "Failed to create company");
    } finally {
      setCreating(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Company</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Company Name</Label>
            <Input
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Acme Inc"
            />
          </div>
          <div>
            <Label>Website (optional)</Label>
            <Input
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://acme.com"
            />
          </div>
          <div>
            <Label>Team Size (optional)</Label>
            <Input
              value={teamSize}
              onChange={(e) => setTeamSize(e.target.value)}
              placeholder="1-10"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={creating}>
            Cancel
          </Button>
          <Button
            onClick={handleCreateCompany}
            disabled={!companyName.trim() || creating}
          >
            {creating ? "Creating..." : "Create Company"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
