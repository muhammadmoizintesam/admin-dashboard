'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, UsersRound } from 'lucide-react';
import { teams as initialTeams, Team } from '@/mock-data/teams';
import DataTable, { Column } from '@/components/tables/DataTable';
import Modal, { ConfirmModal } from '@/components/modals/Modal';
import { FormInput, FormSelect, FormTextarea } from '@/components/forms/FormComponents';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { getStatusColor } from '@/utils/helpers';
import { useToast } from '@/hooks/use-toast';
import { useAnimationConfig } from '@/hooks/use-animation-config';

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>(initialTeams);
  const anim = useAnimationConfig();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    department: '',
    lead: '',
    status: 'Active',
  });

  const columns: Column<Team>[] = [
    {
      key: 'name',
      header: 'Team',
      sortable: true,
      render: (team) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <span className="text-primary font-semibold">{team.name.charAt(0)}</span>
          </div>
          <div>
            <p className="font-medium">{team.name}</p>
            <p className="text-xs text-muted-foreground">{team.description}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'department',
      header: 'Department',
      sortable: true,
    },
    {
      key: 'lead',
      header: 'Team Lead',
      sortable: true,
    },
    {
      key: 'members',
      header: 'Members',
      render: (team) => (
        <div className="flex -space-x-2">
          {team.members.slice(0, 3).map((member, i) => (
            <Avatar key={i} className="w-6 h-6 border-2 border-background">
              <AvatarImage src={member.avatar} />
              <AvatarFallback className="text-xs">{member.name.charAt(0)}</AvatarFallback>
            </Avatar>
          ))}
          {team.members.length > 3 && (
            <div className="w-6 h-6 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs">
              +{team.members.length - 3}
            </div>
          )}
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (team) => (
        <Badge className={getStatusColor(team.status)}>{team.status}</Badge>
      ),
    },
  ];

  const handleCreate = () => {
    const newTeam: Team = {
      id: String(teams.length + 1),
      ...formData,
      members: [],
      projects: 0,
    };
    setTeams([newTeam, ...teams]);
    setIsCreateOpen(false);
    resetForm();
    toast({ title: 'Team created', description: `${newTeam.name} has been created successfully.` });
  };

  const handleEdit = () => {
    if (!selectedTeam) return;
    setTeams(teams.map((t) => (t.id === selectedTeam.id ? { ...t, ...formData } : t)));
    setIsEditOpen(false);
    setSelectedTeam(null);
    resetForm();
    toast({ title: 'Team updated', description: 'Team has been updated successfully.' });
  };

  const handleDelete = () => {
    if (!selectedTeam) return;
    setTeams(teams.filter((t) => t.id !== selectedTeam.id));
    setIsDeleteOpen(false);
    setSelectedTeam(null);
    toast({ title: 'Team deleted', description: 'Team has been removed successfully.', variant: 'destructive' });
  };

  const openEdit = (team: Team) => {
    setSelectedTeam(team);
    setFormData({
      name: team.name,
      description: team.description,
      department: team.department,
      lead: team.lead,
      status: team.status,
    });
    setIsEditOpen(true);
  };

  const openView = (team: Team) => {
    setSelectedTeam(team);
    setIsViewOpen(true);
  };

  const openDelete = (team: Team) => {
    setSelectedTeam(team);
    setIsDeleteOpen(true);
  };

  const resetForm = () => {
    setFormData({ name: '', description: '', department: '', lead: '', status: 'Active' });
  };

  return (
    <motion.div initial={anim.enabled ? { opacity: 0 } : false} animate={{ opacity: 1 }} transition={anim.transition} className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink href="/">Dashboard</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>Teams</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Teams</h1>
          <p className="text-muted-foreground">Manage your organization&apos;s teams.</p>
        </div>
      </div>

      <DataTable
        data={teams}
        columns={columns}
        searchPlaceholder="Search teams..."
        filters={[{ key: 'status', label: 'Status', options: ['Active', 'Inactive'] }]}
        onView={openView}
        onEdit={openEdit}
        onDelete={openDelete}
        actions={<Button onClick={() => setIsCreateOpen(true)}><Plus className="w-4 h-4 mr-2" />Create Team</Button>}
      />

      {/* Create Modal */}
      <Modal open={isCreateOpen} onClose={() => { setIsCreateOpen(false); resetForm(); }} title="Create New Team" description="Create a new team in your organization." size="lg">
        <form className="space-y-4">
          <FormInput label="Team Name" name="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Platform Team" required />
          <FormTextarea label="Description" name="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Team description..." />
          <div className="grid grid-cols-2 gap-4">
            <FormInput label="Department" name="department" value={formData.department} onChange={(e) => setFormData({ ...formData, department: e.target.value })} placeholder="Engineering" required />
            <FormInput label="Team Lead" name="lead" value={formData.lead} onChange={(e) => setFormData({ ...formData, lead: e.target.value })} placeholder="John Doe" required />
          </div>
          <FormSelect label="Status" name="status" value={formData.status} onChange={(v) => setFormData({ ...formData, status: v })} options={[{ label: 'Active', value: 'Active' }, { label: 'Inactive', value: 'Inactive' }]} />
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => { setIsCreateOpen(false); resetForm(); }}>Cancel</Button>
            <Button type="button" onClick={handleCreate}><UsersRound className="w-4 h-4 mr-2" />Create Team</Button>
          </div>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal open={isEditOpen} onClose={() => { setIsEditOpen(false); setSelectedTeam(null); resetForm(); }} title="Edit Team" size="lg">
        <form className="space-y-4">
          <FormInput label="Team Name" name="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
          <FormTextarea label="Description" name="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
          <div className="grid grid-cols-2 gap-4">
            <FormInput label="Department" name="department" value={formData.department} onChange={(e) => setFormData({ ...formData, department: e.target.value })} />
            <FormInput label="Team Lead" name="lead" value={formData.lead} onChange={(e) => setFormData({ ...formData, lead: e.target.value })} />
          </div>
          <FormSelect label="Status" name="status" value={formData.status} onChange={(v) => setFormData({ ...formData, status: v })} options={[{ label: 'Active', value: 'Active' }, { label: 'Inactive', value: 'Inactive' }]} />
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => { setIsEditOpen(false); resetForm(); }}>Cancel</Button>
            <Button type="button" onClick={handleEdit}>Save Changes</Button>
          </div>
        </form>
      </Modal>

      {/* View Modal */}
      <Modal open={isViewOpen} onClose={() => { setIsViewOpen(false); setSelectedTeam(null); }} title="Team Details" size="lg">
        {selectedTeam && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-bold text-2xl">{selectedTeam.name.charAt(0)}</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold">{selectedTeam.name}</h3>
                <p className="text-muted-foreground">{selectedTeam.description}</p>
                <Badge className={getStatusColor(selectedTeam.status)}>{selectedTeam.status}</Badge>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-3 bg-muted/50 rounded-lg"><p className="text-muted-foreground">Department</p><p className="font-medium">{selectedTeam.department}</p></div>
              <div className="p-3 bg-muted/50 rounded-lg"><p className="text-muted-foreground">Team Lead</p><p className="font-medium">{selectedTeam.lead}</p></div>
              <div className="p-3 bg-muted/50 rounded-lg"><p className="text-muted-foreground">Members</p><p className="font-medium">{selectedTeam.members.length}</p></div>
              <div className="p-3 bg-muted/50 rounded-lg"><p className="text-muted-foreground">Projects</p><p className="font-medium">{selectedTeam.projects}</p></div>
            </div>
            {selectedTeam.members.length > 0 && (
              <div>
                <p className="text-sm font-medium mb-3">Team Members</p>
                <div className="space-y-2">
                  {selectedTeam.members.map((member, i) => (
                    <div key={i} className="flex items-center gap-3 p-2 bg-muted/30 rounded-lg">
                      <Avatar className="w-8 h-8"><AvatarImage src={member.avatar} /><AvatarFallback>{member.name.charAt(0)}</AvatarFallback></Avatar>
                      <span className="text-sm">{member.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsViewOpen(false)}>Close</Button>
              <Button onClick={() => { setIsViewOpen(false); openEdit(selectedTeam); }}>Edit Team</Button>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmModal open={isDeleteOpen} onClose={() => { setIsDeleteOpen(false); setSelectedTeam(null); }} onConfirm={handleDelete} title="Delete Team" description={`Are you sure you want to delete ${selectedTeam?.name}?`} confirmText="Delete" variant="destructive" />
    </motion.div>
  );
}
