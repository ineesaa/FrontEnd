"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Sidebar } from "@/components/layout/sidebar";

interface AppShellUser {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export function AppShell({
  user,
  children,
}: {
  user: AppShellUser;
  children: React.ReactNode;
}) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar onMenuClick={() => setIsMobileNavOpen(true)} />

      {isMobileNavOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsMobileNavOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute inset-y-0 left-0 w-64 bg-card shadow-card-hover">
            <button
              type="button"
              onClick={() => setIsMobileNavOpen(false)}
              aria-label="Close menu"
              className="absolute right-3 top-4 rounded-md p-2 hover:bg-muted"
            >
              <X className="h-5 w-5" />
            </button>
            <Sidebar user={user} onNavigate={() => setIsMobileNavOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex">
        <aside className="hidden md:sticky md:top-0 md:flex md:h-screen md:w-64 md:shrink-0 md:border-r md:border-border">
          <Sidebar user={user} />
        </aside>

        <main className="min-h-screen flex-1">{children}</main>
      </div>
    </div>
  );
}
