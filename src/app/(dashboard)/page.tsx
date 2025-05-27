"use client";

import { useAuth } from "@/contexts/AuthContext";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Briefcase, Megaphone, Star, Users, Wand2 } from "lucide-react";
import { ROLE_DISPLAY_NAMES } from "@/lib/constants";
import type { UserRole } from "@/types";
import Image from "next/image";

export default function DashboardPage() {
  const { currentUser, currentRole } = useAuth();

  if (!currentUser || !currentRole) {
    return null; // Or a loading state, though layout handles this
  }
  
  const roleName = ROLE_DISPLAY_NAMES[currentRole as Exclude<UserRole, null>];

  const QuickLink = ({ href, icon: Icon, title, description }: { href: string, icon: React.ElementType, title: string, description: string }) => (
    <Link href={href} className="block hover:no-underline">
      <Card className="h-full hover:shadow-lg transition-shadow duration-200 hover:border-primary">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <Icon className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground">{description}</p>
          <div className="text-xs font-medium text-primary mt-2 flex items-center">
            Go to {title.toLowerCase()} <ArrowRight className="ml-1 h-3 w-3" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Welcome, ${currentUser.name || currentUser.email.split('@')[0]}!`}
        description={`You are logged in as a ${roleName}. Here's your overview.`}
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {currentRole === "influencer" && (
          <>
            <QuickLink href="/dashboard/profile" icon={Star} title="My Profile" description="Update your public presence." />
            <QuickLink href="/dashboard/campaigns" icon={Megaphone} title="Campaign Offers" description="View and manage campaign invitations." />
            <QuickLink href="/dashboard/messages" icon={Users} title="Collaborations" description="Connect with brands and agencies." />
          </>
        )}
        {(currentRole === "brand" || currentRole === "agency") && (
          <>
            <QuickLink href="/dashboard/campaigns/create" icon={Briefcase} title="New Campaign" description="Launch your next marketing initiative." />
            <QuickLink href="/dashboard/discover" icon={Users} title="Find Influencers" description="Search our talent pool." />
            <QuickLink href="/dashboard/ai-matching" icon={Wand2} title="AI Matching" description="Get smart influencer suggestions." />
          </>
        )}
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Getting Started with AmplyAI</CardTitle>
          <CardDescription>Follow these steps to make the most of your {roleName} account.</CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-6 items-center">
          <div>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {currentRole === "influencer" && (
                <>
                  <li className="flex items-start gap-2"><CheckMark /> <span>Complete your <Link href="/dashboard/profile" className="text-primary font-medium hover:underline">profile</Link> to attract brands.</span></li>
                  <li className="flex items-start gap-2"><CheckMark /> <span>Connect your social media accounts for accurate analytics.</span></li>
                  <li className="flex items-start gap-2"><CheckMark /> <span>Browse and apply for <Link href="/dashboard/campaigns" className="text-primary font-medium hover:underline">campaigns</Link> that fit your niche.</span></li>
                </>
              )}
              {(currentRole === "brand" || currentRole === "agency") && (
                <>
                  <li className="flex items-start gap-2"><CheckMark /> <span>Set up your <Link href="/dashboard/profile" className="text-primary font-medium hover:underline">brand/agency profile</Link>.</span></li>
                  <li className="flex items-start gap-2"><CheckMark /> <span><Link href="/dashboard/campaigns/create" className="text-primary font-medium hover:underline">Create your first campaign</Link> to define your goals.</span></li>
                  <li className="flex items-start gap-2"><CheckMark /> <span>Use <Link href="/dashboard/discover" className="text-primary font-medium hover:underline">influencer discovery</Link> or AI Matching to find talent.</span></li>
                </>
              )}
              <li className="flex items-start gap-2"><CheckMark /> <span>Utilize in-app <Link href="/dashboard/messages" className="text-primary font-medium hover:underline">messaging</Link> for seamless communication.</span></li>
            </ul>
            <Button asChild className="mt-6">
              <Link href={
                currentRole === "influencer" ? "/dashboard/profile" : "/dashboard/campaigns/create"
              }>
                {currentRole === "influencer" ? "Go to Profile" : "Create Campaign"}
              </Link>
            </Button>
          </div>
          <div className="hidden md:block relative aspect-square max-w-xs mx-auto">
            <Image 
              src="https://placehold.co/400x400.png" 
              alt="AmplyAI Illustration" 
              layout="fill" 
              objectFit="contain"
              data-ai-hint="team collaboration"
              className="rounded-lg"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const CheckMark = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle-2 text-primary flex-shrink-0 mt-0.5"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>;

