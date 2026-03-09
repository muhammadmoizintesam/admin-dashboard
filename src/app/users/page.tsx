'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, UserPlus } from 'lucide-react';
import { users as initialUsers, User } from '@/mock-data/users';
import DataTable, { Column } from '@/components/tables/DataTable';
import Modal, { ConfirmModal } from '@/components/modals/Modal';
import { FormInput, FormSelect } from '@/components/forms/FormComponents';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { getStatusColor } from '@/utils/helpers';
import { useToast } from '@/hooks/use-toast';

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Developer',
    status: 'Active',
    department: '',
    location: '',
    phone: '',
    team: '',
  });

  const columns: Column<User>[] = [
    {
      key: 'name',
      header: 'User',
      sortable: true,
      render: (user) => (
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.split(' ').map((n) => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      header: 'Role',
      sortable: true,
      render: (user) => (
        <Badge variant="outline" className="font-normal">
          {user.role}
        </Badge>
      ),
    },
    {
      key: 'department',
      header: 'Department',
      sortable: true,
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (user) => (
        <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
      ),
    },
    {
      key: 'team',
      header: 'Team',
      sortable: true,
    },
    {
      key: 'location',
      header: 'Location',
      sortable: true,
    },
  ];

  const handleCreate = () => {
    const newUser: User = {
      id: String(users.length + 1),
      ...formData,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.name.replace(' ', '')}`,
      joinDate: new Date().toISOString().split('T')[0],
      lastActive: new Date().toISOString(),
    };
    setUsers([newUser, ...users]);
    setIsCreateOpen(false);
    resetForm();
    toast({ title: 'User created', description: `${newUser.name} has been added successfully.` });
  };

  const handleEdit = () => {
    if (!selectedUser) return;
    setUsers(users.map((u) => (u.id === selectedUser.id ? { ...u, ...formData } : u)));
    setIsEditOpen(false);
    setSelectedUser(null);
    resetForm();
    toast({ title: 'User updated', description: 'User has been updated successfully.' });
  };

  const handleDelete = () => {
    if (!selectedUser) return;
    setUsers(users.filter((u) => u.id !== selectedUser.id));
    setIsDeleteOpen(false);
    setSelectedUser(null);
    toast({ title: 'User deleted', description: 'User has been removed successfully.', variant: 'destructive' });
  };

  const openEdit = (user: User) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      department: user.department,
      location: user.location,
      phone: user.phone,
      team: user.team,
    });
    setIsEditOpen(true);
  };

  const openView = (user: User) => {
    setSelectedUser(user);
    setIsViewOpen(true);
  };

  const openDelete = (user: User) => {
    setSelectedUser(user);
    setIsDeleteOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      role: 'Developer',
      status: 'Active',
      department: '',
      location: '',
      phone: '',
      team: '',
    });
  };

  const handleBulkDelete = (ids: string[]) => {
    setUsers(users.filter((u) => !ids.includes(u.id)));
    toast({ title: 'Users deleted', description: `${ids.length} users have been removed.`, variant: 'destructive' });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Users</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground">Manage your team members and their roles.</p>
        </div>
      </div>

      <DataTable
        data={users}
        columns={columns}
        searchPlaceholder="Search users..."
        filters={[
          { key: 'status', label: 'Status', options: ['Active', 'Inactive', 'Pending', 'Suspended'] },
          { key: 'role', label: 'Role', options: ['Admin', 'Manager', 'Developer', 'Designer', 'Analyst', 'Support'] },
        ]}
        onView={openView}
        onEdit={openEdit}
        onDelete={openDelete}
        bulkActions={[
          { label: 'Delete', onClick: handleBulkDelete },
        ]}
        actions={
          <Button onClick={() => setIsCreateOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        }
      />

      {/* Create Modal */}
      <Modal
        open={isCreateOpen}
        onClose={() => { setIsCreateOpen(false); resetForm(); }}
        title="Create New User"
        description="Add a new team member to your organization."
        size="lg"
      >
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="John Doe"
              required
            />
            <FormInput
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="john@company.com"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormSelect
              label="Role"
              name="role"
              value={formData.role}
              onChange={(v) => setFormData({ ...formData, role: v })}
              options={[
                { label: 'Admin', value: 'Admin' },
                { label: 'Manager', value: 'Manager' },
                { label: 'Developer', value: 'Developer' },
                { label: 'Designer', value: 'Designer' },
                { label: 'Analyst', value: 'Analyst' },
                { label: 'Support', value: 'Support' },
              ]}
              required
            />
            <FormSelect
              label="Status"
              name="status"
              value={formData.status}
              onChange={(v) => setFormData({ ...formData, status: v })}
              options={[
                { label: 'Active', value: 'Active' },
                { label: 'Inactive', value: 'Inactive' },
                { label: 'Pending', value: 'Pending' },
                { label: 'Suspended', value: 'Suspended' },
              ]}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label="Department"
              name="department"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              placeholder="Engineering"
              required
            />
            <FormInput
              label="Team"
              name="team"
              value={formData.team}
              onChange={(e) => setFormData({ ...formData, team: e.target.value })}
              placeholder="Platform"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label="Location"
              name="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="San Francisco, CA"
            />
            <FormInput
              label="Phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+1 (555) 123-4567"
            />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => { setIsCreateOpen(false); resetForm(); }}>
              Cancel
            </Button>
            <Button type="button" onClick={handleCreate}>
              <UserPlus className="w-4 h-4 mr-2" />
              Create User
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal
        open={isEditOpen}
        onClose={() => { setIsEditOpen(false); setSelectedUser(null); resetForm(); }}
        title="Edit User"
        description="Update user information."
        size="lg"
      >
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <FormInput
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormSelect
              label="Role"
              name="role"
              value={formData.role}
              onChange={(v) => setFormData({ ...formData, role: v })}
              options={[
                { label: 'Admin', value: 'Admin' },
                { label: 'Manager', value: 'Manager' },
                { label: 'Developer', value: 'Developer' },
                { label: 'Designer', value: 'Designer' },
                { label: 'Analyst', value: 'Analyst' },
                { label: 'Support', value: 'Support' },
              ]}
            />
            <FormSelect
              label="Status"
              name="status"
              value={formData.status}
              onChange={(v) => setFormData({ ...formData, status: v })}
              options={[
                { label: 'Active', value: 'Active' },
                { label: 'Inactive', value: 'Inactive' },
                { label: 'Pending', value: 'Pending' },
                { label: 'Suspended', value: 'Suspended' },
              ]}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label="Department"
              name="department"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            />
            <FormInput
              label="Team"
              name="team"
              value={formData.team}
              onChange={(e) => setFormData({ ...formData, team: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label="Location"
              name="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
            <FormInput
              label="Phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => { setIsEditOpen(false); resetForm(); }}>
              Cancel
            </Button>
            <Button type="button" onClick={handleEdit}>
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>

      {/* View Modal */}
      <Modal
        open={isViewOpen}
        onClose={() => { setIsViewOpen(false); setSelectedUser(null); }}
        title="User Details"
        size="lg"
      >
        {selectedUser && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={selectedUser.avatar} alt={selectedUser.name} />
                <AvatarFallback className="text-xl">
                  {selectedUser.name.split(' ').map((n) => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-semibold">{selectedUser.name}</h3>
                <p className="text-muted-foreground">{selectedUser.email}</p>
                <div className="flex gap-2 mt-2">
                  <Badge variant="outline">{selectedUser.role}</Badge>
                  <Badge className={getStatusColor(selectedUser.status)}>{selectedUser.status}</Badge>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-muted-foreground">Department</p>
                <p className="font-medium">{selectedUser.department}</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-muted-foreground">Team</p>
                <p className="font-medium">{selectedUser.team}</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-muted-foreground">Location</p>
                <p className="font-medium">{selectedUser.location}</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-muted-foreground">Phone</p>
                <p className="font-medium">{selectedUser.phone}</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-muted-foreground">Join Date</p>
                <p className="font-medium">{selectedUser.joinDate}</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-muted-foreground">Last Active</p>
                <p className="font-medium">{new Date(selectedUser.lastActive).toLocaleString()}</p>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsViewOpen(false)}>Close</Button>
              <Button onClick={() => { setIsViewOpen(false); openEdit(selectedUser); }}>Edit User</Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmModal
        open={isDeleteOpen}
        onClose={() => { setIsDeleteOpen(false); setSelectedUser(null); }}
        onConfirm={handleDelete}
        title="Delete User"
        description={`Are you sure you want to delete ${selectedUser?.name}? This action cannot be undone.`}
        confirmText="Delete"
        variant="destructive"
      />
    </motion.div>
  );
}
