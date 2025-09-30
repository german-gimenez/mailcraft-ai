import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {
  Plus,
  Upload,
  Download,
  Search,
  Filter,
  Mail,
  MoreHorizontal,
  Users,
  UserPlus,
  UserCheck,
} from "lucide-react";

export default async function ContactsPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const contacts = [
    {
      id: "1",
      email: "sarah.johnson@example.com",
      firstName: "Sarah",
      lastName: "Johnson",
      tags: "VIP, Newsletter",
      status: "ACTIVE",
      joinDate: "2024-12-15",
      lastActivity: "2024-12-22",
      campaigns: 5,
      opens: 8,
      clicks: 3,
    },
    {
      id: "2",
      email: "mike.chen@techcorp.com",
      firstName: "Mike",
      lastName: "Chen",
      tags: "Enterprise, Tech",
      status: "ACTIVE",
      joinDate: "2024-11-20",
      lastActivity: "2024-12-20",
      campaigns: 12,
      opens: 15,
      clicks: 7,
    },
    {
      id: "3",
      email: "emily.davis@startup.io",
      firstName: "Emily",
      lastName: "Davis",
      tags: "Startup, Early Adopter",
      status: "UNSUBSCRIBED",
      joinDate: "2024-10-05",
      lastActivity: "2024-12-01",
      campaigns: 8,
      opens: 4,
      clicks: 1,
    },
    {
      id: "4",
      email: "alex.rivera@creative.co",
      firstName: "Alex",
      lastName: "Rivera",
      tags: "Creative, Designer",
      status: "ACTIVE",
      joinDate: "2024-12-10",
      lastActivity: "2024-12-21",
      campaigns: 3,
      opens: 6,
      clicks: 4,
    },
  ];

  const contactStats = {
    total: 2543,
    active: 2401,
    unsubscribed: 142,
    growth: "+12.5%",
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-700";
      case "UNSUBSCRIBED":
        return "bg-red-100 text-red-700";
      case "BOUNCED":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <DashboardLayout
      title="Contacts"
      subtitle="Manage your email contacts and segments"
      userRole="admin"
    >
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button className="flex items-center gap-2">
              <Plus size={18} />
              Add Contact
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Upload size={18} />
              Import CSV
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download size={18} />
              Export
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Search contacts..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Filter size={16} />
              Filter
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <Users className="text-blue-600 w-8 h-8" />
              <span className="text-sm text-green-600 font-medium">
                {contactStats.growth}
              </span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {contactStats.total.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Total Contacts</div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <UserCheck className="text-green-600 w-8 h-8" />
              <span className="text-sm text-gray-500">
                {((contactStats.active / contactStats.total) * 100).toFixed(1)}%
              </span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {contactStats.active.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Active Contacts</div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <UserPlus className="text-indigo-600 w-8 h-8" />
              <span className="text-sm text-green-600 font-medium">+15%</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">124</div>
            <div className="text-sm text-gray-600">New This Month</div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <Mail className="text-purple-600 w-8 h-8" />
              <span className="text-sm text-green-600 font-medium">+8.2%</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">89.5%</div>
            <div className="text-sm text-gray-600">Avg Engagement</div>
          </div>
        </div>

        {/* Contacts Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">
              All Contacts
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">
                {contacts.length} of {contactStats.total.toLocaleString()}
              </span>
              <Button variant="ghost" size="sm">
                <MoreHorizontal size={16} />
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                      aria-label="Select all contacts"
                      title="Select all contacts"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tags
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Campaigns
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Engagement
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Activity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {contacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                        aria-label={`Select ${contact.firstName} ${contact.lastName}`}
                        title={`Select ${contact.firstName} ${contact.lastName}`}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {contact.firstName?.[0]}
                          {contact.lastName?.[0]}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {contact.firstName} {contact.lastName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {contact.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          contact.status
                        )}`}
                      >
                        {contact.status.charAt(0) +
                          contact.status.slice(1).toLowerCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {contact.tags.split(", ").map((tag) => (
                          <span
                            key={`${contact.id}-${tag}`}
                            className="inline-flex px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {contact.campaigns}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {contact.opens} opens, {contact.clicks} clicks
                      </div>
                      <div className="text-xs text-gray-500">
                        {contact.opens > 0
                          ? ((contact.clicks / contact.opens) * 100).toFixed(1)
                          : 0}
                        % CTR
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {contact.lastActivity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button className="text-indigo-600 hover:text-indigo-900">
                          Edit
                        </button>
                        <button className="text-indigo-600 hover:text-indigo-900">
                          View
                        </button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing 1 to {contacts.length} of{" "}
              {contactStats.total.toLocaleString()} contacts
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
