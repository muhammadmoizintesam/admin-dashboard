'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Send } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { invoices as initialInvoices } from '@/mock-data/invoices';
import { formatCurrency, formatDate, getStatusColor } from '@/utils/helpers';
import { useAnimationConfig } from '@/hooks/use-animation-config';
import DataTable, { Column } from '@/components/tables/DataTable';

interface Invoice {
  id: string;
  customer: string;
  amount: number;
  status: string;
  date: string;
  dueDate: string;
}

export default function InvoicesPage() {
  const [invoices] = useState(initialInvoices);
  const anim = useAnimationConfig();

  const columns: Column<Invoice>[] = [
    { key: 'id', header: 'Invoice', sortable: true },
    { key: 'customer', header: 'Customer', sortable: true },
    {
      key: 'amount', header: 'Amount', sortable: true, render: (inv) => (
        <span className="font-medium">{formatCurrency(inv.amount)}</span>
      )
    },
    {
      key: 'status', header: 'Status', sortable: true, render: (inv) => (
        <Badge className={getStatusColor(inv.status)}>{inv.status}</Badge>
      )
    },
    { key: 'date', header: 'Date', sortable: true },
    { key: 'dueDate', header: 'Due Date', sortable: true },
  ];

  return (
    <motion.div initial={anim.enabled ? { opacity: 0 } : false} animate={{ opacity: 1 }} transition={anim.transition} className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink href="/">Dashboard</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>Invoices</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Invoices</h1>
          <p className="text-muted-foreground">Manage and track invoices.</p>
        </div>
        <Button><Send className="w-4 h-4 mr-2" />Create Invoice</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-4"><div className="text-2xl font-bold">{invoices.length}</div><div className="text-sm text-muted-foreground">Total Invoices</div></Card>
        <Card className="p-4"><div className="text-2xl font-bold">{invoices.filter(i => i.status === 'Paid').length}</div><div className="text-sm text-muted-foreground">Paid</div></Card>
        <Card className="p-4"><div className="text-2xl font-bold">{invoices.filter(i => i.status === 'Pending').length}</div><div className="text-sm text-muted-foreground">Pending</div></Card>
        <Card className="p-4"><div className="text-2xl font-bold">{formatCurrency(invoices.filter(i => i.status === 'Paid').reduce((a, i) => a + i.amount, 0))}</div><div className="text-sm text-muted-foreground">Total Collected</div></Card>
      </div>

      <DataTable
        data={invoices}
        columns={columns}
        searchPlaceholder="Search invoices..."
        filters={[{ key: 'status', label: 'Status', options: ['Paid', 'Pending', 'Failed', 'Refunded', 'Past Due'] }]}
        actions={<Button variant="outline"><Download className="w-4 h-4 mr-2" />Export</Button>}
      />
    </motion.div>
  );
}
