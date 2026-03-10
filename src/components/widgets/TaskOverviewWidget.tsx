'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Clock, AlertCircle, ListTodo } from 'lucide-react';
import { tasks } from '@/mock-data/tasks';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAnimationConfig } from '@/hooks/use-animation-config';
import WidgetCard from '@/components/cards/WidgetCard';

export default function TaskOverviewWidget() {
  const anim = useAnimationConfig();
  const todoCount = tasks.filter((t) => t.status === 'To Do').length;
  const inProgressCount = tasks.filter((t) => t.status === 'In Progress').length;
  const reviewCount = tasks.filter((t) => t.status === 'Review').length;
  const completedCount = tasks.filter((t) => t.status === 'Completed').length;
  const totalTasks = tasks.length;

  const stats = [
    {
      label: 'To Do',
      count: todoCount,
      icon: ListTodo,
      color: 'text-gray-500',
      bgColor: 'bg-gray-500/10',
    },
    {
      label: 'In Progress',
      count: inProgressCount,
      icon: Clock,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      label: 'Review',
      count: reviewCount,
      icon: AlertCircle,
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/10',
    },
    {
      label: 'Completed',
      count: completedCount,
      icon: CheckCircle2,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10',
    },
  ];

  return (
    <WidgetCard
      title="Task Overview"
      subtitle={`${totalTasks} total tasks`}
      action={
        <Button variant="ghost" size="sm" className="text-xs">
          View all
          <ArrowRight className="w-3 h-3 ml-1" />
        </Button>
      }
    >
      <div className="space-y-4">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Overall Progress</span>
            <span className="font-medium">
              {Math.round((completedCount / totalTasks) * 100)}%
            </span>
          </div>
          <Progress value={(completedCount / totalTasks) * 100} className="h-2" />
        </div>

        {/* Task Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={anim.enabled ? { opacity: 0, y: 10 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...anim.transition, delay: anim.enabled ? index * 0.03 : 0 }}
              className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
            >
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <div>
                <p className="text-lg font-semibold">{stat.count}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Priority Tasks */}
        <div className="pt-2 border-t border-border">
          <p className="text-sm font-medium mb-3">High Priority Tasks</p>
          <div className="space-y-2">
            {tasks
              .filter((t) => t.priority === 'Critical' || t.priority === 'High')
              .slice(0, 3)
              .map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-2 rounded-md bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <span className="text-sm truncate flex-1">{task.title}</span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      task.priority === 'Critical'
                        ? 'bg-red-500/10 text-red-600 dark:text-red-400'
                        : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                    }`}
                  >
                    {task.priority}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </WidgetCard>
  );
}
