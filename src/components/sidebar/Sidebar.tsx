'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  UsersRound,
  FolderKanban,
  CheckSquare,
  BarChart3,
  FileBarChart,
  CreditCard,
  Receipt,
  Bell,
  Activity,
  Plug,
  Key,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/utils/helpers';
import { useSettings } from '@/context/SettingsContext';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
}

const navItems: NavItem[] = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Users', href: '/users', icon: Users },
  { name: 'Teams', href: '/teams', icon: UsersRound },
  { name: 'Projects', href: '/projects', icon: FolderKanban },
  { name: 'Tasks', href: '/tasks', icon: CheckSquare },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Reports', href: '/reports', icon: FileBarChart },
  { name: 'Billing', href: '/billing', icon: CreditCard },
  { name: 'Subscriptions', href: '/subscriptions', icon: Receipt },
  { name: 'Invoices', href: '/invoices', icon: FileText },
  { name: 'Notifications', href: '/notifications', icon: Bell, badge: 3 },
  { name: 'Activity Logs', href: '/activity-logs', icon: Activity },
  { name: 'Integrations', href: '/integrations', icon: Plug },
  { name: 'API Keys', href: '/api-keys', icon: Key },
  { name: 'Audit Logs', href: '/audit-logs', icon: FileText },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { settings, toggleSidebar } = useSettings();
  const isCollapsed = settings.sidebarCollapsed;

  // Animation variants
  const sidebarVariants = {
    expanded: {
      width: settings.sidebarWidth === 'narrow' ? 200 : settings.sidebarWidth === 'default' ? 240 : 280,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30,
        mass: 1,
      },
    },
    collapsed: {
      width: 64,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30,
        mass: 1,
      },
    },
  };

  const navItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (index: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 20,
        delay: index * 0.05,
      },
    }),
    hover: {
      scale: 1.05,
      x: 5,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 25,
      },
    },
    tap: {
      scale: 0.95,
      transition: {
        type: "spring" as const,
        stiffness: 600,
        damping: 30,
      },
    },
  };

  const logoVariants = {
    expanded: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 20,
      },
    },
    collapsed: {
      opacity: 0,
      scale: 0.8,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 20,
      },
    },
  };

  const sidebarWidth = {
    narrow: isCollapsed ? 64 : 200,
    default: isCollapsed ? 64 : 240,
    wide: isCollapsed ? 64 : 280,
  }[settings.sidebarWidth];

  return (
    <TooltipProvider delayDuration={0}>
      <motion.aside
        variants={sidebarVariants}
        animate={isCollapsed ? "collapsed" : "expanded"}
        className="fixed left-0 top-0 z-40 h-screen border-r border-sidebar-border bg-sidebar"
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between p-4 border-b border-sidebar-border">
            <AnimatePresence mode="wait">
              {!isCollapsed && (
                <motion.div
                  variants={logoVariants}
                  initial="collapsed"
                  animate="expanded"
                  exit="collapsed"
                  className="flex items-center gap-2"
                >
                  <motion.div
                    className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center"
                    whileHover={{
                      rotate: 360,
                      scale: 1.1,
                      transition: { duration: 0.6, ease: "easeInOut" }
                    }}
                  >
                    <span className="text-primary-foreground font-bold text-sm">S</span>
                  </motion.div>
                  <motion.span
                    className="font-semibold text-sidebar-foreground"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    SaaSify
                  </motion.span>
                </motion.div>
              )}
            </AnimatePresence>
            {isCollapsed && (
              <motion.div
                className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center mx-auto"
                whileHover={{
                  rotate: 360,
                  scale: 1.1,
                  transition: { duration: 0.6, ease: "easeInOut" }
                }}
              >
                <span className="text-primary-foreground font-bold text-sm">S</span>
              </motion.div>
            )}
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1 min-h-0 py-4">
            <nav className="space-y-1 px-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return isCollapsed ? (
                  <Tooltip key={item.href}>
                    <TooltipTrigger asChild>
                      <motion.div
                        custom={navItems.indexOf(item)}
                        variants={navItemVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                        whileTap="tap"
                      >
                        <Link
                          href={item.href}
                          className={cn(
                            'flex items-center justify-center w-10 h-10 mx-auto rounded-lg transition-colors relative',
                            isActive
                              ? 'bg-sidebar-accent text-sidebar-primary'
                              : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground'
                          )}
                        >
                          <motion.div
                            whileHover={{
                              rotate: [0, -10, 10, 0],
                              scale: 1.1,
                              transition: { duration: 0.5 }
                            }}
                          >
                            <Icon className="w-5 h-5" />
                          </motion.div>
                          {item.badge && (
                            <motion.span
                              className="absolute -top-1 -right-1 w-4 h-4 text-[10px] font-medium bg-red-500 text-white rounded-full flex items-center justify-center"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.2, type: "spring", stiffness: 400 }}
                            >
                              {item.badge}
                            </motion.span>
                          )}
                        </Link>
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="font-medium">
                      {item.name}
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <motion.div
                    key={item.href}
                    custom={navItems.indexOf(item)}
                    variants={navItemVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors relative group',
                        isActive
                          ? 'bg-sidebar-accent text-sidebar-primary font-medium'
                          : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground'
                      )}
                    >
                      <motion.div
                        whileHover={{
                          rotate: [0, -10, 10, 0],
                          scale: 1.1,
                          transition: { duration: 0.5 }
                        }}
                      >
                        <Icon className="w-5 h-5 flex-shrink-0" />
                      </motion.div>
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="truncate"
                      >
                        {item.name}
                      </motion.span>
                      {item.badge && (
                        <motion.span
                          className="absolute -top-1 -right-1 w-4 h-4 text-[10px] font-medium bg-red-500 text-white rounded-full flex items-center justify-center"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2, type: "spring", stiffness: 400 }}
                        >
                          {item.badge}
                        </motion.span>
                      )}
                      {isActive && (
                        <motion.div
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full"
                          layoutId="activeTab"
                          initial={{ opacity: 0, scaleY: 0 }}
                          animate={{ opacity: 1, scaleY: 1 }}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
          </ScrollArea>

          {/* Collapse Toggle */}
          <div className="border-t border-sidebar-border p-4">
            <motion.div
              whileHover={{
                scale: 1.05,
                transition: { type: "spring", stiffness: 400, damping: 25 }
              }}
              whileTap={{
                scale: 0.95,
                transition: { type: "spring", stiffness: 600, damping: 30 }
              }}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleSidebar}
                className={cn(
                  'w-full justify-center text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent',
                  isCollapsed && 'px-0'
                )}
              >
                <AnimatePresence mode="wait">
                  {isCollapsed ? (
                    <motion.div
                      key="collapsed"
                      initial={{ rotate: 180, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -180, opacity: 0 }}
                      transition={{
                        type: "spring" as const,
                        stiffness: 300,
                        damping: 30,
                        duration: 0.3
                      }}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="expanded"
                      initial={{ rotate: 0, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 180, opacity: 0 }}
                      transition={{
                        type: "spring" as const,
                        stiffness: 300,
                        damping: 30,
                        duration: 0.3
                      }}
                      className="flex items-center"
                    >
                      <motion.div
                        animate={{ rotate: isCollapsed ? 0 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronLeft className="w-4 h-4 mr-2" />
                      </motion.div>
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ delay: 0.1 }}
                      >
                        Collapse
                      </motion.span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.aside>
    </TooltipProvider>
  );
}
