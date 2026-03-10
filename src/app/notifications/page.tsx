'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Check, Trash2, Settings } from 'lucide-react';
import { useAnimationConfig } from '@/hooks/use-animation-config';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { notifications as initialNotifications } from '@/mock-data/notifications';
import { formatRelativeTime, cn } from '@/utils/helpers';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const anim = useAnimationConfig();

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <motion.div initial={anim.enabled ? { opacity: 0 } : false} animate={{ opacity: 1 }} transition={anim.transition} className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink href="/">Dashboard</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>Notifications</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">{unreadCount} unread notifications</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={markAllRead}><Check className="w-4 h-4 mr-2" />Mark All Read</Button>
          <Button variant="outline"><Settings className="w-4 h-4 mr-2" />Settings</Button>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
          <TabsTrigger value="mentions">Mentions</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {notifications.map((notif) => (
                  <div key={notif.id} className={cn('p-4 hover:bg-muted/50 transition-colors', !notif.read && 'bg-primary/5')}>
                    <div className="flex gap-4">
                      <div className={cn('w-2 h-2 rounded-full mt-2 flex-shrink-0', notif.type === 'success' && 'bg-emerald-500', notif.type === 'error' && 'bg-red-500', notif.type === 'warning' && 'bg-amber-500', notif.type === 'info' && 'bg-blue-500')} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-medium">{notif.title}</p>
                            <p className="text-sm text-muted-foreground mt-1">{notif.message}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground whitespace-nowrap">{formatRelativeTime(notif.createdAt)}</span>
                            {!notif.read && <Button size="sm" variant="ghost" onClick={() => markAsRead(notif.id)}><Check className="w-4 h-4" /></Button>}
                            <Button size="sm" variant="ghost" onClick={() => deleteNotification(notif.id)}><Trash2 className="w-4 h-4" /></Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="unread" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {notifications.filter(n => !n.read).map((notif) => (
                  <div key={notif.id} className="p-4 hover:bg-muted/50 transition-colors bg-primary/5">
                    <div className="flex gap-4">
                      <div className={cn('w-2 h-2 rounded-full mt-2 flex-shrink-0', notif.type === 'success' && 'bg-emerald-500', notif.type === 'error' && 'bg-red-500', notif.type === 'warning' && 'bg-amber-500', notif.type === 'info' && 'bg-blue-500')} />
                      <div className="flex-1">
                        <p className="font-medium">{notif.title}</p>
                        <p className="text-sm text-muted-foreground mt-1">{notif.message}</p>
                        <span className="text-xs text-muted-foreground">{formatRelativeTime(notif.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mentions" className="mt-4">
          <Card><CardContent className="py-8 text-center text-muted-foreground">No mentions yet</CardContent></Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
