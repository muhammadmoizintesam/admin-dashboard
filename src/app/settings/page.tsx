'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, RotateCcw, Palette, Layout, Type, Eye, Zap } from 'lucide-react';
import { useSettings, colorOptions } from '@/context/SettingsContext';
import { useAnimationConfig } from '@/hooks/use-animation-config';
import { useTheme } from '@/context/ThemeContext';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/utils/helpers';
import { useToast } from '@/hooks/use-toast';

export default function SettingsPage() {
  const { settings, updateSettings, updateWidgetVisibility, resetSettings } = useSettings();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { toast } = useToast();
  const anim = useAnimationConfig();

  const handleReset = () => {
    resetSettings();
    toast({ title: 'Settings reset', description: 'All settings have been reset to defaults.' });
  };

  return (
    <motion.div initial={anim.enabled ? { opacity: 0 } : false} animate={{ opacity: 1 }} transition={anim.transition} className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink href="/">Dashboard</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>Settings</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Customize your admin panel experience.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReset}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset to Defaults
          </Button>
        </div>
      </div>

      <Tabs defaultValue="appearance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
          <TabsTrigger value="appearance"><Palette className="w-4 h-4 mr-2" />Appearance</TabsTrigger>
          <TabsTrigger value="layout"><Layout className="w-4 h-4 mr-2" />Layout</TabsTrigger>
          <TabsTrigger value="widgets"><Eye className="w-4 h-4 mr-2" />Widgets</TabsTrigger>
          <TabsTrigger value="advanced"><Zap className="w-4 h-4 mr-2" />Advanced</TabsTrigger>
        </TabsList>

        {/* Appearance Tab */}
        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Theme</CardTitle>
              <CardDescription>Choose your preferred color scheme.</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={theme} onValueChange={(v) => setTheme(v as 'light' | 'dark' | 'system')} className="grid grid-cols-3 gap-4">
                {[
                  { value: 'light', label: 'Light', desc: 'Light mode' },
                  { value: 'dark', label: 'Dark', desc: 'Dark mode' },
                  { value: 'system', label: 'System', desc: 'Follow system' },
                ].map((t) => (
                  <Label key={t.value} htmlFor={t.value} className={cn('flex flex-col items-center justify-center rounded-lg border-2 border-muted p-4 cursor-pointer hover:border-primary transition-colors', theme === t.value && 'border-primary')}>
                    <RadioGroupItem value={t.value} id={t.value} className="sr-only" />
                    <span className="font-medium">{t.label}</span>
                    <span className="text-xs text-muted-foreground">{t.desc}</span>
                  </Label>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Primary Color</CardTitle>
              <CardDescription>Select the primary accent color for the interface.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
                {colorOptions.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => updateSettings({ primaryColor: color.value })}
                    className={cn(
                      'w-10 h-10 rounded-lg transition-transform duration-150 hover:scale-[1.03]',
                      settings.primaryColor === color.value && 'ring-2 ring-offset-2 ring-offset-background ring-foreground'
                    )}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Card Border Radius</CardTitle>
              <CardDescription>Adjust the roundness of cards and buttons.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Slider
                  value={[settings.cardBorderRadius]}
                  onValueChange={([v]) => updateSettings({ cardBorderRadius: v })}
                  min={0}
                  max={24}
                  step={2}
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Square</span>
                  <span>{settings.cardBorderRadius}px</span>
                  <span>Round</span>
                </div>
                <div
                  className="w-20 h-12 bg-primary/20 border-2 border-primary flex items-center justify-center text-sm"
                  style={{ borderRadius: `${settings.cardBorderRadius}px` }}
                >
                  Preview
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Layout Tab */}
        <TabsContent value="layout" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Layout Density</CardTitle>
              <CardDescription>Adjust the spacing between elements.</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={settings.layoutDensity}
                onValueChange={(v) => updateSettings({ layoutDensity: v as 'compact' | 'comfortable' | 'spacious' })}
                className="grid grid-cols-3 gap-4"
              >
                {[
                  { value: 'compact', label: 'Compact', desc: 'Tight spacing' },
                  { value: 'comfortable', label: 'Comfortable', desc: 'Default spacing' },
                  { value: 'spacious', label: 'Spacious', desc: 'Relaxed spacing' },
                ].map((d) => (
                  <Label key={d.value} className={cn('flex flex-col items-center rounded-lg border-2 border-muted p-4 cursor-pointer hover:border-primary transition-colors', settings.layoutDensity === d.value && 'border-primary')}>
                    <RadioGroupItem value={d.value} className="sr-only" />
                    <span className="font-medium">{d.label}</span>
                    <span className="text-xs text-muted-foreground">{d.desc}</span>
                  </Label>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Font Size</CardTitle>
              <CardDescription>Adjust the base font size for the interface.</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={settings.fontSize}
                onValueChange={(v) => updateSettings({ fontSize: v as 'small' | 'medium' | 'large' })}
                className="grid grid-cols-3 gap-4"
              >
                {[
                  { value: 'small', label: 'Small', size: '14px' },
                  { value: 'medium', label: 'Medium', size: '16px' },
                  { value: 'large', label: 'Large', size: '18px' },
                ].map((f) => (
                  <Label key={f.value} className={cn('flex flex-col items-center rounded-lg border-2 border-muted p-4 cursor-pointer hover:border-primary transition-colors', settings.fontSize === f.value && 'border-primary')}>
                    <RadioGroupItem value={f.value} className="sr-only" />
                    <span style={{ fontSize: f.size }} className="font-medium">{f.label}</span>
                  </Label>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sidebar Width</CardTitle>
              <CardDescription>Choose the width of the sidebar.</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={settings.sidebarWidth}
                onValueChange={(v) => updateSettings({ sidebarWidth: v as 'narrow' | 'default' | 'wide' })}
                className="grid grid-cols-3 gap-4"
              >
                {[
                  { value: 'narrow', label: 'Narrow', width: '200px' },
                  { value: 'default', label: 'Default', width: '240px' },
                  { value: 'wide', label: 'Wide', width: '280px' },
                ].map((s) => (
                  <Label key={s.value} className={cn('flex flex-col items-center rounded-lg border-2 border-muted p-4 cursor-pointer hover:border-primary transition-colors', settings.sidebarWidth === s.value && 'border-primary')}>
                    <RadioGroupItem value={s.value} className="sr-only" />
                    <span className="font-medium">{s.label}</span>
                    <span className="text-xs text-muted-foreground">{s.width}</span>
                  </Label>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Table Density</CardTitle>
              <CardDescription>Adjust the row height in data tables.</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={settings.tableDensity}
                onValueChange={(v) => updateSettings({ tableDensity: v as 'compact' | 'comfortable' | 'spacious' })}
                className="grid grid-cols-3 gap-4"
              >
                {[
                  { value: 'compact', label: 'Compact', desc: 'Tight rows' },
                  { value: 'comfortable', label: 'Comfortable', desc: 'Default' },
                  { value: 'spacious', label: 'Spacious', desc: 'Relaxed' },
                ].map((d) => (
                  <Label key={d.value} className={cn('flex flex-col items-center rounded-lg border-2 border-muted p-4 cursor-pointer hover:border-primary transition-colors', settings.tableDensity === d.value && 'border-primary')}>
                    <RadioGroupItem value={d.value} className="sr-only" />
                    <span className="font-medium">{d.label}</span>
                    <span className="text-xs text-muted-foreground">{d.desc}</span>
                  </Label>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Navigation Mode</CardTitle>
              <CardDescription>Choose your preferred navigation layout.</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={settings.navigationMode}
                onValueChange={(v) => updateSettings({ navigationMode: v as 'sidebar' | 'topbar' })}
                className="grid grid-cols-2 gap-4"
              >
                {[
                  { value: 'sidebar', label: 'Sidebar', desc: 'Traditional sidebar navigation' },
                  { value: 'topbar', label: 'Top Bar', desc: 'Horizontal top navigation' },
                ].map((mode) => (
                  <Label key={mode.value} className={cn('flex flex-col items-center rounded-lg border-2 border-muted p-4 cursor-pointer hover:border-primary transition-colors', settings.navigationMode === mode.value && 'border-primary')}>
                    <RadioGroupItem value={mode.value} className="sr-only" />
                    <span className="font-medium">{mode.label}</span>
                    <span className="text-xs text-muted-foreground">{mode.desc}</span>
                  </Label>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Widgets Tab */}
        <TabsContent value="widgets" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Dashboard Widgets</CardTitle>
              <CardDescription>Toggle the visibility of dashboard widgets.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { key: 'revenueStats' as const, label: 'Revenue Stats', desc: 'Show revenue statistics cards' },
                  { key: 'userGrowth' as const, label: 'User Growth Chart', desc: 'Display user growth line chart' },
                  { key: 'performance' as const, label: 'Performance Chart', desc: 'Show system performance metrics' },
                  { key: 'recentUsers' as const, label: 'Recent Users', desc: 'Display recently registered users' },
                  { key: 'activityFeed' as const, label: 'Activity Feed', desc: 'Show recent activity logs' },
                  { key: 'taskOverview' as const, label: 'Task Overview', desc: 'Display task statistics' },
                  { key: 'serverStatus' as const, label: 'Server Status', desc: 'Show server health metrics' },
                  { key: 'systemHealth' as const, label: 'System Health', desc: 'Display service status' },
                ].map((widget) => (
                  <div key={widget.key} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-medium">{widget.label}</p>
                      <p className="text-sm text-muted-foreground">{widget.desc}</p>
                    </div>
                    <Switch
                      checked={settings.widgetVisibility[widget.key]}
                      onCheckedChange={(checked) => updateWidgetVisibility(widget.key, checked)}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Advanced Tab */}
        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Animations</CardTitle>
              <CardDescription>Control transitions and motion across the app.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Enable Animations</p>
                  <p className="text-sm text-muted-foreground">Toggle smooth transitions and animations.</p>
                </div>
                <Switch
                  checked={settings.animationsEnabled}
                  onCheckedChange={(checked) => updateSettings({ animationsEnabled: checked })}
                />
              </div>

              <div className="space-y-2">
                <Label>Animation Speed</Label>
                <p className="text-sm text-muted-foreground">How fast transitions and animations run.</p>
                <RadioGroup
                  value={settings.animationSpeed}
                  onValueChange={(v) => updateSettings({ animationSpeed: v as 'fast' | 'normal' | 'slow' })}
                  className="flex flex-wrap gap-4 pt-2"
                >
                  {[
                    { value: 'fast', label: 'Fast' },
                    { value: 'normal', label: 'Normal' },
                    { value: 'slow', label: 'Slow' },
                  ].map((opt) => (
                    <div key={opt.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={opt.value} id={`speed-${opt.value}`} />
                      <Label htmlFor={`speed-${opt.value}`} className="font-normal cursor-pointer">{opt.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Hover Effects</Label>
                <p className="text-sm text-muted-foreground">Intensity of hover feedback on buttons and cards.</p>
                <RadioGroup
                  value={settings.hoverEffects}
                  onValueChange={(v) => updateSettings({ hoverEffects: v as 'subtle' | 'medium' | 'none' })}
                  className="flex flex-wrap gap-4 pt-2"
                >
                  {[
                    { value: 'subtle', label: 'Subtle' },
                    { value: 'medium', label: 'Medium' },
                    { value: 'none', label: 'None' },
                  ].map((opt) => (
                    <div key={opt.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={opt.value} id={`hover-${opt.value}`} />
                      <Label htmlFor={`hover-${opt.value}`} className="font-normal cursor-pointer">{opt.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="flex items-center justify-between pt-2 border-t">
                <div>
                  <p className="font-medium">Reduce Motion</p>
                  <p className="text-sm text-muted-foreground">Minimize motion for accessibility.</p>
                </div>
                <Switch
                  checked={settings.reduceMotion}
                  onCheckedChange={(checked) => updateSettings({ reduceMotion: checked })}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Developer Options</CardTitle>
              <CardDescription>Advanced configuration options.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm font-medium mb-2">Current Configuration</p>
                <pre className="text-xs bg-background p-3 rounded overflow-auto max-h-60">
                  {JSON.stringify(settings, null, 2)}
                </pre>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => navigator.clipboard.writeText(JSON.stringify(settings, null, 2))}>
                  Copy Settings
                </Button>
                <Button variant="outline" onClick={handleReset}>
                  Reset All Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
