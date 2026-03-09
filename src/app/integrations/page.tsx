'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plug, Plus, Settings, ExternalLink, Check, X } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';

const integrations = [
  { id: 1, name: 'Slack', description: 'Send notifications to Slack channels', icon: '💬', connected: true, category: 'Communication' },
  { id: 2, name: 'GitHub', description: 'Sync your repositories and issues', icon: '🐙', connected: true, category: 'Development' },
  { id: 3, name: 'Jira', description: 'Sync tasks and projects', icon: '📋', connected: false, category: 'Project Management' },
  { id: 4, name: 'Google Drive', description: 'Store and share files', icon: '📁', connected: true, category: 'Storage' },
  { id: 5, name: 'Zapier', description: 'Connect to 5000+ apps', icon: '⚡', connected: false, category: 'Automation' },
  { id: 6, name: 'Stripe', description: 'Accept payments online', icon: '💳', connected: true, category: 'Payments' },
  { id: 7, name: 'Notion', description: 'Sync docs and databases', icon: '📝', connected: false, category: 'Productivity' },
  { id: 8, name: 'Figma', description: 'Design collaboration', icon: '🎨', connected: false, category: 'Design' },
];

export default function IntegrationsPage() {
  const [connected, setConnected] = useState(integrations.map(i => ({ id: i.id, connected: i.connected })));

  const toggleIntegration = (id: number) => {
    setConnected(connected.map(c => c.id === id ? { ...c, connected: !c.connected } : c));
  };

  const isConnected = (id: number) => connected.find(c => c.id === id)?.connected || false;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink href="/">Dashboard</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>Integrations</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Integrations</h1>
          <p className="text-muted-foreground">Connect your favorite tools and services.</p>
        </div>
        <Button><Plus className="w-4 h-4 mr-2" />Browse All</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-4"><div className="text-2xl font-bold">{connected.filter(c => c.connected).length}</div><div className="text-sm text-muted-foreground">Connected</div></Card>
        <Card className="p-4"><div className="text-2xl font-bold">{integrations.length}</div><div className="text-sm text-muted-foreground">Available</div></Card>
        <Card className="p-4"><div className="text-2xl font-bold">{new Set(integrations.map(i => i.category)).size}</div><div className="text-sm text-muted-foreground">Categories</div></Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {integrations.map((integration) => (
          <Card key={integration.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-xl">{integration.icon}</div>
                  <div>
                    <CardTitle className="text-base">{integration.name}</CardTitle>
                    <p className="text-xs text-muted-foreground">{integration.category}</p>
                  </div>
                </div>
                <Switch checked={isConnected(integration.id)} onCheckedChange={() => toggleIntegration(integration.id)} />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{integration.description}</p>
              <div className="flex items-center justify-between">
                <Badge variant={isConnected(integration.id) ? 'default' : 'outline'} className={isConnected(integration.id) ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : ''}>
                  {isConnected(integration.id) ? <><Check className="w-3 h-3 mr-1" />Connected</> : 'Not Connected'}
                </Badge>
                {isConnected(integration.id) && (
                  <Button size="sm" variant="ghost"><Settings className="w-4 h-4" /></Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}
