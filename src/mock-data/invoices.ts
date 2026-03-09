export interface Invoice {
  id: string;
  number: string;
  subscriptionId: string;
  planName: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Failed' | 'Refunded';
  date: string;
  dueDate: string;
  paidDate?: string;
  downloadUrl: string;
}

export const invoices: Invoice[] = [
  {
    id: '1',
    number: 'INV-2024-001',
    subscriptionId: '1',
    planName: 'Enterprise',
    amount: 499,
    status: 'Paid',
    date: '2024-01-15',
    dueDate: '2024-01-25',
    paidDate: '2024-01-18',
    downloadUrl: '#',
  },
  {
    id: '2',
    number: 'INV-2024-002',
    subscriptionId: '2',
    planName: 'Professional',
    amount: 49,
    status: 'Paid',
    date: '2024-01-01',
    dueDate: '2024-01-10',
    paidDate: '2024-01-05',
    downloadUrl: '#',
  },
  {
    id: '3',
    number: 'INV-2024-003',
    subscriptionId: '1',
    planName: 'Enterprise',
    amount: 499,
    status: 'Pending',
    date: '2024-01-20',
    dueDate: '2024-01-30',
    downloadUrl: '#',
  },
  {
    id: '4',
    number: 'INV-2023-098',
    subscriptionId: '4',
    planName: 'Professional',
    amount: 490,
    status: 'Failed',
    date: '2023-12-15',
    dueDate: '2023-12-25',
    downloadUrl: '#',
  },
  {
    id: '5',
    number: 'INV-2023-095',
    subscriptionId: '1',
    planName: 'Enterprise',
    amount: 499,
    status: 'Paid',
    date: '2023-12-15',
    dueDate: '2023-12-25',
    paidDate: '2023-12-20',
    downloadUrl: '#',
  },
  {
    id: '6',
    number: 'INV-2023-092',
    subscriptionId: '5',
    planName: 'Enterprise',
    amount: 4990,
    status: 'Paid',
    date: '2023-11-15',
    dueDate: '2023-11-25',
    paidDate: '2023-11-18',
    downloadUrl: '#',
  },
  {
    id: '7',
    number: 'INV-2023-088',
    subscriptionId: '2',
    planName: 'Professional',
    amount: 49,
    status: 'Paid',
    date: '2023-11-01',
    dueDate: '2023-11-10',
    paidDate: '2023-11-05',
    downloadUrl: '#',
  },
  {
    id: '8',
    number: 'INV-2023-085',
    subscriptionId: '1',
    planName: 'Enterprise',
    amount: 499,
    status: 'Refunded',
    date: '2023-10-15',
    dueDate: '2023-10-25',
    paidDate: '2023-10-20',
    downloadUrl: '#',
  },
  {
    id: '9',
    number: 'INV-2023-082',
    subscriptionId: '5',
    planName: 'Enterprise',
    amount: 4990,
    status: 'Paid',
    date: '2023-10-15',
    dueDate: '2023-10-25',
    paidDate: '2023-10-18',
    downloadUrl: '#',
  },
  {
    id: '10',
    number: 'INV-2023-078',
    subscriptionId: '4',
    planName: 'Professional',
    amount: 490,
    status: 'Paid',
    date: '2023-09-15',
    dueDate: '2023-09-25',
    paidDate: '2023-09-20',
    downloadUrl: '#',
  },
];

export const getInvoiceById = (id: string) => invoices.find(i => i.id === id);
