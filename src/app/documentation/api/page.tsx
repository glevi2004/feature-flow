export default function ApiPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">API Reference</h1>
        <p className="text-xl text-muted-foreground">
          Complete API documentation for integrating with Feature Ship.
        </p>
      </div>

      <div className="space-y-8">
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Authentication</h2>
          <div className="bg-muted p-6 rounded-lg">
            <p className="text-muted-foreground mb-4">
              Feature Ship uses API keys for authentication. Include your API
              key in the Authorization header.
            </p>
            <div className="bg-background p-4 rounded border">
              <code className="text-sm">
                Authorization: Bearer YOUR_API_KEY
              </code>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Endpoints</h2>

          <div className="space-y-6">
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted px-6 py-4 border-b">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                    GET
                  </span>
                  <code className="text-sm">/api/features</code>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-semibold mb-2">List Features</h3>
                <p className="text-muted-foreground mb-4">
                  Retrieve a list of all features in your project.
                </p>
                <div className="bg-muted p-4 rounded">
                  <pre className="text-sm">
                    {`GET /api/features
Authorization: Bearer YOUR_API_KEY

Response:
{
  "features": [
    {
      "id": "feature_123",
      "name": "User Authentication",
      "description": "Implement user login and registration",
      "status": "in_progress",
      "priority": "high",
      "created_at": "2024-01-15T10:30:00Z"
    }
  ]
}`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted px-6 py-4 border-b">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                    POST
                  </span>
                  <code className="text-sm">/api/features</code>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-semibold mb-2">Create Feature</h3>
                <p className="text-muted-foreground mb-4">
                  Create a new feature in your project.
                </p>
                <div className="bg-muted p-4 rounded">
                  <pre className="text-sm">
                    {`POST /api/features
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json

{
  "name": "New Feature",
  "description": "Feature description",
  "priority": "medium",
  "assignee_id": "user_123"
}

Response:
{
  "id": "feature_456",
  "name": "New Feature",
  "description": "Feature description",
  "status": "todo",
  "priority": "medium",
  "created_at": "2024-01-15T11:00:00Z"
}`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted px-6 py-4 border-b">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-medium">
                    PUT
                  </span>
                  <code className="text-sm">/api/features/{"{id}"}</code>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-semibold mb-2">Update Feature</h3>
                <p className="text-muted-foreground mb-4">
                  Update an existing feature.
                </p>
                <div className="bg-muted p-4 rounded">
                  <pre className="text-sm">
                    {`PUT /api/features/feature_123
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json

{
  "name": "Updated Feature Name",
  "status": "in_progress",
  "priority": "high"
}

Response:
{
  "id": "feature_123",
  "name": "Updated Feature Name",
  "status": "in_progress",
  "priority": "high",
  "updated_at": "2024-01-15T12:00:00Z"
}`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted px-6 py-4 border-b">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-medium">
                    DELETE
                  </span>
                  <code className="text-sm">/api/features/{"{id}"}</code>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-semibold mb-2">Delete Feature</h3>
                <p className="text-muted-foreground mb-4">
                  Delete a feature from your project.
                </p>
                <div className="bg-muted p-4 rounded">
                  <pre className="text-sm">
                    {`DELETE /api/features/feature_123
Authorization: Bearer YOUR_API_KEY

Response:
{
  "success": true,
  "message": "Feature deleted successfully"
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Error Codes</h2>
          <div className="bg-muted p-6 rounded-lg">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">400 - Bad Request</h3>
                <p className="text-sm text-muted-foreground">
                  The request was malformed or missing required parameters.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">401 - Unauthorized</h3>
                <p className="text-sm text-muted-foreground">
                  Invalid or missing API key.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">404 - Not Found</h3>
                <p className="text-sm text-muted-foreground">
                  The requested resource was not found.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">429 - Rate Limited</h3>
                <p className="text-sm text-muted-foreground">
                  Too many requests. Please wait before making another request.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">500 - Server Error</h3>
                <p className="text-sm text-muted-foreground">
                  An internal server error occurred.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
