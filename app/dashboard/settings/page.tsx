'use client';

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  return (
    <DashboardLayout title="Settings" subtitle="Configure your organization">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <Button className="bg-purple-600 text-white">Save Changes</Button>
        </div>
        
        <div className="bg-white rounded-xl border p-6">
          <h3 className="text-lg font-semibold mb-4">General Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Organization Name</label>
              <input type="text" className="w-full px-3 py-2 border rounded-lg" placeholder="MailCraft AI" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Default Email</label>
              <input type="email" className="w-full px-3 py-2 border rounded-lg" placeholder="noreply@mailcraft.ai" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border p-6">
          <h3 className="text-lg font-semibold mb-4">Integrations</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-2">OpenRouter API</h4>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Connected</span>
            </div>
            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-2">Zeptomail</h4>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
