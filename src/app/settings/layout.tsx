import { Sidebar } from "@/components/settings/sidebar";
import { Toaster } from "@/components/ui/sonner";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex bg-gradient-subtle bg-noise overflow-hidden">
      <Sidebar />
      <main className="flex-1 h-screen overflow-y-auto">
        <div className="relative z-10 max-w-4xl mx-auto py-8 md:py-12 px-4 md:px-8 lg:px-12">
          {children}
        </div>
      </main>
      <Toaster
        position="bottom-right"
        toastOptions={{
          className: "shadow-elevated border-border/50",
        }}
      />
    </div>
  );
}
