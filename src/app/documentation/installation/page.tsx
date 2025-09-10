import Link from "next/link";
import { CheckCircle, Download, Terminal, Globe } from "lucide-react";

export default function InstallationPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Installation</h1>
        <p className="text-xl text-muted-foreground">
          Get Feature Ship up and running in your environment with our comprehensive installation guide.
        </p>
      </div>

      <div className="space-y-8">
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Prerequisites</h2>
          <div className="bg-muted p-6 rounded-lg">
            <p className="text-muted-foreground mb-4">
              Before installing Feature Ship, ensure you have the following requirements:
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Node.js 18.0 or higher</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>npm 8.0 or higher (or yarn 1.22+)</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Modern web browser (Chrome, Firefox, Safari, Edge)</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Firebase account for backend services</span>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Installation Methods</h2>
          
          <div className="space-y-6">
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted px-6 py-4 border-b">
                <div className="flex items-center gap-3">
                  <Download className="h-5 w-5" />
                  <h3 className="text-lg font-semibold">npm Package</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-muted-foreground mb-4">
                  Install Feature Ship as a dependency in your project:
                </p>
                <div className="bg-background p-4 rounded border">
                  <code className="text-sm">npm install @feature-ship/core</code>
                </div>
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> This method is recommended for integrating Feature Ship into existing projects.
                  </p>
                </div>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted px-6 py-4 border-b">
                <div className="flex items-center gap-3">
                  <Terminal className="h-5 w-5" />
                  <h3 className="text-lg font-semibold">CLI Installation</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-muted-foreground mb-4">
                  Install the Feature Ship CLI globally for project scaffolding:
                </p>
                <div className="bg-background p-4 rounded border">
                  <code className="text-sm">npm install -g @feature-ship/cli</code>
                </div>
                <div className="mt-4">
                  <p className="text-muted-foreground mb-2">Create a new project:</p>
                  <div className="bg-background p-4 rounded border">
                    <code className="text-sm">feature-ship create my-project</code>
                  </div>
                </div>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted px-6 py-4 border-b">
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5" />
                  <h3 className="text-lg font-semibold">Web Application</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-muted-foreground mb-4">
                  Use Feature Ship directly in your browser without installation:
                </p>
                <div className="bg-background p-4 rounded border">
                  <code className="text-sm">https://app.feature-ship.com</code>
                </div>
                <div className="mt-4 p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800">
                    <strong>Quick Start:</strong> Sign up and start using Feature Ship immediately with our hosted solution.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Configuration</h2>
          <div className="bg-muted p-6 rounded-lg">
            <p className="text-muted-foreground mb-4">
              Configure Feature Ship with your project settings:
            </p>
            <div className="bg-background p-4 rounded border">
              <pre className="text-sm">
                {`// feature-ship.config.js
module.exports = {
  project: {
    name: "my-feature-project",
    version: "1.0.0",
    description: "My awesome feature project"
  },
  features: {
    autoSave: true,
    notifications: true,
    analytics: true
  },
  integrations: {
    slack: {
      enabled: true,
      webhook: "YOUR_SLACK_WEBHOOK"
    },
    jira: {
      enabled: false
    }
  }
}`}
              </pre>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Environment Setup</h2>
          <div className="space-y-4">
            <div className="p-6 border rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Firebase Configuration</h3>
              <p className="text-muted-foreground mb-4">
                Set up Firebase for backend services:
              </p>
              <div className="bg-background p-4 rounded border">
                <pre className="text-sm">
                  {`// Initialize Firebase
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);`}
                </pre>
              </div>
            </div>

            <div className="p-6 border rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Environment Variables</h3>
              <p className="text-muted-foreground mb-4">
                Create a .env file with your configuration:
              </p>
              <div className="bg-background p-4 rounded border">
                <pre className="text-sm">
                  {`# .env
FEATURE_SHIP_API_KEY=your_api_key_here
FEATURE_SHIP_PROJECT_ID=your_project_id
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Verification</h2>
          <div className="bg-muted p-6 rounded-lg">
            <p className="text-muted-foreground mb-4">
              Verify your installation is working correctly:
            </p>
            <div className="bg-background p-4 rounded border">
              <pre className="text-sm">
                {`// Test your installation
import { FeatureShip } from '@feature-ship/core';

const featureShip = new FeatureShip({
  apiKey: process.env.FEATURE_SHIP_API_KEY
});

// Test connection
featureShip.testConnection()
  .then(() => console.log('✅ Feature Ship connected successfully!'))
  .catch(error => console.error('❌ Connection failed:', error));`}
              </pre>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Next Steps</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Quick Start Guide</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Learn the basics and create your first feature.
              </p>
              <Link
                href="/documentation/getting-started"
                className="text-blue-600 hover:underline text-sm"
              >
                Start Building →
              </Link>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Explore Features</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Discover all the powerful features available.
              </p>
              <Link
                href="/documentation/features"
                className="text-blue-600 hover:underline text-sm"
              >
                View Features →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
