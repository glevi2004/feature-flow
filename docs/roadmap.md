# Project Status & Roadmap

## Current Development State

Feature Ship is currently in its MVP/Beta stage. The core functionality for collecting and managing feedback is fully implemented and secure.

### Completed Features
- [x] **Authentication:** Google, GitHub, and Email/Password.
- [x] **Multi-tenancy:** Support for multiple companies/organizations.
- [x] **Feedback Management:** CRUD operations, upvoting, and status tracking.
- [x] **Public Portal:** A customer-facing site for submitting and upvoting feedback.
- [x] **Dashboard:** Internal view for teams to manage feedback.
- [x] **Kanban Board:** Visual status management.
- [x] **Security:** Robust Firestore rules and server-side validation.
- [x] **Audit Logging:** Tracking of all sensitive actions.

## What's Planned Next

### Short-term (Next 1-2 Months)
- **Analytics Dashboard:** Visualizing feedback trends, top contributors, and status distribution.
- **Comments System:** Allowing internal and external discussions on feedback posts.
- **Enhanced Notifications:** Email and in-app alerts for status changes and new comments.
- **Custom Statuses:** Allowing companies to define their own workflow stages.

### Mid-term (3-6 Months)
- **Integrations:** 
  - **Slack:** Push notifications to channels.
  - **Jira/Linear:** Syncing feedback with engineering tasks.
  - **Intercom/Zendesk:** Importing feedback from support tools.
- **AI Insights:** Automated categorization and sentiment analysis of feedback.
- **Public Roadmap:** A dedicated view for customers to see what's being worked on.

### Long-term
- **Mobile Application:** Native iOS and Android apps for on-the-go management.
- **Advanced Permissions:** Granular RBAC (Role-Based Access Control) within companies.
- **White-labeling:** Full custom domain and branding support for the public portal.
