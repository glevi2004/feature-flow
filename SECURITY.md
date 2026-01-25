# Security Policy

## Supported Versions

We release patches for security vulnerabilities. Which versions are eligible for receiving such patches depends on the CVSS v3.0 Rating:

| Version | Supported          |
| ------- | ------------------ |
| Latest  | :white_check_mark: |
| < Latest | :x:                |

## Reporting a Vulnerability

Please report (suspected) security vulnerabilities to **[security@example.com](mailto:security@example.com)**. You will receive a response within 48 hours. If the issue is confirmed, we will release a patch as soon as possible depending on complexity but historically within a few days.

Please include the following information in your report:

- Type of issue (e.g., buffer overflow, SQL injection, cross-site scripting, etc.)
- Full paths of source file(s) related to the manifestation of the issue
- The location of the affected source code (tag/branch/commit or direct URL)
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit the issue

This information will help us triage your report more quickly.

## Security Best Practices

When deploying this application:

1. **Environment Variables**: Never commit `.env` files. Use secure environment variable management in your deployment platform.
2. **Firebase Admin SDK**: Keep your Firebase Admin private key secure. Rotate it regularly.
3. **Firestore Rules**: Review and test your Firestore security rules before deploying to production.
4. **Storage Rules**: Ensure Firebase Storage rules are properly configured.
5. **Rate Limiting**: Consider implementing additional rate limiting for production use.
6. **App Check**: Enable Firebase App Check for additional security.
7. **HTTPS Only**: Always use HTTPS in production.

## Known Security Considerations

- The application uses Firebase Authentication for user management
- Firestore security rules enforce tenant isolation and authorization
- Privileged operations (status updates, tag management) are handled server-side via API routes
- Public feedback portal requires authentication for writes
- Company membership is required for administrative actions
