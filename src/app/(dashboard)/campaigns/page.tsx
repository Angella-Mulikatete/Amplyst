"use client";

import { useState, useEffect } from 'react';
import { PageHeader } from "@/components/shared/PageHeader";
import { CampaignCard } from "@/components/dashboard/CampaignCard";
import { useAuth } from "@/contexts/AuthContext";
import type { Campaign } from "@/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Megaphone, PlusCircle, Search } from "lucide-react";
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Card } from '@/components/ui/card';


// Mock data for campaigns - in a real app, this would come from an API / Convex
const MOCK_CAMPAIGNS: Campaign[] = [
  { id: '1', brandId: 'brand1', name: 'Eco-Friendly Product Launch', goals: 'Increase awareness for new eco-friendly product line.', targetAudience: 'Millennials interested in sustainability', budget: 5000, description: 'Launch campaign for new line of sustainable home goods. Focus on Instagram and TikTok.', contentRequirements: '3 IG posts, 5 TikToks, 2 blog reviews', startDate: '2024-08-01T00:00:00Z', endDate: '2024-09-01T00:00:00Z', status: 'active', createdAt: '2024-07-15T00:00:00Z', updatedAt: '2024-07-15T00:00:00Z', influencerNiche: 'Sustainability, Lifestyle', targetAudienceDemographics: 'Female, 25-35, USA, interested in eco-living.' },
  { id: '2', brandId: 'brand2', name: 'Mobile Game Promotion', goals: 'Drive downloads for new mobile game.', targetAudience: 'Gamers aged 16-24', budget: 10000, description: 'Promote new RPG mobile game "Chronicles of Aethel". Highlight gameplay and story.', contentRequirements: 'YouTube gameplay videos, Twitch streams, Twitter mentions', startDate: '2024-07-20T00:00:00Z', endDate: '2024-08-20T00:00:00Z', status: 'draft', createdAt: '2024-07-10T00:00:00Z', updatedAt: '2024-07-10T00:00:00Z', influencerNiche: 'Gaming, Mobile Gaming', targetAudienceDemographics: 'Male/Female, 16-24, Global, interested in RPGs.' },
  { id: '3', brandId: 'brand1', name: 'Fashion Week Showcase', goals: 'Generate buzz for Fashion Week collection.', targetAudience: 'Fashion enthusiasts, bloggers', budget: 7500, description: 'Showcase new collection during Fashion Week. Influencers to attend and post live.', contentRequirements: 'Live IG stories, lookbook posts, event coverage', startDate: '2024-09-05T00:00:00Z', endDate: '2024-09-12T00:00:00Z', status: 'completed', createdAt: '2024-06-01T00:00:00Z', updatedAt: '2024-06-01T00:00:00Z' },
];


export default function CampaignsPage() {
  const { currentUser, currentRole } = useAuth();
  const { toast } = useToast();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<Campaign['status'] | "all">("all");

  useEffect(() => {
    // Simulate fetching campaigns
    setIsLoading(true);
    setTimeout(() => {
      // In a real app, filter by currentUser.id if brand/agency, or show all if influencer (or based on matches)
      const userCampaigns = JSON.parse(localStorage.getItem('campaigns') || '[]') as Campaign[];
      const allCampaigns = [...MOCK_CAMPAIGNS, ...userCampaigns.filter(uc => !MOCK_CAMPAIGNS.find(mc => mc.id === uc.id))];

      if (currentRole === 'influencer') {
        setCampaigns(allCampaigns.filter(c => c.status === 'active' || c.status === 'draft')); // Influencers see active/draft campaigns
      } else if (currentUser) {
         setCampaigns(allCampaigns.filter(c => c.brandId === currentUser.id || MOCK_CAMPAIGNS.some(mc => mc.brandId === c.brandId))); // Brands/Agencies see their campaigns
      }
      setIsLoading(false);
    }, 1000);
  }, [currentUser, currentRole]);

  useEffect(() => {
    let tempCampaigns = campaigns;
    if (searchTerm) {
      tempCampaigns = tempCampaigns.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (statusFilter !== "all") {
      tempCampaigns = tempCampaigns.filter(c => c.status === statusFilter);
    }
    setFilteredCampaigns(tempCampaigns);
  }, [searchTerm, statusFilter, campaigns]);

  const handleViewDetails = (campaignId: string) => {
    toast({ title: "View Details", description: `Navigating to details for campaign ${campaignId}. (Not implemented)`});
    // router.push(`/dashboard/campaigns/${campaignId}`);
  };

  const handleApply = (campaignId: string) => {
    toast({ title: "Applied!", description: `You've applied to campaign ${campaignId}. (Mock action)`});
  };

  const handleManage = (campaignId: string) => {
    toast({ title: "Manage Campaign", description: `Opening management for campaign ${campaignId}. (Not implemented)`});
    // router.push(`/dashboard/campaigns/manage/${campaignId}`);
  };
  
  const handleDelete = (campaignId: string) => {
    // Simulate deletion
    const updatedCampaigns = campaigns.filter(c => c.id !== campaignId);
    setCampaigns(updatedCampaigns);
    localStorage.setItem('campaigns', JSON.stringify(updatedCampaigns.filter(c => !MOCK_CAMPAIGNS.find(mc => mc.id === c.id)))); // Save only user-created ones
    toast({ title: "Campaign Deleted", description: `Campaign ${campaignId} has been removed.`, variant: "destructive"});
  };


  const pageTitle = currentRole === 'influencer' ? "Available Campaigns" : "My Campaigns";
  const pageDescription = currentRole === 'influencer' ? "Discover and apply for exciting brand collaborations." : "Oversee and manage all your marketing initiatives.";

  const CampaignSkeleton = () => (
    <div className="space-y-4 p-4 border rounded-lg shadow-sm">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-1/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <div className="flex justify-between mt-4">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <PageHeader title={pageTitle} description={pageDescription}>
        {(currentRole === 'brand' || currentRole === 'agency') && (
          <Button asChild>
            <Link href="/dashboard/campaigns/create">
              <PlusCircle className="mr-2 h-4 w-4" /> Create New Campaign
            </Link>
          </Button>
        )}
      </PageHeader>

      <Card className="p-4 md:p-6 shadow-md">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Search campaigns..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as Campaign['status'] | "all")}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="paused">Paused</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1,2,3].map(i => <CampaignSkeleton key={i} />)}
          </div>
        ) : filteredCampaigns.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCampaigns.map(campaign => (
              <CampaignCard 
                key={campaign.id} 
                campaign={campaign} 
                userRole={currentRole}
                onViewDetails={handleViewDetails}
                onApply={handleApply}
                onManage={handleManage}
                onDelete={(campaignId) => {
                  // Wrap delete in AlertDialog for confirmation
                  const campaignToDelete = campaigns.find(c => c.id === campaignId);
                  if (campaignToDelete) {
                    // This structure is a bit verbose for direct use here.
                    // In a real app, a modal state would trigger this.
                    // For now, direct delete or a simplified confirmation.
                     if (confirm(`Are you sure you want to delete "${campaignToDelete.name}"?`)) {
                       handleDelete(campaignId);
                     }
                  }
                }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Megaphone className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-2 text-xl font-semibold">No Campaigns Found</h3>
            <p className="mt-1 text-muted-foreground">
              {campaigns.length === 0 ? (currentRole === 'influencer' ? "There are no campaigns available right now." : "You haven't created any campaigns yet.") : "Try adjusting your search or filters."}
            </p>
            {(currentRole === 'brand' || currentRole === 'agency') && campaigns.length === 0 && (
              <Button asChild className="mt-4">
                <Link href="/dashboard/campaigns/create">
                  <PlusCircle className="mr-2 h-4 w-4" /> Create Your First Campaign
                </Link>
              </Button>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}
