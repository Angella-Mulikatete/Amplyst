"use client";

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { MOCK_INFLUENCER_NICHES, MOCK_SOCIAL_PLATFORMS } from "@/lib/constants";
import { Filter, Search, X } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

export interface InfluencerFiltersState {
  searchTerm: string;
  niche: string;
  location: string;
  platform: string;
  followerRange: [number, number];
  engagementRateRange: [number, number];
}

interface InfluencerSearchFiltersProps {
  onFilterChange: (filters: InfluencerFiltersState) => void;
  initialFilters?: Partial<InfluencerFiltersState>;
}

const defaultFilters: InfluencerFiltersState = {
  searchTerm: "",
  niche: "all",
  location: "",
  platform: "all",
  followerRange: [0, 10000000], // 0 to 10M
  engagementRateRange: [0, 20], // 0% to 20%
};

export function InfluencerSearchFilters({ onFilterChange, initialFilters }: InfluencerSearchFiltersProps) {
  const [filters, setFilters] = useState<InfluencerFiltersState>({
    ...defaultFilters,
    ...initialFilters,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: keyof InfluencerFiltersState, value: string) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSliderChange = (name: 'followerRange' | 'engagementRateRange', value: [number, number]) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange(filters);
  };

  const handleReset = () => {
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  }

  return (
    <Card className="p-4 md:p-6 shadow-md mb-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
          <div className="lg:col-span-1">
            <Label htmlFor="searchTerm">Search by Name/Keyword</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="searchTerm"
                name="searchTerm"
                placeholder="e.g., Jane Doe, Fashion Blogger"
                value={filters.searchTerm}
                onChange={handleInputChange}
                className="pl-10"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="niche">Niche</Label>
            <Select value={filters.niche} onValueChange={(value) => handleSelectChange('niche', value)}>
              <SelectTrigger id="niche">
                <SelectValue placeholder="All Niches" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Niches</SelectItem>
                {MOCK_INFLUENCER_NICHES.map(niche => (
                  <SelectItem key={niche} value={niche.toLowerCase()}>{niche}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              placeholder="e.g., New York, USA"
              value={filters.location}
              onChange={handleInputChange}
            />
          </div>
          <div className="lg:col-span-1">
            <Label htmlFor="platform">Social Platform</Label>
            <Select value={filters.platform} onValueChange={(value) => handleSelectChange('platform', value)}>
              <SelectTrigger id="platform">
                <SelectValue placeholder="All Platforms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Platforms</SelectItem>
                {MOCK_SOCIAL_PLATFORMS.map(platform => (
                  <SelectItem key={platform} value={platform.toLowerCase()}>{platform}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div>
            <Label htmlFor="followerRange">Follower Range: {filters.followerRange[0].toLocaleString()} - {filters.followerRange[1].toLocaleString()}{filters.followerRange[1] === 10000000 ? '+' : ''}</Label>
            <Slider
              id="followerRange"
              min={0}
              max={10000000}
              step={1000}
              value={filters.followerRange}
              onValueChange={(value) => handleSliderChange('followerRange', value as [number,number])}
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="engagementRateRange">Engagement Rate: {filters.engagementRateRange[0]}% - {filters.engagementRateRange[1]}%</Label>
             <Slider
              id="engagementRateRange"
              min={0}
              max={20} // Max 20% for typical engagement rates
              step={0.1}
              value={filters.engagementRateRange}
              onValueChange={(value) => handleSliderChange('engagementRateRange', value as [number, number])}
              className="mt-2"
            />
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
          <Button type="submit" className="w-full sm:w-auto flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
            <Filter className="h-4 w-4" /> Apply Filters
          </Button>
          <Button type="button" variant="outline" onClick={handleReset} className="w-full sm:w-auto flex items-center gap-2">
            <X className="h-4 w-4" /> Reset Filters
          </Button>
        </div>
      </form>
    </Card>
  );
}
