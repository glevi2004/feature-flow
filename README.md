# Feature Ship

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern, secure feedback platform designed to help teams collect, organize, and prioritize customer feedback effectively. Built with Next.js 15, Firebase, and TypeScript.

**Production-ready, secure, and open source.**

## 🚀 Features

### Core Functionality

- **Feedback Management**: Create, edit, and manage feedback posts with comprehensive filtering
- **Kanban Board**: Visual workflow management with drag-and-drop status updates
- **Public Feedback Portal**: Customer-facing portal for feedback submission and upvoting
- **Tags & Types**: Organize feedback with custom tags and categorization
- **Status Tracking**: Track feedback through various stages (Under Review, Accepted, Rejected, Planned, Completed)
- **User Authentication**: Google OAuth and email/password authentication
- **Multi-company Support**: Users can belong to multiple companies and organizations

### Dashboard Features

- **Main Dashboard**: Overview of all feedback with search and filtering capabilities
- **Kanban View**: Visual board for managing feedback by status
- **Analytics**: Coming soon - insights and metrics dashboard
- **Notifications**: User notification management
- **Settings**: Comprehensive configuration options

### Settings & Configuration

- **Company Management**: Manage company information and branding
- **Organization Management**: Team members, roles, and permissions
- **Feedback Site Customization**: Customize public feedback portal
- **Account Settings**: User profile and account management
- **Status Management**: Configure feedback statuses
- **Tags Management**: Create and manage feedback tags
- **Types Management**: Define feedback types and categories

## 🏗️ Architecture

### Tech Stack

- **Frontend**: Next.js 15 with App Router
- **UI Framework**: React 19 with TypeScript
- **Styling**: Tailwind CSS with custom theme system
- **UI Components**: Radix UI primitives with custom styling
- **Backend**: Firebase (Firestore, Authentication, Storage)
- **State Management**: React Context API
- **Icons**: Lucide React
- **Theme**: next-themes for dark/light mode support

### Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication pages
│   │   ├── login/
│   │   ├── register/
│   │   └── verify-email/
│   ├── [company]/                # Company-specific routes
│   │   ├── dashboard/            # Main dashboard
│   │   │   ├── analytics/        # Analytics (coming soon)
│   │   │   ├── kanban/          # Kanban board
│   │   │   ├── notifications/   # Notifications
│   │   │   └── settings/        # Settings pages
│   │   └── page.tsx             # Public feedback portal
│   ├── documentation/            # Documentation pages
│   └── page.tsx                 # Landing page
├── components/                   # Reusable components
│   ├── ui/                      # Base UI components
│   ├── landing/                 # Landing page components
│   └── app-sidebar.tsx          # Dashboard sidebar
├── contexts/                    # React contexts
│   ├── AuthContext.tsx          # Authentication state
│   ├── DashboardFilterContext.tsx # Dashboard filters
│   └── PublicAuthContext.tsx    # Public portal auth
├── hooks/                       # Custom React hooks
├── lib/                         # Utilities and services
│   ├── firebase/                # Firebase configuration
│   ├── services/                # Business logic services
│   │   ├── company.ts           # Company management
│   │   ├── feedback.ts          # Feedback operations
│   │   ├── organization.ts      # Organization management
│   │   ├── tags.ts              # Tag management
│   │   ├── user.ts              # User management
│   │   └── onboarding.ts        # Onboarding flow
│   └── utils.ts                 # Utility functions
└── types/                       # TypeScript type definitions
```

## 🔧 Services Architecture

### Core Services

#### UserService

- User data management and authentication
- Last login tracking
- Multi-company user associations

#### CompanyService

- Company creation and management
- Logo and branding management
- Company-specific data operations

#### OrganizationService

- Team and organization management
- User role management within organizations
- Permission handling

#### FeedbackService

- CRUD operations for feedback posts
- Status management and updates
- Comment and upvote functionality
- Search and filtering capabilities

#### TagsService

- Custom tag creation and management
- Tag-based feedback organization
- Color-coded categorization

#### OnboardingService

- New user onboarding flow
- Company and organization setup
- Initial configuration

## 🎨 UI/UX Features

### Design System

- **Theme Support**: Light and dark mode with system preference detection
- **Responsive Design**: Mobile-first approach with responsive breakpoints
- **Accessibility**: ARIA-compliant components with keyboard navigation
- **Consistent Styling**: Unified design language across all components

### Landing Page

- **Hero Section**: Clear value proposition with call-to-action buttons
- **Features Grid**: Showcase of actual implemented features
- **Workflow Section**: Step-by-step process explanation
- **Call-to-Action**: Conversion-focused sections
- **Footer**: Minimal, clean footer with branding

### Dashboard Interface

- **Sidebar Navigation**: Collapsible sidebar with main navigation
- **Filter System**: Advanced filtering and search capabilities
- **Status Management**: Visual status indicators and updates
- **Real-time Updates**: Live data synchronization
- **Toast Notifications**: User feedback and error handling

## 🔐 Authentication & Security

### Authentication Methods

- **Google OAuth**: One-click sign-in with Google
- **GitHub OAuth**: GitHub-based authentication
- **Email/Password**: Traditional email authentication
- **Email Verification**: Account verification system

### Security Features

- **Firebase Security Rules**: Strict database-level security with tenant isolation
- **Firebase Storage Rules**: Secure file uploads with size and type restrictions
- **User Data Protection**: Secure user data handling with least-privilege access
- **Role-based Access**: Company membership-based permissions
- **Server-side Authorization**: Privileged operations (status/tags/types) handled via API routes
- **Audit Logging**: All privileged actions are logged for security monitoring
- **Schema Validation**: Input validation in Firestore rules prevents data tampering
- **Public/Private Data Separation**: Company directory for public lookups, private data protected
- **Session Management**: Secure session handling with token refresh

## 📊 Data Models

### Core Entities

#### User

```typescript
interface UserData {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  emailVerified?: boolean;
  companies?: string[];
  organizations?: string[];
  onboardingInfoId?: string;
  createdAt: Date | Timestamp;
  lastLoginAt: Date | Timestamp;
  updatedAt?: Date | Timestamp;
}
```

#### Feedback Post

```typescript
interface FeedbackPost {
  id?: string;
  companyId: string;
  userId: string;
  userName?: string;
  title: string;
  description: string;
  types: string[];
  tags: string[];
  status: FeedbackStatus;
  upvotes: string[];
  upvotesCount: number;
  commentsCount: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

#### Company

```typescript
interface CompanyData {
  id?: string;
  name: string;
  logo?: string;
  website?: string;
  teamSize?: string;
  createdAt: Date | Timestamp;
  updatedAt: Date | Timestamp;
}
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- npm, yarn, pnpm, or bun
- Firebase project setup with Firestore, Authentication, and Storage enabled

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd feature-flow
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Setup**
   Create a `.env.local` file with your Firebase configuration (see `.env.example`):

   **Client-side variables:**
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

   **Server-side variables (for API routes):**
   ```env
   FIREBASE_PROJECT_ID=your_project_id
   FIREBASE_CLIENT_EMAIL=your_service_account_email
   FIREBASE_PRIVATE_KEY=your_private_key_here
   FIREBASE_STORAGE_BUCKET=your_storage_bucket
   ```

   > **Note**: Get Firebase Admin credentials from Firebase Console > Project Settings > Service Accounts

4. **Deploy Firestore and Storage Rules**

   ```bash
   firebase deploy --only firestore:rules,storage
   ```

5. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Migration from Previous Versions

If you're upgrading from a previous version, see [MIGRATION.md](./MIGRATION.md) for data migration steps.

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Structure

- **Components**: Reusable UI components in `src/components/`
- **Pages**: Next.js pages in `src/app/`
- **API Routes**: Server-side API routes in `src/app/api/` (privileged operations)
- **Services**: Business logic in `src/lib/services/`
- **Contexts**: State management in `src/contexts/`
- **Hooks**: Custom React hooks in `src/hooks/`
- **Types**: TypeScript definitions throughout the codebase

### Key Features Implementation

- **Theme System**: Implemented with next-themes and CSS variables
- **Responsive Design**: Mobile-first with Tailwind CSS
- **State Management**: React Context for global state
- **Data Fetching**: Firebase SDK with real-time updates
- **Form Handling**: Controlled components with validation
- **Security**: Server-side authorization via API routes with Firebase Admin SDK
- **Audit Logging**: All privileged actions logged to `audit_logs` collection

## 🚀 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Start (Vercel)

1. Connect your GitHub repository to Vercel
2. Set all environment variables (see `.env.example`)
3. Deploy Firestore and Storage rules: `firebase deploy --only firestore:rules,storage`
4. Deploy automatically on push to main branch

### Other Platforms

- **Netlify**: Compatible with Next.js
- **Firebase Hosting**: Direct integration with Firebase
- **Docker**: Containerized deployment option

### Post-Deployment

- [ ] Verify Firestore rules are deployed
- [ ] Verify Storage rules are deployed
- [ ] Test authentication flows
- [ ] Test public feedback portal
- [ ] Verify API routes are working
- [ ] Set up error monitoring (Sentry, etc.)
- [ ] Enable Firebase App Check (recommended)

## 📈 Roadmap

### Coming Soon

- **Analytics Dashboard**: Comprehensive metrics and insights
- **Advanced Integrations**: Jira, Linear, Slack, and more
- **AI-Powered Features**: Smart categorization and insights
- **Mobile App**: Native mobile application
- **API Access**: RESTful API for third-party integrations

### Future Enhancements

- **Advanced Reporting**: Custom report generation
- **Workflow Automation**: Automated status updates and notifications
- **Team Collaboration**: Enhanced team features and permissions
- **Custom Fields**: Configurable feedback fields
- **Export Capabilities**: Data export in various formats

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## 🔒 Security

For security vulnerabilities, please see [SECURITY.md](./SECURITY.md).

## 📚 Additional Documentation

- [Deployment Guide](./DEPLOYMENT.md) - Detailed deployment instructions
- [Migration Guide](./MIGRATION.md) - Migrating from previous versions
- [Contributing Guide](./CONTRIBUTING.md) - How to contribute
- [Code of Conduct](./CODE_OF_CONDUCT.md) - Community guidelines

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Contact the development team
- Check the documentation section

---

Built with ❤️ using Next.js, Firebase, and modern web technologies.
