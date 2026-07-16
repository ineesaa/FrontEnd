"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { ThemeToggle } from "@/components/layout/theme-toggle";

export function Navbar({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="flex items-center justify-between border-b border-border px-4 py-3 md:hidden">
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Open menu"
        className="rounded-md p-2 hover:bg-muted"
      >
        <Menu className="h-5 w-5" />
      </button>
      <Link
        href="/profile"
        className="font-display text-base font-medium tracking-tight"
      >
        Smart Travel Planner
      </Link>
      <ThemeToggle />
    </header>
  );
}
