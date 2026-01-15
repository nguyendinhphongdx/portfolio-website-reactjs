import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-gradient-subtle bg-noise">
      {/* Decorative side panel - hidden on mobile */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-[55%] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary to-primary/80" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtNi42MjcgMC0xMiA1LjM3My0xMiAxMnM1LjM3MyAxMiAxMiAxMiAxMi01LjM3MyAxMi0xMi01LjM3My0xMi0xMi0xMnptMCAxOGMtMy4zMTQgMC02LTIuNjg2LTYtNnMyLjY4Ni02IDYtNiA2IDIuNjg2IDYgNi0yLjY4NiA2LTYgNnoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-40" />

        {/* Floating shapes */}
        <div className="absolute top-20 left-20 w-32 h-32 rounded-3xl bg-white/10 backdrop-blur-sm rotate-12 animate-float" />
        <div className="absolute bottom-32 right-20 w-24 h-24 rounded-2xl bg-white/10 backdrop-blur-sm -rotate-6 animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/3 w-16 h-16 rounded-xl bg-white/10 backdrop-blur-sm rotate-45 animate-float" style={{ animationDelay: "2s" }} />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="font-semibold text-lg">Portfolio</span>
            </Link>
          </div>

          <div className="max-w-md">
            <h1 className="text-4xl xl:text-5xl font-bold leading-tight mb-6">
              Build your professional portfolio in minutes
            </h1>
            <p className="text-lg text-white/80 leading-relaxed">
              Showcase your skills, experience, and projects with a beautiful,
              customizable portfolio. Powered by AI to help you create stunning content.
            </p>

            <div className="mt-10 flex items-center gap-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30"
                  />
                ))}
              </div>
              <p className="text-sm text-white/70">
                Join <span className="text-white font-semibold">2,000+</span> professionals
              </p>
            </div>
          </div>

          <div className="text-sm text-white/50">
            &copy; {new Date().getFullYear()} Portfolio Builder. All rights reserved.
          </div>
        </div>
      </div>

      {/* Form side */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md animate-fade-up">
          {children}
        </div>
      </div>
    </div>
  );
}
