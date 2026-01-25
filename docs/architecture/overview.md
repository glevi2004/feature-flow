# Architecture Documentation

## Overview

Feature Ship is a multi-tenant feedback management platform built with a modern serverless architecture.

## Tech Stack

- **Frontend:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Radix UI
- **Backend:** Firebase (Firestore, Auth, Storage)
- **Server-side Logic:** Next.js API Routes (using Firebase Admin SDK)

## Core Concepts

### Multi-tenancy
The application is designed around **Companies**. Most data (feedback posts, tags, types) is scoped to a `companyId`. Users can be members of multiple companies.

### Data Flow
1. **Client-side:** Most data fetching for the dashboard and public portal happens directly via the Firebase Client SDK for real-time updates.
2. **Server-side (API Routes):** Privileged operations that require strict validation or audit logging (like changing a post's status or creating tags) are handled via Next.js API routes.
3. **Security:** Protected by Firebase Security Rules at the database level and manual checks in API routes using the Firebase Admin SDK.

## Key Directories

- `src/app/`: Contains all routes and pages.
  - `(auth)/`: Authentication flow.
  - `[company]/`: The core multi-tenant routes (dashboard and public portal).
  - `api/`: Server-side endpoints for privileged operations.
- `src/lib/services/`: Business logic encapsulated into service classes/objects.
- `src/components/`: UI components, split into `ui/` (base components) and feature-specific components.
- `src/contexts/`: React Contexts for global state (Auth, Filters).

## Security Model

- **Authentication:** Firebase Authentication (Google, GitHub, Email/Password).
- **Authorization:** 
  - Firestore Security Rules ensure users can only read/write data they have access to.
  - API routes verify company membership before allowing modifications.
- **Audit Trail:** Privileged actions are recorded in an `audit_logs` collection for accountability.
