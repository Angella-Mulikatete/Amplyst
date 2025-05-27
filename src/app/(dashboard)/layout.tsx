"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Logo from '@/components/shared/Logo';
import { UserProfileDropdown } from '@/components/dashboard/UserProfileDropdown';
import { SidebarNav } from '@/components/dashboard/SidebarNav';
import { RoleSwitcher } from '@/components/auth/RoleSwitcher';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentUser, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !currentUser) {
      router.push('/login');
    }
  }, [currentUser, isLoading, router]);

  if (isLoading || !currentUser) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="flex flex-col items-center">
          <Logo showText={false} size={48}/>
          <p className="mt-4 text-lg text-muted-foreground">Loading AmplyAI...</p>
           {/* Simple spinner */}
          <div className="mt-4 w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider defaultOpen>
      <Sidebar variant="sidebar" collapsible="icon" className="border-r">
        <SidebarHeader className="p-4 flex items-center justify-between">
          <Logo showText={false}/>
          <div className="md:hidden"> {/* Show trigger only on mobile if sidebar is collapsible icon */}
             <SidebarTrigger />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarNav />
        </SidebarContent>
        <SidebarFooter className="p-4">
          <RoleSwitcher />
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4">
              <div className="hidden md:block"> {/* Hide on mobile if sidebar uses offcanvas */}
                 <SidebarTrigger />
              </div>
              <div className="md:hidden">
                <Logo showText={false} />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" aria-label="Notifications">
                <Bell className="h-5 w-5" />
              </Button>
              <UserProfileDropdown />
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-secondary/30 min-h-[calc(100vh-4rem)]">
            {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
