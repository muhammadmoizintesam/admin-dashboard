'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Filter, Download } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { activityLogs as initialLogs } from '@/mock-data/activity-logs';
import { formatRelativeTime, formatDateTime, cn } from '@/utils/helpers';
import DataTable, { Column } from '@/components/tables/DataTable';

interface ActivityLog {
  id: string;
  type: string;
  action: string;
  description: string;
  user: string;
  timestamp: string;
  ipAddress?: string;
}

export default function ActivityLogsPage() {
  const [logs] = useState(initialLogs);

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      create: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
      update: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
      delete: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
      login: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
      logout: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400',
      export: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    };
    return colors[type] || 'bg-gray-100 text-gray-700';
  };

  const columns: Column<ActivityLog>[] = [
    {
      key: 'type', header: 'Type', sortable: true, render: (log) => (
        <Badge className={getTypeColor(log.type)}>{log.type}</Badge>
      )
    },
    { key: 'action', header: 'Action', sortable: true },
    { key: 'description', header: 'Description' },
    { key: 'user', header: 'User', sortable: true },
    {
      key: 'timestamp', header: 'Time', sortable: true, render: (log) => (
        <span className="text-sm text-muted-foreground">{formatRelativeTime(log.timestamp)}</span>
      )
    },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink href="/">Dashboard</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>Activity Logs</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Activity Logs</h1>
          <p className="text-muted-foreground">Track all system activities.</p>
        </div>
        <Button variant="outline"><Download className="w-4 h-4 mr-2" />Export Logs</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-4"><div className="text-2xl font-bold">{logs.length}</div><div className="text-sm text-muted-foreground">Total Events</div></Card>
        <Card className="p-4"><div className="text-2xl font-bold">{logs.filter(l => l.type === 'create').length}</div><div className="text-sm text-muted-foreground">Created</div></Card>
        <Card className="p-4"><div className="text-2xl font-bold">{logs.filter(l => l.type === 'update').length}</div><div className="text-sm text-muted-foreground">Updated</div></Card>
        <Card className="p-4"><div className="text-2xl font-bold">{logs.filter(l => l.type === 'delete').length}</div><div className="text-sm text-muted-foreground">Deleted</div></Card>
      </div>

      <DataTable
        data={logs}
        columns={columns}
        searchPlaceholder="Search activity logs..."
        filters={[{ key: 'type', label: 'Type', options: ['create', 'update', 'delete', 'login', 'logout', 'export'] }]}
      />
    </motion.div>
  );
}
