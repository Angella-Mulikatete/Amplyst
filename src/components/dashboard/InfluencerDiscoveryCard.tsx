"use client";

import type { InfluencerProfile } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MapPin, Users, TrendingUp, CheckCircle, Send } from "lucide-react";
import Image from "next/image";

interface InfluencerDiscoveryCardProps {
  influencer: InfluencerProfile; // Using full profile for now, could be a summary type
  onViewProfile: (userId: string) => void;
  onInvite: (userId: string) => void;
}

export function InfluencerDiscoveryCard({ influencer, onViewProfile, onInvite }: InfluencerDiscoveryCardProps) {
  const initials = influencer.userId.substring(0,2).toUpperCase(); // Placeholder for actual name

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full overflow-hidden">
      <div className="relative h-32 bg-gradient-to-r from-accent to-primary/70">
        {influencer.profilePictureUrl ? (
            <Image src={influencer.profilePictureUrl} alt={`${influencer.userId}'s profile`} layout="fill" objectFit="cover" data-ai-hint="profile background pattern" />
        ) : (
            <Image src="https://placehold.co/600x200.png" alt="Default cover" layout="fill" objectFit="cover" data-ai-hint="abstract texture"/>
        )}
         <div className="absolute inset-0 bg-black/20" />
      </div>
      <CardHeader className="pt-0 text-center -mt-12 z-10">
        <Avatar className="mx-auto h-24 w-24 border-4 border-background shadow-md bg-muted">
          <AvatarImage src={influencer.profilePictureUrl || `https://placehold.co/100x100.png?text=${initials}`} alt={influencer.userId} data-ai-hint="person avatar" />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <CardTitle className="mt-3 text-lg">{influencer.userId} (Name Placeholder)</CardTitle>
        <CardDescription className="text-xs text-muted-foreground line-clamp-1">{influencer.location}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-3 text-sm px-4 pb-4">
        <div className="flex flex-wrap justify-center gap-1">
            {influencer.niche.slice(0,3).map((n, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">{n}</Badge>
            ))}
            {influencer.niche.length > 3 && <Badge variant="secondary" className="text-xs">+{influencer.niche.length - 3} more</Badge>}
        </div>
        <p className="text-xs text-muted-foreground text-center line-clamp-2 h-8">{influencer.bio.substring(0, 80) + (influencer.bio.length > 80 ? "..." : "")}</p>
        <div className="grid grid-cols-2 gap-2 pt-2 border-t text-xs">
            <div className="flex items-center gap-1 text-muted-foreground">
                <Users className="h-3.5 w-3.5" /> Followers: <span className="font-semibold text-foreground">{influencer.socialMediaLinks.reduce((acc, link) => acc + link.followers, 0).toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
                <TrendingUp className="h-3.5 w-3.5" /> Engagement: <span className="font-semibold text-foreground">{influencer.engagementRate?.toFixed(1) || 'N/A'}%</span>
            </div>
        </div>
      </CardContent>
      <CardFooter className="border-t p-3 flex gap-2">
        <Button variant="outline" size="sm" onClick={() => onViewProfile(influencer.userId)} className="flex-1">
          View Profile
        </Button>
        <Button size="sm" onClick={() => onInvite(influencer.userId)} className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
          <Send className="mr-1.5 h-3.5 w-3.5" /> Invite
        </Button>
      </CardFooter>
    </Card>
  );
}
