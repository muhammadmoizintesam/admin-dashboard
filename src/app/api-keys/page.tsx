'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Key, Plus, Copy, Trash2, Eye, EyeOff, Shield } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Modal, { ConfirmModal } from '@/components/modals/Modal';
import { FormInput, FormSelect } from '@/components/forms/FormComponents';
import { useToast } from '@/hooks/use-toast';
import { useAnimationConfig } from '@/hooks/use-animation-config';
import { formatDateTime, cn } from '@/utils/helpers';

interface ApiKey {
  id: string;
  name: string;
  key: string;
  permissions: string;
  createdAt: string;
  lastUsed: string;
}

export default function ApiKeysPage() {
  const { toast } = useToast();
  const anim = useAnimationConfig();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedKey, setSelectedKey] = useState<ApiKey | null>(null);
  const [visibleKeys, setVisibleKeys] = useState<string[]>([]);
  const [formData, setFormData] = useState({ name: '', permissions: 'read' });

  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    { id: '1', name: 'Production API Key', key: 'sk_live_1234567890abcdef', permissions: 'Full Access', createdAt: '2024-01-10', lastUsed: '2024-01-15T10:30:00' },
    { id: '2', name: 'Development Key', key: 'sk_test_abcdef1234567890', permissions: 'Read Only', createdAt: '2024-01-08', lastUsed: '2024-01-14T15:45:00' },
    { id: '3', name: 'Integration Key', key: 'sk_int_xyz789abc456', permissions: 'Write Only', createdAt: '2024-01-05', lastUsed: '2024-01-13T09:00:00' },
  ]);

  const generateKey = () => `sk_${Math.random().toString(36).substr(2, 24)}`;

  const handleCreate = () => {
    const newKey: ApiKey = {
      id: String(apiKeys.length + 1),
      name: formData.name,
      key: generateKey(),
      permissions: formData.permissions === 'read' ? 'Read Only' : formData.permissions === 'write' ? 'Write Only' : 'Full Access',
      createdAt: new Date().toISOString().split('T')[0],
      lastUsed: new Date().toISOString(),
    };
    setApiKeys([newKey, ...apiKeys]);
    setIsCreateOpen(false);
    setFormData({ name: '', permissions: 'read' });
    toast({ title: 'API Key created', description: 'Your new API key has been generated.' });
  };

  const handleDelete = () => {
    if (!selectedKey) return;
    setApiKeys(apiKeys.filter(k => k.id !== selectedKey.id));
    setIsDeleteOpen(false);
    setSelectedKey(null);
    toast({ title: 'API Key deleted', description: 'The API key has been revoked.', variant: 'destructive' });
  };

  const copyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    toast({ title: 'Copied!', description: 'API key copied to clipboard.' });
  };

  const toggleVisibility = (id: string) => {
    setVisibleKeys(visibleKeys.includes(id) ? visibleKeys.filter(k => k !== id) : [...visibleKeys, id]);
  };

  return (
    <motion.div initial={anim.enabled ? { opacity: 0 } : false} animate={{ opacity: 1 }} transition={anim.transition} className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink href="/">Dashboard</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>API Keys</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">API Keys</h1>
          <p className="text-muted-foreground">Manage API keys for programmatic access.</p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)}><Plus className="w-4 h-4 mr-2" />Create API Key</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-4"><div className="text-2xl font-bold">{apiKeys.length}</div><div className="text-sm text-muted-foreground">Total Keys</div></Card>
        <Card className="p-4"><div className="text-2xl font-bold">{apiKeys.filter(k => k.permissions === 'Full Access').length}</div><div className="text-sm text-muted-foreground">Full Access</div></Card>
        <Card className="p-4"><div className="text-2xl font-bold"><Shield className="w-5 h-5 text-emerald-500 inline mr-1" />Secure</div><div className="text-sm text-muted-foreground">All keys encrypted</div></Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Your API Keys</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {apiKeys.map((apiKey) => (
              <div key={apiKey.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"><Key className="w-5 h-5 text-primary" /></div>
                  <div>
                    <p className="font-medium">{apiKey.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <code className="text-xs bg-background px-2 py-0.5 rounded font-mono">
                        {visibleKeys.includes(apiKey.id) ? apiKey.key : '••••••••••••••••••••'}
                      </code>
                      <Button size="sm" variant="ghost" className="h-6 w-6 p-0" onClick={() => toggleVisibility(apiKey.id)}>
                        {visibleKeys.includes(apiKey.id) ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                      </Button>
                      <Button size="sm" variant="ghost" className="h-6 w-6 p-0" onClick={() => copyKey(apiKey.key)}><Copy className="w-3 h-3" /></Button>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <Badge variant="outline">{apiKey.permissions}</Badge>
                    <p className="text-xs text-muted-foreground mt-1">Created {apiKey.createdAt}</p>
                  </div>
                  <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-600" onClick={() => { setSelectedKey(apiKey); setIsDeleteOpen(true); }}><Trash2 className="w-4 h-4" /></Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Modal open={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="Create API Key" description="Generate a new API key for accessing the API.">
        <form className="space-y-4">
          <FormInput label="Key Name" name="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="My API Key" required />
          <FormSelect label="Permissions" name="permissions" value={formData.permissions} onChange={(v) => setFormData({ ...formData, permissions: v })} options={[{ label: 'Read Only', value: 'read' }, { label: 'Write Only', value: 'write' }, { label: 'Full Access', value: 'full' }]} />
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
            <Button type="button" onClick={handleCreate}>Generate Key</Button>
          </div>
        </form>
      </Modal>

      <ConfirmModal open={isDeleteOpen} onClose={() => { setIsDeleteOpen(false); setSelectedKey(null); }} onConfirm={handleDelete} title="Revoke API Key" description={`Are you sure you want to revoke "${selectedKey?.name}"? This cannot be undone.`} confirmText="Revoke" variant="destructive" />
    </motion.div>
  );
}
