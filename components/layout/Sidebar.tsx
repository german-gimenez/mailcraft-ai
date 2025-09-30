"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useClerk, useUser } from "@clerk/nextjs";
import { useUserRole, usePermissions } from "@/lib/hooks/useUserRole";
import {
  Sparkles,
  LayoutDashboard,
  Send,
  Users,
  FileText,
  TrendingUp,
  Palette,
  CreditCard,
  Settings,
  Building2,
  ChevronDown,
  Search,
  Crown,
  Shield,
  LogOut,
  Globe,
  Database,
  UserCog,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number }>;
  href: string;
  roles: string[];
  badge?: string;
}

interface SidebarProps {
  currentOrg?: {
    id: string;
    name: string;
    plan: string;
    creditsUsed: number;
    creditsTotal: number;
  };
}

const navigation: {
  main: NavigationItem[];
  workspace: NavigationItem[];
  settings: NavigationItem[];
  superadmin: NavigationItem[];
} = {
  main: [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      roles: ["super_admin", "admin", "user"],
    },
    {
      id: "ai-tools",
      label: "AI Tools",
      icon: Sparkles,
      href: "/dashboard/ai-tools",
      badge: "NEW",
      roles: ["super_admin", "admin", "user"],
    },
  ],
  workspace: [
    {
      id: "campaigns",
      label: "Campaigns",
      icon: Send,
      href: "/dashboard/campaigns",
      roles: ["super_admin", "admin", "user"],
    },
    {
      id: "contacts",
      label: "Contacts",
      icon: Users,
      href: "/dashboard/contacts",
      roles: ["super_admin", "admin", "user"],
    },
    {
      id: "templates",
      label: "Templates",
      icon: FileText,
      href: "/dashboard/templates",
      roles: ["super_admin", "admin", "user"],
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: TrendingUp,
      href: "/dashboard/analytics",
      roles: ["super_admin", "admin"],
    },
  ],
  settings: [
    {
      id: "brand",
      label: "Brand Kit",
      icon: Palette,
      href: "/dashboard/brand",
      roles: ["super_admin", "admin"],
    },
    {
      id: "billing",
      label: "Billing",
      icon: CreditCard,
      href: "/dashboard/billing",
      roles: ["super_admin", "admin"],
    },
    {
      id: "team",
      label: "Team",
      icon: Users,
      href: "/dashboard/team",
      roles: ["super_admin", "admin"],
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
      roles: ["super_admin", "admin", "user"],
    },
  ],
  superadmin: [
    {
      id: "organizations",
      label: "Organizations",
      icon: Building2,
      href: "/dashboard/organizations",
      roles: ["super_admin"],
    },
    {
      id: "all-users",
      label: "All Users",
      icon: UserCog,
      href: "/dashboard/all-users",
      roles: ["super_admin"],
    },
    {
      id: "languages",
      label: "Languages",
      icon: Globe,
      href: "/dashboard/languages",
      roles: ["super_admin"],
    },
    {
      id: "global-billing",
      label: "Global Billing",
      icon: Database,
      href: "/dashboard/global-billing",
      roles: ["super_admin"],
    },
  ],
};

export function Sidebar({ currentOrg }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useClerk();
  const { user } = useUser();
  const userRole = useUserRole(); // Get real user role
  const [showOrgSwitcher, setShowOrgSwitcher] = useState(false);

  const filteredNavigation = (section: keyof typeof navigation) => {
    return (
      navigation[section]?.filter((item) => item.roles.includes(userRole)) || []
    );
  };

  const isActive = (href: string) => {
    return (
      pathname === href || (href !== "/dashboard" && pathname.startsWith(href))
    );
  };

  const getUserRoleLabel = (role: string) => {
    if (role === "super_admin") return "Super Admin";
    if (role === "admin") return "Admin";
    return "User";
  };

  const handleLogout = async () => {
    try {
      await signOut();
      router.push("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0">
      {/* Logo & Org Switcher */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Sparkles className="text-white" size={20} />
          </div>
          <div>
            <h1 className="font-bold text-lg bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              MailCraft AI
            </h1>
          </div>
        </div>

        {/* Organization Switcher */}
        {userRole !== "super_admin" && currentOrg && (
          <div className="relative">
            <button
              onClick={() => setShowOrgSwitcher(!showOrgSwitcher)}
              className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
            >
              <div className="flex items-center gap-2">
                <Building2 size={16} className="text-gray-600" />
                <span className="text-sm font-medium text-gray-900">
                  {currentOrg.name}
                </span>
              </div>
              <ChevronDown size={16} className="text-gray-400" />
            </button>

            {showOrgSwitcher && (
              <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10 p-2">
                <div className="p-2 hover:bg-gray-50 rounded-md cursor-pointer">
                  <div className="font-medium text-sm text-gray-900">
                    {currentOrg.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {currentOrg.plan} Plan
                  </div>
                </div>
                <div className="border-t border-gray-200 mt-2 pt-2">
                  <button className="w-full text-left p-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded-md">
                    + Create Organization
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Search */}
      <div className="px-4 py-3">
        <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg text-gray-500 text-sm cursor-pointer hover:bg-gray-200 transition-colors">
          <Search size={16} />
          <span>Quick search...</span>
          <kbd className="ml-auto px-1.5 py-0.5 bg-white rounded text-xs">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2 space-y-6 overflow-y-auto">
        {/* Main */}
        {filteredNavigation("main").length > 0 && (
          <div>
            {filteredNavigation("main").map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all mb-1",
                    active
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={18} />
                    <span className="font-medium text-sm">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        )}

        {/* Workspace */}
        {filteredNavigation("workspace").length > 0 && (
          <div>
            <div className="px-3 text-xs font-semibold text-gray-500 uppercase mb-2">
              Workspace
            </div>
            {filteredNavigation("workspace").map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all mb-1",
                    active
                      ? "bg-purple-100 text-purple-700"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  )}
                >
                  <Icon size={18} />
                  <span className="font-medium text-sm">{item.label}</span>
                </Link>
              );
            })}
          </div>
        )}

        {/* Settings */}
        {filteredNavigation("settings").length > 0 && (
          <div>
            <div className="px-3 text-xs font-semibold text-gray-500 uppercase mb-2">
              Settings
            </div>
            {filteredNavigation("settings").map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all mb-1",
                    active
                      ? "bg-purple-100 text-purple-700"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  )}
                >
                  <Icon size={18} />
                  <span className="font-medium text-sm">{item.label}</span>
                </Link>
              );
            })}
          </div>
        )}

        {/* Superadmin */}
        {filteredNavigation("superadmin").length > 0 && (
          <div>
            <div className="px-3 text-xs font-semibold text-red-400 uppercase mb-2">
              Superadmin
            </div>
            {filteredNavigation("superadmin").map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all mb-1",
                    active
                      ? "bg-red-50 text-red-700"
                      : "text-gray-600 hover:bg-gray-50"
                  )}
                >
                  <Icon size={18} />
                  <span className="font-medium text-sm">{item.label}</span>
                </Link>
              );
            })}
          </div>
        )}
      </nav>

      {/* Footer - Plan & Credits */}
      <div className="p-4 border-t border-gray-200 space-y-3">
        {/* Credits Card */}
        {userRole !== "super_admin" && currentOrg && (
          <div className="p-3 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg border border-indigo-200">
            <div className="flex items-center gap-2 mb-2">
              <Crown className="text-indigo-600" size={16} />
              <span className="font-semibold text-sm text-gray-900">
                {currentOrg.plan} Plan
              </span>
            </div>
            <p className="text-xs text-gray-600 mb-2">
              {currentOrg.creditsUsed.toLocaleString()} of{" "}
              {currentOrg.creditsTotal.toLocaleString()} emails
            </p>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mb-3">
              <div
                className="bg-gradient-to-r from-indigo-600 to-purple-600 h-1.5 rounded-full"
                style={{
                  width: `${Math.min(
                    (currentOrg.creditsUsed / currentOrg.creditsTotal) * 100,
                    100
                  )}%`,
                }}
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full text-indigo-700 border-indigo-200 hover:bg-indigo-50"
            >
              Buy Credits
            </Button>
          </div>
        )}

        {/* User Menu */}
        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer mb-2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              {user?.firstName?.charAt(0) || user?.emailAddresses?.[0]?.emailAddress?.charAt(0) || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900 truncate">
                {user?.firstName || 'User'}
              </div>
              <div className="text-xs text-gray-500 truncate">
                {getUserRoleLabel(userRole)}
              </div>
            </div>
          </div>
          
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut size={16} />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
