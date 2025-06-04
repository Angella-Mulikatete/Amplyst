"use client";

import type { AIInfluencerMatchingOutput } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link"; // For profile URL
import { TrendingUp, Users, MessageSquare, CheckCircle } from "lucide-react";

type RecommendedInfluencer = AIInfluencerMatchingOutput["recommendedInfluencers"][0];

interface RecommendedInfluencerCardProps {
  influencer: RecommendedInfluencer;
  onSelectInfluencer: (influencer: RecommendedInfluencer) => void;
}

export function RecommendedInfluencerCard({ influencer, onSelectInfluencer }: RecommendedInfluencerCardProps) {
  const initials = influencer.name.substring(0,2).toUpperCase();

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <CardHeader className="flex flex-row items-center gap-4 pb-3">
        <Avatar className="h-12 w-12">
          {/* Assuming profileUrl might lead to an image, or use a placeholder */}
          <AvatarImage src={`https://placehold.co/100x100.png?text=${initials}`} alt={influencer.name} data-ai-hint="person avatar"/>
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-md">{influencer.name}</CardTitle>
          <CardDescription className="text-xs text-primary hover:underline">
            <Link href={influencer.profileUrl} target="_blank" rel="noopener noreferrer">
              View Profile
            </Link>
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-3 text-sm">
        <p className="text-xs text-muted-foreground italic line-clamp-3 h-12">"{influencer.reasoning}"</p>
        <div className="grid grid-cols-2 gap-2 pt-2 border-t text-xs">
            <div className="flex items-center gap-1 text-muted-foreground">
                <TrendingUp className="h-3.5 w-3.5" /> Engagement: <span className="font-semibold text-foreground">{influencer.engagementRate.toFixed(1)}%</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
                <Users className="h-3.5 w-3.5" /> Audience Match: <span className="font-semibold text-foreground">{(influencer.audienceOverlapScore * 100).toFixed(0)}%</span>
            </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button size="sm" onClick={() => onSelectInfluencer(influencer)} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
          <CheckCircle className="mr-2 h-4 w-4" /> Select Influencer
        </Button>
      </CardFooter>
    </Card>
  );
}
