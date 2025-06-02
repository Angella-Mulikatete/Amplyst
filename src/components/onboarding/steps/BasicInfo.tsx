
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BasicInfoData {
  firstName: string;
  lastName: string;
  bio: string;
  niche: string;
  followerCount: string;
  location: string;
}

interface BasicInfoProps {
  data: BasicInfoData;
  onUpdate: (data: Partial<BasicInfoData>) => void;
}

const BasicInfo = ({ data, onUpdate }: BasicInfoProps) => {
  const niches = [
    "Beauty & Skincare",
    "Fashion & Style",
    "Fitness & Health",
    "Food & Cooking",
    "Travel",
    "Technology",
    "Lifestyle",
    "Gaming",
    "Education",
    "Entertainment",
    "Business",
    "Parenting",
    "Home & Garden",
    "Arts & Crafts",
    "Music",
    "Sports",
    "Photography",
    "Other"
  ];

  const followerRanges = [
    "1K - 5K",
    "5K - 10K", 
    "10K - 25K",
    "25K - 50K",
    "50K - 100K",
    "100K+"
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 font-poppins">Tell us about yourself</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              value={data.firstName}
              onChange={(e) => onUpdate({ firstName: e.target.value })}
              placeholder="Sarah"
              className="transition-all duration-200 focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={data.lastName}
              onChange={(e) => onUpdate({ lastName: e.target.value })}
              placeholder="Johnson"
              className="transition-all duration-200 focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          value={data.bio}
          onChange={(e) => onUpdate({ bio: e.target.value })}
          placeholder="Tell us about yourself and your content style..."
          className="min-h-[100px] transition-all duration-200 focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="niche">Primary Niche</Label>
          <Select onValueChange={(value) => onUpdate({ niche: value })}>
            <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-primary">
              <SelectValue placeholder="Select your niche" />
            </SelectTrigger>
            <SelectContent>
              {niches.map((niche) => (
                <SelectItem key={niche} value={niche}>
                  {niche}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="followerCount">Follower Count</Label>
          <Select onValueChange={(value) => onUpdate({ followerCount: value })}>
            <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-primary">
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
              {followerRanges.map((range) => (
                <SelectItem key={range} value={range}>
                  {range}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          value={data.location}
          onChange={(e) => onUpdate({ location: e.target.value })}
          placeholder="City, Country"
          className="transition-all duration-200 focus:ring-2 focus:ring-primary"
        />
      </div>
    </div>
  );
};

export default BasicInfo;
