import { app_name } from "@/lib/constants";

export function IntegrationsSection() {
  return (
    <section
      id="integrations"
      className="container mx-auto px-4 py-20 scroll-mt-20"
    >
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">
          Integrate with Your Workflow
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {app_name} works seamlessly with the tools you already use
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
        {[
          { name: "Slack", icon: "💬" },
          { name: "Jira", icon: "🎯" },
          { name: "Linear", icon: "📋" },
          { name: "Intercom", icon: "💬" },
          { name: "HubSpot", icon: "📊" },
          { name: "Zendesk", icon: "🎧" },
        ].map((tool) => (
          <div
            key={tool.name}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="text-3xl mb-2">{tool.icon}</div>
            <div className="font-semibold text-gray-900 dark:text-white">
              {tool.name}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
