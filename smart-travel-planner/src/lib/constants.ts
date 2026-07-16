import type { LucideIcon } from "lucide-react";
import { Map, Heart, BarChart3, User } from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

export const NAV_ITEMS: NavItem[] = [
  { href: "/trips", label: "Trips", icon: Map },
  { href: "/favorites", label: "Favorites", icon: Heart },
  { href: "/statistics", label: "Statistics", icon: BarChart3 },
  { href: "/profile", label: "Profile", icon: User },
];

export const EXPENSE_CATEGORY_LABELS: Record<string, string> = {
  HOTEL: "Hotel",
  FOOD: "Food",
  TRANSPORTATION: "Transportation",
  ENTERTAINMENT: "Entertainment",
  SHOPPING: "Shopping",
  OTHER: "Other",
};

export const FAVORITE_TYPE_LABELS: Record<string, string> = {
  DESTINATION: "Destination",
  ATTRACTION: "Attraction",
  RESTAURANT: "Restaurant",
};
