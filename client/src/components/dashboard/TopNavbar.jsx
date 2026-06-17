import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Search, Bell, LogOut } from 'lucide-react';
import { logout } from '../../features/auth/authSlice.js';

/**
 * Sticky glassmorphic Top Navbar.
 * Displays global search, notification alerts, and active user session controls.
 */
export const TopNavbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  // Get user initials for the avatar placeholder
  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-white/5 bg-[#07070a]/75 px-6 backdrop-blur-md">
      {/* Search Input Bar Container */}
      <div className="relative flex max-w-xs w-full">
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-500" />
        <input
          type="text"
          placeholder="Search customers or segments..."
          className="w-full rounded-lg border border-white/5 bg-white/[0.02] py-2 pr-4 pl-9 text-xs text-white placeholder-neutral-500 transition-colors focus:border-white/10 focus:bg-white/[0.04] focus:outline-none focus:ring-0"
        />
      </div>

      {/* User Dashboard Actions */}
      <div className="flex items-center gap-4">
        {/* Notification Alerts Trigger */}
        <button className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-white/5 bg-white/[0.02] text-neutral-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-indigo-500" />
        </button>

        {/* User Session Profile details */}
        <div className="flex items-center gap-3 pl-2 border-l border-white/5">
          <div className="flex items-center gap-2.5">
            {/* User Initial Avatar */}
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-neutral-800 to-neutral-700 text-xs font-semibold text-white border border-white/10 shadow-inner">
              {getInitials(user?.name)}
            </div>
            <div className="hidden flex-col md:flex">
              <span className="text-xs font-medium text-white leading-none mb-0.5">
                {user?.name || 'Guest User'}
              </span>
              <span className="text-[10px] text-neutral-500 font-normal leading-none capitalize">
                {user?.role || 'User'}
              </span>
            </div>
          </div>

          {/* User Signout Button */}
          <button
            onClick={handleLogout}
            title="Log out"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/5 bg-white/[0.02] text-neutral-400 hover:text-red-400 hover:bg-red-500/5 transition-colors cursor-pointer ml-2"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
