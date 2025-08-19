"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Mail, CheckCircle, RefreshCw } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { sendEmailVerification } from "firebase/auth";
import { OnboardingService } from "@/lib/services/onboarding";

export default function VerifyEmailPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If user is already verified, redirect to dashboard
    if (user?.emailVerified) {
      handleVerificationComplete();
    }
  }, [user]);

  const handleCheckVerification = async () => {
    setIsChecking(true);
    setError(null);
    setMessage(null);

    try {
      // Reload user to get latest verification status
      await user?.reload();

      if (user?.emailVerified) {
        setMessage("Email verified successfully! Redirecting to dashboard...");
        await handleVerificationComplete();
      } else {
        setError(
          "Email not verified yet. Please check your inbox and click the verification link."
        );
      }
    } catch (error: any) {
      console.error("Error checking verification:", error);
      setError("Error checking verification status. Please try again.");
    } finally {
      setIsChecking(false);
    }
  };

  const handleResendVerification = async () => {
    setIsResending(true);
    setError(null);
    setMessage(null);

    try {
      if (user) {
        await sendEmailVerification(user);
        setMessage("Verification email sent! Please check your inbox.");
      }
    } catch (error: any) {
      console.error("Error resending verification:", error);
      setError("Error sending verification email. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  const handleVerificationComplete = async () => {
    try {
      // Check if we have pending onboarding data
      const pendingOnboarding = localStorage.getItem("pendingOnboarding");

      if (pendingOnboarding && user) {
        const onboardingData = JSON.parse(pendingOnboarding);
        await OnboardingService.saveOnboardingData(user.uid, onboardingData);
        localStorage.removeItem("pendingOnboarding");
        console.log("Onboarding data saved successfully after verification");
      }

      // Redirect to company page after successful verification
      if (onboardingData?.companyName) {
        router.push(`/${encodeURIComponent(onboardingData.companyName)}`);
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error saving onboarding data:", error);
      // Still redirect to dashboard even if onboarding save fails
      router.push("/dashboard");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="text-center p-6">
            <p className="text-gray-600 mb-4">
              Please sign in to verify your email.
            </p>
            <Link href="/login">
              <Button className="w-full">Go to Login</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-3">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold">Verify Your Email</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <h2 className="text-lg font-semibold mb-2">Check Your Email</h2>
            <p className="text-gray-600 mb-4">
              We sent a verification email to:
            </p>
            <p className="text-sm font-medium text-gray-800 bg-gray-100 rounded-lg p-3">
              {user.email}
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-medium text-blue-900 mb-2">
                What to do next:
              </h3>
              <ol className="text-sm text-blue-800 space-y-1">
                <li>1. Check your email inbox (and spam folder)</li>
                <li>2. Click the verification link in the email</li>
                <li>3. Come back here and click "I've Verified My Email"</li>
              </ol>
            </div>

            {message && (
              <div className="text-center text-sm text-green-600 bg-green-50 border border-green-200 rounded-lg p-3">
                {message}
              </div>
            )}

            {error && (
              <div className="text-center text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg p-3">
                {error}
              </div>
            )}

            <div className="space-y-3">
              <Button
                onClick={handleCheckVerification}
                disabled={isChecking}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              >
                {isChecking ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Checking...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    I've Verified My Email
                  </>
                )}
              </Button>

              <Button
                onClick={handleResendVerification}
                disabled={isResending}
                variant="outline"
                className="w-full"
              >
                {isResending ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Resend Verification Email"
                )}
              </Button>

              <div className="text-center">
                <Link
                  href="/login"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Back to Login
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
