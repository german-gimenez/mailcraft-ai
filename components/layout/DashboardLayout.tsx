"use client";

import React from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { useUserRole } from "@/lib/hooks/useUserRole";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  userRole?: "super_admin" | "admin" | "user";
  currentOrg?: {
    id: string;
    name: string;
    plan: string;
    creditsUsed: number;
    creditsTotal: number;
  };
}

export function DashboardLayout({
  children,
  title,
  subtitle,
  userRole = "user",
  currentOrg = {
    id: "1",
    name: "Demo Organization",
    plan: "FREE",
    creditsUsed: 8450,
    creditsTotal: 50000,
  },
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar currentOrg={currentOrg} />

      <main className="flex-1 flex flex-col h-screen">
        <TopBar title={title} subtitle={subtitle} />

        <div className="flex-1 p-8 overflow-y-auto">{children}</div>
      </main>
    </div>
  );
}
