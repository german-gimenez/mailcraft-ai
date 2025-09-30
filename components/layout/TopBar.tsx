"use client";

import React from "react";
import { Bell, Settings, Command, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TopBarProps {
  title: string;
  subtitle?: string;
}

export function TopBar({ title, subtitle }: TopBarProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Command size={16} />
          <span className="text-sm text-gray-600">Quick actions</span>
          <kbd className="px-2 py-0.5 bg-gray-100 rounded text-xs">⌘K</kbd>
        </Button>

        <Button size="sm" className="flex items-center gap-2">
          <Sparkles size={18} />
          Create with AI
        </Button>

        <div className="flex items-center gap-2 ml-2">
          <button
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
            title="Notifications"
            aria-label="Notifications"
          >
            <Bell size={20} className="text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Settings"
            aria-label="Settings"
          >
            <Settings size={20} className="text-gray-600" />
          </button>
        </div>
      </div>
    </header>
  );
}
