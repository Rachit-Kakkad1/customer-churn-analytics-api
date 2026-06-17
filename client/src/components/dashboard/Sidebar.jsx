import React from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  BarChart3,
  User,
  Settings,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';

const navigationItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { name: 'Customers', icon: Users, path: '/customers' },
  { name: 'Analytics', icon: BarChart3, path: '/analytics' },
  { name: 'Profile', icon: User, path: '/profile' },
  { name: 'Settings', icon: Settings, path: '/settings' },
];

/**
 * Sidebar component supporting collapse states and styled hover indicators.
 */
export const Sidebar = ({ isCollapsed, setIsCollapsed, activePath = '/dashboard' }) => {
  return (
    <motion.aside
      animate={{ width: isCollapsed ? 72 : 240 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className="relative flex h-screen flex-col border-r border-white/5 bg-[#07070a] text-neutral-400 select-none overflow-hidden"
    >
      {/* Brand Header */}
      <div className="flex h-16 items-center px-6 gap-3 border-b border-white/5">
        <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/20">
          <TrendingUp className="h-4.5 w-4.5" />
        </div>
        {!isCollapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-md font-bold tracking-tight bg-gradient-to-r from-white via-neutral-100 to-neutral-400 bg-clip-text text-transparent"
          >
            Churnly
          </motion.span>
        )}
      </div>

      {/* Navigation list */}
      <nav className="flex-1 space-y-1 py-6 px-3">
        {navigationItems.map((item) => {
          const isActive = item.path === activePath;
          const Icon = item.icon;

          return (
            <a
              key={item.name}
              href={item.path}
              onClick={(e) => e.preventDefault()} // Prepared for future routing
              className={`flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 group relative ${
                isActive
                  ? 'bg-white/5 text-white shadow-inner border border-white/5'
                  : 'hover:bg-white/[0.02] hover:text-neutral-200'
              }`}
            >
              <Icon className={`h-4.5 w-4.5 shrink-0 transition-colors ${isActive ? 'text-indigo-400' : 'text-neutral-400 group-hover:text-neutral-200'}`} />
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="ml-3 truncate"
                >
                  {item.name}
                </motion.span>
              )}
            </a>
          );
        })}
      </nav>

      {/* Collapse Action Button */}
      <div className="p-3 border-t border-white/5 flex justify-end">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/5 bg-white/[0.02] text-neutral-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>
    </motion.aside>
  );
};
