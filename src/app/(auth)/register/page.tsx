"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Zap, ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface FormData {
  goals: string[];
  accessType: string;
  companyName: string;
  teamSize: string;
  discoveryMethod: string;
  companyWebsite: string;
}

export default function RegisterPage() {
  const { signInWithGoogle, signInWithGitHub, signInWithEmail } = useAuth();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    goals: [],
    accessType: "",
    companyName: "",
    teamSize: "",
    discoveryMethod: "",
    companyWebsite: "",
  });

  const updateFormData = (field: keyof FormData, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleGoal = (goal: string) => {
    setFormData((prev) => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter((g) => g !== goal)
        : [...prev.goals, goal],
    }));
  };

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.goals.length > 0;
      case 2:
        return formData.accessType !== "";
      case 3:
        return formData.companyName.trim() !== "";
      case 4:
        return (
          formData.teamSize !== "" &&
          formData.discoveryMethod !== "" &&
          formData.companyWebsite.trim() !== ""
        );
      default:
        return false;
    }
  };

  const handleGoogleSignup = async () => {
    try {
      setError(null);
      setIsLoading(true);
      // Pass the form data to the sign-in function
      await signInWithGoogle(formData);
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Error signing in with Google:", error);
      if (error.code === "auth/account-exists-with-different-credential") {
        setError(
          "An account with this email already exists. Please try signing in with a different method."
        );
      } else {
        setError("An error occurred during sign up. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGitHubSignup = async () => {
    try {
      setError(null);
      setIsLoading(true);
      // Pass the form data to the sign-in function
      await signInWithGitHub(formData);
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Error signing in with GitHub:", error);
      if (error.code === "auth/account-exists-with-different-credential") {
        setError(
          "An account with this email already exists. Please try signing in with a different method."
        );
      } else {
        setError("An error occurred during sign up. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSignup = async () => {
    try {
      setError(null);
      setIsLoading(true);
      // Pass the form data to the sign-in function
      await signInWithEmail(email, password, formData);
      // Redirect to verification page instead of dashboard
      router.push("/verify-email");
    } catch (error: any) {
      console.error("Error signing in with email:", error);
      if (error.code === "auth/email-already-in-use") {
        setError(
          "An account with this email already exists. Please try signing in instead."
        );
      } else if (error.code === "auth/weak-password") {
        setError("Password should be at least 6 characters long.");
      } else if (error.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else {
        setError("An error occurred during sign up. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">
                What&apos;s your main goal?
              </h2>
              <p className="text-gray-600">
                Help us understand how you&apos;ll use Feature Flow
              </p>
            </div>
            <div className="space-y-3">
              <div
                className="flex items-center space-x-3 p-3 border border-gray-300/20 rounded-lg hover:bg-gray-50/5 hover:border-gray-300/30 transition-all duration-150 cursor-pointer"
                onClick={() => toggleGoal("feedback")}
              >
                <Checkbox
                  checked={formData.goals.includes("feedback")}
                  onCheckedChange={() => toggleGoal("feedback")}
                />
                <Label className="text-base font-medium cursor-pointer">
                  Get feedback
                </Label>
              </div>
              <div
                className="flex items-center space-x-3 p-3 border border-gray-300/20 rounded-lg hover:bg-gray-50/5 hover:border-gray-300/30 transition-all duration-150 cursor-pointer"
                onClick={() => toggleGoal("updates")}
              >
                <Checkbox
                  checked={formData.goals.includes("updates")}
                  onCheckedChange={() => toggleGoal("updates")}
                />
                <Label className="text-base font-medium cursor-pointer">
                  Publish product updates
                </Label>
              </div>
              <div
                className="flex items-center space-x-3 p-3 border border-gray-300/20 rounded-lg hover:bg-gray-50/5 hover:border-gray-300/30 transition-all duration-150 cursor-pointer"
                onClick={() => toggleGoal("support")}
              >
                <Checkbox
                  checked={formData.goals.includes("support")}
                  onCheckedChange={() => toggleGoal("support")}
                />
                <Label className="text-base font-medium cursor-pointer">
                  Run & manage customer support
                </Label>
              </div>
            </div>
            <Button
              onClick={nextStep}
              disabled={!canProceed()}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
            >
              Next Step
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <div className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Sign in
              </Link>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">
                Who should have access?
              </h2>
              <p className="text-gray-600">
                Choose the access level for your Feature Flow module
              </p>
            </div>
            <div className="space-y-3">
              <div
                className="flex items-center space-x-3 p-3 border border-gray-300/20 rounded-lg hover:bg-gray-50/5 hover:border-gray-300/30 transition-all duration-150 cursor-pointer"
                onClick={() => updateFormData("accessType", "public")}
              >
                <Checkbox
                  checked={formData.accessType === "public"}
                  onCheckedChange={() => updateFormData("accessType", "public")}
                />
                <Label className="text-base font-medium cursor-pointer">
                  Public
                </Label>
              </div>
              <div
                className="flex items-center space-x-3 p-3 border border-gray-300/20 rounded-lg hover:bg-gray-50/5 hover:border-gray-300/30 transition-all duration-150 cursor-pointer"
                onClick={() => updateFormData("accessType", "private")}
              >
                <Checkbox
                  checked={formData.accessType === "private"}
                  onCheckedChange={() =>
                    updateFormData("accessType", "private")
                  }
                />
                <Label className="text-base font-medium cursor-pointer">
                  Private
                </Label>
              </div>
            </div>
            <div className="flex space-x-4">
              <Button onClick={prevStep} variant="outline" className="flex-1">
                Back
              </Button>
              <Button
                onClick={nextStep}
                disabled={!canProceed()}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
              >
                Next Step
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Company Information</h2>
              <p className="text-gray-600">Tell us about your organization</p>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="companyName" className="text-sm font-medium">
                  Company Name
                </Label>
                <Input
                  id="companyName"
                  type="text"
                  placeholder="Enter your company name"
                  value={formData.companyName}
                  onChange={(e) =>
                    updateFormData("companyName", e.target.value)
                  }
                  className="mt-1"
                />
              </div>
            </div>
            <div className="flex space-x-4">
              <Button onClick={prevStep} variant="outline" className="flex-1">
                Back
              </Button>
              <Button
                onClick={nextStep}
                disabled={!canProceed()}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
              >
                Last Step
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Final Details</h2>
              <p className="text-gray-600">
                Help us personalize your experience
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="teamSize" className="text-sm font-medium">
                  How big is your team?
                </Label>
                <Select
                  value={formData.teamSize}
                  onValueChange={(value) => updateFormData("teamSize", value)}
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
              <div>
                <Label
                  htmlFor="discoveryMethod"
                  className="text-sm font-medium"
                >
                  How did you find us?
                </Label>
                <Select
                  value={formData.discoveryMethod}
                  onValueChange={(value) =>
                    updateFormData("discoveryMethod", value)
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select discovery method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="google">Google Search</SelectItem>
                    <SelectItem value="social">Social Media</SelectItem>
                    <SelectItem value="referral">Referral</SelectItem>
                    <SelectItem value="advertisement">Advertisement</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="companyWebsite" className="text-sm font-medium">
                  Company Website
                </Label>
                <Input
                  id="companyWebsite"
                  type="url"
                  placeholder="https://yourcompany.com"
                  value={formData.companyWebsite}
                  onChange={(e) =>
                    updateFormData("companyWebsite", e.target.value)
                  }
                  className="mt-1"
                />
              </div>
            </div>
            <div className="flex space-x-4">
              <Button onClick={prevStep} variant="outline" className="flex-1">
                Back
              </Button>
              <Button
                onClick={nextStep}
                disabled={!canProceed()}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
              >
                Continue
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">
                Sign up to Feature Flow
              </h2>
              <p className="text-gray-600">
                You&apos;re almost ready to get started!
              </p>
            </div>
            <div className="space-y-3">
              <Button
                onClick={handleGoogleSignup}
                disabled={isLoading}
                className="w-full bg-white text-gray-900 border border-gray-300 hover:bg-gray-50"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                {isLoading ? "Signing up..." : "Continue with Google"}
              </Button>

              {!showEmailForm ? (
                <Button
                  onClick={() => setShowEmailForm(true)}
                  className="w-full bg-gray-900 text-white border border-gray-700 hover:bg-gray-800"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  Continue with Email
                </Button>
              ) : (
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="password" className="text-sm font-medium">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => setShowEmailForm(false)}
                      variant="outline"
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleEmailSignup}
                      disabled={isLoading || !email || !password}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      {isLoading ? "Signing up..." : "Sign up"}
                    </Button>
                  </div>
                </div>
              )}

              <Button
                onClick={handleGitHubSignup}
                disabled={isLoading}
                className="w-full bg-gray-900 text-white border border-gray-700 hover:bg-gray-800"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                {isLoading ? "Signing up..." : "Continue with GitHub"}
              </Button>
            </div>
            {error && (
              <div className="text-center text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg p-3">
                {error}
              </div>
            )}
            <div className="text-center text-sm text-gray-500">
              By continuing, you agree to our Terms of Service and Privacy
              Policy
            </div>
            <div className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Sign in
              </Link>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-3">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold">Feature Flow</span>
          </div>
          <div className="flex justify-center space-x-2 mb-6">
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                className={`w-2 h-2 rounded-full ${
                  step <= currentStep ? "bg-blue-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </CardHeader>
        <CardContent>{renderStep()}</CardContent>
      </Card>
    </div>
  );
}
