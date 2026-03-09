export const revenueData = [
  { month: 'Jan', revenue: 45000, expenses: 32000, profit: 13000 },
  { month: 'Feb', revenue: 52000, expenses: 35000, profit: 17000 },
  { month: 'Mar', revenue: 48000, expenses: 33000, profit: 15000 },
  { month: 'Apr', revenue: 61000, expenses: 38000, profit: 23000 },
  { month: 'May', revenue: 55000, expenses: 36000, profit: 19000 },
  { month: 'Jun', revenue: 67000, expenses: 42000, profit: 25000 },
  { month: 'Jul', revenue: 72000, expenses: 45000, profit: 27000 },
  { month: 'Aug', revenue: 69000, expenses: 43000, profit: 26000 },
  { month: 'Sep', revenue: 78000, expenses: 48000, profit: 30000 },
  { month: 'Oct', revenue: 82000, expenses: 51000, profit: 31000 },
  { month: 'Nov', revenue: 91000, expenses: 55000, profit: 36000 },
  { month: 'Dec', revenue: 95000, expenses: 58000, profit: 37000 },
];

export const userGrowthData = [
  { month: 'Jan', users: 1200, newUsers: 150, activeUsers: 890 },
  { month: 'Feb', users: 1380, newUsers: 180, activeUsers: 1020 },
  { month: 'Mar', users: 1520, newUsers: 140, activeUsers: 1150 },
  { month: 'Apr', users: 1680, newUsers: 160, activeUsers: 1280 },
  { month: 'May', users: 1890, newUsers: 210, activeUsers: 1450 },
  { month: 'Jun', users: 2150, newUsers: 260, activeUsers: 1680 },
  { month: 'Jul', users: 2480, newUsers: 330, activeUsers: 1950 },
  { month: 'Aug', users: 2760, newUsers: 280, activeUsers: 2180 },
  { month: 'Sep', users: 3120, newUsers: 360, activeUsers: 2480 },
  { month: 'Oct', users: 3580, newUsers: 460, activeUsers: 2850 },
  { month: 'Nov', users: 4120, newUsers: 540, activeUsers: 3280 },
  { month: 'Dec', users: 4750, newUsers: 630, activeUsers: 3780 },
];

export const performanceData = [
  { time: '00:00', cpu: 35, memory: 42, network: 28 },
  { time: '04:00', cpu: 28, memory: 38, network: 22 },
  { time: '08:00', cpu: 45, memory: 52, network: 38 },
  { time: '12:00', cpu: 72, memory: 68, network: 56 },
  { time: '16:00', cpu: 85, memory: 75, network: 68 },
  { time: '20:00', cpu: 58, memory: 62, network: 45 },
  { time: '24:00', cpu: 42, memory: 48, network: 32 },
];

export const projectStatusData = [
  { name: 'Completed', value: 35, color: '#10b981' },
  { name: 'In Progress', value: 45, color: '#3b82f6' },
  { name: 'Planning', value: 12, color: '#f59e0b' },
  { name: 'On Hold', value: 8, color: '#6b7280' },
];

export const taskDistributionData = [
  { name: 'To Do', value: 28, color: '#94a3b8' },
  { name: 'In Progress', value: 42, color: '#3b82f6' },
  { name: 'Review', value: 18, color: '#f59e0b' },
  { name: 'Completed', value: 62, color: '#10b981' },
];

export const teamPerformanceData = [
  { team: 'Platform', tasks: 45, completed: 32, efficiency: 89 },
  { team: 'Frontend', tasks: 38, completed: 28, efficiency: 92 },
  { team: 'Backend', tasks: 52, completed: 41, efficiency: 88 },
  { team: 'Design', tasks: 28, completed: 24, efficiency: 95 },
  { team: 'DevOps', tasks: 22, completed: 18, efficiency: 91 },
  { team: 'Mobile', tasks: 35, completed: 25, efficiency: 85 },
  { team: 'Data', tasks: 18, completed: 15, efficiency: 94 },
];

export const weeklyActivityData = [
  { day: 'Mon', commits: 45, prs: 12, reviews: 28 },
  { day: 'Tue', commits: 52, prs: 15, reviews: 32 },
  { day: 'Wed', commits: 38, prs: 8, reviews: 25 },
  { day: 'Thu', commits: 61, prs: 18, reviews: 35 },
  { day: 'Fri', commits: 48, prs: 14, reviews: 30 },
  { day: 'Sat', commits: 15, prs: 3, reviews: 8 },
  { day: 'Sun', commits: 8, prs: 1, reviews: 5 },
];

export const serverMetrics = {
  uptime: 99.97,
  responseTime: 142,
  errorRate: 0.12,
  activeConnections: 2847,
  cpuUsage: 45,
  memoryUsage: 62,
  diskUsage: 38,
  bandwidth: '2.4 GB/s',
};

export const systemHealth = {
  status: 'healthy',
  services: [
    { name: 'API Gateway', status: 'operational', uptime: 99.99 },
    { name: 'Database Cluster', status: 'operational', uptime: 99.98 },
    { name: 'Cache Server', status: 'operational', uptime: 100 },
    { name: 'Message Queue', status: 'operational', uptime: 99.95 },
    { name: 'Storage Service', status: 'degraded', uptime: 98.50 },
    { name: 'CDN', status: 'operational', uptime: 99.99 },
  ],
  incidents: [
    { id: 1, service: 'Storage Service', message: 'Elevated latency detected', time: '2 hours ago', severity: 'warning' },
  ],
};
