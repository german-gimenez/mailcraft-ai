import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {
  Plus,
  Search,
  Eye,
  Edit,
  Copy,
  Trash2,
  Sparkles,
  Crown,
} from "lucide-react";

export default async function TemplatesPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const templates = [
    {
      id: "1",
      name: "Holiday Special Offer",
      category: "Promotional",
      type: "Custom",
      thumbnail: "🎄",
      description: "Perfect for holiday sales and special promotions",
      lastModified: "2024-12-20",
      uses: 12,
      performance: "High",
      isPremium: false,
    },
    {
      id: "2",
      name: "Product Launch Newsletter",
      category: "Newsletter",
      type: "AI Generated",
      thumbnail: "🚀",
      description: "Announce new products with style and excitement",
      lastModified: "2024-12-18",
      uses: 8,
      performance: "Medium",
      isPremium: true,
    },
    {
      id: "3",
      name: "Welcome Series - Onboarding",
      category: "Welcome",
      type: "Template",
      thumbnail: "👋",
      description: "Perfect first impression for new subscribers",
      lastModified: "2024-12-15",
      uses: 24,
      performance: "High",
      isPremium: false,
    },
    {
      id: "4",
      name: "Customer Feedback Survey",
      category: "Survey",
      type: "AI Generated",
      thumbnail: "📊",
      description: "Collect valuable feedback from your customers",
      lastModified: "2024-12-12",
      uses: 6,
      performance: "Medium",
      isPremium: true,
    },
    {
      id: "5",
      name: "Re-engagement Campaign",
      category: "Re-engagement",
      type: "Custom",
      thumbnail: "💡",
      description: "Win back inactive subscribers effectively",
      lastModified: "2024-12-10",
      uses: 15,
      performance: "High",
      isPremium: false,
    },
    {
      id: "6",
      name: "Black Friday Mega Sale",
      category: "Promotional",
      type: "Template",
      thumbnail: "🖤",
      description: "High-converting Black Friday email template",
      lastModified: "2024-11-25",
      uses: 18,
      performance: "Very High",
      isPremium: true,
    },
  ];

  const categories = [
    "All",
    "Promotional",
    "Newsletter",
    "Welcome",
    "Survey",
    "Re-engagement",
  ];
  const types = ["All", "Custom", "AI Generated", "Template"];

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case "Very High":
        return "text-green-700 bg-green-100";
      case "High":
        return "text-green-600 bg-green-50";
      case "Medium":
        return "text-yellow-600 bg-yellow-50";
      case "Low":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "AI Generated":
        return <Sparkles className="w-4 h-4 text-purple-600" />;
      case "Custom":
        return <Edit className="w-4 h-4 text-blue-600" />;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout
      title="Templates"
      subtitle="Create and manage your email templates"
      userRole="admin"
    >
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button className="flex items-center gap-2">
              <Plus size={18} />
              New Template
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Sparkles size={18} />
              AI Generator
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
                placeholder="Search templates..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
              />
            </div>
            <select
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Filter by category"
              title="Filter by category"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <select
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Filter by type"
              title="Filter by type"
            >
              {types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="text-2xl">📧</div>
              <span className="text-sm text-green-600 font-medium">
                +6 this month
              </span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {templates.length}
            </div>
            <div className="text-sm text-gray-600">Total Templates</div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <Sparkles className="text-purple-600 w-8 h-8" />
              <span className="text-sm text-purple-600 font-medium">
                AI Powered
              </span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {templates.filter((t) => t.type === "AI Generated").length}
            </div>
            <div className="text-sm text-gray-600">AI Generated</div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="text-2xl">📈</div>
              <span className="text-sm text-green-600 font-medium">+15%</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {templates.reduce((sum, t) => sum + t.uses, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Uses</div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <Crown className="text-yellow-600 w-8 h-8" />
              <span className="text-sm text-yellow-600 font-medium">
                Premium
              </span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {templates.filter((t) => t.isPremium).length}
            </div>
            <div className="text-sm text-gray-600">Premium Templates</div>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div
              key={template.id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all group"
            >
              {/* Template Preview */}
              <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 h-48 flex items-center justify-center">
                <div className="text-6xl">{template.thumbnail}</div>
                {template.isPremium && (
                  <div className="absolute top-3 right-3">
                    <Crown className="text-yellow-500 w-5 h-5" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      <Eye size={14} />
                      Preview
                    </Button>
                    <Button size="sm" className="flex items-center gap-1">
                      <Edit size={14} />
                      Edit
                    </Button>
                  </div>
                </div>
              </div>

              {/* Template Info */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900 text-sm">
                      {template.name}
                    </h3>
                    {getTypeIcon(template.type)}
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      className="p-1 hover:bg-gray-100 rounded text-gray-500"
                      title="Duplicate template"
                      aria-label="Duplicate template"
                    >
                      <Copy size={14} />
                    </button>
                    <button
                      className="p-1 hover:bg-gray-100 rounded text-gray-500"
                      title="Delete template"
                      aria-label="Delete template"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                  {template.description}
                </p>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                      {template.category}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      {template.type}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{template.uses} uses</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getPerformanceColor(
                      template.performance
                    )}`}
                  >
                    {template.performance}
                  </span>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      Modified {template.lastModified}
                    </span>
                    <Button size="sm" variant="outline">
                      Use Template
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* AI Template Generator CTA */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-8 border border-indigo-200">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="text-white w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Create with AI
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Let our AI create personalized email templates for your brand.
              Just describe what you need, and we&apos;ll generate professional
              templates in seconds.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button className="flex items-center gap-2">
                <Sparkles size={18} />
                Generate Template
              </Button>
              <Button variant="outline">Learn More</Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
