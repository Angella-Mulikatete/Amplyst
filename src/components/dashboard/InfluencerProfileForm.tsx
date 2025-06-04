"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import type { InfluencerProfile } from "@/types";
import { MOCK_INFLUENCER_NICHES, MOCK_SOCIAL_PLATFORMS } from "@/lib/constants";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { PlusCircle, Trash2 } from "lucide-react";

const socialLinkSchema = z.object({
  platform: z.string().min(1, "Platform is required."),
  url: z.string().url("Invalid URL."),
  followers: z.coerce.number().min(0, "Followers must be non-negative."),
});

const influencerProfileSchema = z.object({
  bio: z.string().min(10, "Bio must be at least 10 characters.").max(500, "Bio cannot exceed 500 characters."),
  niche: z.array(z.string()).min(1, "Select at least one niche."),
  location: z.string().min(2, "Location is required."),
  profilePictureUrl: z.string().url("Invalid URL for profile picture.").optional().or(z.literal('')),
  socialMediaLinks: z.array(socialLinkSchema).min(1, "Add at least one social media link."),
  audienceDemographics: z.object({
    ageRange: z.string().optional(),
    genderSplit: z.object({
      male: z.coerce.number().min(0).max(100).optional(),
      female: z.coerce.number().min(0).max(100).optional(),
      other: z.coerce.number().min(0).max(100).optional(),
    }).optional(),
    topLocations: z.array(z.string()).optional(),
  }).optional(),
  engagementRate: z.coerce.number().min(0).max(100, "Engagement rate must be between 0 and 100.").optional(),
});

type InfluencerProfileFormData = z.infer<typeof influencerProfileSchema>;

interface InfluencerProfileFormProps {
  profile?: InfluencerProfile; // For editing existing profile
  userId: string;
  onSubmitSuccess?: (data: InfluencerProfile) => void;
}

export function InfluencerProfileForm({ profile, userId, onSubmitSuccess }: InfluencerProfileFormProps) {
  const { toast } = useToast();
  const form = useForm<InfluencerProfileFormData>({
    resolver: zodResolver(influencerProfileSchema),
    defaultValues: {
      bio: profile?.bio || "",
      niche: profile?.niche || [],
      location: profile?.location || "",
      profilePictureUrl: profile?.profilePictureUrl || "",
      socialMediaLinks: profile?.socialMediaLinks || [{ platform: "", url: "", followers: 0 }],
      audienceDemographics: profile?.audienceDemographics || { ageRange: "", genderSplit: { male: 0, female: 0, other: 0 }, topLocations: [] },
      engagementRate: profile?.engagementRate || 0,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "socialMediaLinks",
  });

  function onSubmit(values: InfluencerProfileFormData) {
    // Simulate saving data
    const completeProfileData: InfluencerProfile = {
      ...values,
      userId,
      // Ensure optional fields are handled correctly if they are empty strings vs undefined
      profilePictureUrl: values.profilePictureUrl || undefined,
      engagementRate: values.engagementRate ?? 0,
      // Default some fields if not provided
      audienceDemographics: {
        ageRange: values.audienceDemographics?.ageRange || "N/A",
        genderSplit: {
          male: values.audienceDemographics?.genderSplit?.male ?? 0,
          female: values.audienceDemographics?.genderSplit?.female ?? 0,
          other: values.audienceDemographics?.genderSplit?.other ?? 0,
        },
        topLocations: values.audienceDemographics?.topLocations || [],
      }
    };
    console.log("Influencer Profile Data:", completeProfileData);
    toast({
      title: "Profile Updated!",
      description: "Your influencer profile has been successfully saved.",
    });
    if (onSubmitSuccess) {
      onSubmitSuccess(completeProfileData);
    }
  }

  return (
    <Card className="shadow-lg">
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Tell us about yourself, your content, and what makes you unique..." {...field} rows={5} />
                  </FormControl>
                  <FormDescription>A captivating bio helps brands understand you better. (Max 500 characters)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="profilePictureUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile Picture URL</FormLabel>
                  <FormControl>
                    <Input type="url" placeholder="https://example.com/your-image.png" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., New York, USA" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="niche"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Niches/Categories</FormLabel>
                  <FormDescription>Select all that apply to your content.</FormDescription>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 pt-2">
                    {MOCK_INFLUENCER_NICHES.map((nicheItem) => (
                      <FormField
                        key={nicheItem}
                        control={form.control}
                        name="niche"
                        render={({ field: itemField }) => {
                          return (
                            <FormItem
                              key={nicheItem}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={itemField.value?.includes(nicheItem)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? itemField.onChange([...(itemField.value || []), nicheItem])
                                      : itemField.onChange(
                                        (itemField.value || []).filter(
                                            (value) => value !== nicheItem
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal text-sm">
                                {nicheItem}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="space-y-4">
              <FormLabel>Social Media Links</FormLabel>
              {fields.map((item, index) => (
                <Card key={item.id} className="p-4 space-y-4 bg-secondary/50">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name={`socialMediaLinks.${index}.platform`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Platform</FormLabel>
                           <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select platform" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {MOCK_SOCIAL_PLATFORMS.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`socialMediaLinks.${index}.url`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Profile URL</FormLabel>
                          <FormControl>
                            <Input type="url" placeholder="https://platform.com/username" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`socialMediaLinks.${index}.followers`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Followers</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="10000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="button" variant="destructive" size="sm" onClick={() => remove(index)} className="flex items-center gap-1">
                    <Trash2 className="h-4 w-4" /> Remove Link
                  </Button>
                </Card>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => append({ platform: "", url: "", followers: 0 })}
                className="flex items-center gap-1"
              >
                <PlusCircle className="h-4 w-4" /> Add Social Link
              </Button>
            </div>

            <FormField
              control={form.control}
              name="engagementRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Average Engagement Rate (%)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" placeholder="e.g., 3.5" {...field} />
                  </FormControl>
                  <FormDescription>Your typical engagement rate across platforms.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Optional Audience Demographics */}
            <FormLabel>Audience Demographics (Optional)</FormLabel>
            <Card className="p-4 space-y-4 bg-secondary/50">
               <FormField
                control={form.control}
                name="audienceDemographics.ageRange"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary Age Range</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 18-24, 25-34" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Gender split could be more complex UI, e.g. sliders. For now, simple inputs. */}
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="audienceDemographics.genderSplit.male"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Male Audience (%)</FormLabel>
                      <FormControl><Input type="number" placeholder="40" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="audienceDemographics.genderSplit.female"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Female Audience (%)</FormLabel>
                      <FormControl><Input type="number" placeholder="55" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="audienceDemographics.genderSplit.other"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Other Audience (%)</FormLabel>
                      <FormControl><Input type="number" placeholder="5" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* Top locations could be a tag input or multi-select. For now, comma-separated. */}
              <FormField
                control={form.control}
                name="audienceDemographics.topLocations"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Top Audience Locations</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., USA, UK, Canada (comma-separated)" {...field} 
                        onChange={e => field.onChange(e.target.value.split(',').map(s => s.trim()))} 
                        value={Array.isArray(field.value) ? field.value.join(', ') : ''} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Card>


            <Button type="submit" className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
              {profile ? "Save Changes" : "Create Profile"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
