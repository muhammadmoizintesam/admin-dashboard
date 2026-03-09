'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Search,
  Bell,
  ChevronDown,
  User,
  Settings,
  CreditCard,
  LogOut,
  Moon,
  Sun,
  Check,
  X,
  PanelRightOpen,
} from 'lucide-react';
import { cn } from '@/utils/helpers';
import { useTheme } from '@/context/ThemeContext';
import { useSettings } from '@/context/SettingsContext';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { notifications as mockNotifications } from '@/mock-data/notifications';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const { theme, setTheme, resolvedTheme } = useTheme();
  const { settings, toggleSidebar } = useSettings();
  const { logout } = useAuth();
  const router = useRouter();

  const searchRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);

  const notifications = mockNotifications.slice(0, 5);
  const unreadCount = notifications.filter((n) => !n.read).length;

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setSettingsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const sidebarWidth = {
    narrow: settings.sidebarCollapsed ? 64 : 200,
    default: settings.sidebarCollapsed ? 64 : 240,
    wide: settings.sidebarCollapsed ? 64 : 280,
  }[settings.sidebarWidth];

  return (
    <header
      className="fixed top-0 right-0 z-30 h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      style={{ left: sidebarWidth }}
    >
      <div className="flex h-full items-center justify-between px-4 md:px-6">
        {/* Left Section - Search */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleSidebar}
          >
            <PanelRightOpen className="w-5 h-5" />
          </Button>

          {/* Search Bar */}
          <div ref={searchRef} className="relative">
            <div
              className={cn(
                'flex items-center gap-2 px-3 py-2 rounded-lg border border-input bg-background transition-all cursor-pointer',
                searchOpen && 'ring-2 ring-ring ring-offset-2 ring-offset-background'
              )}
              onClick={() => setSearchOpen(true)}
            >
              <Search className="w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={cn(
                  'bg-transparent border-none outline-none text-sm w-40 md:w-64',
                  !searchOpen && 'md:w-48'
                )}
                onFocus={() => setSearchOpen(true)}
              />
              <kbd className="hidden md:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                <span className="text-xs">⌘</span>K
              </kbd>
            </div>

            {/* Search Results Dropdown */}
            <AnimatePresence>
              {searchOpen && searchQuery && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 mt-2 w-80 rounded-lg border border-border bg-popover shadow-lg overflow-hidden"
                >
                  <div className="p-3 text-sm text-muted-foreground">
                    Search results for &quot;{searchQuery}&quot;
                  </div>
                  <div className="border-t border-border">
                    <div className="p-2">
                      <div className="px-3 py-2 text-xs font-medium text-muted-foreground">
                        Quick Actions
                      </div>
                      {['Create new user', 'View analytics', 'Open settings'].map((action) => (
                        <button
                          key={action}
                          className="w-full px-3 py-2 text-sm text-left rounded-md hover:bg-accent"
                        >
                          {action}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            className="text-muted-foreground"
          >
            {resolvedTheme === 'dark' ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </Button>

          {/* Settings Toggle */}
          <div ref={settingsRef} className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSettingsOpen(!settingsOpen)}
              className="text-muted-foreground"
            >
              <Settings className="w-5 h-5" />
            </Button>
          </div>

          {/* Notifications */}
          <div ref={notifRef} className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative text-muted-foreground"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 text-[10px] font-medium bg-red-500 text-white rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Button>

            <AnimatePresence>
              {notificationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full right-0 mt-2 w-80 rounded-lg border border-border bg-popover shadow-lg overflow-hidden"
                >
                  <div className="flex items-center justify-between p-3 border-b border-border">
                    <h3 className="font-semibold">Notifications</h3>
                    <Button variant="ghost" size="sm" className="text-xs">
                      Mark all read
                    </Button>
                  </div>
                  <ScrollArea className="h-80">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={cn(
                          'p-3 border-b border-border last:border-0 hover:bg-accent/50 cursor-pointer transition-colors',
                          !notification.read && 'bg-accent/30'
                        )}
                      >
                        <div className="flex gap-3">
                          <div
                            className={cn(
                              'w-2 h-2 rounded-full mt-2 flex-shrink-0',
                              notification.type === 'success' && 'bg-emerald-500',
                              notification.type === 'error' && 'bg-red-500',
                              notification.type === 'warning' && 'bg-amber-500',
                              notification.type === 'info' && 'bg-blue-500'
                            )}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">
                              {notification.title}
                            </p>
                            <p className="text-xs text-muted-foreground line-clamp-2">
                              {notification.message}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {new Date(notification.createdAt).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                  <div className="p-2 border-t border-border">
                    <Link
                      href="/notifications"
                      className="block w-full text-center text-sm text-primary hover:underline py-1"
                      onClick={() => setNotificationsOpen(false)}
                    >
                      View all notifications
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile Dropdown */}
          <div ref={profileRef} className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 p-1 rounded-lg hover:bg-accent transition-colors"
            >
              <Avatar className="w-8 h-8">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-muted-foreground">admin@company.com</p>
              </div>
              <ChevronDown
                className={cn(
                  'w-4 h-4 text-muted-foreground transition-transform hidden md:block',
                  profileOpen && 'rotate-180'
                )}
              />
            </button>

            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full right-0 mt-2 w-56 rounded-lg border border-border bg-popover shadow-lg overflow-hidden"
                >
                  <div className="p-3 border-b border-border">
                    <p className="text-sm font-medium">Admin User</p>
                    <p className="text-xs text-muted-foreground">admin@company.com</p>
                  </div>
                  <div className="p-1">
                    <Link
                      href="/profile"
                      className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-accent"
                      onClick={() => setProfileOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      Profile
                    </Link>
                    <Link
                      href="/settings"
                      className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-accent"
                      onClick={() => setProfileOpen(false)}
                    >
                      <Settings className="w-4 h-4" />
                      Account Settings
                    </Link>
                    <Link
                      href="/billing"
                      className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-accent"
                      onClick={() => setProfileOpen(false)}
                    >
                      <CreditCard className="w-4 h-4" />
                      Billing
                    </Link>
                  </div>
                  <div className="border-t border-border p-1">
                    <button
                      className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-accent w-full text-red-600"
                      onClick={() => {
                        setProfileOpen(false);
                        logout();
                        router.push('/login');
                      }}
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}
