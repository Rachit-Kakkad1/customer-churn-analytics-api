import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Trash2, Check, Clock } from 'lucide-react';

export const NotificationList = ({
  notifications = [],
  onMarkAsRead,
  onClear,
  onClearAll,
}) => {
  // Format dates into nice readable strings (e.g. 5m ago, 2h ago)
  const formatTime = (isoString) => {
    const diffMs = Date.now() - new Date(isoString).getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return new Date(isoString).toLocaleDateString();
  };

  const isEmpty = notifications.length === 0;

  return (
    <div className="flex flex-col h-full max-h-[380px] w-80 md:w-96 select-none text-left">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/5 px-4 py-3 bg-[#0c0c14]/50">
        <span className="text-xs font-bold text-white uppercase tracking-wider">Telemetry Notifications</span>
        {!isEmpty && (
          <button
            onClick={onClearAll}
            className="flex items-center gap-1 text-[10px] font-semibold text-rose-400 hover:text-rose-300 transition-colors duration-150 cursor-pointer"
          >
            <Trash2 className="h-3 w-3" />
            Clear All
          </button>
        )}
      </div>

      {/* List content viewport */}
      <div className="flex-1 overflow-y-auto custom-scrollbar bg-gradient-to-b from-[#0c0c14]/80 to-[#07070a]/80 p-2">
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/5 bg-white/[0.01] text-neutral-500 mb-3">
              <Bell className="h-5 w-5" />
            </div>
            <p className="text-xs font-medium text-white">All feeds clear</p>
            <p className="text-[10px] text-neutral-500 mt-1 max-w-[200px]">No active warnings or alerts on the dashboard logs.</p>
          </div>
        ) : (
          <div className="space-y-2">
            <AnimatePresence initial={false}>
              {notifications.map((n) => (
                <motion.div
                  key={n.id}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className={`group relative flex gap-3 p-3 rounded-lg border transition-all duration-200 ${
                    n.read 
                      ? 'border-white/5 bg-white/[0.01]' 
                      : 'border-indigo-500/10 bg-indigo-500/[0.02] hover:border-indigo-500/20'
                  }`}
                >
                  {/* Indicator Dot */}
                  {!n.read && (
                    <span className="absolute top-3.5 left-3.5 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
                    </span>
                  )}

                  {/* Icon Padding depending on dot */}
                  <div className={`flex-1 ${!n.read ? 'pl-4' : ''}`}>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className={`text-xs font-bold text-white leading-none ${!n.read ? 'text-indigo-300' : ''}`}>
                        {n.title}
                      </h4>
                      <span className="text-[9px] text-neutral-500 font-medium whitespace-nowrap flex items-center gap-1">
                        <Clock className="h-2.5 w-2.5" />
                        {formatTime(n.timestamp)}
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-400 mt-1.5 leading-normal">{n.message}</p>
                    
                    {/* Action buttons shown on hover */}
                    <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                      {!n.read && (
                        <button
                          onClick={() => onMarkAsRead(n.id)}
                          className="flex items-center gap-1 rounded bg-indigo-500/10 hover:bg-indigo-500/20 px-2 py-0.5 text-[9px] font-semibold text-indigo-400 transition-colors duration-150 cursor-pointer"
                        >
                          <Check className="h-2.5 w-2.5" />
                          Mark read
                        </button>
                      )}
                      <button
                        onClick={() => onClear(n.id)}
                        className="flex items-center gap-1 rounded bg-rose-500/10 hover:bg-rose-500/20 px-2 py-0.5 text-[9px] font-semibold text-rose-400 transition-colors duration-150 cursor-pointer"
                      >
                        <Trash2 className="h-2.5 w-2.5" />
                        Remove
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationList;
