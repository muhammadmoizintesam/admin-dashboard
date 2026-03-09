'use client';

import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { SettingsProvider } from '@/context/SettingsContext';
import { NotificationProvider } from '@/context/NotificationContext';
import { AuthProvider } from '@/context/AuthContext';
import Sidebar from '@/components/sidebar/Sidebar';
import TopBar from '@/components/topbar/TopBar';
import Navbar from '@/components/navbar/Navbar';
import { Toaster } from '@/components/ui/toaster';
import { useSettings } from '@/context/SettingsContext';
import { useAuth } from '@/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const { settings } = useSettings();
  const { isLoggedIn, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, isLoading, router]);

  // Wait until localStorage check is done before deciding to redirect
  if (isLoading) {
    return null;
  }

  if (!isLoggedIn) {
    return null; // Will redirect to login
  }

  const sidebarWidth = {
    narrow: settings.sidebarCollapsed ? 64 : 200,
    default: settings.sidebarCollapsed ? 64 : 240,
    wide: settings.sidebarCollapsed ? 64 : 280,
  }[settings.sidebarWidth];

  if (settings.navigationMode === 'topbar') {
    return (
      <div className="min-h-screen bg-background">
        <TopBar />
        <main className="w-full px-36 lg:px-40 py-6">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <Navbar />
      <main
        className="transition-all duration-200 pt-16 min-h-screen"
        style={{ marginLeft: sidebarWidth }}
      >
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}

function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';

  if (isLoginPage) {
    return <>{children}</>;
  }

  return <AuthenticatedLayout>{children}</AuthenticatedLayout>;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-background text-foreground">
        <AuthProvider>
          <ThemeProvider>
            <SettingsProvider>
              <NotificationProvider>
                <ConditionalLayout>
                  {children}
                </ConditionalLayout>
                <Toaster />
              </NotificationProvider>
            </SettingsProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
