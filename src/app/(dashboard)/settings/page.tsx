"use client";

import { PageHeader } from "@/components/shared/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { RoleSwitcher } from "@/components/auth/RoleSwitcher";

export default function SettingsPage() {
  const { currentUser, currentRole } = useAuth();
  const { toast } = useToast();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false); // This would typically tie into a theme context

  const handleSaveChanges = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated. (Mock action)",
    });
  };
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark', !darkMode);
    localStorage.setItem('theme', !darkMode ? 'dark' : 'light');
  }
  
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setDarkMode(false);
    }
  }, []);


  if (!currentUser) return null;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Manage your account preferences and platform settings."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>View and update your basic account details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={currentUser.email} disabled />
            </div>
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={currentUser.name || ""} placeholder="Your Name" />
            </div>
             <div>
              <Label>Current Role</Label>
              <RoleSwitcher />
            </div>
            <Button onClick={handleSaveChanges} className="w-full">Save Account Changes</Button>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
            <CardDescription>Control how you receive notifications from AmplyAI.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notifications" className="flex flex-col space-y-1">
                <span>Email Notifications</span>
                <span className="font-normal leading-snug text-muted-foreground">
                  Receive updates about new messages, campaign offers, and platform news.
                </span>
              </Label>
              <Switch
                id="email-notifications"
                checked={notificationsEnabled}
                onCheckedChange={setNotificationsEnabled}
              />
            </div>
            {/* Add more notification toggles here */}
            <Button onClick={handleSaveChanges} className="w-full">Save Notification Settings</Button>
          </CardContent>
        </Card>
        
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Customize the look and feel of the platform.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="dark-mode" className="flex flex-col space-y-1">
                <span>Dark Mode</span>
                <span className="font-normal leading-snug text-muted-foreground">
                  Switch to a darker interface.
                </span>
              </Label>
              <Switch
                id="dark-mode"
                checked={darkMode}
                onCheckedChange={toggleDarkMode}
              />
            </div>
            {/* Language selection could go here */}
            <Button onClick={handleSaveChanges} className="w-full">Save Appearance Settings</Button>
          </CardContent>
        </Card>

        <Card className="shadow-md md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>Data & Privacy</CardTitle>
            <CardDescription>Manage your data and privacy settings.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline">Download My Data (Not Implemented)</Button>
            <Button variant="destructive">Delete My Account (Not Implemented)</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Add useEffect for initial theme setup if not already present in RootLayout
import { useEffect } from "react";
