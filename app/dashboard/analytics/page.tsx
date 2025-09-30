import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Eye,
  MousePointer,
  Mail,
  Users,
  Download,
  Filter,
} from "lucide-react";

export default async function AnalyticsPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const analyticsData = {
    overview: {
      totalCampaigns: 47,
      totalEmails: 124500,
      avgOpenRate: 42.5,
      avgClickRate: 12.8,
      totalRevenue: 15420,
      period: "Last 30 days",
    },
    topCampaigns: [
      {
        name: "Holiday Special Offer",
        sent: 2847,
        opens: 1210,
        clicks: 342,
        revenue: 4250,
        openRate: 42.5,
        clickRate: 28.3,
      },
      {
        name: "Product Update Newsletter",
        sent: 2500,
        opens: 1050,
        clicks: 275,
        revenue: 1850,
        openRate: 42.0,
        clickRate: 26.2,
      },
      {
        name: "Welcome Series - Part 1",
        sent: 1200,
        opens: 856,
        clicks: 234,
        revenue: 980,
        openRate: 71.3,
        clickRate: 27.3,
      },
    ],
    timeData: [
      { period: "Week 1", opens: 1250, clicks: 340, revenue: 2100 },
      { period: "Week 2", opens: 1450, clicks: 420, revenue: 2800 },
      { period: "Week 3", opens: 1680, clicks: 510, revenue: 3200 },
      { period: "Week 4", opens: 1820, clicks: 580, revenue: 3450 },
    ],
  };

  return (
    <DashboardLayout
      title="Analytics"
      subtitle="Track your email marketing performance"
      userRole="admin"
    >
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <select
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Select time period"
              title="Select time period"
            >
              <option>Last 30 days</option>
              <option>Last 7 days</option>
              <option>Last 3 months</option>
              <option>Last year</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Filter size={16} />
              Filter
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Download size={16} />
              Export Report
            </Button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <Mail className="text-blue-600 w-8 h-8" />
              <TrendingUp className="text-green-600 w-5 h-5" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {analyticsData.overview.totalCampaigns}
            </div>
            <div className="text-sm text-gray-600">Total Campaigns</div>
            <div className="text-xs text-green-600 mt-1">
              +8% from last month
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <Users className="text-purple-600 w-8 h-8" />
              <TrendingUp className="text-green-600 w-5 h-5" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {analyticsData.overview.totalEmails.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Emails Sent</div>
            <div className="text-xs text-green-600 mt-1">
              +12% from last month
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <Eye className="text-green-600 w-8 h-8" />
              <TrendingUp className="text-green-600 w-5 h-5" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {analyticsData.overview.avgOpenRate}%
            </div>
            <div className="text-sm text-gray-600">Avg Open Rate</div>
            <div className="text-xs text-green-600 mt-1">
              +3.2% from last month
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <MousePointer className="text-orange-600 w-8 h-8" />
              <TrendingUp className="text-green-600 w-5 h-5" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {analyticsData.overview.avgClickRate}%
            </div>
            <div className="text-sm text-gray-600">Avg Click Rate</div>
            <div className="text-xs text-green-600 mt-1">
              +1.5% from last month
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <BarChart3 className="text-indigo-600 w-8 h-8" />
              <TrendingDown className="text-red-600 w-5 h-5" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              ${analyticsData.overview.totalRevenue.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Revenue</div>
            <div className="text-xs text-red-600 mt-1">
              -2.1% from last month
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Performance Trends */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Performance Trends
              </h3>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-indigo-600 rounded-full"></div>
                  <span className="text-xs text-gray-600">Opens</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                  <span className="text-xs text-gray-600">Clicks</span>
                </div>
              </div>
            </div>

            {/* Simple chart representation */}
            <div className="space-y-4">
              {analyticsData.timeData.map((week) => (
                <div key={week.period} className="flex items-center gap-4">
                  <div className="w-16 text-sm text-gray-600">
                    {week.period}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(week.opens / 2000) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600 w-12">
                        {week.opens}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(week.clicks / 600) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600 w-12">
                        {week.clicks}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue Trends */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Revenue Trends
              </h3>
              <div className="text-sm text-gray-600">USD</div>
            </div>

            <div className="space-y-4">
              {analyticsData.timeData.map((week) => (
                <div
                  key={week.period}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 text-sm text-gray-600">
                      {week.period}
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${(week.revenue / 4000) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-gray-900">
                    ${week.revenue}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Revenue</span>
                <span className="text-lg font-bold text-green-600">
                  $
                  {analyticsData.timeData
                    .reduce((sum, week) => sum + week.revenue, 0)
                    .toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Top Performing Campaigns */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Top Performing Campaigns
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Campaign
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sent
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Open Rate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Click Rate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Revenue
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Performance
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {analyticsData.topCampaigns.map((campaign) => (
                  <tr key={campaign.name} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {campaign.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {campaign.sent.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-900">
                          {campaign.openRate}%
                        </span>
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{
                              width: `${Math.min(campaign.openRate, 100)}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-900">
                          {campaign.clickRate}%
                        </span>
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{
                              width: `${Math.min(campaign.clickRate, 100)}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                      ${campaign.revenue.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {campaign.openRate > 40 ? (
                          <TrendingUp className="text-green-600 w-4 h-4" />
                        ) : (
                          <TrendingDown className="text-red-600 w-4 h-4" />
                        )}
                        <span
                          className={`text-xs font-semibold ${
                            campaign.openRate > 40
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {campaign.openRate > 40
                            ? "Excellent"
                            : "Needs Improvement"}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
