'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  CheckSquare,
  X,
} from 'lucide-react';
import { cn } from '@/utils/helpers';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAnimationConfig } from '@/hooks/use-animation-config';

export interface Column<T> {
  key: keyof T | string;
  header: string;
  sortable?: boolean;
  render?: (item: T) => React.ReactNode;
  width?: string;
}

interface DataTableProps<T extends { id: string }> {
  data: T[];
  columns: Column<T>[];
  searchable?: boolean;
  searchPlaceholder?: string;
  pageSize?: number;
  onRowClick?: (item: T) => void;
  onView?: (item: T) => void;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  actions?: React.ReactNode;
  filters?: { key: string; label: string; options: string[] }[];
  bulkActions?: { label: string; icon?: React.ReactNode; onClick: (ids: string[]) => void }[];
}

export default function DataTable<T extends { id: string }>({
  data,
  columns,
  searchable = true,
  searchPlaceholder = 'Search...',
  pageSize = 10,
  onRowClick,
  onView,
  onEdit,
  onDelete,
  actions,
  filters,
  bulkActions,
}: DataTableProps<T>) {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const anim = useAnimationConfig();

  // Filter data
  const filteredData = useMemo(() => {
    let result = [...data];

    // Search filter
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter((item) =>
        Object.values(item as Record<string, unknown>).some((value) =>
          String(value).toLowerCase().includes(searchLower)
        )
      );
    }

    // Apply filters
    Object.entries(activeFilters).forEach(([key, value]) => {
      if (value && value !== 'all') {
        result = result.filter((item) => {
          const itemValue = (item as Record<string, unknown>)[key];
          return String(itemValue).toLowerCase() === value.toLowerCase();
        });
      }
    });

    return result;
  }, [data, search, activeFilters]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = (a as Record<string, unknown>)[sortKey];
      const bValue = (b as Record<string, unknown>)[sortKey];

      if (aValue === bValue) return 0;
      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      const comparison = String(aValue).localeCompare(String(bValue), undefined, {
        numeric: true,
        sensitivity: 'base',
      });

      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [filteredData, sortKey, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const handleSelectAll = () => {
    if (selectedIds.length === paginatedData.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedData.map((item) => item.id));
    }
  };

  const handleSelectItem = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleFilterChange = (key: string, value: string) => {
    setActiveFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  // Animation variants
  const tableRowVariants = {
    hidden: anim.enabled ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 },
    visible: (index: number) => ({
      opacity: 1,
      x: 0,
      transition: { duration: anim.duration, delay: anim.enabled ? index * 0.03 : 0 },
    }),
    hover: anim.hoverOn ? { scale: 1.01, transition: anim.transition } : undefined,
    exit: anim.enabled ? { opacity: 0, x: 10, transition: anim.transition } : { opacity: 1, x: 0 },
  };

  const headerVariants = {
    hidden: anim.enabled ? { opacity: 0, y: -10 } : { opacity: 1, y: 0 },
    visible: { opacity: 1, y: 0, transition: anim.transition },
  };

  const paginationVariants = {
    hidden: anim.enabled ? { opacity: 0, y: 10 } : { opacity: 1, y: 0 },
    visible: { opacity: 1, y: 0, transition: { ...anim.transition, delay: anim.enabled ? 0.1 : 0 } },
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {searchable && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder={searchPlaceholder}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-9 w-[250px]"
              />
            </div>
          )}

          {filters?.map((filter) => (
            <Select
              key={filter.key}
              value={activeFilters[filter.key] || 'all'}
              onValueChange={(value) => handleFilterChange(filter.key, value)}
            >
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder={filter.label} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All {filter.label}s</SelectItem>
                {filter.options.map((option) => (
                  <SelectItem key={option} value={option.toLowerCase()}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {selectedIds.length > 0 && bulkActions && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-lg">
              <span className="text-sm font-medium">{selectedIds.length} selected</span>
              {bulkActions.map((action, i) => (
                <Button key={i} size="sm" variant="ghost" onClick={() => action.onClick(selectedIds)}>
                  {action.icon}
                  <span className="ml-1">{action.label}</span>
                </Button>
              ))}
              <Button size="sm" variant="ghost" onClick={() => setSelectedIds([])}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}
          {actions}
        </div>
      </div>

      {/* Table */}
      <motion.div
        variants={headerVariants}
        initial="hidden"
        animate="visible"
        className="rounded-lg border border-border overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <motion.thead
              className="bg-muted/50 border-b border-border"
              variants={headerVariants}
            >
              <tr>
                {bulkActions && (
                  <th className="w-12 px-4 py-3">
                    <motion.div
                      whileHover={anim.hoverOn ? { scale: 1.05 } : undefined}
                      whileTap={anim.hoverOn ? { scale: 0.95 } : undefined}
                      transition={anim.transition}
                      className="inline-block"
                    >
                      <Checkbox
                        checked={selectedIds.length === paginatedData.length && paginatedData.length > 0}
                        onCheckedChange={handleSelectAll}
                      />
                    </motion.div>
                  </th>
                )}
                {columns.map((column) => (
                  <motion.th
                    key={String(column.key)}
                    className={cn(
                      'px-4 py-3 text-left text-sm font-medium text-muted-foreground',
                      column.sortable && 'cursor-pointer select-none hover:text-foreground'
                    )}
                    style={{ width: column.width }}
                    onClick={() => column.sortable && handleSort(String(column.key))}
                    whileHover={anim.hoverOn ? { scale: 1.02, transition: anim.transition } : undefined}
                    whileTap={anim.hoverOn ? { scale: 0.98 } : undefined}
                  >
                    <div className="flex items-center gap-1">
                      {column.header}
                      {column.sortable && sortKey === column.key && (
                        <motion.div
                          animate={{
                            rotate: sortDirection === 'asc' ? 0 : 180,
                            transition: { type: "spring" as const, stiffness: 300 }
                          }}
                        >
                          {sortDirection === 'asc' ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </motion.div>
                      )}
                    </div>
                  </motion.th>
                ))}
                {(onView || onEdit || onDelete) && (
                  <th className="w-12 px-4 py-3"></th>
                )}
              </tr>
            </motion.thead>
            <tbody className="divide-y divide-border">
              <AnimatePresence mode="popLayout">
                {paginatedData.map((item, index) => (
                  <motion.tr
                    key={item.id}
                    custom={index}
                    variants={tableRowVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={anim.hoverOn ? "hover" : undefined}
                    exit="exit"
                    layout
                    className={cn(
                      'bg-card hover:bg-muted/50 transition-colors cursor-pointer relative group',
                      onRowClick && 'cursor-pointer'
                    )}
                    onClick={() => onRowClick?.(item)}
                  >
                    {/* Row highlight effect */}
                    <div
                      className="absolute inset-0 bg-primary/5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                    />

                    {bulkActions && (
                      <td className="px-4 py-3 relative z-10" onClick={(e) => e.stopPropagation()}>
                        <motion.div
                          whileHover={anim.hoverOn ? { scale: 1.05 } : undefined}
                          whileTap={anim.hoverOn ? { scale: 0.95 } : undefined}
                          className="inline-block"
                        >
                          <Checkbox
                            checked={selectedIds.includes(item.id)}
                            onCheckedChange={() => handleSelectItem(item.id)}
                          />
                        </motion.div>
                      </td>
                    )}
                    {columns.map((column) => (
                      <td key={String(column.key)} className="px-4 py-3 text-sm relative z-10">
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 + 0.1 }}
                        >
                          {column.render
                            ? column.render(item)
                            : String((item as Record<string, unknown>)[column.key as string] ?? '')}
                        </motion.div>
                      </td>
                    ))}
                    {(onView || onEdit || onDelete) && (
                      <td className="px-4 py-3 relative z-10" onClick={(e) => e.stopPropagation()}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <motion.div
                              whileHover={anim.hoverOn ? { scale: 1.05 } : undefined}
                              whileTap={anim.hoverOn ? { scale: 0.95 } : undefined}
                            >
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </motion.div>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {onView && (
                              <DropdownMenuItem onClick={() => onView(item)}>
                                <Eye className="w-4 h-4 mr-2" />
                                View
                              </DropdownMenuItem>
                            )}
                            {onEdit && (
                              <DropdownMenuItem onClick={() => onEdit(item)}>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                            )}
                            {onDelete && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  className="text-red-600 focus:text-red-600"
                                  onClick={() => onDelete(item)}
                                >
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    )}
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {paginatedData.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No results found
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            variants={paginationVariants}
            initial="hidden"
            animate="visible"
            className="flex items-center justify-between px-4 py-3 border-t border-border bg-muted/30"
          >
            <motion.div
              className="text-sm text-muted-foreground"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              Showing {(currentPage - 1) * pageSize + 1} to{' '}
              {Math.min(currentPage * pageSize, sortedData.length)} of {sortedData.length} results
            </motion.div>
            <div className="flex items-center gap-1">
              <motion.div
                whileHover={anim.hoverOn ? { scale: 1.05 } : undefined}
                whileTap={anim.hoverOn ? { scale: 0.95 } : undefined}
              >
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
              </motion.div>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                return (
                  <motion.div
                    key={pageNum}
                    whileHover={anim.hoverOn ? { scale: 1.05 } : undefined}
                    whileTap={anim.hoverOn ? { scale: 0.95 } : undefined}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.05 }}
                  >
                    <Button
                      variant={currentPage === pageNum ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  </motion.div>
                );
              })}
              <motion.div
                whileHover={anim.hoverOn ? { scale: 1.05 } : undefined}
                whileTap={anim.hoverOn ? { scale: 0.95 } : undefined}
              >
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
