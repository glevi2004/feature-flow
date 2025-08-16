"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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

interface FormData {
  goals: string[];
  accessType: string;
  companyName: string;
  teamSize: string;
  discoveryMethod: string;
  companyWebsite: string;
}

export default function RegisterPage() {
  const { signInWithGoogle } = useAuth();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
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
      await signInWithGoogle();
      // After successful sign in, redirect to protected homepage
      router.push("/(protected)");
    } catch (error) {
      console.error("Error signing in with Google:", error);
      // You can add error handling here (show toast, etc.)
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">
                What's your main goal?
              </h2>
              <p className="text-gray-600">
                Help us understand how you'll use Feature Flow
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
                You're almost ready to get started!
              </p>
            </div>
            <div className="space-y-3">
              <Button
                onClick={handleGoogleSignup}
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
                Continue with Google
              </Button>

              <Button
                onClick={() => console.log("Email signup clicked", formData)}
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

              <Button
                onClick={() => console.log("Discord signup clicked", formData)}
                className="w-full bg-[#5865F2] text-white border border-[#5865F2] hover:bg-[#4752C4]"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.019 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z" />
                </svg>
                Continue with Discord
              </Button>
            </div>
            <div className="text-center text-sm text-gray-500">
              By continuing, you agree to our Terms of Service and Privacy
              Policy
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
