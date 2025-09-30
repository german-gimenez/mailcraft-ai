import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Get Started</h1>
          <p className="text-gray-600">Create your MailCraft AI account</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <SignUp
            appearance={{
              elements: {
                rootBox: "mx-auto",
                card: "shadow-none border-0 bg-transparent",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                socialButtonsBlockButton:
                  "bg-gray-50 border border-gray-200 hover:bg-gray-100 text-gray-700",
                formButtonPrimary:
                  "bg-indigo-600 hover:bg-indigo-700 text-sm normal-case",
                footerActionLink: "text-indigo-600 hover:text-indigo-700",
              },
            }}
          />
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            By signing up, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
