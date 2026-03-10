'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, UserPlus, FileEdit, CheckCircle, AlertTriangle, LogIn } from 'lucide-react';
import { activityLogs } from '@/mock-data/activity-logs';
import { Button } from '@/components/ui/button';
import { formatRelativeTime } from '@/utils/helpers';
import { useAnimationConfig } from '@/hooks/use-animation-config';
import WidgetCard from '@/components/cards/WidgetCard';

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'create':
      return <UserPlus className="w-4 h-4 text-emerald-500" />;
    case 'update':
      return <FileEdit className="w-4 h-4 text-blue-500" />;
    case 'login':
      return <LogIn className="w-4 h-4 text-purple-500" />;
    case 'logout':
      return <LogIn className="w-4 h-4 text-gray-500" />;
    case 'delete':
      return <AlertTriangle className="w-4 h-4 text-red-500" />;
    case 'export':
      return <CheckCircle className="w-4 h-4 text-amber-500" />;
    default:
      return <CheckCircle className="w-4 h-4 text-gray-500" />;
  }
};

const getActivityColor = (type: string) => {
  switch (type) {
    case 'create':
      return 'bg-emerald-500/10 border-emerald-500/20';
    case 'update':
      return 'bg-blue-500/10 border-blue-500/20';
    case 'login':
      return 'bg-purple-500/10 border-purple-500/20';
    case 'delete':
      return 'bg-red-500/10 border-red-500/20';
    default:
      return 'bg-gray-500/10 border-gray-500/20';
  }
};

export default function ActivityFeedWidget() {
  const recentActivities = activityLogs.slice(0, 6);
  const anim = useAnimationConfig();

  return (
    <WidgetCard
      title="Activity Feed"
      subtitle="Recent system activity"
      action={
        <Button variant="ghost" size="sm" className="text-xs">
          View all
          <ArrowRight className="w-3 h-3 ml-1" />
        </Button>
      }
    >
      <div className="space-y-4">
        {recentActivities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={anim.enabled ? { opacity: 0, x: -10 } : false}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...anim.transition, delay: anim.enabled ? index * 0.03 : 0 }}
            className="flex items-start gap-3"
          >
            <div
              className={`w-8 h-8 rounded-lg border flex items-center justify-center flex-shrink-0 ${getActivityColor(
                activity.type
              )}`}
            >
              {getActivityIcon(activity.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{activity.action}</p>
              <p className="text-xs text-muted-foreground line-clamp-1">
                {activity.description}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-muted-foreground">{activity.user}</span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">
                  {formatRelativeTime(activity.timestamp)}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </WidgetCard>
  );
}
