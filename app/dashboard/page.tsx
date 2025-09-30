'use client';'use client';'use client';



import { DashboardLayout } from "@/components/layout/DashboardLayout";

import { OnboardingFlow } from "@/components/onboarding/OnboardingFlow";

import { EmptyDashboard } from "@/components/dashboard/EmptyDashboard";import { DashboardLayout } from "@/components/layout/DashboardLayout";import { DashboardLayout } from "@/components/layout/DashboardLayout";

import { useUserProfile } from "@/lib/hooks/useUserProfile";

import { useUser } from "@clerk/nextjs";import { OnboardingFlow } from "@/components/onboarding/OnboardingFlow";import { OnboardingFlow } from "@/components/onboarding/OnboardingFlow";

import { useRouter } from "next/navigation";

import { useState } from "react";import { EmptyDashboard } from "@/components/dashboard/EmptyDashboard";import { EmptyDashboard } from "@/components/dashboard/EmptyDashboard";



export default function DashboardPage() {import { useUserProfile } from "@/lib/hooks/useUserProfile";import { useUserProfile } from "@/lib/hooks/useUserProfile";

  const { user, isLoaded } = useUser();

  const router = useRouter();import { useUser } from "@clerk/nextjs";import { useUser } from "@clerk/nextjs";

  const userProfile = useUserProfile();

  const [showOnboarding, setShowOnboarding] = useState(false);import { useRouter } from "next/navigation";import { useRouter } from "next/navigation";



  if (!isLoaded) {import { useState } from "react";import { useState } from "react";

    return (

      <div className="min-h-screen flex items-center justify-center">

        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>

      </div>export default function DashboardPage() {export default function DashboardPage() {

    );

  }  const { user, isLoaded } = useUser();  const { user, isLoaded } = useUser();



  if (!user) {  const router = useRouter();  const router = useRouter();

    router.push("/sign-in");

    return null;  const userProfile = useUserProfile();  const userProfile = useUserProfile();

  }

  const [showOnboarding, setShowOnboarding] = useState(false);  const [showOnboarding, setShowOnboarding] = useState(false);

  if (userProfile.isNewUser && !userProfile.hasCompletedOnboarding) {

    if (!showOnboarding) {

      setShowOnboarding(true);

    }  // Show loading while Clerk loads  // Show loading while Clerk loads

    

    return (  if (!isLoaded) {  if (!isLoaded) {

      <OnboardingFlow 

        onComplete={() => {    return (    return (

          setShowOnboarding(false);

          window.location.reload();      <div className="min-h-screen flex items-center justify-center">      <div className="min-h-screen flex items-center justify-center">

        }} 

      />        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>

    );

  }      </div>      </div>



  const handleCreateCampaign = () => {    );    );

    router.push("/dashboard/campaigns");

  };  }  }



  const handleImportContacts = () => {

    router.push("/dashboard/contacts");

  };  // Redirect to sign-in if not authenticated  // Redirect to sign-in if not authenticated



  if (userProfile.totalCampaigns === 0) {  if (!user) {  if (!user) {

    return (

      <DashboardLayout    router.push("/sign-in");    router.push("/sign-in");

        title="Dashboard"

        subtitle="Bienvenido a MailCraft AI"    return null;    return null;

        userRole="admin"

      >  }  }

        <EmptyDashboard 

          onCreateCampaign={handleCreateCampaign}

          onImportContacts={handleImportContacts}

        />  // Show onboarding for new users who haven't completed it  // Show onboarding for new users who haven't completed it

      </DashboardLayout>

    );  if (userProfile.isNewUser && !userProfile.hasCompletedOnboarding) {  if (userProfile.isNewUser && !userProfile.hasCompletedOnboarding) {

  }

    if (!showOnboarding) {    if (!showOnboarding) {

  return (

    <DashboardLayout      setShowOnboarding(true);      setShowOnboarding(true);

      title="Dashboard"

      subtitle="Welcome back, here's your overview"    }    }

      userRole="admin"

    >        

      <div className="space-y-6">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">    return (    return (

          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-6 border border-indigo-200 hover:shadow-lg transition-all cursor-pointer">

            <div className="text-2xl mb-3">✨</div>      <OnboardingFlow       <OnboardingFlow 

            <h3 className="font-bold text-gray-900 mb-1">Email Generator</h3>

            <p className="text-sm text-gray-600">Create emails with AI</p>        onComplete={() => {        onComplete={() => {

          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200 hover:shadow-lg transition-all cursor-pointer">          setShowOnboarding(false);          setShowOnboarding(false);

            <div className="text-2xl mb-3">🎯</div>

            <h3 className="font-bold text-gray-900 mb-1">Subject Optimizer</h3>          // Refresh the page to reload user profile          // Refresh the page to reload user profile

            <p className="text-sm text-gray-600">Boost open rates</p>

          </div>          window.location.reload();          window.location.reload();

          <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-6 border border-pink-200 hover:shadow-lg transition-all cursor-pointer">

            <div className="text-2xl mb-3">📧</div>        }}         }} 

            <h3 className="font-bold text-gray-900 mb-1">Smart Templates</h3>

            <p className="text-sm text-gray-600">AI-powered designs</p>      />      />

          </div>

        </div>    );    );



        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">  }  }

          <div className="bg-white p-6 rounded-xl border border-gray-200">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm font-medium text-gray-600">Total Contacts</p>  const handleCreateCampaign = () => {  const handleCreateCampaign = () => {

                <p className="text-2xl font-bold text-gray-900">{userProfile.totalContacts.toLocaleString()}</p>

              </div>    router.push("/dashboard/campaigns");    router.push("/dashboard/campaigns");

              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">

                <span className="text-purple-600">👥</span>  };  };

              </div>

            </div>

          </div>

  const handleImportContacts = () => {  const handleImportContacts = () => {

          <div className="bg-white p-6 rounded-xl border border-gray-200">

            <div className="flex items-center justify-between">    router.push("/dashboard/contacts");    router.push("/dashboard/contacts");

              <div>

                <p className="text-sm font-medium text-gray-600">Campaigns Sent</p>  };  };

                <p className="text-2xl font-bold text-gray-900">{userProfile.totalCampaigns}</p>

              </div>

              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">

                <span className="text-green-600">📊</span>  // Show empty dashboard for users without campaigns  // Show empty dashboard for users without campaigns

              </div>

            </div>  if (userProfile.totalCampaigns === 0) {  if (userProfile.totalCampaigns === 0) {

          </div>

    return (    return (

          <div className="bg-white p-6 rounded-xl border border-gray-200">

            <div className="flex items-center justify-between">      <DashboardLayout      <DashboardLayout

              <div>

                <p className="text-sm font-medium text-gray-600">Avg. Open Rate</p>        title="Dashboard"        title="Dashboard"

                <p className="text-2xl font-bold text-gray-900">68.5%</p>

              </div>        subtitle="Bienvenido a MailCraft AI"        subtitle="Bienvenido a MailCraft AI"

              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">

                <span className="text-blue-600">📈</span>        userRole="admin"        userRole="admin"

              </div>

            </div>      >      >

          </div>

        <EmptyDashboard         <EmptyDashboard 

          <div className="bg-white p-6 rounded-xl border border-gray-200">

            <div className="flex items-center justify-between">          onCreateCampaign={handleCreateCampaign}          onCreateCampaign={handleCreateCampaign}

              <div>

                <p className="text-sm font-medium text-gray-600">Credits Used</p>          onImportContacts={handleImportContacts}          onImportContacts={handleImportContacts}

                <p className="text-2xl font-bold text-gray-900">8,450</p>

              </div>        />        />

              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">

                <span className="text-yellow-600">⚡</span>      </DashboardLayout>      </DashboardLayout>

              </div>

            </div>    );    );

          </div>

        </div>  }  }

      </div>

    </DashboardLayout>

  );

}  // Show full dashboard for users with existing campaigns  // Show full dashboard for users with existing campaigns

  return (  return (

    <DashboardLayout    <DashboardLayout

      title="Dashboard"      title="Dashboard"

      subtitle="Welcome back, here's your overview"      subtitle="Welcome back, here's your overview"

      userRole="admin"      userRole="admin"

    >    >

      <div className="space-y-6">      <div className="space-y-6">

        {/* AI Features Highlight */}        {/* AI Features Highlight */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {[          {[

            {            {

              title: "Email Generator",              title: "Email Generator",

              description: "Create emails with AI",              description: "Create emails with AI",

              color: "indigo",              color: "indigo",

              icon: "✨",              icon: "✨",

            },            },

            {            {

              title: "Subject Optimizer",              title: "Subject Optimizer",

              description: "Boost open rates",              description: "Boost open rates",

              color: "purple",              color: "purple",

              icon: "🎯",              icon: "🎯",

            },            },

            {            {

              title: "Smart Templates",              title: "Smart Templates",

              description: "AI-powered designs",              description: "AI-powered designs",

              color: "pink",              color: "pink",

              icon: "📧",              icon: "📧",

            },            },

          ].map((feature) => (          ].map((feature) => (

            <div            <div

              key={feature.title}              key={feature.title}

              className={`bg-gradient-to-br from-${feature.color}-50 to-${feature.color}-100 rounded-xl p-6 border border-${feature.color}-200 hover:shadow-lg transition-all cursor-pointer`}              className={`bg-gradient-to-br from-${feature.color}-50 to-${feature.color}-100 rounded-xl p-6 border border-${feature.color}-200 hover:shadow-lg transition-all cursor-pointer`}

            >            >

              <div className="text-2xl mb-3">{feature.icon}</div>              <div className="text-2xl mb-3">{feature.icon}</div>

              <h3 className="font-bold text-gray-900 mb-1">{feature.title}</h3>              <h3 className="font-bold text-gray-900 mb-1">{feature.title}</h3>

              <p className="text-sm text-gray-600">{feature.description}</p>              <p className="text-sm text-gray-600">{feature.description}</p>

            </div>            </div>

          ))}          ))}

        </div>        </div>



        {/* Stats Cards */}        {/* Stats Cards */}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

          <div className="bg-white p-6 rounded-xl border border-gray-200">          <div className="bg-white p-6 rounded-xl border border-gray-200">

            <div className="flex items-center justify-between">            <div className="flex items-center justify-between">

              <div>              <div>

                <p className="text-sm font-medium text-gray-600">Total Contacts</p>                <p className="text-sm font-medium text-gray-600">Total Contacts</p>

                <p className="text-2xl font-bold text-gray-900">{userProfile.totalContacts.toLocaleString()}</p>                <p className="text-2xl font-bold text-gray-900">{userProfile.totalContacts.toLocaleString()}</p>

              </div>              </div>

              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">

                <span className="text-purple-600">👥</span>                <span className="text-purple-600">👥</span>

              </div>              </div>

            </div>            </div>

          </div>          </div>



          <div className="bg-white p-6 rounded-xl border border-gray-200">          <div className="bg-white p-6 rounded-xl border border-gray-200">

            <div className="flex items-center justify-between">            <div className="flex items-center justify-between">

              <div>              <div>

                <p className="text-sm font-medium text-gray-600">Campaigns Sent</p>                <p className="text-sm font-medium text-gray-600">Campaigns Sent</p>

                <p className="text-2xl font-bold text-gray-900">{userProfile.totalCampaigns}</p>                <p className="text-2xl font-bold text-gray-900">{userProfile.totalCampaigns}</p>

              </div>              </div>

              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">

                <span className="text-green-600">📊</span>                <span className="text-green-600">📊</span>

              </div>              </div>

            </div>            </div>

          </div>          </div>



          <div className="bg-white p-6 rounded-xl border border-gray-200">          <div className="bg-white p-6 rounded-xl border border-gray-200">

            <div className="flex items-center justify-between">            <div className="flex items-center justify-between">

              <div>              <div>

                <p className="text-sm font-medium text-gray-600">Avg. Open Rate</p>                <p className="text-sm font-medium text-gray-600">Avg. Open Rate</p>

                <p className="text-2xl font-bold text-gray-900">68.5%</p>                <p className="text-2xl font-bold text-gray-900">68.5%</p>

              </div>              </div>

              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">

                <span className="text-blue-600">📈</span>                <span className="text-blue-600">📈</span>

              </div>              </div>

            </div>            </div>

          </div>          </div>



          <div className="bg-white p-6 rounded-xl border border-gray-200">          <div className="bg-white p-6 rounded-xl border border-gray-200">

            <div className="flex items-center justify-between">            <div className="flex items-center justify-between">

              <div>              <div>

                <p className="text-sm font-medium text-gray-600">Credits Used</p>                <p className="text-sm font-medium text-gray-600">Credits Used</p>

                <p className="text-2xl font-bold text-gray-900">8,450</p>                <p className="text-2xl font-bold text-gray-900">8,450</p>

              </div>              </div>

              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">

                <span className="text-yellow-600">⚡</span>                <span className="text-yellow-600">⚡</span>

              </div>              </div>

            </div>            </div>

          </div>          </div>

        </div>        </div>



        {/* Recent Campaigns */}        {/* Recent Campaigns */}

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">

          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">

            <h2 className="text-xl font-bold text-gray-900">            <h2 className="text-xl font-bold text-gray-900">

              Recent Campaigns              Recent Campaigns

            </h2>            </h2>

            <button             <button 

              onClick={handleCreateCampaign}              onClick={handleCreateCampaign}

              className="text-indigo-600 hover:text-indigo-700 font-medium text-sm"              className="text-indigo-600 hover:text-indigo-700 font-medium text-sm"

            >            >

              View All              View All

            </button>            </button>

          </div>          </div>

          <div className="p-6">          <div className="p-6">

            <div className="space-y-4">            <div className="space-y-4">

              {[              {[

                {                {

                  name: "Holiday Special Offer",                  name: "Holiday Special Offer",

                  status: "Sent",                  status: "Sent",

                  recipients: 2847,                  recipients: 2847,

                  opens: 1210,                  opens: 1210,

                },                },

                {                {

                  name: "Product Update Newsletter",                  name: "Product Update Newsletter",

                  status: "Sent",                  status: "Sent",

                  recipients: 2500,                  recipients: 2500,

                  opens: 1050,                  opens: 1050,

                },                },

                {                {

                  name: "Welcome Series - Part 1",                  name: "Welcome Series - Part 1",

                  status: "Active",                  status: "Active",

                  recipients: 1200,                  recipients: 1200,

                  opens: 856,                  opens: 856,

                },                },

              ].map((campaign, index) => (              ].map((campaign, index) => (

                <div                <div

                  key={index}                  key={index}

                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"

                >                >

                  <div>                  <div>

                    <h4 className="font-medium text-gray-900">{campaign.name}</h4>                    <h4 className="font-medium text-gray-900">{campaign.name}</h4>

                    <p className="text-sm text-gray-600">Status: {campaign.status}</p>                    <p className="text-sm text-gray-600">Status: {campaign.status}</p>

                  </div>                  </div>

                  <div className="text-right">                  <div className="text-right">

                    <div className="text-sm font-medium text-gray-900">                    <div className="text-sm font-medium text-gray-900">

                      Recipients: {campaign.recipients}                      Recipients: {campaign.recipients}

                    </div>                    </div>

                    <div className="text-sm text-gray-600">                    <div className="text-sm text-gray-600">

                      Opens: {campaign.opens}                      Opens: {campaign.opens}

                    </div>                    </div>

                  </div>                  </div>

                </div>                </div>

              ))}              ))}

            </div>            </div>

          </div>          </div>

        </div>        </div>

      </div>      </div>

    </DashboardLayout>    </DashboardLayout>

  );  );

}}
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className={`bg-gradient-to-br from-${feature.color}-50 to-${feature.color}-100 rounded-xl p-6 border border-${feature.color}-200 hover:shadow-lg transition-all cursor-pointer`}
            >
              <div className="text-2xl mb-3">{feature.icon}</div>
              <h3 className="font-bold text-gray-900 mb-1">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              label: "Total Contacts",
              value: "2,543",
              change: "+12.5%",
              color: "text-blue-600",
              icon: "👥",
            },
            {
              label: "Campaigns Sent",
              value: "47",
              change: "+8%",
              color: "text-green-600",
              icon: "📤",
            },
            {
              label: "Open Rate",
              value: "42.5%",
              change: "+3.2%",
              color: "text-purple-600",
              icon: "📊",
            },
            {
              label: "Credits Used",
              value: "8,450",
              change: "/ 50,000",
              color: "text-orange-600",
              icon: "💳",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-2xl">{stat.icon}</div>
                <span
                  className={`text-sm font-medium ${
                    stat.change.startsWith("+")
                      ? "text-green-600"
                      : "text-gray-500"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Recent Campaigns */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">
              Recent Campaigns
            </h2>
            <button className="text-indigo-600 hover:text-indigo-700 font-medium text-sm">
              View All
            </button>
          </div>
          <div className="p-6 space-y-4">
            {[
              {
                name: "Holiday Special Offer",
                sent: "2,847",
                opens: "1,210",
                status: "Sent",
                date: "2 days ago",
              },
              {
                name: "Product Update Newsletter",
                sent: "2,500",
                opens: "1,050",
                status: "Sent",
                date: "1 week ago",
              },
              {
                name: "Welcome Series - Part 1",
                sent: "1,200",
                opens: "856",
                status: "Active",
                date: "2 weeks ago",
              },
            ].map((campaign) => (
              <div
                key={campaign.name}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">
                    {campaign.name}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs mr-2 ${
                        campaign.status === "Sent"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {campaign.status}
                    </span>
                    {campaign.date}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">
                    Sent: {campaign.sent}
                  </div>
                  <div className="text-sm text-gray-600">
                    Opens: {campaign.opens}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
