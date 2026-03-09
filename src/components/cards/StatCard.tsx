'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/utils/helpers';
import { Card, CardContent } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: LucideIcon;
  iconColor?: string;
  iconBgColor?: string;
  index?: number;
}

export default function StatCard({
  title,
  value,
  change,
  changeLabel = 'vs last month',
  icon: Icon,
  iconColor = 'text-primary',
  iconBgColor = 'bg-primary/10',
  index = 0,
}: StatCardProps) {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              <p className="text-2xl font-bold tracking-tight">{value}</p>
              {change !== undefined && (
                <div className="flex items-center gap-1.5">
                  <span
                    className={cn(
                      'flex items-center text-sm font-medium',
                      isPositive && 'text-emerald-600 dark:text-emerald-400',
                      isNegative && 'text-red-600 dark:text-red-400',
                      !isPositive && !isNegative && 'text-muted-foreground'
                    )}
                  >
                    {isPositive && <TrendingUp className="w-4 h-4 mr-0.5" />}
                    {isNegative && <TrendingDown className="w-4 h-4 mr-0.5" />}
                    {isPositive && '+'}
                    {change}%
                  </span>
                  <span className="text-sm text-muted-foreground">{changeLabel}</span>
                </div>
              )}
            </div>
            <div className={cn('p-3 rounded-xl', iconBgColor)}>
              <Icon className={cn('w-6 h-6', iconColor)} />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
