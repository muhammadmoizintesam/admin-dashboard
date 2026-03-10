'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Plus, Download, Check } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { invoices as initialInvoices } from '@/mock-data/invoices';
import { formatCurrency, formatDate, getStatusColor } from '@/utils/helpers';
import { useAnimationConfig } from '@/hooks/use-animation-config';

export default function BillingPage() {
  const [invoices] = useState(initialInvoices);
  const anim = useAnimationConfig();

  return (
    <motion.div initial={anim.enabled ? { opacity: 0 } : false} animate={{ opacity: 1 }} transition={anim.transition} className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink href="/">Dashboard</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>Billing</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Billing</h1>
          <p className="text-muted-foreground">Manage your billing and payment methods.</p>
        </div>
        <Button><Plus className="w-4 h-4 mr-2" />Add Payment Method</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Current Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">Pro Plan</p>
                <p className="text-sm text-muted-foreground">$49/month • Billed monthly</p>
              </div>
              <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">Active</Badge>
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground mb-2">Plan includes:</p>
              <div className="grid grid-cols-2 gap-2">
                {['Unlimited users', 'Advanced analytics', 'Priority support', 'Custom integrations'].map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-sm"><Check className="w-4 h-4 text-emerald-500" />{feature}</div>
                ))}
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">Upgrade Plan</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Payment Method</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
              <div className="w-12 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded flex items-center justify-center text-white text-xs font-bold">VISA</div>
              <div>
                <p className="font-medium">•••• •••• •••• 4242</p>
                <p className="text-xs text-muted-foreground">Expires 12/25</p>
              </div>
              <Badge variant="outline" className="ml-auto">Default</Badge>
            </div>
            <Button variant="outline" className="w-full mt-4">Manage Payment Methods</Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Invoices</CardTitle>
          <CardDescription>View and download your invoices.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {invoices.slice(0, 5).map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"><CreditCard className="w-5 h-5 text-primary" /></div>
                  <div><p className="font-medium">{invoice.id}</p><p className="text-xs text-muted-foreground">{formatDate(invoice.date)}</p></div>
                </div>
                <div className="flex items-center gap-3">
                  <p className="font-medium">{formatCurrency(invoice.amount)}</p>
                  <Badge className={getStatusColor(invoice.status)}>{invoice.status}</Badge>
                  <Button size="sm" variant="ghost"><Download className="w-4 h-4" /></Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
