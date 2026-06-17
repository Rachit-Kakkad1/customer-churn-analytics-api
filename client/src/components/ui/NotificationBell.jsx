import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell } from 'lucide-react';
import { useNotification } from '../../hooks/useNotification.js';
import { NotificationList } from './NotificationList.jsx';

export const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const {
    notifications,
    unreadCount,
    markAsRead,
    clearNotification,
    clearAll,
  } = useNotification();

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      {/* Bell Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`relative flex h-8 w-8 items-center justify-center rounded-lg border bg-white/[0.02] text-neutral-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer focus:outline-none ${
          isOpen ? 'border-indigo-500/30 text-indigo-400 bg-indigo-500/5' : 'border-white/5'
        }`}
      >
        <Bell className="h-4 w-4" />
        
        {/* Unread count badge */}
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
          </span>
        )}
      </motion.button>

      {/* Popover Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute right-0 mt-2 z-50 rounded-xl border border-white/5 bg-[#0c0c14] shadow-2xl shadow-black/80 overflow-hidden"
          >
            <NotificationList
              notifications={notifications}
              onMarkAsRead={markAsRead}
              onClear={clearNotification}
              onClearAll={clearAll}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationBell;
