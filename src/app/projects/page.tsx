'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, FolderKanban } from 'lucide-react';
import { projects as initialProjects, Project } from '@/mock-data/projects';
import DataTable, { Column } from '@/components/tables/DataTable';
import Modal, { ConfirmModal } from '@/components/modals/Modal';
import { FormInput, FormSelect, FormTextarea } from '@/components/forms/FormComponents';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { getStatusColor } from '@/utils/helpers';
import { useToast } from '@/hooks/use-toast';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'Planning',
    priority: 'Medium',
    team: '',
    startDate: '',
    endDate: '',
    budget: '',
  });

  const columns: Column<Project>[] = [
    {
      key: 'name',
      header: 'Project',
      sortable: true,
      render: (project) => (
        <div>
          <p className="font-medium">{project.name}</p>
          <p className="text-xs text-muted-foreground line-clamp-1">{project.description}</p>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (project) => (
        <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
      ),
    },
    {
      key: 'priority',
      header: 'Priority',
      sortable: true,
      render: (project) => (
        <Badge variant="outline" className={project.priority === 'High' || project.priority === 'Critical' ? 'border-red-500 text-red-500' : project.priority === 'Medium' ? 'border-amber-500 text-amber-500' : ''}>
          {project.priority}
        </Badge>
      ),
    },
    {
      key: 'team',
      header: 'Team',
      sortable: true,
    },
    {
      key: 'progress',
      header: 'Progress',
      render: (project) => (
        <div className="w-24">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-muted-foreground">{project.progress}%</span>
          </div>
          <Progress value={project.progress} className="h-1.5" />
        </div>
      ),
    },
    {
      key: 'endDate',
      header: 'Due Date',
      sortable: true,
    },
  ];

  const handleCreate = () => {
    const newProject: Project = {
      id: String(projects.length + 1),
      ...formData,
      budget: Number(formData.budget) || 0,
      progress: 0,
      members: [],
    };
    setProjects([newProject, ...projects]);
    setIsCreateOpen(false);
    resetForm();
    toast({ title: 'Project created', description: `${newProject.name} has been created successfully.` });
  };

  const handleEdit = () => {
    if (!selectedProject) return;
    setProjects(projects.map((p) => (p.id === selectedProject.id ? { ...p, ...formData, budget: Number(formData.budget) || 0 } : p)));
    setIsEditOpen(false);
    setSelectedProject(null);
    resetForm();
    toast({ title: 'Project updated', description: 'Project has been updated successfully.' });
  };

  const handleDelete = () => {
    if (!selectedProject) return;
    setProjects(projects.filter((p) => p.id !== selectedProject.id));
    setIsDeleteOpen(false);
    setSelectedProject(null);
    toast({ title: 'Project deleted', description: 'Project has been removed successfully.', variant: 'destructive' });
  };

  const openEdit = (project: Project) => {
    setSelectedProject(project);
    setFormData({
      name: project.name,
      description: project.description,
      status: project.status,
      priority: project.priority,
      team: project.team,
      startDate: project.startDate,
      endDate: project.endDate,
      budget: String(project.budget),
    });
    setIsEditOpen(true);
  };

  const openView = (project: Project) => {
    setSelectedProject(project);
    setIsViewOpen(true);
  };

  const openDelete = (project: Project) => {
    setSelectedProject(project);
    setIsDeleteOpen(true);
  };

  const resetForm = () => {
    setFormData({ name: '', description: '', status: 'Planning', priority: 'Medium', team: '', startDate: '', endDate: '', budget: '' });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink href="/">Dashboard</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>Projects</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">Manage your organization&apos;s projects.</p>
        </div>
      </div>

      <DataTable
        data={projects}
        columns={columns}
        searchPlaceholder="Search projects..."
        filters={[
          { key: 'status', label: 'Status', options: ['Planning', 'In Progress', 'On Hold', 'Completed', 'Review'] },
          { key: 'priority', label: 'Priority', options: ['Low', 'Medium', 'High', 'Critical'] },
        ]}
        onView={openView}
        onEdit={openEdit}
        onDelete={openDelete}
        actions={<Button onClick={() => setIsCreateOpen(true)}><Plus className="w-4 h-4 mr-2" />New Project</Button>}
      />

      {/* Create Modal */}
      <Modal open={isCreateOpen} onClose={() => { setIsCreateOpen(false); resetForm(); }} title="Create New Project" description="Start a new project." size="lg">
        <form className="space-y-4">
          <FormInput label="Project Name" name="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Website Redesign" required />
          <FormTextarea label="Description" name="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Project description..." />
          <div className="grid grid-cols-2 gap-4">
            <FormSelect label="Status" name="status" value={formData.status} onChange={(v) => setFormData({ ...formData, status: v })} options={[{ label: 'Planning', value: 'Planning' }, { label: 'In Progress', value: 'In Progress' }, { label: 'On Hold', value: 'On Hold' }, { label: 'Completed', value: 'Completed' }, { label: 'Review', value: 'Review' }]} />
            <FormSelect label="Priority" name="priority" value={formData.priority} onChange={(v) => setFormData({ ...formData, priority: v })} options={[{ label: 'Low', value: 'Low' }, { label: 'Medium', value: 'Medium' }, { label: 'High', value: 'High' }, { label: 'Critical', value: 'Critical' }]} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormInput label="Team" name="team" value={formData.team} onChange={(e) => setFormData({ ...formData, team: e.target.value })} placeholder="Platform" required />
            <FormInput label="Budget" name="budget" type="number" value={formData.budget} onChange={(e) => setFormData({ ...formData, budget: e.target.value })} placeholder="50000" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormInput label="Start Date" name="startDate" type="date" value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} />
            <FormInput label="End Date" name="endDate" type="date" value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => { setIsCreateOpen(false); resetForm(); }}>Cancel</Button>
            <Button type="button" onClick={handleCreate}><FolderKanban className="w-4 h-4 mr-2" />Create Project</Button>
          </div>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal open={isEditOpen} onClose={() => { setIsEditOpen(false); setSelectedProject(null); resetForm(); }} title="Edit Project" size="lg">
        <form className="space-y-4">
          <FormInput label="Project Name" name="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
          <FormTextarea label="Description" name="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
          <div className="grid grid-cols-2 gap-4">
            <FormSelect label="Status" name="status" value={formData.status} onChange={(v) => setFormData({ ...formData, status: v })} options={[{ label: 'Planning', value: 'Planning' }, { label: 'In Progress', value: 'In Progress' }, { label: 'On Hold', value: 'On Hold' }, { label: 'Completed', value: 'Completed' }, { label: 'Review', value: 'Review' }]} />
            <FormSelect label="Priority" name="priority" value={formData.priority} onChange={(v) => setFormData({ ...formData, priority: v })} options={[{ label: 'Low', value: 'Low' }, { label: 'Medium', value: 'Medium' }, { label: 'High', value: 'High' }, { label: 'Critical', value: 'Critical' }]} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormInput label="Team" name="team" value={formData.team} onChange={(e) => setFormData({ ...formData, team: e.target.value })} />
            <FormInput label="Budget" name="budget" type="number" value={formData.budget} onChange={(e) => setFormData({ ...formData, budget: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormInput label="Start Date" name="startDate" type="date" value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} />
            <FormInput label="End Date" name="endDate" type="date" value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => { setIsEditOpen(false); resetForm(); }}>Cancel</Button>
            <Button type="button" onClick={handleEdit}>Save Changes</Button>
          </div>
        </form>
      </Modal>

      {/* View Modal */}
      <Modal open={isViewOpen} onClose={() => { setIsViewOpen(false); setSelectedProject(null); }} title="Project Details" size="lg">
        {selectedProject && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold">{selectedProject.name}</h3>
              <p className="text-muted-foreground">{selectedProject.description}</p>
              <div className="flex gap-2 mt-2">
                <Badge className={getStatusColor(selectedProject.status)}>{selectedProject.status}</Badge>
                <Badge variant="outline">{selectedProject.priority} Priority</Badge>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Progress</span><span className="font-medium">{selectedProject.progress}%</span></div>
              <Progress value={selectedProject.progress} className="h-2" />
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-3 bg-muted/50 rounded-lg"><p className="text-muted-foreground">Team</p><p className="font-medium">{selectedProject.team}</p></div>
              <div className="p-3 bg-muted/50 rounded-lg"><p className="text-muted-foreground">Budget</p><p className="font-medium">${selectedProject.budget?.toLocaleString() || 'N/A'}</p></div>
              <div className="p-3 bg-muted/50 rounded-lg"><p className="text-muted-foreground">Start Date</p><p className="font-medium">{selectedProject.startDate || 'N/A'}</p></div>
              <div className="p-3 bg-muted/50 rounded-lg"><p className="text-muted-foreground">Due Date</p><p className="font-medium">{selectedProject.endDate || 'N/A'}</p></div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsViewOpen(false)}>Close</Button>
              <Button onClick={() => { setIsViewOpen(false); openEdit(selectedProject); }}>Edit Project</Button>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmModal open={isDeleteOpen} onClose={() => { setIsDeleteOpen(false); setSelectedProject(null); }} onConfirm={handleDelete} title="Delete Project" description={`Are you sure you want to delete ${selectedProject?.name}?`} confirmText="Delete" variant="destructive" />
    </motion.div>
  );
}
