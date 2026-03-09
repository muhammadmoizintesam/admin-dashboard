export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}

export const notifications: Notification[] = [
  {
    id: '1',
    title: 'New user registered',
    message: 'Benjamin Anderson has signed up for a trial account',
    type: 'info',
    read: false,
    createdAt: '2024-01-15T10:30:00',
    actionUrl: '/users/8',
  },
  {
    id: '2',
    title: 'Payment received',
    message: 'Invoice INV-2024-001 for $499 has been paid',
    type: 'success',
    read: false,
    createdAt: '2024-01-15T09:15:00',
    actionUrl: '/invoices/1',
  },
  {
    id: '3',
    title: 'Server alert',
    message: 'Storage Service experiencing elevated latency',
    type: 'warning',
    read: false,
    createdAt: '2024-01-15T08:45:00',
    actionUrl: '/analytics',
  },
  {
    id: '4',
    title: 'Task completed',
    message: 'Design dashboard wireframes has been marked as complete',
    type: 'success',
    read: true,
    createdAt: '2024-01-14T16:20:00',
    actionUrl: '/tasks/2',
  },
  {
    id: '5',
    title: 'Payment failed',
    message: 'Payment for Invoice INV-2023-098 could not be processed',
    type: 'error',
    read: true,
    createdAt: '2024-01-14T14:00:00',
    actionUrl: '/invoices/4',
  },
  {
    id: '6',
    title: 'New project created',
    message: 'Customer Portal project has been created',
    type: 'info',
    read: true,
    createdAt: '2024-01-14T11:30:00',
    actionUrl: '/projects/6',
  },
  {
    id: '7',
    title: 'Team update',
    message: 'Sarah Johnson has been promoted to Admin',
    type: 'info',
    read: true,
    createdAt: '2024-01-13T15:45:00',
    actionUrl: '/users/1',
  },
  {
    id: '8',
    title: 'Security notice',
    message: 'New login detected from San Francisco, CA',
    type: 'warning',
    read: true,
    createdAt: '2024-01-13T09:00:00',
  },
  {
    id: '9',
    title: 'Subscription renewed',
    message: 'Enterprise subscription has been renewed for another year',
    type: 'success',
    read: true,
    createdAt: '2024-01-12T10:00:00',
    actionUrl: '/subscriptions/5',
  },
  {
    id: '10',
    title: 'API key generated',
    message: 'New API key has been generated for production environment',
    type: 'info',
    read: true,
    createdAt: '2024-01-11T14:30:00',
    actionUrl: '/api-keys',
  },
];

export const getNotificationById = (id: string) => notifications.find(n => n.id === id);
