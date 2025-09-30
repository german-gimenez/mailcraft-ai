"use client";

import React from "react";
import { Bell, Settings, Command, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

interface TopBarProps {
  title: string;
  subtitle?: string;
}

export function TopBar({ title, subtitle }: TopBarProps) {
  const router = useRouter();
  const { user } = useUser();

  const handleSettingsClick = () => {
    router.push("/dashboard/settings");
  };

  const handleProfileClick = () => {
    router.push("/dashboard/settings");
  };

  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          {subtitle && <p className="text-sm text-gray-700">{subtitle}</p>}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Command size={16} />
          <span className="text-sm text-gray-700">Quick actions</span>
          <kbd className="px-2 py-0.5 bg-gray-100 rounded text-xs">⌘K</kbd>
        </Button>

        <Button 
          size="sm" 
          className="flex items-center gap-2"
          onClick={() => router.push("/dashboard/ai-tools")}
        >
          <Sparkles size={18} />
          Create with AI
        </Button>

        <div className="flex items-center gap-2 ml-2">
          <button
            onClick={() => router.push("/dashboard/settings")}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
            title="Notifications"
            aria-label="Notifications"
          >
            <Bell size={20} className="text-gray-700" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <button
            onClick={handleSettingsClick}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Settings"
            aria-label="Settings"
          >
            <Settings size={20} className="text-gray-700" />
          </button>

          {/* User Profile Button */}
          <button
            onClick={handleProfileClick}
            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="User Profile"
            aria-label="User Profile"
          >
            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {user?.firstName?.charAt(0) || user?.emailAddresses?.[0]?.emailAddress?.charAt(0) || 'U'}
              </span>
            </div>
            <span className="text-sm font-medium text-gray-900">
              {user?.firstName || 'User'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
