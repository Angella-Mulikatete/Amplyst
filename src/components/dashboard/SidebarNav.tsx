"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { SIDEBAR_NAV_ITEMS } from "@/lib/constants";
import type { NavItem } from "@/types";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSkeleton,
} from "@/components/ui/sidebar";

export function SidebarNav() {
  const pathname = usePathname();
  const { currentRole, isLoading } = useAuth();

  if (isLoading) {
    return (
      <SidebarMenu>
        {[...Array(5)].map((_, i) => (
          <SidebarMenuSkeleton key={i} showIcon />
        ))}
      </SidebarMenu>
    );
  }

  const filteredNavItems = SIDEBAR_NAV_ITEMS.filter(item =>
    item.roles.includes(currentRole) && !item.disabled
  );

  return (
    <SidebarMenu>
      {filteredNavItems.map((item: NavItem) => (
        <SidebarMenuItem key={item.href}>
          <Link href={item.href} passHref legacyBehavior>
            <SidebarMenuButton
              asChild
              isActive={pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))}
              tooltip={item.label}
            >
              <a>
                <item.icon />
                <span>{item.label}</span>
              </a>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
