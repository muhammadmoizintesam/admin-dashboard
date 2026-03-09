import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
}

export function formatDateTime(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
}

export function formatRelativeTime(date: string | Date): string {
  const now = new Date();
  const target = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - target.getTime()) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  return formatDate(date);
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    Active: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
    Inactive: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400',
    Pending: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
    Suspended: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    Completed: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
    'In Progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    'To Do': 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400',
    Review: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
    'On Hold': 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400',
    Planning: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
    Paid: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
    Failed: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    Refunded: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400',
    'Past Due': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    Canceled: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400',
    Trial: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
    operational: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
    degraded: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
    down: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  };
  return colors[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
}

export function getPriorityColor(priority: string): string {
  const colors: Record<string, string> = {
    Low: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400',
    Medium: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    High: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
    Critical: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  };
  return colors[priority] || 'bg-gray-100 text-gray-800';
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
