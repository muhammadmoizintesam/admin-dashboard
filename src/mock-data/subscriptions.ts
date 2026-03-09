export interface Subscription {
  id: string;
  planName: string;
  planType: 'Free' | 'Starter' | 'Professional' | 'Enterprise';
  status: 'Active' | 'Past Due' | 'Canceled' | 'Trial';
  price: number;
  billingCycle: 'Monthly' | 'Yearly';
  startDate: string;
  nextBilling: string;
  users: number;
  maxUsers: number;
  features: string[];
}

export const subscriptions: Subscription[] = [
  {
    id: '1',
    planName: 'Enterprise',
    planType: 'Enterprise',
    status: 'Active',
    price: 499,
    billingCycle: 'Monthly',
    startDate: '2023-01-15',
    nextBilling: '2024-02-15',
    users: 45,
    maxUsers: 100,
    features: ['Unlimited projects', 'Priority support', 'Custom integrations', 'Advanced analytics'],
  },
  {
    id: '2',
    planName: 'Professional',
    planType: 'Professional',
    status: 'Active',
    price: 49,
    billingCycle: 'Monthly',
    startDate: '2023-06-01',
    nextBilling: '2024-02-01',
    users: 12,
    maxUsers: 25,
    features: ['50 projects', 'Email support', 'API access', 'Team collaboration'],
  },
  {
    id: '3',
    planName: 'Starter',
    planType: 'Starter',
    status: 'Trial',
    price: 19,
    billingCycle: 'Monthly',
    startDate: '2024-01-10',
    nextBilling: '2024-02-10',
    users: 3,
    maxUsers: 5,
    features: ['10 projects', 'Community support', 'Basic analytics'],
  },
  {
    id: '4',
    planName: 'Professional',
    planType: 'Professional',
    status: 'Past Due',
    price: 490,
    billingCycle: 'Yearly',
    startDate: '2023-03-01',
    nextBilling: '2024-03-01',
    users: 18,
    maxUsers: 25,
    features: ['50 projects', 'Email support', 'API access', 'Team collaboration'],
  },
  {
    id: '5',
    planName: 'Enterprise',
    planType: 'Enterprise',
    status: 'Active',
    price: 4990,
    billingCycle: 'Yearly',
    startDate: '2023-07-01',
    nextBilling: '2024-07-01',
    users: 85,
    maxUsers: 100,
    features: ['Unlimited projects', 'Priority support', 'Custom integrations', 'Advanced analytics'],
  },
];

export const getSubscriptionById = (id: string) => subscriptions.find(s => s.id === id);
