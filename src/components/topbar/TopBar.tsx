'use client';

import React, { useState, useEffect } from 'react';
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
  Search,
  ChevronDown,
  User,
  Moon,
  Sun,
  LogOut,
  Check,
} from 'lucide-react';
import { cn } from '@/utils/helpers';
import { useTheme } from '@/context/ThemeContext';
import { useSettings } from '@/context/SettingsContext';
import { useAuth } from '@/context/AuthContext';
import { useAnimationConfig } from '@/hooks/use-animation-config';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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

export default function TopBar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { settings } = useSettings();
  const { username, logout } = useAuth();
  const router = useRouter();
  const anim = useAnimationConfig();
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const ThemeIcon = theme === 'light' ? Moon : Sun;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className={`sticky top-0 z-50 w-full border-b border-border ${scrolled ? 'bg-background/95 backdrop-blur-lg shadow-sm' : 'bg-background/80 backdrop-blur-md'
        } supports-[backdrop-filter]:bg-background/60`}
      initial={anim.enabled ? { y: -100 } : false}
      animate={{ y: 0 }}
      transition={anim.transition}
      style={{ transitionDuration: anim.enabled ? undefined : '0s' }}
    >
      <div className="flex h-16 items-center px-36 lg:px-40">
        {/* Logo */}
        <motion.div
          className="mr-4 flex"
          whileHover={anim.hoverOn ? { scale: anim.hoverScale } : undefined}
          transition={anim.transition}
        >
          <Link href="/" className="mr-6 flex items-center space-x-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-150">
              <span className="text-primary-foreground font-bold text-sm">S</span>
            </div>
            <span className="hidden font-bold sm:inline-block text-foreground group-hover:text-primary transition-colors duration-150">
              SaaSify
            </span>
          </Link>
        </motion.div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-1 text-sm font-medium">
          {navItems.slice(0, 8).map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <motion.div key={item.href} whileHover={anim.hoverOn ? { scale: anim.hoverScale } : undefined} whileTap={anim.hoverOn ? { scale: anim.tapScale } : undefined} transition={anim.transition}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 rounded-md transition-colors duration-150 relative group',
                    isActive
                      ? 'bg-primary/10 text-primary shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                  )}
                >
                  <div>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="hidden lg:inline font-medium">{item.name}</span>
                  {item.badge && (
                    <span className="h-5 w-5 p-0 text-xs bg-destructive text-destructive-foreground rounded-full flex items-center justify-center absolute -top-1 -right-1">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                      layoutId={anim.enabled ? 'activeTab' : undefined}
                      initial={false}
                      transition={anim.transition}
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}

          {/* More Items Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                More
                <ChevronDown className="w-4 h-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {navItems.slice(8).map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center gap-2 w-full',
                        isActive && 'bg-accent text-accent-foreground'
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                      {item.badge && (
                        <Badge variant="destructive" className="h-5 w-5 p-0 text-xs ml-auto">
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Right Side */}
        <div className="ml-auto flex items-center space-x-2">
          {/* Search */}
          <motion.div whileHover={anim.hoverOn ? { scale: anim.hoverScale } : undefined} whileTap={anim.hoverOn ? { scale: anim.tapScale } : undefined} transition={anim.transition}>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-muted-foreground hover:text-foreground h-8 px-3 transition-colors duration-150"
            >
              <span className={cn('inline-block transition-transform duration-150', searchOpen && 'rotate-90')}>
                <Search className="w-4 h-4" />
              </span>
              <span className="hidden sm:inline ml-2">Search...</span>
            </Button>
          </motion.div>

          {/* Theme Toggle */}
          <motion.div whileHover={anim.hoverOn ? { scale: anim.hoverScale } : undefined} whileTap={anim.hoverOn ? { scale: anim.tapScale } : undefined} transition={anim.transition}>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="text-muted-foreground hover:text-foreground h-8 w-8 p-0 transition-colors duration-150"
            >
              <ThemeIcon className="w-4 h-4" />
            </Button>
          </motion.div>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.div whileHover={anim.hoverOn ? { scale: anim.hoverScale } : undefined} whileTap={anim.hoverOn ? { scale: anim.tapScale } : undefined} transition={anim.transition}>
                <Button variant="ghost" size="sm" className="relative text-muted-foreground hover:text-foreground h-8 w-8 p-0 transition-colors duration-150">
                  <Bell className="w-4 h-4" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center text-xs font-bold">
                    3
                  </span>
                </Button>
              </motion.div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">New user registration</p>
                  <p className="text-xs text-muted-foreground">5 minutes ago</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">Server update completed</p>
                  <p className="text-xs text-muted-foreground">1 hour ago</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">Monthly report ready</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/01.png" alt="@user" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{username || 'Admin User'}</p>
                  <p className="text-xs leading-none text-muted-foreground">{username ? `${username.toLowerCase()}@example.com` : 'admin@example.com'}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Billing</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => {
                logout();
                router.push('/login');
              }}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.header>
  );
}
