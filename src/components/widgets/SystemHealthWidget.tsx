'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, XCircle, ChevronRight } from 'lucide-react';
import { systemHealth } from '@/mock-data/analytics';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import WidgetCard from '@/components/cards/WidgetCard';

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'operational':
      return <CheckCircle className="w-4 h-4 text-emerald-500" />;
    case 'degraded':
      return <AlertTriangle className="w-4 h-4 text-amber-500" />;
    case 'down':
      return <XCircle className="w-4 h-4 text-red-500" />;
    default:
      return <CheckCircle className="w-4 h-4 text-gray-500" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'operational':
      return 'text-emerald-600 dark:text-emerald-400';
    case 'degraded':
      return 'text-amber-600 dark:text-amber-400';
    case 'down':
      return 'text-red-600 dark:text-red-400';
    default:
      return 'text-gray-600';
  }
};

export default function SystemHealthWidget() {
  return (
    <WidgetCard
      title="System Health"
      subtitle="Service status overview"
      action={
        <Button variant="ghost" size="sm" className="text-xs">
          Details
          <ChevronRight className="w-3 h-3 ml-1" />
        </Button>
      }
    >
      <div className="space-y-4">
        {/* Incidents Alert */}
        {systemHealth.incidents.length > 0 && (
          <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-medium text-amber-600 dark:text-amber-400">
                Active Incident
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              {systemHealth.incidents[0].service}: {systemHealth.incidents[0].message}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {systemHealth.incidents[0].time}
            </p>
          </div>
        )}

        {/* Services List */}
        <div className="space-y-2">
          {systemHealth.services.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-2">
                {getStatusIcon(service.status)}
                <span className="text-sm">{service.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs ${getStatusColor(service.status)}`}>
                  {service.status}
                </span>
                <span className="text-xs text-muted-foreground">{service.uptime}%</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <span className="text-sm text-muted-foreground">Overall Status</span>
          <Badge
            variant="outline"
            className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
          >
            Healthy
          </Badge>
        </div>
      </div>
    </WidgetCard>
  );
}
