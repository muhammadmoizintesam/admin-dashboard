'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Receipt, Check } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { subscriptions as initialSubscriptions } from '@/mock-data/subscriptions';
import { formatCurrency, getStatusColor } from '@/utils/helpers';
import { useAnimationConfig } from '@/hooks/use-animation-config';

export default function SubscriptionsPage() {
  const [subscriptions] = useState(initialSubscriptions);
  const anim = useAnimationConfig();

  return (
    <motion.div initial={anim.enabled ? { opacity: 0 } : false} animate={{ opacity: 1 }} transition={anim.transition} className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink href="/">Dashboard</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>Subscriptions</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div>
        <h1 className="text-2xl font-bold tracking-tight">Subscriptions</h1>
        <p className="text-muted-foreground">Manage customer subscriptions.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-4"><div className="text-2xl font-bold">{subscriptions.length}</div><div className="text-sm text-muted-foreground">Total Subscriptions</div></Card>
        <Card className="p-4"><div className="text-2xl font-bold">{subscriptions.filter(s => s.status === 'Active').length}</div><div className="text-sm text-muted-foreground">Active</div></Card>
        <Card className="p-4"><div className="text-2xl font-bold">{formatCurrency(subscriptions.reduce((acc, s) => acc + (s.status === 'Active' ? s.amount : 0), 0))}</div><div className="text-sm text-muted-foreground">Monthly Revenue</div></Card>
      </div>

      <Card>
        <CardHeader><CardTitle>All Subscriptions</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {subscriptions.map((sub) => (
              <div key={sub.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"><Receipt className="w-5 h-5 text-primary" /></div>
                  <div><p className="font-medium">{sub.customer}</p><p className="text-xs text-muted-foreground">{sub.plan} • {sub.billingCycle}</p></div>
                </div>
                <div className="flex items-center gap-3">
                  <p className="font-medium">{formatCurrency(sub.amount)}/{sub.billingCycle.toLowerCase()}</p>
                  <Badge className={getStatusColor(sub.status)}>{sub.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
