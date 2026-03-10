'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/utils/helpers';
import { Card, CardContent } from '@/components/ui/card';
import { useAnimationConfig } from '@/hooks/use-animation-config';

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
  const anim = useAnimationConfig();

  const cardVariants = {
    hidden: anim.enabled ? { opacity: 0, y: 12 } : { opacity: 1, y: 0 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: anim.duration, delay: anim.enabled ? index * 0.05 : 0 },
    },
    hover: anim.hoverOn ? { scale: anim.hoverScale, transition: anim.transition } : undefined,
    tap: anim.hoverOn ? { scale: anim.tapScale, transition: anim.transition } : undefined,
  };

  const iconVariants = {
    hidden: anim.enabled ? { opacity: 0 } : { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { duration: anim.duration, delay: anim.enabled ? index * 0.05 + 0.05 : 0 },
    },
    hover: anim.hoverOn ? { scale: anim.hoverScale, transition: anim.transition } : undefined,
  };

  const valueVariants = {
    hidden: anim.enabled ? { opacity: 0 } : { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { duration: anim.duration, delay: anim.enabled ? index * 0.05 + 0.05 : 0 },
    },
  };

  const changeVariants = {
    hidden: anim.enabled ? { opacity: 0 } : { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { duration: anim.duration, delay: anim.enabled ? index * 0.05 + 0.1 : 0 },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="tap"
      layout
    >
      <Card className="relative overflow-hidden group">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-150" />

        <CardContent className="p-6 relative">
          <div className="flex items-start justify-between">
            <div className="space-y-2 flex-1">
              <motion.p
                className="text-sm font-medium text-muted-foreground"
                initial={anim.enabled ? { opacity: 0 } : false}
                animate={{ opacity: 1 }}
                transition={anim.transition}
              >
                {title}
              </motion.p>
              <motion.p
                variants={valueVariants}
                className="text-2xl font-bold tracking-tight"
              >
                {value}
              </motion.p>
              {change !== undefined && (
                <motion.div
                  variants={changeVariants}
                  className="flex items-center gap-1.5"
                >
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
                </motion.div>
              )}
            </div>
            <motion.div
              className={cn('p-3 rounded-xl relative', iconBgColor)}
              variants={iconVariants}
              whileHover={anim.hoverOn ? 'hover' : undefined}
            >
              <Icon className={cn('w-6 h-6 relative z-10', iconColor)} />
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
