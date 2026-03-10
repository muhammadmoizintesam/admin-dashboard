'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

type LayoutDensity = 'compact' | 'comfortable' | 'spacious';
type FontSize = 'small' | 'medium' | 'large';
type SidebarWidth = 'narrow' | 'default' | 'wide';
type NavbarStyle = 'default' | 'compact';
type NavigationMode = 'sidebar' | 'topbar';
type AnimationSpeed = 'fast' | 'normal' | 'slow';
type HoverEffects = 'subtle' | 'medium' | 'none';

interface WidgetVisibility {
  revenueStats: boolean;
  userGrowth: boolean;
  performance: boolean;
  recentUsers: boolean;
  activityFeed: boolean;
  taskOverview: boolean;
  serverStatus: boolean;
  systemHealth: boolean;
}

interface UISettings {
  primaryColor: string;
  sidebarBgColor: string;
  layoutDensity: LayoutDensity;
  fontSize: FontSize;
  sidebarWidth: SidebarWidth;
  navbarStyle: NavbarStyle;
  navigationMode: NavigationMode;
  cardBorderRadius: number;
  animationsEnabled: boolean;
  animationSpeed: AnimationSpeed;
  hoverEffects: HoverEffects;
  reduceMotion: boolean;
  widgetVisibility: WidgetVisibility;
  tableDensity: LayoutDensity;
  sidebarCollapsed: boolean;
}

const defaultSettings: UISettings = {
  primaryColor: '#10b981',
  sidebarBgColor: '#ffffff',
  layoutDensity: 'comfortable',
  fontSize: 'medium',
  sidebarWidth: 'default',
  navbarStyle: 'default',
  navigationMode: 'sidebar',
  cardBorderRadius: 12,
  animationsEnabled: true,
  animationSpeed: 'normal',
  hoverEffects: 'none',
  reduceMotion: false,
  widgetVisibility: {
    revenueStats: true,
    userGrowth: true,
    performance: true,
    recentUsers: true,
    activityFeed: true,
    taskOverview: true,
    serverStatus: true,
    systemHealth: true,
  },
  tableDensity: 'comfortable',
  sidebarCollapsed: false,
};

interface SettingsContextType {
  settings: UISettings;
  updateSettings: (updates: Partial<UISettings>) => void;
  updateWidgetVisibility: (widget: keyof WidgetVisibility, visible: boolean) => void;
  toggleSidebar: () => void;
  resetSettings: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const colorOptions = [
  { name: 'Emerald', value: '#10b981' },
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Purple', value: '#8b5cf6' },
  { name: 'Rose', value: '#f43f5e' },
  { name: 'Orange', value: '#f97316' },
  { name: 'Cyan', value: '#06b6d4' },
  { name: 'Pink', value: '#ec4899' },
  { name: 'Amber', value: '#f59e0b' },
];

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<UISettings>(() => {
    if (typeof window !== 'undefined') {
      const savedSettings = localStorage.getItem('ui-settings');
      if (savedSettings) {
        try {
          return { ...defaultSettings, ...JSON.parse(savedSettings) };
        } catch (e) {
          console.error('Failed to parse saved settings');
        }
      }
    }
    return defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem('ui-settings', JSON.stringify(settings));

    const root = document.documentElement;
    root.style.setProperty('--custom-primary', settings.primaryColor);
    root.style.setProperty('--custom-radius', `${settings.cardBorderRadius}px`);

    const fontSizes = {
      small: '14px',
      medium: '16px',
      large: '18px',
    };
    root.style.setProperty('--font-size-base', fontSizes[settings.fontSize]);

    // Layout Density
    const layoutDensity = {
      compact: '0.5rem',
      comfortable: '1rem',
      spacious: '1.5rem',
    };
    root.style.setProperty('--layout-spacing', layoutDensity[settings.layoutDensity]);

    // Table Density
    const tableDensity = {
      compact: '2rem',
      comfortable: '3rem',
      spacious: '4rem',
    };
    root.style.setProperty('--table-row-height', tableDensity[settings.tableDensity]);

    // Animation settings (so Enable Animations and Advanced options actually apply)
    root.setAttribute('data-animations', settings.animationsEnabled ? 'on' : 'off');
    root.setAttribute('data-animation-speed', settings.animationSpeed);
    root.setAttribute('data-hover-effects', settings.hoverEffects);
    root.setAttribute('data-reduce-motion', settings.reduceMotion ? 'true' : 'false');

    const speedDurations = { fast: '0.15s', normal: '0.25s', slow: '0.4s' };
    root.style.setProperty('--animation-duration', speedDurations[settings.animationSpeed]);
  }, [settings]);

  const updateSettings = useCallback((updates: Partial<UISettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  }, []);

  const updateWidgetVisibility = useCallback((widget: keyof WidgetVisibility, visible: boolean) => {
    setSettings(prev => ({
      ...prev,
      widgetVisibility: { ...prev.widgetVisibility, [widget]: visible },
    }));
  }, []);

  const toggleSidebar = useCallback(() => {
    setSettings(prev => ({ ...prev, sidebarCollapsed: !prev.sidebarCollapsed }));
  }, []);

  const resetSettings = useCallback(() => {
    setSettings(defaultSettings);
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateSettings,
        updateWidgetVisibility,
        toggleSidebar,
        resetSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}

export { colorOptions };
