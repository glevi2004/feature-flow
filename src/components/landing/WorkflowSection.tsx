import { ArrowRight, MessageSquare, Users, CheckCircle, BarChart3 } from "lucide-react";

export function WorkflowSection() {
  return (
    <section
      id="workflow"
      className="bg-background container mx-auto px-4 py-20 scroll-mt-15"
    >
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4 text-foreground">
          How It Works
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A simple, powerful workflow to collect, manage, and act on customer feedback
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-foreground">
              1. Collect Feedback
            </h3>
            <p className="text-muted-foreground">
              Customers submit feedback through your public portal or internal channels. 
              All feedback is automatically organized and categorized.
            </p>
          </div>

          {/* Step 2 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-foreground">
              2. Review & Prioritize
            </h3>
            <p className="text-muted-foreground">
              Your team reviews feedback, adds context, and prioritizes based on 
              impact and effort using our kanban board and tagging system.
            </p>
          </div>

          {/* Step 3 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-foreground">
              3. Take Action
            </h3>
            <p className="text-muted-foreground">
              Track progress, update status, and close the loop by notifying 
              customers when their feedback has been implemented.
            </p>
          </div>
        </div>

        {/* Workflow Diagram */}
        <div className="mt-16">
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-foreground">Collect</span>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground" />
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-foreground">Organize</span>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground" />
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-foreground">Act</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
