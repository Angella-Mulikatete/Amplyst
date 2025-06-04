"use client";

import { useState } from 'react';
import { PageHeader } from "@/components/shared/PageHeader";
import { AIMatchingForm } from "@/components/dashboard/AIMatchingForm";
import { RecommendedInfluencerCard } from "@/components/dashboard/RecommendedInfluencerCard";
import type { AIInfluencerMatchingOutput } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2, UserSearch, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

export default function AIMatchingPage() {
  const { currentRole } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [results, setResults] = useState<AIInfluencerMatchingOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (currentRole && currentRole !== 'brand' && currentRole !== 'agency') {
      router.push('/dashboard');
    }
  }, [currentRole, router]);

  const handleResults = (output: AIInfluencerMatchingOutput) => {
    setResults(output);
  };
  
  const handleLoadingChange = (loading: boolean) => {
    setIsLoading(loading);
  };

  const handleSelectInfluencer = (influencer: AIInfluencerMatchingOutput["recommendedInfluencers"][0]) => {
    toast({
      title: "Influencer Selected (Mock)",
      description: `${influencer.name} has been notionally selected for your campaign.`,
    });
    // In a real app, this might add them to a list, open a chat, or send an invite.
  };

  if (currentRole && currentRole !== 'brand' && currentRole !== 'agency') {
     return <p className="text-center p-8">Access Denied. AI Matching is for Brands and Agencies.</p>;
  }

  const ResultSkeletonCard = () => (
    <div className="space-y-3 p-4 border rounded-lg shadow-sm">
      <div className="flex items-center gap-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-4/5" />
      <div className="flex justify-between pt-2 border-t">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-5 w-20" />
      </div>
      <Skeleton className="h-9 w-full mt-2 rounded-md" />
    </div>
  );


  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Influencer Matching"
        description="Let our AI find the best influencers for your campaign based on your criteria."
      />
      
      <AIMatchingForm onResults={handleResults} onLoadingChange={handleLoadingChange} />

      {isLoading && (
         <div className="mt-8">
            <div className="flex items-center justify-center mb-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="ml-3 text-lg text-muted-foreground">Finding perfect matches...</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(3)].map((_, i) => <ResultSkeletonCard key={i} />)}
            </div>
        </div>
      )}

      {!isLoading && results && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">
            Recommended Influencers ({results.recommendedInfluencers.length})
          </h2>
          {results.recommendedInfluencers.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {results.recommendedInfluencers.map((influencer: AIInfluencerMatchingOutput["recommendedInfluencers"][0], index: number) => (
                <RecommendedInfluencerCard 
                  key={index} 
                  influencer={influencer}
                  onSelectInfluencer={handleSelectInfluencer}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-card rounded-lg shadow">
              <UserSearch className="mx-auto h-16 w-16 text-muted-foreground" />
              <h3 className="mt-4 text-2xl font-semibold">No Matches Found</h3>
              <p className="mt-2 text-muted-foreground">
                Our AI couldn&apos;t find any influencers matching your exact criteria.
                Try broadening your search or adjusting your budget.
              </p>
            </div>
          )}
        </div>
      )}
      {!isLoading && !results && (
         <div className="text-center py-12 bg-card rounded-lg shadow">
            <Wand2 className="mx-auto h-16 w-16 text-muted-foreground" />
            <h3 className="mt-4 text-2xl font-semibold">Ready to Find Influencers?</h3>
            <p className="mt-2 text-muted-foreground">
                Fill out the form above and let our AI work its magic!
            </p>
        </div>
      )}
    </div>
  );
}
