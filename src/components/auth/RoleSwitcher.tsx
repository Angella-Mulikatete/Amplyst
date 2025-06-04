"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { USER_ROLES, ROLE_DISPLAY_NAMES, ROLE_ICONS } from "@/lib/constants";
import type { UserRole } from "../../types";
import { ChevronDown, Repeat } from "lucide-react";
import React from "react";

export function RoleSwitcher() {
  const { currentRole, switchRole, currentUser } = useAuth();

  if (!currentUser) return null;

  const CurrentRoleIcon = currentRole ? ROLE_ICONS[currentRole as Exclude<UserRole, null>] : Repeat;


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <CurrentRoleIcon className="h-4 w-4" />
          <span>
            {currentRole ? ROLE_DISPLAY_NAMES[currentRole as Exclude<UserRole, null>] : "Select Role"}
          </span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Switch Role</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={currentRole || ""}
          onValueChange={(value) => switchRole(value as UserRole)}
        >
          {USER_ROLES.filter(role => role !== null).map((role) => {
            const RoleIcon = ROLE_ICONS[role as Exclude<UserRole, null>];
            return (
              <DropdownMenuRadioItem key={role} value={role!} className="flex items-center gap-2">
                <RoleIcon className="h-4 w-4 text-muted-foreground" />
                {ROLE_DISPLAY_NAMES[role as Exclude<UserRole, null>]}
              </DropdownMenuRadioItem>
            );
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
