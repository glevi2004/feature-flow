# API Documentation

This document outlines the internal API endpoints used by the Feature Ship platform. All requests require a valid Firebase ID token in the `Authorization` header unless otherwise specified.

## Authentication

All protected routes expect:
`Authorization: Bearer <FIREBASE_ID_TOKEN>`

## Endpoints

### Feedback Posts

#### Update Post Status
`PATCH /api/posts/[postId]/status`
Updates the status of a feedback post. Requires company membership.

**Request Body:**
```json
{
  "status": "Under Review" | "Accepted" | "Rejected" | "Planned" | "Completed"
}
```

#### Update Post Tags
`PATCH /api/posts/[postId]/tags`
Updates the tags associated with a feedback post. Requires company membership.

**Request Body:**
```json
{
  "tags": ["tagId1", "tagId2"]
}
```

#### Toggle Upvote
`POST /api/posts/[postId]/upvote`
Toggles an upvote for the current user on a feedback post.

**Response:**
```json
{
  "upvoted": true | false
}
```

### Tags

#### Create Tag
`POST /api/tags`
Creates a new feedback tag.

**Request Body:**
```json
{
  "companyId": "string (optional)",
  "name": "string",
  "color": "string (hex code)"
}
```

### Types

#### Create Type
`POST /api/types`
Creates a new feedback type/category.

**Request Body:**
```json
{
  "companyId": "string",
  "name": "string",
  "emoji": "string",
  "color": "string (optional)"
}
```

## Security & Rate Limiting

- **Rate Limiting:** Most endpoints have rate limits (e.g., 10-30 requests per minute per IP).
- **Audit Logging:** All privileged actions (status changes, tag creation, etc.) are logged to the `audit_logs` collection in Firestore.
- **Authorization:** Handled via Firebase Admin SDK in API routes, verifying both the user's identity and their membership in the relevant company.
