# Deployment Guide

This guide covers deploying Feature Ship to production.

## Prerequisites

- Node.js 20+
- Firebase project with Firestore, Authentication, and Storage enabled
- Vercel account (recommended) or another Next.js hosting platform

## Environment Setup

### 1. Firebase Configuration

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Firestore Database
3. Enable Authentication (Google, GitHub, Email/Password)
4. Enable Storage
5. Get your Firebase configuration from Project Settings

### 2. Firebase Admin SDK

1. Go to Project Settings > Service Accounts
2. Generate a new private key
3. Save the JSON file securely (never commit to git)
4. Extract the following values:
   - `project_id` → `FIREBASE_PROJECT_ID`
   - `client_email` → `FIREBASE_CLIENT_EMAIL`
   - `private_key` → `FIREBASE_PRIVATE_KEY`

### 3. Deploy Firestore Rules

```bash
firebase deploy --only firestore:rules
```

### 4. Deploy Storage Rules

```bash
firebase deploy --only storage
```

## Vercel Deployment (Recommended)

### 1. Connect Repository

1. Import your repository to Vercel
2. Configure build settings:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`

### 2. Environment Variables

Add all environment variables from `.env.example`:

**Client-side (NEXT_PUBLIC_*):**
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`

**Server-side (API routes):**
- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY` (multiline, preserve newlines)
- `FIREBASE_STORAGE_BUCKET`

### 3. Deploy

Vercel will automatically deploy on every push to your main branch.

## Firebase Hosting (Alternative)

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize (if not already done)
firebase init hosting

# Build
npm run build

# Deploy
firebase deploy --only hosting
```

## Post-Deployment Checklist

- [ ] Verify Firestore rules are deployed
- [ ] Verify Storage rules are deployed
- [ ] Test authentication flows
- [ ] Test public feedback portal
- [ ] Test company creation
- [ ] Verify API routes are working
- [ ] Set up error monitoring (Sentry, etc.)
- [ ] Configure custom domain (if needed)
- [ ] Set up Firebase App Check (recommended)

## Security Considerations

1. **Never commit** `.env` files or Firebase Admin keys
2. **Enable Firebase App Check** for additional security
3. **Review Firestore rules** regularly
4. **Monitor audit logs** for suspicious activity
5. **Set up rate limiting** if needed
6. **Use HTTPS only** in production

## Troubleshooting

### API Routes Not Working

- Verify `FIREBASE_PRIVATE_KEY` is correctly formatted (preserve `\n` characters)
- Check that Firebase Admin SDK is properly initialized
- Review server logs for errors

### Authentication Issues

- Verify Firebase Authentication providers are enabled
- Check authorized domains in Firebase Console
- Ensure OAuth redirect URLs are configured

### Firestore Permission Errors

- Verify Firestore rules are deployed
- Check that rules match your data structure
- Review rule syntax for errors

## Support

For deployment issues, please open an issue on GitHub.
