"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { UserService, UserData } from "@/lib/services/user";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  User,
  Settings,
  Building2,
  Users,
  Edit3,
  ArrowRight,
  Loader2,
  CheckCircle,
  AlertCircle,
  Save,
} from "lucide-react";
import { useParams } from "next/navigation";
import { Timestamp } from "firebase/firestore";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function AccountSettingsPage() {
  const router = useRouter();
  const params = useParams();
  const { user, deleteAccount } = useAuth();
  const companySlugName = decodeURIComponent(params.company as string);

  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [updatingDisplayName, setUpdatingDisplayName] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState("");
  const [displayNameSuccess, setDisplayNameSuccess] = useState(false);
  const [displayNameError, setDisplayNameError] = useState("");
  const [deletingAccount, setDeletingAccount] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const loadUserData = async () => {
      if (!user) return;
      try {
        setLoading(true);
        const data = await UserService.getUserData(user.uid);
        if (data) {
          setUserData(data);
          setNewDisplayName(data.displayName);
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [user]);

  const handleUpdateDisplayName = async () => {
    if (!user || !newDisplayName.trim()) return;

    try {
      setUpdatingDisplayName(true);
      setDisplayNameError("");
      setDisplayNameSuccess(false);

      await UserService.updateDisplayName(user.uid, newDisplayName);

      setUserData((prev) =>
        prev ? { ...prev, displayName: newDisplayName } : null
      );
      setDisplayNameSuccess(true);

      // Reset success message after 3 seconds
      setTimeout(() => setDisplayNameSuccess(false), 3000);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to update display name";
      setDisplayNameError(errorMessage);
    } finally {
      setUpdatingDisplayName(false);
    }
  };

  const navigateToCompanySettings = () => {
    router.push(`/${companySlugName}/dashboard/settings/company`);
  };

  const navigateToOrganizationSettings = () => {
    router.push(`/${companySlugName}/dashboard/settings/organization`);
  };

  const handleDeleteAccount = async () => {
    if (!user) return;

    try {
      setDeletingAccount(true);

      // Delete the account using AuthContext
      await deleteAccount();

      // Redirect to home page after successful deletion
      router.push("/");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to delete account. Please try again.";
      console.error("Error deleting account:", error);
      alert(errorMessage);
    } finally {
      setDeletingAccount(false);
      setShowDeleteConfirm(false);
    }
  };

  // Helper function to safely format dates from Firestore
  const formatDate = (dateValue: Date | Timestamp | undefined): string => {
    if (!dateValue) return "Not available";

    try {
      if (dateValue instanceof Date) {
        return dateValue.toLocaleDateString();
      } else if (dateValue instanceof Timestamp) {
        return dateValue.toDate().toLocaleDateString();
      } else {
        return "Invalid date";
      }
    } catch {
      return "Invalid date";
    }
  };

  if (loading) {
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

        <div className="flex items-center justify-center h-64">
          <div className="flex items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Loading account settings...</span>
          </div>
        </div>
      </div>
    );
  }

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

      {/* Display Name Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Edit3 className="h-5 w-5 text-muted-foreground" />
            Display Name
          </CardTitle>
          <CardDescription>
            Change how your name appears across the platform
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="displayName">Current Display Name</Label>
              <Input
                id="displayName"
                value={newDisplayName}
                onChange={(e) => setNewDisplayName(e.target.value)}
                placeholder="Enter your display name"
                className="mt-1"
              />
            </div>
            <div className="flex items-end">
              <Button
                onClick={handleUpdateDisplayName}
                disabled={
                  updatingDisplayName ||
                  !newDisplayName.trim() ||
                  newDisplayName === userData?.displayName
                }
                className="w-full md:w-auto"
              >
                {updatingDisplayName ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Update Display Name
                  </>
                )}
              </Button>
            </div>
          </div>

          {displayNameSuccess && (
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
              <CheckCircle className="h-4 w-4" />
              <span>Display name updated successfully!</span>
            </div>
          )}

          {displayNameError && (
            <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
              <AlertCircle className="h-4 w-4" />
              <span>{displayNameError}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Company Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-muted-foreground" />
            Company Management
          </CardTitle>
          <CardDescription>
            Manage your company settings, logo, and details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium">Company Settings</p>
              <p className="text-sm text-muted-foreground">
                Configure company name, website, team size, and upload company
                logo
              </p>
            </div>
            <Button onClick={navigateToCompanySettings} variant="outline">
              Manage Company
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Organization Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-muted-foreground" />
            Organization Management
          </CardTitle>
          <CardDescription>
            Manage your organization settings and company relationships
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium">Organization Settings</p>
              <p className="text-sm text-muted-foreground">
                Configure organization name, team size, and manage company
                relationships
              </p>
            </div>
            <Button onClick={navigateToOrganizationSettings} variant="outline">
              Manage Organization
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Account Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-muted-foreground" />
            Account Information
          </CardTitle>
          <CardDescription>
            View your account details and preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium">Email Address</Label>
              <p className="text-sm text-muted-foreground mt-1">
                {userData?.email || "Not available"}
              </p>
            </div>
            <div>
              <Label className="text-sm font-medium">Account Created</Label>
              <p className="text-sm text-muted-foreground mt-1">
                {userData?.createdAt
                  ? formatDate(userData.createdAt)
                  : "Not available"}
              </p>
            </div>
          </div>

          {/* Delete Account Section */}
          {/* <div className="pt-4 border-t">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h4 className="text-sm font-medium text-destructive">
                  Danger Zone
                </h4>
                <p className="text-sm text-muted-foreground">
                  Once you delete your account, there is no going back. Please
                  be certain.
                </p>
              </div>
              <AlertDialog
                open={showDeleteConfirm}
                onOpenChange={setShowDeleteConfirm}
              >
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm">
                    Delete Account
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove all your data from our servers.
                      This includes:
                      <br />
                      • Your profile information
                      <br />
                      • Company memberships
                      <br />
                      • Organization memberships
                      <br />
                      • All feedback and posts
                      <br />• Any other data associated with your account
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDeleteAccount}
                      disabled={deletingAccount}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      {deletingAccount ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          Deleting...
                        </>
                      ) : (
                        "Yes, delete my account"
                      )}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div> */}
        </CardContent>
      </Card>
    </div>
  );
}
