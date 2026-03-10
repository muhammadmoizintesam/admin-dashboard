'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Filter, Download, AlertTriangle, Shield, User, Settings } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { formatDateTime, cn } from '@/utils/helpers';
import { useAnimationConfig } from '@/hooks/use-animation-config';

const auditLogs = [
  { id: '1', action: 'User Login', user: 'admin@company.com', ip: '192.168.1.1', timestamp: '2024-01-15T10:30:00', severity: 'info', details: 'Successful login from Chrome browser' },
  { id: '2', action: 'Permission Changed', user: 'admin@company.com', ip: '192.168.1.1', timestamp: '2024-01-15T10:25:00', severity: 'warning', details: 'Changed user role from Developer to Admin' },
  { id: '3', action: 'API Key Created', user: 'dev@company.com', ip: '192.168.1.50', timestamp: '2024-01-15T09:45:00', severity: 'info', details: 'Created new API key: Production Key' },
  { id: '4', action: 'Failed Login Attempt', user: 'unknown@test.com', ip: '10.0.0.55', timestamp: '2024-01-15T09:30:00', severity: 'critical', details: 'Multiple failed login attempts detected' },
  { id: '5', action: 'Settings Updated', user: 'admin@company.com', ip: '192.168.1.1', timestamp: '2024-01-14T16:00:00', severity: 'info', details: 'Updated security settings' },
  { id: '6', action: 'Data Export', user: 'analyst@company.com', ip: '192.168.1.30', timestamp: '2024-01-14T14:30:00', severity: 'warning', details: 'Exported user data report' },
  { id: '7', action: 'Integration Connected', user: 'admin@company.com', ip: '192.168.1.1', timestamp: '2024-01-14T11:00:00', severity: 'info', details: 'Connected Slack integration' },
  { id: '8', action: 'User Deleted', user: 'admin@company.com', ip: '192.168.1.1', timestamp: '2024-01-13T10:00:00', severity: 'critical', details: 'Deleted user: test@example.com' },
];

export default function AuditLogsPage() {
  const [severityFilter, setSeverityFilter] = useState('all');
  const anim = useAnimationConfig();

  const getSeverityColor = (severity: string) => {
    const colors: Record<string, string> = {
      info: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
      warning: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
      critical: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    };
    return colors[severity] || colors.info;
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <AlertTriangle className="w-4 h-4" />;
      case 'warning': return <Shield className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  const filteredLogs = severityFilter === 'all' ? auditLogs : auditLogs.filter(log => log.severity === severityFilter);

  return (
    <motion.div initial={anim.enabled ? { opacity: 0 } : false} animate={{ opacity: 1 }} transition={anim.transition} className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink href="/">Dashboard</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>Audit Logs</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Audit Logs</h1>
          <p className="text-muted-foreground">Security and compliance audit trail.</p>
        </div>
        <div className="flex gap-2">
          <Select value={severityFilter} onValueChange={setSeverityFilter}>
            <SelectTrigger className="w-[130px]"><SelectValue placeholder="Severity" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="info">Info</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline"><Download className="w-4 h-4 mr-2" />Export</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-4"><div className="text-2xl font-bold">{auditLogs.length}</div><div className="text-sm text-muted-foreground">Total Events</div></Card>
        <Card className="p-4"><div className="text-2xl font-bold text-blue-500">{auditLogs.filter(l => l.severity === 'info').length}</div><div className="text-sm text-muted-foreground">Info</div></Card>
        <Card className="p-4"><div className="text-2xl font-bold text-amber-500">{auditLogs.filter(l => l.severity === 'warning').length}</div><div className="text-sm text-muted-foreground">Warnings</div></Card>
        <Card className="p-4"><div className="text-2xl font-bold text-red-500">{auditLogs.filter(l => l.severity === 'critical').length}</div><div className="text-sm text-muted-foreground">Critical</div></Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Activity Log</CardTitle></CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {filteredLogs.map((log) => (
              <div key={log.id} className="p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center', log.severity === 'critical' && 'bg-red-100 dark:bg-red-900/30', log.severity === 'warning' && 'bg-amber-100 dark:bg-amber-900/30', log.severity === 'info' && 'bg-blue-100 dark:bg-blue-900/30')}>
                    {getSeverityIcon(log.severity)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{log.action}</p>
                      <Badge className={getSeverityColor(log.severity)}>{log.severity}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{log.details}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span>User: {log.user}</span>
                      <span>IP: {log.ip}</span>
                      <span>{formatDateTime(log.timestamp)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
