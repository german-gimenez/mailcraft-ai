import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <DashboardLayout
      title="Dashboard"
      subtitle="Welcome back, here's your overview"
      userRole="admin"
    >
      <div className="space-y-6">
        {/* AI Features Highlight */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: "Email Generator",
              description: "Create emails with AI",
              color: "indigo",
              icon: "✨",
            },
            {
              title: "Subject Optimizer",
              description: "Boost open rates",
              color: "purple",
              icon: "🎯",
            },
            {
              title: "Smart Templates",
              description: "AI-powered designs",
              color: "pink",
              icon: "📧",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className={`bg-gradient-to-br from-${feature.color}-50 to-${feature.color}-100 rounded-xl p-6 border border-${feature.color}-200 hover:shadow-lg transition-all cursor-pointer`}
            >
              <div className="text-2xl mb-3">{feature.icon}</div>
              <h3 className="font-bold text-gray-900 mb-1">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              label: "Total Contacts",
              value: "2,543",
              change: "+12.5%",
              color: "text-blue-600",
              icon: "👥",
            },
            {
              label: "Campaigns Sent",
              value: "47",
              change: "+8%",
              color: "text-green-600",
              icon: "📤",
            },
            {
              label: "Open Rate",
              value: "42.5%",
              change: "+3.2%",
              color: "text-purple-600",
              icon: "📊",
            },
            {
              label: "Credits Used",
              value: "8,450",
              change: "/ 50,000",
              color: "text-orange-600",
              icon: "💳",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-2xl">{stat.icon}</div>
                <span
                  className={`text-sm font-medium ${
                    stat.change.startsWith("+")
                      ? "text-green-600"
                      : "text-gray-500"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Recent Campaigns */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">
              Recent Campaigns
            </h2>
            <button className="text-indigo-600 hover:text-indigo-700 font-medium text-sm">
              View All
            </button>
          </div>
          <div className="p-6 space-y-4">
            {[
              {
                name: "Holiday Special Offer",
                sent: "2,847",
                opens: "1,210",
                status: "Sent",
                date: "2 days ago",
              },
              {
                name: "Product Update Newsletter",
                sent: "2,500",
                opens: "1,050",
                status: "Sent",
                date: "1 week ago",
              },
              {
                name: "Welcome Series - Part 1",
                sent: "1,200",
                opens: "856",
                status: "Active",
                date: "2 weeks ago",
              },
            ].map((campaign) => (
              <div
                key={campaign.name}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">
                    {campaign.name}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs mr-2 ${
                        campaign.status === "Sent"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {campaign.status}
                    </span>
                    {campaign.date}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">
                    Sent: {campaign.sent}
                  </div>
                  <div className="text-sm text-gray-600">
                    Opens: {campaign.opens}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
