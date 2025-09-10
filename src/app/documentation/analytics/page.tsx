import Link from "next/link";
import { BarChart3, TrendingUp, Users, Clock, Target, PieChart } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Analytics</h1>
        <p className="text-xl text-muted-foreground">
          Gain insights into your feature development process with comprehensive analytics and reporting.
        </p>
      </div>

      <div className="space-y-8">
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Overview</h2>
          <div className="bg-muted p-6 rounded-lg">
            <p className="text-muted-foreground mb-4">
              Analytics provides valuable insights into your feature development workflow, team performance, 
              and project progress. Use data-driven decisions to optimize your development process and 
              improve team productivity.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
              <div className="text-center p-4">
                <BarChart3 className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                <h3 className="font-medium">Feature Metrics</h3>
                <p className="text-sm text-muted-foreground">Track feature progress</p>
              </div>
              <div className="text-center p-4">
                <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-500" />
                <h3 className="font-medium">Performance Trends</h3>
                <p className="text-sm text-muted-foreground">Monitor improvements</p>
              </div>
              <div className="text-center p-4">
                <Users className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                <h3 className="font-medium">Team Insights</h3>
                <p className="text-sm text-muted-foreground">Understand team dynamics</p>
              </div>
              <div className="text-center p-4">
                <Target className="h-8 w-8 mx-auto mb-2 text-orange-500" />
                <h3 className="font-medium">Goal Tracking</h3>
                <p className="text-sm text-muted-foreground">Measure success</p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Key Metrics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 border rounded-lg">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Feature Development Metrics
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Features Created</span>
                  <span className="font-medium">247</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Completion Rate</span>
                  <span className="font-medium">78%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Average Time to Complete</span>
                  <span className="font-medium">12 days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Features in Progress</span>
                  <span className="font-medium">23</span>
                </div>
              </div>
            </div>

            <div className="p-6 border rounded-lg">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Users className="h-5 w-5" />
                Team Performance
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Active Contributors</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Comments per Feature</span>
                  <span className="font-medium">4.2</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Response Time</span>
                  <span className="font-medium">2.5 hours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Engagement Score</span>
                  <span className="font-medium">8.7/10</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Analytics Dashboard</h2>
          
          <div className="space-y-6">
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted px-6 py-4 border-b">
                <h3 className="text-lg font-semibold">Feature Status Distribution</h3>
              </div>
              <div className="p-6">
                <p className="text-muted-foreground mb-4">
                  Visualize the distribution of features across different statuses to understand your development pipeline.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded">
                    <div className="text-2xl font-bold text-blue-600">45</div>
                    <div className="text-sm text-blue-800">Under Review</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded">
                    <div className="text-2xl font-bold text-green-600">32</div>
                    <div className="text-sm text-green-800">Accepted</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded">
                    <div className="text-2xl font-bold text-purple-600">23</div>
                    <div className="text-sm text-purple-800">In Progress</div>
                  </div>
                  <div className="text-center p-4 bg-emerald-50 rounded">
                    <div className="text-2xl font-bold text-emerald-600">89</div>
                    <div className="text-sm text-emerald-800">Completed</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded">
                    <div className="text-2xl font-bold text-red-600">8</div>
                    <div className="text-sm text-red-800">Rejected</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted px-6 py-4 border-b">
                <h3 className="text-lg font-semibold">Development Velocity</h3>
              </div>
              <div className="p-6">
                <p className="text-muted-foreground mb-4">
                  Track your team's development velocity over time to identify trends and optimize your workflow.
                </p>
                <div className="bg-background p-4 rounded border">
                  <div className="h-32 flex items-end justify-between gap-2">
                    <div className="flex flex-col items-center">
                      <div className="w-8 bg-blue-500 rounded-t" style={{height: '60%'}}></div>
                      <span className="text-xs mt-2">Jan</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-8 bg-blue-500 rounded-t" style={{height: '75%'}}></div>
                      <span className="text-xs mt-2">Feb</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-8 bg-blue-500 rounded-t" style={{height: '85%'}}></div>
                      <span className="text-xs mt-2">Mar</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-8 bg-blue-500 rounded-t" style={{height: '70%'}}></div>
                      <span className="text-xs mt-2">Apr</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-8 bg-blue-500 rounded-t" style={{height: '90%'}}></div>
                      <span className="text-xs mt-2">May</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-8 bg-blue-500 rounded-t" style={{height: '95%'}}></div>
                      <span className="text-xs mt-2">Jun</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Detailed Reports</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 border rounded-lg">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Time Analysis
              </h3>
              <p className="text-muted-foreground mb-4">
                Understand how time is spent across different phases of feature development.
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Review Phase</span>
                  <span>2.3 days avg</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Development Phase</span>
                  <span>8.7 days avg</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Testing Phase</span>
                  <span>1.0 days avg</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Total Cycle Time</span>
                  <span>12.0 days avg</span>
                </div>
              </div>
            </div>

            <div className="p-6 border rounded-lg">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Feature Types
              </h3>
              <p className="text-muted-foreground mb-4">
                Analyze the distribution of different types of features in your pipeline.
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>New Features</span>
                  <span>45%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Enhancements</span>
                  <span>35%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Bug Fixes</span>
                  <span>15%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Technical Debt</span>
                  <span>5%</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Custom Reports</h2>
          <div className="bg-muted p-6 rounded-lg">
            <p className="text-muted-foreground mb-4">
              Create custom reports to track specific metrics that matter to your team and organization.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded">
                <h4 className="font-medium mb-2">Report Builder</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Choose metrics and dimensions</li>
                  <li>• Set date ranges and filters</li>
                  <li>• Customize visualizations</li>
                  <li>• Schedule automated reports</li>
                </ul>
              </div>
              <div className="p-4 border rounded">
                <h4 className="font-medium mb-2">Export Options</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• PDF reports</li>
                  <li>• CSV data export</li>
                  <li>• Email delivery</li>
                  <li>• API access</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Performance Insights</h2>
          <div className="space-y-4">
            <div className="p-4 border-l-4 border-blue-500 bg-blue-50 rounded-r-lg">
              <h3 className="font-medium mb-2">Bottleneck Identification</h3>
              <p className="text-sm text-muted-foreground">
                Identify bottlenecks in your development process by analyzing time spent in each status. 
                Look for features that stay in one status longer than expected.
              </p>
            </div>
            <div className="p-4 border-l-4 border-green-500 bg-green-50 rounded-r-lg">
              <h3 className="font-medium mb-2">Team Productivity</h3>
              <p className="text-sm text-muted-foreground">
                Monitor team productivity metrics to understand individual and collective performance. 
                Use this data to optimize workload distribution and identify training needs.
              </p>
            </div>
            <div className="p-4 border-l-4 border-purple-500 bg-purple-50 rounded-r-lg">
              <h3 className="font-medium mb-2">Quality Metrics</h3>
              <p className="text-sm text-muted-foreground">
                Track quality indicators like rejection rates, rework frequency, and customer satisfaction 
                to ensure your development process maintains high standards.
              </p>
            </div>
            <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50 rounded-r-lg">
              <h3 className="font-medium mb-2">Predictive Analytics</h3>
              <p className="text-sm text-muted-foreground">
                Use historical data to predict project completion times, resource needs, and potential risks. 
                This helps with better planning and resource allocation.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Best Practices</h2>
          <div className="space-y-4">
            <div className="p-4 border-l-4 border-blue-500 bg-blue-50 rounded-r-lg">
              <h3 className="font-medium mb-2">Regular Review</h3>
              <p className="text-sm text-muted-foreground">
                Schedule regular analytics reviews with your team to discuss trends, identify improvements, 
                and celebrate achievements. Make data-driven decisions part of your workflow.
              </p>
            </div>
            <div className="p-4 border-l-4 border-green-500 bg-green-50 rounded-r-lg">
              <h3 className="font-medium mb-2">Set Benchmarks</h3>
              <p className="text-sm text-muted-foreground">
                Establish baseline metrics and set realistic goals for improvement. Track progress over time 
                and adjust your processes based on what the data tells you.
              </p>
            </div>
            <div className="p-4 border-l-4 border-purple-500 bg-purple-50 rounded-r-lg">
              <h3 className="font-medium mb-2">Focus on Actionable Insights</h3>
              <p className="text-sm text-muted-foreground">
                Don't just collect data - use it to make informed decisions. Focus on metrics that directly 
                impact your team's productivity and product quality.
              </p>
            </div>
            <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50 rounded-r-lg">
              <h3 className="font-medium mb-2">Share with Stakeholders</h3>
              <p className="text-sm text-muted-foreground">
                Share relevant analytics with stakeholders to demonstrate progress and value. 
                Use visual reports to make complex data accessible to non-technical audiences.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Related Documentation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Dashboard</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Learn about the dashboard interface and how to access analytics.
              </p>
              <Link
                href="/documentation/dashboard"
                className="text-blue-600 hover:underline text-sm"
              >
                View Dashboard Guide →
              </Link>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">API Reference</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Access analytics data programmatically through our API.
              </p>
              <Link
                href="/documentation/api"
                className="text-blue-600 hover:underline text-sm"
              >
                View API Documentation →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
