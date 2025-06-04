"use client";

import type { InfluencerProfile } from "@/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Briefcase, CalendarDays, DollarSign, Globe, Users, TrendingUp, MapPin, Link as LinkIcon, Mail } from "lucide-react"; // Renamed Link to LinkIcon
import Image from "next/image";

interface InfluencerProfileDisplayProps {
  profile: InfluencerProfile | null;
}

const DetailItem: React.FC<{ icon: React.ElementType; label: string; value?: string | number | React.ReactNode; className?: string }> = ({ icon: Icon, label, value, className }) => {
  if (!value && typeof value !== 'number') return null;
  return (
    <div className={`flex items-start gap-3 ${className}`}>
      <Icon className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
      <div>
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        {typeof value === 'string' || typeof value === 'number' ? <p className="text-foreground font-semibold">{value}</p> : value}
      </div>
    </div>
  );
};

export function InfluencerProfileDisplay({ profile }: InfluencerProfileDisplayProps) {
  if (!profile) {
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Profile Not Found</CardTitle>
          <CardDescription>This influencer profile could not be loaded or does not exist.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Please try again later or contact support if the issue persists.</p>
        </CardContent>
      </Card>
    );
  }
  
  const initials = profile.userId.substring(0, 2).toUpperCase(); // Placeholder for name initials

  return (
    <Card className="shadow-xl overflow-hidden">
      <div className="relative h-48 bg-gradient-to-r from-primary to-accent">
        {/* Placeholder for a cover image */}
        <Image src="https://placehold.co/1200x300.png" alt="Cover photo" layout="fill" objectFit="cover" data-ai-hint="abstract background gradient" />
        <div className="absolute inset-0 bg-black/30" />
      </div>
      <CardContent className="p-6 relative">
        <div className="flex flex-col md:flex-row md:items-end -mt-20 md:-mt-16 mb-6">
          <Avatar className="h-32 w-32 border-4 border-background shadow-md bg-muted">
            <AvatarImage src={profile.profilePictureUrl || `https://placehold.co/200x200.png?text=${initials}`} alt={profile.userId} data-ai-hint="profile avatar person" />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="md:ml-6 mt-4 md:mt-0">
            <h1 className="text-2xl font-bold text-foreground">{profile.userId} (Name Placeholder)</h1>
            <DetailItem icon={MapPin} label="Location" value={profile.location} className="mt-1" />
          </div>
        </div>

        <div className="space-y-6">
          <section>
            <h2 className="text-lg font-semibold text-primary mb-2">About Me</h2>
            <p className="text-muted-foreground whitespace-pre-line">{profile.bio}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-primary mb-2">Niches</h2>
            <div className="flex flex-wrap gap-2">
              {profile.niche.map((n, idx) => (
                <Badge key={idx} variant="secondary" className="text-sm">{n}</Badge>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-primary mb-3">Key Metrics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <DetailItem icon={Users} label="Total Followers" value={profile.socialMediaLinks.reduce((acc, link) => acc + (link.followers || 0), 0).toLocaleString()} />
              <DetailItem icon={TrendingUp} label="Avg. Engagement Rate" value={`${profile.engagementRate?.toFixed(2) || 'N/A'}%`} />
            </div>
          </section>
          
          <section>
            <h2 className="text-lg font-semibold text-primary mb-3">Social Presence</h2>
            <div className="space-y-3">
              {profile.socialMediaLinks.map((link, idx) => (
                <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-md hover:bg-secondary/50 transition-colors border">
                  <LinkIcon className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-semibold text-foreground">{link.platform}</p>
                    <p className="text-xs text-primary hover:underline truncate max-w-xs">{link.url}</p>
                    <p className="text-xs text-muted-foreground">{link.followers.toLocaleString()} followers</p>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {profile.audienceDemographics && (
            <section>
              <h2 className="text-lg font-semibold text-primary mb-3">Audience Demographics</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <DetailItem icon={CalendarDays} label="Primary Age Range" value={profile.audienceDemographics.ageRange} />
                <DetailItem icon={Users} label="Gender Split" value={
                  profile.audienceDemographics.genderSplit ? 
                  `M: ${profile.audienceDemographics.genderSplit.male}% F: ${profile.audienceDemographics.genderSplit.female}% O: ${profile.audienceDemographics.genderSplit.other}%`
                  : 'N/A'
                } />
                <DetailItem icon={Globe} label="Top Locations" value={profile.audienceDemographics.topLocations?.join(', ')} />
              </div>
            </section>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
