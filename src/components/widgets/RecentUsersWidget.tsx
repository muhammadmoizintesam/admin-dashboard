'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';
import { users } from '@/mock-data/users';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatRelativeTime, getStatusColor } from '@/utils/helpers';
import { useAnimationConfig } from '@/hooks/use-animation-config';
import WidgetCard from '@/components/cards/WidgetCard';

export default function RecentUsersWidget() {
  const recentUsers = users.slice(0, 5);
  const anim = useAnimationConfig();

  return (
    <WidgetCard
      title="Recent Users"
      subtitle="Latest registered users"
      action={
        <Link href="/users">
          <Button variant="ghost" size="sm" className="text-xs">
            View all
            <ArrowRight className="w-3 h-3 ml-1" />
          </Button>
        </Link>
      }
    >
      <div className="space-y-4">
        {recentUsers.map((user, index) => (
          <motion.div
            key={user.id}
            initial={anim.enabled ? { opacity: 0, x: -10 } : false}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...anim.transition, delay: anim.enabled ? index * 0.03 : 0 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <Avatar className="w-9 h-9">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>
                  {user.name.split(' ').map((n) => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className={getStatusColor(user.status)}>
                {user.status}
              </Badge>
            </div>
          </motion.div>
        ))}
      </div>
    </WidgetCard>
  );
}
