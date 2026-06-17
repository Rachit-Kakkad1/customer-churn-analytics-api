import { useState, useMemo, useCallback } from 'react';

const INITIAL_NOTIFICATIONS = [
  {
    id: '1',
    title: 'High Churn Alert',
    message: 'Customer segment USA-Enterprise churn rate increased by 2.4% over 24h.',
    timestamp: new Date(Date.now() - 15 * 60000).toISOString(), // 15 mins ago
    read: false,
  },
  {
    id: '2',
    title: 'Report Compiled',
    message: 'Active retention forecasts have been generated and synced with database.',
    timestamp: new Date(Date.now() - 2 * 3600000).toISOString(), // 2 hours ago
    read: false,
  },
  {
    id: '3',
    title: 'Operator Login',
    message: 'New dashboard session established from telemetry node 127.0.0.1.',
    timestamp: new Date(Date.now() - 24 * 3600000).toISOString(), // 24 hours ago
    read: true,
  },
];

export const useNotification = () => {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const unreadCount = useMemo(() => {
    return notifications.filter((n) => !n.read).length;
  }, [notifications]);

  const markAsRead = useCallback((id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, read: true }))
    );
  }, []);

  const clearNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearNotification,
    clearAll,
  };
};

export default useNotification;
