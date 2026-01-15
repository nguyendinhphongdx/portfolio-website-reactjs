import { ProfileForm } from "@/components/settings/profile-form";
import { UserCircle } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="animate-fade-up">
        <div className="flex items-start gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/10">
            <UserCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-semibold tracking-tight text-balance">
              Profile Settings
            </h1>
            <p className="text-muted-foreground mt-1 text-[15px]">
              Manage your personal information and social links that will be displayed
              on your public portfolio.
            </p>
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <div className="animate-fade-up stagger-2">
        <ProfileForm />
      </div>
    </div>
  );
}
