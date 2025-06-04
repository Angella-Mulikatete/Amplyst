"use client";

import { useState, useEffect } from 'react';
import { PageHeader } from "@/components/shared/PageHeader";
import { InfluencerProfileForm } from "@/components/dashboard/InfluencerProfileForm";
import { InfluencerProfileDisplay } from "@/components/dashboard/InfluencerProfileDisplay";
import { useAuth } from "@/contexts/AuthContext";
import type { InfluencerProfile, BrandProfile, AgencyProfile } from "@/types";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit3 } from "lucide-react";
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Mock function to simulate fetching profile data
async function fetchProfileData(userId: string, role: string): Promise<InfluencerProfile | BrandProfile | AgencyProfile | null> {
  return new Promise(resolve => {
    setTimeout(() => {
      const storedProfile = localStorage.getItem(`${role}Profile_${userId}`);
      if (storedProfile) {
        resolve(JSON.parse(storedProfile));
      } else if (role === 'influencer') {
        // Default empty structure for new influencer
        resolve({
          userId,
          bio: '',
          niche: [],
          location: '',
          socialMediaLinks: [],
          engagementRate: 0,
          audienceDemographics: { ageRange: '', genderSplit: { male: 0, female: 0, other: 0}, topLocations: [] }
        } as InfluencerProfile);
      }
      // TODO: Add similar for Brand/Agency or make a generic profile editor
      resolve(null); 
    }, 500);
  });
}

// Mock function to simulate saving profile data
async function saveProfileData(userId: string, role: string, data: any): Promise<any> {
   return new Promise(resolve => {
    setTimeout(() => {
      localStorage.setItem(`${role}Profile_${userId}`, JSON.stringify(data));
      resolve(data);
    }, 300);
  });
}


export default function ProfilePage() {
  const { currentUser, currentRole } = useAuth();
  const [profileData, setProfileData] = useState<InfluencerProfile | BrandProfile | AgencyProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (currentUser && currentRole) {
      setIsLoading(true);
      fetchProfileData(currentUser.id, currentRole).then(data => {
        setProfileData(data);
        setIsLoading(false);
        // If no profile exists for influencer, default to edit mode
        if (currentRole === 'influencer' && !localStorage.getItem(`influencerProfile_${currentUser.id}`)) {
          setIsEditing(true);
        }
      });
    }
  }, [currentUser, currentRole]);

  const handleProfileSave = async (data: InfluencerProfile | BrandProfile | AgencyProfile) => {
    if (currentUser && currentRole) {
      const savedData = await saveProfileData(currentUser.id, currentRole, data);
      setProfileData(savedData);
      setIsEditing(false);
    }
  };

  if (isLoading || !currentUser || !currentRole) {
    return (
      <div>
        <PageHeader title="My Profile" description="Manage your public and private information." />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-12 w-32 mt-4" />
      </div>
    );
  }

  // For now, only influencer profile editing is fully fleshed out.
  // Brand/Agency profiles would have different forms and displays.
  if (currentRole === 'influencer') {
    return (
      <div>
        <PageHeader 
          title="My Influencer Profile" 
          description={isEditing ? "Update your influencer details." : "View your public presence."}
        >
          {!isEditing && (
            <Button onClick={() => setIsEditing(true)} variant="outline">
              <Edit3 className="mr-2 h-4 w-4" /> Edit Profile
            </Button>
          )}
        </PageHeader>

        {isEditing ? (
          <InfluencerProfileForm 
            profile={profileData as InfluencerProfile | undefined} // Cast as it might be null initially
            userId={currentUser.id}
            onSubmitSuccess={handleProfileSave as (data: InfluencerProfile) => void}
          />
        ) : (
          <InfluencerProfileDisplay profile={profileData as InfluencerProfile | null} />
        )}
      </div>
    );
  }

  // Placeholder for Brand/Agency profiles
  return (
    <div>
      <PageHeader title={`My ${currentRole === 'brand' ? 'Brand' : 'Agency'} Profile`} description="Manage your organization's details." />
      <Card>
        <CardHeader>
          <CardTitle>Profile Management</CardTitle>
          <CardDescription>
            Brand and Agency profile management is under development.
            Your user ID is: {currentUser.id}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Check back soon for more features!</p>
          {profileData && <pre className="mt-4 p-4 bg-secondary rounded-md text-xs overflow-auto">{JSON.stringify(profileData, null, 2)}</pre>}
        </CardContent>
      </Card>
    </div>
  );
}
