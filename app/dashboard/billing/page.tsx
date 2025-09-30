import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {
  CreditCard,
  Zap,
  TrendingUp,
  Calendar,
  Check,
  Crown,
} from "lucide-react";

export default async function BillingPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const currentPlan = {
    name: "FREE",
    creditsTotal: 50000, // 5 créditos = 50,000 emails
    creditsUsed: 8450,
    creditsRemaining: 41550,
    nextRefill: "2025-01-30",
    autoRefill: false,
  };

  const creditPacks = [
    {
      id: "starter",
      name: "Starter Pack",
      credits: 1,
      emails: 10000,
      price: 50,
      popular: false,
      features: [
        "10,000 emails",
        "Basic AI content generation",
        "Email analytics",
        "Standard templates",
      ],
    },
    {
      id: "growth",
      name: "Growth Pack",
      credits: 5,
      emails: 50000,
      price: 200,
      originalPrice: 250,
      discount: 20,
      popular: true,
      features: [
        "50,000 emails",
        "Advanced AI features",
        "A/B testing",
        "Priority support",
        "Custom templates",
      ],
    },
    {
      id: "scale",
      name: "Scale Pack",
      credits: 15,
      emails: 150000,
      price: 525,
      originalPrice: 750,
      discount: 30,
      popular: false,
      features: [
        "150,000 emails",
        "All AI features",
        "Advanced analytics",
        "White-label options",
        "Dedicated support",
      ],
    },
  ];

  const recentTransactions = [
    {
      id: "1",
      type: "purchase",
      description: "Growth Pack - 5 Credits",
      amount: 200,
      credits: 50000,
      date: "2024-12-20",
      status: "completed",
    },
    {
      id: "2",
      type: "usage",
      description: "Holiday Campaign",
      amount: -2847,
      credits: -2847,
      date: "2024-12-22",
      status: "completed",
    },
    {
      id: "3",
      type: "usage",
      description: "Product Newsletter",
      amount: -2500,
      credits: -2500,
      date: "2024-12-16",
      status: "completed",
    },
  ];

  return (
    <DashboardLayout
      title="Billing & Credits"
      subtitle="Manage your credits and billing settings"
      userRole="admin"
    >
      <div className="space-y-6">
        {/* Current Usage Card */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-600 rounded-lg">
                <Zap className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Current Plan
                </h3>
                <p className="text-sm text-gray-600">{currentPlan.name} Plan</p>
              </div>
            </div>
            <Button className="flex items-center gap-2">
              <Crown size={16} />
              Upgrade Plan
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600">
                {currentPlan.creditsUsed.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Emails Used</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">
                {currentPlan.creditsRemaining.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Emails Remaining</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">
                {(
                  (currentPlan.creditsUsed / currentPlan.creditsTotal) *
                  100
                ).toFixed(1)}
                %
              </div>
              <div className="text-sm text-gray-600">Usage</div>
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div
              className={`bg-gradient-to-r from-indigo-600 to-purple-600 h-3 rounded-full transition-all duration-300`}
              style={{
                width: `${Math.min(
                  (currentPlan.creditsUsed / currentPlan.creditsTotal) * 100,
                  100
                )}%`,
              }}
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              Next auto-refill: {currentPlan.nextRefill}
            </span>
            <button className="text-indigo-600 hover:text-indigo-700 font-medium">
              {currentPlan.autoRefill ? "Disable" : "Enable"} auto-refill
            </button>
          </div>
        </div>

        {/* Credit Packs */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Buy Credit Packs
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {creditPacks.map((pack) => (
              <div
                key={pack.id}
                className={`rounded-xl border-2 p-6 relative ${
                  pack.popular
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-gray-200 bg-white"
                } hover:shadow-lg transition-all`}
              >
                {pack.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    {pack.name}
                  </h4>
                  <div className="text-3xl font-bold text-indigo-600 mb-1">
                    ${pack.price}
                    {pack.originalPrice && (
                      <span className="text-lg text-gray-400 line-through ml-2">
                        ${pack.originalPrice}
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-600">
                    {pack.emails.toLocaleString()} emails • {pack.credits}{" "}
                    credit{pack.credits > 1 ? "s" : ""}
                  </div>
                  {pack.discount && (
                    <div className="text-sm text-green-600 font-semibold mt-1">
                      Save {pack.discount}%
                    </div>
                  )}
                </div>

                <ul className="space-y-3 mb-6">
                  {pack.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check
                        size={16}
                        className="text-green-600 flex-shrink-0"
                      />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    pack.popular
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600"
                      : ""
                  }`}
                  variant={pack.popular ? "default" : "outline"}
                >
                  Buy Now
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Recent Transactions
            </h3>
          </div>

          <div className="divide-y divide-gray-200">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="px-6 py-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-2 rounded-lg ${
                      transaction.type === "purchase"
                        ? "bg-green-100"
                        : "bg-blue-100"
                    }`}
                  >
                    {transaction.type === "purchase" ? (
                      <CreditCard className="text-green-600" size={20} />
                    ) : (
                      <TrendingUp className="text-blue-600" size={20} />
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      {transaction.description}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center gap-1">
                      <Calendar size={14} />
                      {transaction.date}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className={`font-semibold ${
                      transaction.type === "purchase"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {transaction.type === "purchase" ? "+" : ""}
                    {transaction.credits.toLocaleString()} emails
                  </div>
                  {transaction.type === "purchase" && (
                    <div className="text-sm text-gray-500">
                      ${transaction.amount}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
