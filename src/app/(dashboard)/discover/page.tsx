"use client";

import { useState, useEffect } from 'react';
import { PageHeader } from "@/components/shared/PageHeader";
import { InfluencerSearchFilters, type InfluencerFiltersState } from "@/components/dashboard/InfluencerSearchFilters";
import { InfluencerDiscoveryCard } from "@/components/dashboard/InfluencerDiscoveryCard";
import { useAuth } from "@/contexts/AuthContext";
import type { InfluencerProfile } from "@/types";
import { Button } from "@/components/ui/button";
import { Loader2, Search, UserX } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';

// Mock data for influencers
const MOCK_INFLUENCERS: InfluencerProfile[] = [
  { userId: 'influencer1', bio: 'Fashion enthusiast sharing daily OOTDs and style tips. Love sustainable brands!', niche: ['Fashion', 'Sustainability', 'Lifestyle'], location: 'New York, USA', profilePictureUrl: 'https://placehold.co/200x200/9400D3/FFFFFF.png?text=IF1', socialMediaLinks: [{ platform: 'Instagram', url: '#', followers: 150000 }, { platform: 'TikTok', url: '#', followers: 300000 }], audienceDemographics: { ageRange: '18-24', genderSplit: { male: 20, female: 75, other: 5 }, topLocations: ['New York', 'Los Angeles', 'London'] }, engagementRate: 5.2 },
  { userId: 'influencer2', bio: 'Tech reviewer and gadget lover. Unboxing the latest tech and giving honest reviews.', niche: ['Tech', 'Gadgets'], location: 'San Francisco, USA', profilePictureUrl: 'https://placehold.co/200x200/7DF9FF/000000.png?text=IF2', socialMediaLinks: [{ platform: 'YouTube', url: '#', followers: 500000 }, { platform: 'Twitter', url: '#', followers: 75000 }], audienceDemographics: { ageRange: '25-34', genderSplit: { male: 60, female: 35, other: 5 }, topLocations: ['San Francisco', 'Austin', 'Seattle'] }, engagementRate: 3.8 },
  { userId: 'influencer3', bio: 'Food blogger exploring world cuisines. Easy recipes and restaurant reviews.', niche: ['Food', 'Travel'], location: 'London, UK', profilePictureUrl: 'https://placehold.co/200x200/F0F0F0/333333.png?text=IF3', socialMediaLinks: [{ platform: 'Instagram', url: '#', followers: 220000 }, { platform: 'Pinterest', url: '#', followers: 90000 }], audienceDemographics: { ageRange: '25-34', genderSplit: { male: 30, female: 65, other: 5 }, topLocations: ['London', 'Paris', 'Rome'] }, engagementRate: 4.5 },
  { userId: 'influencer4', bio: 'Fitness coach and yoga instructor. Helping you achieve your wellness goals.', niche: ['Fitness', 'Wellness', 'Yoga'], location: 'Miami, USA', socialMediaLinks: [{ platform: 'Instagram', url: '#', followers: 180000 }, { platform: 'YouTube', url: '#', followers: 60000 }], audienceDemographics: { ageRange: '30-45', genderSplit: { male: 40, female: 55, other: 5 }, topLocations: ['Miami', 'Los Angeles', 'Sydney'] }, engagementRate: 6.1 },
];


export default function DiscoverInfluencersPage() {
  const { currentRole } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [influencers, setInfluencers] = useState<InfluencerProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentFilters, setCurrentFilters] = useState<Partial<InfluencerFiltersState>>({});

  useEffect(() => {
    if (currentRole && currentRole !== 'brand' && currentRole !== 'agency') {
      router.push('/dashboard');
    }
  }, [currentRole, router]);
  
  // Simulate fetching influencers based on filters
  useEffect(() => {
    setIsLoading(true);
    console.log("Fetching with filters:", currentFilters);
    // Simulate API call
    setTimeout(() => {
      // Basic filtering logic for demo
      let filtered = MOCK_INFLUENCERS;
      if (currentFilters.searchTerm) {
        filtered = filtered.filter(inf => inf.userId.toLowerCase().includes(currentFilters.searchTerm!.toLowerCase()) || inf.bio.toLowerCase().includes(currentFilters.searchTerm!.toLowerCase()));
      }
      if (currentFilters.niche && currentFilters.niche !== 'all') {
        filtered = filtered.filter(inf => inf.niche.map(n => n.toLowerCase()).includes(currentFilters.niche!));
      }
      if (currentFilters.location) {
        filtered = filtered.filter(inf => inf.location.toLowerCase().includes(currentFilters.location!.toLowerCase()));
      }
      if (currentFilters.followerRange) {
        filtered = filtered.filter(inf => {
          const totalFollowers = inf.socialMediaLinks.reduce((sum, link) => sum + link.followers, 0);
          return totalFollowers >= currentFilters.followerRange![0] && totalFollowers <= currentFilters.followerRange![1];
        });
      }
      if (currentFilters.engagementRateRange) {
        filtered = filtered.filter(inf => inf.engagementRate >= currentFilters.engagementRateRange![0] && inf.engagementRate <= currentFilters.engagementRateRange![1]);
      }

      setInfluencers(filtered);
      setIsLoading(false);
    }, 1500);
  }, [currentFilters]);

  const handleFilterChange = (filters: InfluencerFiltersState) => {
    setCurrentFilters(filters);
  };

  const handleViewProfile = (userId: string) => {
    toast({ title: "View Profile", description: `Navigating to profile for ${userId}. (Not implemented)`});
    // router.push(`/dashboard/influencer/${userId}`);
  };

  const handleInvite = (userId: string) => {
    toast({ title: "Invite Sent", description: `Invitation sent to ${userId} for a campaign. (Mock action)`});
  };
  
  if (currentRole && currentRole !== 'brand' && currentRole !== 'agency') {
     return <p className="text-center p-8">Access Denied. Influencer discovery is for Brands and Agencies.</p>;
  }

  const InfluencerSkeletonCard = () => (
    <div className="space-y-3 p-4 border rounded-lg shadow-sm">
      <div className="relative h-32 bg-muted rounded-md animate-pulse"></div>
      <div className="flex justify-center -mt-12">
        <Skeleton className="h-24 w-24 rounded-full border-4 border-background" />
      </div>
      <Skeleton className="h-6 w-3/4 mx-auto" />
      <Skeleton className="h-4 w-1/2 mx-auto" />
      <div className="flex justify-center gap-2">
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <div className="flex gap-2 pt-2 border-t">
        <Skeleton className="h-9 flex-1 rounded-md" />
        <Skeleton className="h-9 flex-1 rounded-md" />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Discover Influencers"
        description="Find the perfect talent for your next campaign using advanced filters."
      />
      
      <InfluencerSearchFilters onFilterChange={handleFilterChange} />

      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(8)].map((_, i) => <InfluencerSkeletonCard key={i} />)}
        </div>
      ) : influencers.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {influencers.map(influencer => (
            <InfluencerDiscoveryCard 
              key={influencer.userId} 
              influencer={influencer}
              onViewProfile={handleViewProfile}
              onInvite={handleInvite}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <UserX className="mx-auto h-16 w-16 text-muted-foreground" />
          <h3 className="mt-4 text-2xl font-semibold">No Influencers Found</h3>
          <p className="mt-2 text-muted-foreground">
            Try adjusting your search filters or check back later for new talent.
          </p>
        </div>
      )}
    </div>
  );
}
