"use client";

import { PageHeader } from "@/components/shared/PageHeader";
import { CampaignCreationForm } from "@/components/dashboard/CampaignCreationForm";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import type { Campaign } from "@/types";

export default function CreateCampaignPage() {
  const { currentUser, currentRole } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect if not brand or agency
    if (currentRole && currentRole !== 'brand' && currentRole !== 'agency') {
      router.push('/dashboard');
    }
  }, [currentRole, router]);
  
  const handleCampaignCreated = (campaign: Campaign) => {
    // Optionally redirect to campaign details page or campaigns list
    router.push('/dashboard/campaigns');
  };

  if (!currentUser || (currentRole !== 'brand' && currentRole !== 'agency')) {
    // This check is mostly for SSR or if useEffect hasn't run yet.
    // The layout should handle unauthorized access more broadly.
    return <p className="text-center p-8">Access Denied. You must be a Brand or Agency to create campaigns.</p>;
  }

  return (
    <div>
      <PageHeader
        title="Launch a New Campaign"
        description="Define your campaign objectives and find the perfect influencers."
      />
      <CampaignCreationForm brandId={currentUser.id} onSubmitSuccess={handleCampaignCreated} />
    </div>
  );
}
