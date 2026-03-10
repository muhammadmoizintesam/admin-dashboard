'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileBarChart, Download, Calendar, Filter } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAnimationConfig } from '@/hooks/use-animation-config';

export default function ReportsPage() {
  const anim = useAnimationConfig();
  const reports = [
    { id: 1, name: 'Monthly Revenue Report', type: 'Financial', date: '2024-01-15', status: 'Ready' },
    { id: 2, name: 'User Activity Report', type: 'Analytics', date: '2024-01-14', status: 'Ready' },
    { id: 3, name: 'Team Performance Report', type: 'HR', date: '2024-01-13', status: 'Processing' },
    { id: 4, name: 'Security Audit Report', type: 'Security', date: '2024-01-12', status: 'Ready' },
    { id: 5, name: 'Customer Satisfaction Report', type: 'Support', date: '2024-01-11', status: 'Ready' },
  ];

  return (
    <motion.div initial={anim.enabled ? { opacity: 0 } : false} animate={{ opacity: 1 }} transition={anim.transition} className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink href="/">Dashboard</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>Reports</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground">Generate and download reports.</p>
        </div>
        <Button><Download className="w-4 h-4 mr-2" />Generate Report</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-4"><div className="text-2xl font-bold">24</div><div className="text-sm text-muted-foreground">Reports Generated</div></Card>
        <Card className="p-4"><div className="text-2xl font-bold">5</div><div className="text-sm text-muted-foreground">Scheduled Reports</div></Card>
        <Card className="p-4"><div className="text-2xl font-bold">12</div><div className="text-sm text-muted-foreground">Templates</div></Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Reports</CardTitle>
            <div className="flex gap-2">
              <Select defaultValue="all"><SelectTrigger className="w-[130px]"><SelectValue placeholder="Filter" /></SelectTrigger><SelectContent><SelectItem value="all">All Types</SelectItem><SelectItem value="financial">Financial</SelectItem><SelectItem value="analytics">Analytics</SelectItem></SelectContent></Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {reports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"><FileBarChart className="w-5 h-5 text-primary" /></div>
                  <div><p className="font-medium">{report.name}</p><p className="text-xs text-muted-foreground">{report.type} • {report.date}</p></div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${report.status === 'Ready' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'}`}>{report.status}</span>
                  {report.status === 'Ready' && <Button size="sm" variant="ghost"><Download className="w-4 h-4" /></Button>}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
