'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { cn } from '@/utils/helpers';
import { useAnimationConfig } from '@/hooks/use-animation-config';

interface WidgetCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
  index?: number;
  noPadding?: boolean;
}

export default function WidgetCard({
  title,
  subtitle,
  children,
  action,
  className,
  index = 0,
  noPadding = false,
}: WidgetCardProps) {
  const anim = useAnimationConfig();
  return (
    <motion.div
      initial={anim.enabled ? { opacity: 0, y: 12 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...anim.transition, delay: anim.enabled ? index * 0.05 : 0 }}
    >
      <Card className={cn('transition-shadow duration-150 hover:shadow-sm', className)}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <div>
            <CardTitle className="text-base font-semibold">{title}</CardTitle>
            {subtitle && (
              <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>
            )}
          </div>
          {action || (
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          )}
        </CardHeader>
        <CardContent className={cn(noPadding && 'p-0 pt-0')}>{children}</CardContent>
      </Card>
    </motion.div>
  );
}
