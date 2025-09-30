"use client";

import React, { useState, useEffect, useRef } from "react";
import { Bell, Settings, Command, Sparkles, ChevronDown, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useUser, useClerk } from "@clerk/nextjs";

interface TopBarProps {
  title: string;
  subtitle?: string;
}

export function TopBar({ title, subtitle }: TopBarProps) {
  const router = useRouter();
  const { user } = useUser();
  const { signOut } = useClerk();
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowUserDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSettingsClick = () => {
    router.push("/dashboard/settings");
  };

  const handleProfileClick = () => {
    router.push("/dashboard/settings");
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

          {/* User Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="User Menu"
              aria-label="User Menu"
            >
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {user?.firstName?.charAt(0) || user?.emailAddresses?.[0]?.emailAddress?.charAt(0) || 'U'}
                </span>
              </div>
              <span className="text-sm font-medium text-gray-900">
                {user?.firstName || 'User'}
              </span>
              <ChevronDown size={16} className="text-gray-500" />
            </button>

            {/* Dropdown Menu */}
            {showUserDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">
                    {user?.firstName || 'User'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {user?.emailAddresses?.[0]?.emailAddress}
                  </p>
                </div>
                
                <button
                  onClick={() => {
                    setShowUserDropdown(false);
                    handleProfileClick();
                  }}
                  className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <User size={16} />
                  Configuración
                </button>
                
                <button
                  onClick={() => {
                    setShowUserDropdown(false);
                    handleLogout();
                  }}
                  className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut size={16} />
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
