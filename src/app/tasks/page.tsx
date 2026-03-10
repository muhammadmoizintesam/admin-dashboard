'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, CheckSquare } from 'lucide-react';
import { tasks as initialTasks, Task } from '@/mock-data/tasks';
import DataTable, { Column } from '@/components/tables/DataTable';
import Modal, { ConfirmModal } from '@/components/modals/Modal';
import { FormInput, FormSelect, FormTextarea } from '@/components/forms/FormComponents';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getStatusColor, getPriorityColor } from '@/utils/helpers';
import { useToast } from '@/hooks/use-toast';
import { useAnimationConfig } from '@/hooks/use-animation-config';

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const anim = useAnimationConfig();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'To Do',
    priority: 'Medium',
    assignee: '',
    project: '',
    dueDate: '',
  });

  const columns: Column<Task>[] = [
    {
      key: 'title',
      header: 'Task',
      sortable: true,
      render: (task) => (
        <div>
          <p className="font-medium">{task.title}</p>
          <p className="text-xs text-muted-foreground line-clamp-1">{task.description}</p>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (task) => (
        <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
      ),
    },
    {
      key: 'priority',
      header: 'Priority',
      sortable: true,
      render: (task) => (
        <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
      ),
    },
    {
      key: 'assignee',
      header: 'Assignee',
      sortable: true,
      render: (task) => (
        task.assignee ? (
          <div className="flex items-center gap-2">
            <Avatar className="w-6 h-6">
              <AvatarImage src={task.assignee.avatar} />
              <AvatarFallback className="text-xs">{task.assignee.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-sm">{task.assignee.name}</span>
          </div>
        ) : (
          <span className="text-muted-foreground text-sm">Unassigned</span>
        )
      ),
    },
    {
      key: 'project',
      header: 'Project',
      sortable: true,
    },
    {
      key: 'dueDate',
      header: 'Due Date',
      sortable: true,
    },
  ];

  const handleCreate = () => {
    const newTask: Task = {
      id: String(tasks.length + 1),
      ...formData,
      assignee: formData.assignee ? { name: formData.assignee, avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.assignee}` } : null,
    };
    setTasks([newTask, ...tasks]);
    setIsCreateOpen(false);
    resetForm();
    toast({ title: 'Task created', description: `${newTask.title} has been created successfully.` });
  };

  const handleEdit = () => {
    if (!selectedTask) return;
    setTasks(tasks.map((t) => (t.id === selectedTask.id ? { ...t, ...formData, assignee: formData.assignee ? { name: formData.assignee, avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.assignee}` } : null } : t)));
    setIsEditOpen(false);
    setSelectedTask(null);
    resetForm();
    toast({ title: 'Task updated', description: 'Task has been updated successfully.' });
  };

  const handleDelete = () => {
    if (!selectedTask) return;
    setTasks(tasks.filter((t) => t.id !== selectedTask.id));
    setIsDeleteOpen(false);
    setSelectedTask(null);
    toast({ title: 'Task deleted', description: 'Task has been removed successfully.', variant: 'destructive' });
  };

  const openEdit = (task: Task) => {
    setSelectedTask(task);
    setFormData({
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      assignee: task.assignee?.name || '',
      project: task.project,
      dueDate: task.dueDate,
    });
    setIsEditOpen(true);
  };

  const openView = (task: Task) => {
    setSelectedTask(task);
    setIsViewOpen(true);
  };

  const openDelete = (task: Task) => {
    setSelectedTask(task);
    setIsDeleteOpen(true);
  };

  const resetForm = () => {
    setFormData({ title: '', description: '', status: 'To Do', priority: 'Medium', assignee: '', project: '', dueDate: '' });
  };

  return (
    <motion.div initial={anim.enabled ? { opacity: 0 } : false} animate={{ opacity: 1 }} transition={anim.transition} className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink href="/">Dashboard</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>Tasks</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Tasks</h1>
          <p className="text-muted-foreground">Track and manage your tasks.</p>
        </div>
      </div>

      <DataTable
        data={tasks}
        columns={columns}
        searchPlaceholder="Search tasks..."
        filters={[
          { key: 'status', label: 'Status', options: ['To Do', 'In Progress', 'Review', 'Completed', 'On Hold'] },
          { key: 'priority', label: 'Priority', options: ['Low', 'Medium', 'High', 'Critical'] },
        ]}
        onView={openView}
        onEdit={openEdit}
        onDelete={openDelete}
        actions={<Button onClick={() => setIsCreateOpen(true)}><Plus className="w-4 h-4 mr-2" />New Task</Button>}
      />

      {/* Create Modal */}
      <Modal open={isCreateOpen} onClose={() => { setIsCreateOpen(false); resetForm(); }} title="Create New Task" size="lg">
        <form className="space-y-4">
          <FormInput label="Task Title" name="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Implement new feature" required />
          <FormTextarea label="Description" name="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Task description..." />
          <div className="grid grid-cols-2 gap-4">
            <FormSelect label="Status" name="status" value={formData.status} onChange={(v) => setFormData({ ...formData, status: v })} options={[{ label: 'To Do', value: 'To Do' }, { label: 'In Progress', value: 'In Progress' }, { label: 'Review', value: 'Review' }, { label: 'Completed', value: 'Completed' }, { label: 'On Hold', value: 'On Hold' }]} />
            <FormSelect label="Priority" name="priority" value={formData.priority} onChange={(v) => setFormData({ ...formData, priority: v })} options={[{ label: 'Low', value: 'Low' }, { label: 'Medium', value: 'Medium' }, { label: 'High', value: 'High' }, { label: 'Critical', value: 'Critical' }]} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormInput label="Assignee" name="assignee" value={formData.assignee} onChange={(e) => setFormData({ ...formData, assignee: e.target.value })} placeholder="John Doe" />
            <FormInput label="Project" name="project" value={formData.project} onChange={(e) => setFormData({ ...formData, project: e.target.value })} placeholder="Website Redesign" required />
          </div>
          <FormInput label="Due Date" name="dueDate" type="date" value={formData.dueDate} onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })} />
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => { setIsCreateOpen(false); resetForm(); }}>Cancel</Button>
            <Button type="button" onClick={handleCreate}><CheckSquare className="w-4 h-4 mr-2" />Create Task</Button>
          </div>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal open={isEditOpen} onClose={() => { setIsEditOpen(false); setSelectedTask(null); resetForm(); }} title="Edit Task" size="lg">
        <form className="space-y-4">
          <FormInput label="Task Title" name="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
          <FormTextarea label="Description" name="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
          <div className="grid grid-cols-2 gap-4">
            <FormSelect label="Status" name="status" value={formData.status} onChange={(v) => setFormData({ ...formData, status: v })} options={[{ label: 'To Do', value: 'To Do' }, { label: 'In Progress', value: 'In Progress' }, { label: 'Review', value: 'Review' }, { label: 'Completed', value: 'Completed' }, { label: 'On Hold', value: 'On Hold' }]} />
            <FormSelect label="Priority" name="priority" value={formData.priority} onChange={(v) => setFormData({ ...formData, priority: v })} options={[{ label: 'Low', value: 'Low' }, { label: 'Medium', value: 'Medium' }, { label: 'High', value: 'High' }, { label: 'Critical', value: 'Critical' }]} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormInput label="Assignee" name="assignee" value={formData.assignee} onChange={(e) => setFormData({ ...formData, assignee: e.target.value })} />
            <FormInput label="Project" name="project" value={formData.project} onChange={(e) => setFormData({ ...formData, project: e.target.value })} />
          </div>
          <FormInput label="Due Date" name="dueDate" type="date" value={formData.dueDate} onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })} />
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => { setIsEditOpen(false); resetForm(); }}>Cancel</Button>
            <Button type="button" onClick={handleEdit}>Save Changes</Button>
          </div>
        </form>
      </Modal>

      {/* View Modal */}
      <Modal open={isViewOpen} onClose={() => { setIsViewOpen(false); setSelectedTask(null); }} title="Task Details" size="lg">
        {selectedTask && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold">{selectedTask.title}</h3>
              <p className="text-muted-foreground mt-1">{selectedTask.description}</p>
              <div className="flex gap-2 mt-3">
                <Badge className={getStatusColor(selectedTask.status)}>{selectedTask.status}</Badge>
                <Badge className={getPriorityColor(selectedTask.priority)}>{selectedTask.priority} Priority</Badge>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-muted-foreground">Assignee</p>
                <div className="flex items-center gap-2 mt-1">
                  {selectedTask.assignee ? (
                    <>
                      <Avatar className="w-6 h-6"><AvatarImage src={selectedTask.assignee.avatar} /><AvatarFallback>{selectedTask.assignee.name.charAt(0)}</AvatarFallback></Avatar>
                      <span className="font-medium">{selectedTask.assignee.name}</span>
                    </>
                  ) : <span className="text-muted-foreground">Unassigned</span>}
                </div>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg"><p className="text-muted-foreground">Project</p><p className="font-medium">{selectedTask.project}</p></div>
              <div className="p-3 bg-muted/50 rounded-lg"><p className="text-muted-foreground">Due Date</p><p className="font-medium">{selectedTask.dueDate || 'No due date'}</p></div>
              <div className="p-3 bg-muted/50 rounded-lg"><p className="text-muted-foreground">Task ID</p><p className="font-medium">#{selectedTask.id}</p></div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsViewOpen(false)}>Close</Button>
              <Button onClick={() => { setIsViewOpen(false); openEdit(selectedTask); }}>Edit Task</Button>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmModal open={isDeleteOpen} onClose={() => { setIsDeleteOpen(false); setSelectedTask(null); }} onConfirm={handleDelete} title="Delete Task" description={`Are you sure you want to delete "${selectedTask?.title}"?`} confirmText="Delete" variant="destructive" />
    </motion.div>
  );
}
