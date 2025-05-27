"use client";

import type { Campaign, UserRole } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CalendarDays, DollarSign, Eye, Target, Users, CheckCircle, Edit3, Trash2 } from "lucide-react";
import { format } from "date-fns";

interface CampaignCardProps {
  campaign: Campaign;
  userRole: UserRole;
  onViewDetails?: (campaignId: string) => void;
  onApply?: (campaignId: string) => void; // For influencers
  onManage?: (campaignId: string) => void; // For brands/agencies
  onDelete?: (campaignId: string) => void; // For brands/agencies
}

export function CampaignCard({ campaign, userRole, onViewDetails, onApply, onManage, onDelete }: CampaignCardProps) {
  const getStatusColor = (status: Campaign['status']) => {
    switch (status) {
      case "active": return "bg-green-500 hover:bg-green-600";
      case "draft": return "bg-yellow-500 hover:bg-yellow-600";
      case "completed": return "bg-blue-500 hover:bg-blue-600";
      case "paused": return "bg-orange-500 hover:bg-orange-600";
      case "archived": return "bg-gray-500 hover:bg-gray-600";
      default: return "bg-gray-500 hover:bg-gray-600";
    }
  };
  
  const DetailItem: React.FC<{ icon: React.ElementType; label: string; value: string | number; className?: string }> = ({ icon: Icon, label, value, className }) => (
    <div className={`flex items-center gap-2 text-sm ${className}`}>
      <Icon className="h-4 w-4 text-muted-foreground" />
      <span className="text-muted-foreground">{label}:</span>
      <span className="font-semibold text-foreground">{value}</span>
    </div>
  );


  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">{campaign.name}</CardTitle>
          <Badge className={`capitalize ${getStatusColor(campaign.status)} text-white`}>{campaign.status}</Badge>
        </div>
        <CardDescription className="text-xs text-muted-foreground line-clamp-2">{campaign.goals}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-3 text-sm">
        <DetailItem icon={Target} label="Target" value={campaign.targetAudience.substring(0,50) + "..."} />
        <DetailItem icon={DollarSign} label="Budget" value={`$${campaign.budget.toLocaleString()}`} />
        <DetailItem icon={CalendarDays} label="Duration" value={`${format(new Date(campaign.startDate), "MMM d, yyyy")} - ${format(new Date(campaign.endDate), "MMM d, yyyy")}`} />
        { (userRole === 'brand' || userRole === 'agency') && campaign.influencerNiche &&
             <DetailItem icon={Users} label="Niche" value={campaign.influencerNiche} />
        }
      </CardContent>
      <CardFooter className="border-t pt-4 flex flex-col sm:flex-row justify-between items-center gap-2">
        <Button variant="outline" size="sm" onClick={() => onViewDetails && onViewDetails(campaign.id)} className="w-full sm:w-auto">
          <Eye className="mr-2 h-4 w-4" /> View Details
        </Button>
        {userRole === 'influencer' && (
          <Button size="sm" onClick={() => onApply && onApply(campaign.id)} className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
            <CheckCircle className="mr-2 h-4 w-4" /> Apply Now
          </Button>
        )}
        {(userRole === 'brand' || userRole === 'agency') && (
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="ghost" size="sm" onClick={() => onManage && onManage(campaign.id)} className="flex-1 sm:flex-none">
              <Edit3 className="mr-2 h-4 w-4" /> Manage
            </Button>
             <Button variant="destructive" size="sm" onClick={() => onDelete && onDelete(campaign.id)} className="flex-1 sm:flex-none">
              <Trash2 className="mr-2 h-4 w-4" /> Delete
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
