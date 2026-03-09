export interface TeamMember {
  id: string;
  name: string;
  avatar: string;
  role: string;
}

export interface Team {
  id: string;
  name: string;
  description: string;
  members: TeamMember[];
  lead: string;
  department: string;
  status: 'Active' | 'Inactive';
  createdAt: string;
  projects: number;
}

export const teams: Team[] = [
  {
    id: '1',
    name: 'Platform',
    description: 'Core platform infrastructure and services',
    members: [
      { id: '1', name: 'Sarah Johnson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah', role: 'Lead' },
      { id: '2', name: 'Michael Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael', role: 'Developer' },
      { id: '3', name: 'Alexander Harris', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alexander', role: 'Developer' },
    ],
    lead: 'Sarah Johnson',
    department: 'Engineering',
    status: 'Active',
    createdAt: '2021-01-15',
    projects: 5,
  },
  {
    id: '2',
    name: 'Frontend',
    description: 'Web application frontend development',
    members: [
      { id: '4', name: 'Michael Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael', role: 'Lead' },
      { id: '5', name: 'Daniel Walker', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Daniel', role: 'Developer' },
    ],
    lead: 'Michael Chen',
    department: 'Engineering',
    status: 'Active',
    createdAt: '2021-02-20',
    projects: 4,
  },
  {
    id: '3',
    name: 'Product Design',
    description: 'User interface and experience design',
    members: [
      { id: '6', name: 'Emily Davis', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily', role: 'Lead' },
      { id: '7', name: 'Isabella Thomas', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Isabella', role: 'Designer' },
      { id: '8', name: 'Charlotte Clark', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Charlotte', role: 'Designer' },
    ],
    lead: 'Emily Davis',
    department: 'Design',
    status: 'Active',
    createdAt: '2021-03-10',
    projects: 8,
  },
  {
    id: '4',
    name: 'Backend',
    description: 'Server-side development and APIs',
    members: [
      { id: '9', name: 'William Taylor', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=William', role: 'Lead' },
      { id: '10', name: 'Sebastian Young', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sebastian', role: 'Developer' },
    ],
    lead: 'William Taylor',
    department: 'Engineering',
    status: 'Active',
    createdAt: '2021-01-25',
    projects: 6,
  },
  {
    id: '5',
    name: 'DevOps',
    description: 'Infrastructure and deployment automation',
    members: [
      { id: '11', name: 'Lucas Garcia', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas', role: 'Lead' },
    ],
    lead: 'Lucas Garcia',
    department: 'Engineering',
    status: 'Active',
    createdAt: '2021-04-15',
    projects: 3,
  },
  {
    id: '6',
    name: 'Mobile',
    description: 'iOS and Android application development',
    members: [
      { id: '12', name: 'Benjamin Anderson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Benjamin', role: 'Lead' },
    ],
    lead: 'Benjamin Anderson',
    department: 'Engineering',
    status: 'Active',
    createdAt: '2022-01-10',
    projects: 2,
  },
  {
    id: '7',
    name: 'Data',
    description: 'Data engineering and analytics',
    members: [
      { id: '13', name: 'Olivia Brown', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia', role: 'Lead' },
      { id: '14', name: 'Ava White', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ava', role: 'Analyst' },
    ],
    lead: 'Olivia Brown',
    department: 'Analytics',
    status: 'Active',
    createdAt: '2021-06-01',
    projects: 4,
  },
  {
    id: '8',
    name: 'Security',
    description: 'Application and infrastructure security',
    members: [
      { id: '15', name: 'Ethan Lee', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ethan', role: 'Lead' },
    ],
    lead: 'Ethan Lee',
    department: 'Engineering',
    status: 'Inactive',
    createdAt: '2021-08-20',
    projects: 2,
  },
];

export const getTeamById = (id: string) => teams.find(t => t.id === id);
