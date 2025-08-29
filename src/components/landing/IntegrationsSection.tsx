import { app_name } from "@/lib/constants";

export function IntegrationsSection() {
  return (
    <section
      id="integrations"
      className="container mx-auto px-4 py-20 scroll-mt-20"
    >
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4 text-white">
          Integrate with Your Workflow
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          {app_name} works seamlessly with the tools you already use
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {[
          {
            name: "Slack",
            logo: (
              <img
                src="/integration-logos/slack.png"
                alt="Slack"
                className="h-12 w-auto mx-auto mb-4"
              />
            ),
            color: "text-[#E01E5A]",
          },
          {
            name: "Jira",
            logo: (
              <div className="flex items-center justify-center gap-3">
                <img
                  src="/integration-logos/jira.png"
                  alt="Jira"
                  className="h-12 w-auto"
                />
                <span className="font-semibold text-white text-5xl">Jira</span>
              </div>
            ),
            color: "text-[#0052CC]",
          },
          {
            name: "ClickUp",
            logo: (
              <img
                src="/integration-logos/clickup.png"
                alt="ClickUp"
                className="h-12 w-auto mx-auto mb-4"
              />
            ),
            color: "text-[#7B68EE]",
          },
        ].map((tool) => (
          <div
            key={tool.name}
            className="bg-white/10 border border-white/20 rounded-xl p-8 text-center shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 relative"
          >
            <div className={`${tool.color}`}>{tool.logo}</div>
            {(tool.name === "Jira" || tool.name === "ClickUp") && (
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                <div className="bg-blue-600/90 text-blue-100 text-xs font-medium px-3 py-1 rounded-full shadow-lg">
                  In Development
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
