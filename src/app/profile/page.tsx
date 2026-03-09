'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Mail, Phone, MapPin, Building, Calendar, Save } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export default function ProfilePage() {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Admin User',
    email: 'admin@company.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    department: 'Engineering',
    role: 'Admin',
    joinDate: '2021-05-20',
    bio: 'Platform administrator with 5+ years of experience in system management and security.',
  });

  const handleSave = () => {
    setIsEditing(false);
    toast({ title: 'Profile updated', description: 'Your profile has been updated successfully.' });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink href="/">Dashboard</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>Profile</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Profile</h1>
          <p className="text-muted-foreground">Manage your personal information.</p>
        </div>
        <Button onClick={() => isEditing ? handleSave() : setIsEditing(true)}>
          {isEditing ? <><Save className="w-4 h-4 mr-2" />Save Changes</> : 'Edit Profile'}
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Card */}
        <Card className="lg:col-span-1">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" />
                  <AvatarFallback className="text-2xl">AD</AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button size="sm" variant="outline" className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0">
                    <Camera className="w-4 h-4" />
                  </Button>
                )}
              </div>
              <h2 className="text-xl font-bold mt-4">{profile.name}</h2>
              <p className="text-muted-foreground">{profile.email}</p>
              <Badge className="mt-2">{profile.role}</Badge>
              <div className="w-full mt-6 space-y-3 text-sm text-left">
                <div className="flex items-center gap-3 p-2 bg-muted/50 rounded-lg">
                  <Building className="w-4 h-4 text-muted-foreground" />
                  <span>{profile.department}</span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-muted/50 rounded-lg">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>Joined {profile.joinDate}</span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-muted/50 rounded-lg">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{profile.location}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Details Card */}
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Personal Information</CardTitle></CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} disabled={!isEditing} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} disabled={!isEditing} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} disabled={!isEditing} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" value={profile.location} onChange={(e) => setProfile({ ...profile, location: e.target.value })} disabled={!isEditing} />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="bio">Bio</Label>
                <textarea id="bio" value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} disabled={!isEditing} className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-4"><div className="text-2xl font-bold">128</div><div className="text-sm text-muted-foreground">Tasks Completed</div></Card>
        <Card className="p-4"><div className="text-2xl font-bold">24</div><div className="text-sm text-muted-foreground">Projects</div></Card>
        <Card className="p-4"><div className="text-2xl font-bold">1,240</div><div className="text-sm text-muted-foreground">Activities</div></Card>
        <Card className="p-4"><div className="text-2xl font-bold">98%</div><div className="text-sm text-muted-foreground">Uptime</div></Card>
      </div>
    </motion.div>
  );
}
