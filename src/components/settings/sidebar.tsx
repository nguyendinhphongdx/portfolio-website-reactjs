"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  User,
  FileText,
  Settings,
  Palette,
  LogOut,
  ExternalLink,
  Menu,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navItems = [
  {
    title: "Profile",
    href: "/settings/profile",
    icon: User,
    description: "Personal information & links",
    gradient: "from-blue-500/20 to-indigo-500/20",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    title: "CV Parser",
    href: "/settings/cv-parser",
    icon: FileText,
    description: "Upload & parse with AI",
    gradient: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    title: "LLM Config",
    href: "/settings/llm-config",
    icon: Settings,
    description: "AI providers & API keys",
    gradient: "from-violet-500/20 to-purple-500/20",
    iconColor: "text-violet-600 dark:text-violet-400",
  },
  {
    title: "Templates",
    href: "/settings/templates",
    icon: Palette,
    description: "Portfolio layout & theme",
    gradient: "from-orange-500/20 to-amber-500/20",
    iconColor: "text-orange-600 dark:text-orange-400",
  },
];

function NavContent() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    async function fetchUsername() {
      try {
        const response = await fetch("/api/portfolio");
        if (response.ok) {
          const data = await response.json();
          setUsername(data.username || "");
        }
      } catch (error) {
        console.error("Failed to fetch username:", error);
      }
    }
    fetchUsername();
  }, []);

  const user = session?.user;
  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || user?.email?.[0]?.toUpperCase() || "U";

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 pb-8">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/10 shadow-sm">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight">Portfolio</h1>
            <p className="text-xs text-muted-foreground">Settings & Config</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3">
        <p className="px-3 mb-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70">
          Configuration
        </p>
        <div className="space-y-1">
          {navItems.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200",
                  "animate-fade-up",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-elegant"
                    : "hover:bg-muted/80"
                )}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Icon container */}
                <div
                  className={cn(
                    "flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200",
                    isActive
                      ? "bg-primary-foreground/15"
                      : `bg-gradient-to-br ${item.gradient}`
                  )}
                >
                  <item.icon
                    className={cn(
                      "h-[18px] w-[18px] transition-transform duration-200",
                      isActive ? "" : item.iconColor,
                      !isActive && "group-hover:scale-110"
                    )}
                  />
                </div>

                {/* Text content */}
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-[13px]">{item.title}</div>
                  <div
                    className={cn(
                      "text-[11px] truncate transition-colors",
                      isActive
                        ? "text-primary-foreground/70"
                        : "text-muted-foreground"
                    )}
                  >
                    {item.description}
                  </div>
                </div>

                {/* Active indicator */}
                <ChevronRight
                  className={cn(
                    "h-4 w-4 transition-all duration-200",
                    isActive
                      ? "opacity-70"
                      : "opacity-0 -translate-x-2 group-hover:opacity-50 group-hover:translate-x-0"
                  )}
                />
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-3 mt-auto space-y-2">
        {/* View Portfolio Card */}
        <div className="p-3 rounded-xl bg-gradient-to-br from-muted/80 to-muted/40 border border-border/50">
          <Link
            href={username ? `/${username}` : "/"}
            target="_blank"
            className="flex items-center gap-3 group"
          >
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-background border border-border/50 transition-all duration-200 group-hover:border-primary/30 group-hover:shadow-sm">
              <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <div className="flex-1">
              <span className="font-medium text-[13px] group-hover:text-primary transition-colors block">
                View Portfolio
              </span>
              <span className="text-[10px] text-muted-foreground">
                Preview your public page
              </span>
            </div>
          </Link>
        </div>

        {/* User info & Sign out */}
        <div className="p-3 rounded-xl border border-border/50 bg-background/50">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9 border border-border/50">
              <AvatarImage src={user?.image || ""} alt={user?.name || ""} />
              <AvatarFallback className="bg-primary/10 text-primary text-[12px] font-medium">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-[13px] truncate">
                {user?.name || "User"}
              </p>
              <p className="text-[11px] text-muted-foreground truncate">
                {username ? `@${username}` : user?.email}
              </p>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-200"
              title="Sign out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Sidebar() {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-[280px] h-screen sticky top-0 border-r border-sidebar-border bg-sidebar flex-col shrink-0 overflow-y-auto">
        <NavContent />
      </aside>

      {/* Mobile Sidebar */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-11 w-11 rounded-xl shadow-elegant bg-background/90 backdrop-blur-sm border-border/50"
            >
              <Menu className="h-[18px] w-[18px]" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-[280px] border-r-0">
            <NavContent />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
