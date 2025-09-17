import { app_name } from "@/lib/constants";
import Image from "next/image";

export function IntegrationsSection() {
  return (
    <section
      id="integrations"
      className="bg-background container mx-auto px-4 py-20 scroll-mt-20"
    >
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4 text-foreground">
          Integrate with Your Workflow
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {app_name} works seamlessly with the tools you already use
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {[
          {
            name: "Slack",
            logo: (
              <Image
                src="/integration-logos/slack.svg"
                alt="Slack"
                width={250}
                height={52}
              />
            ),
            color: "text-[#E01E5A]",
          },
          {
            name: "Jira",
            logo: (
              <div className="flex items-center justify-center gap-3 mt-8">
                <Image
                  src="/integration-logos/jira.png"
                  alt="Jira"
                  width={64}
                  height={64}
                  className="h-16 w-16 "
                />
                <span className="font-bold text-foreground text-5xl">Jira</span>
              </div>
            ),
            color: "text-[#0052CC]",
          },
          {
            name: "ClickUp",
            logo: (
              <div className="mt-8">
                <Image
                  src="/integration-logos/clickup.svg"
                  alt="ClickUp"
                  width={250}
                  height={46}
                  // className="h-12 w-auto mx-auto mb-4"
                />
              </div>
            ),
            color: "text-[#7B68EE]",
          },
        ].map((tool) => (
          <div
            key={tool.name}
            className="bg-card border border-border rounded-xl p-8 text-center shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 relative hover:bg-accent"
          >
            <div className={`${tool.color}`}>{tool.logo}</div>
            {(tool.name === "Jira" || tool.name === "ClickUp") && (
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                <div className="bg-[#238636] text-white text-xs font-medium px-3 py-1 rounded-full shadow-lg">
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
