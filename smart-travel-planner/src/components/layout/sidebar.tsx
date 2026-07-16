"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/constants";
import { Avatar } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/layout/theme-toggle";

interface SidebarUser {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

interface SidebarProps {
  user: SidebarUser;
  onNavigate?: () => void;
}

export function Sidebar({ user, onNavigate }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      <Link
        href="/profile"
        onClick={onNavigate}
        className="px-5 py-5 font-display text-lg font-medium tracking-tight"
      >
        Smart Travel Planner
      </Link>

      <nav className="flex-1 px-3">
        <ul className="space-y-1">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <li key={href}>
                <Link
                  href={href}
                  onClick={onNavigate}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-border p-4">
        <div className="mb-3 flex justify-end">
          <ThemeToggle />
        </div>
        <Link
          href="/profile"
          onClick={onNavigate}
          className="flex items-center gap-3 rounded-md px-2 py-2 transition-colors hover:bg-muted"
        >
          <Avatar src={user.image} name={user.name} email={user.email} size="sm" />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">
              {user.name ?? "Traveler"}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {user.email}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
