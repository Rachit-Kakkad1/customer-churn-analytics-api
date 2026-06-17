import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, UserCheck, AlertTriangle, AlertCircle } from 'lucide-react';

/**
 * CustomerTable grid displaying names, emails, countries, and status metrics.
 */
export const CustomerTable = ({ paginatedCustomers }) => {
  // Helpers to assign styling badges based on customer status properties
  const getStatusBadge = (status) => {
    const maps = {
      active: {
        label: 'Active',
        icon: UserCheck,
        class: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/15',
      },
      warning: {
        label: 'Warning',
        icon: AlertTriangle,
        class: 'text-amber-400 bg-amber-500/10 border-amber-500/15',
      },
      danger: {
        label: 'High Risk',
        icon: ShieldAlert,
        class: 'text-rose-400 bg-rose-500/10 border-rose-500/15',
      },
    };

    const config = maps[status] || maps.active;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-medium leading-none ${config.class}`}>
        <Icon className="h-3 w-3" />
        {config.label}
      </span>
    );
  };

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-white/5 bg-gradient-to-b from-[#0c0c14] to-[#07070a] shadow-xl shadow-black/40">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] border-collapse text-left text-xs font-normal">
          {/* Table Headers */}
          <thead>
            <tr className="border-b border-white/5 bg-white/[0.01] text-neutral-400 font-semibold select-none">
              <th className="py-4 px-6">Name</th>
              <th className="py-4 px-6">Email</th>
              <th className="py-4 px-6">Country</th>
              <th className="py-4 px-6">Churn Status</th>
            </tr>
          </thead>

          {/* Table Body rows */}
          <tbody className="divide-y divide-white/5">
            <AnimatePresence mode="popLayout">
              {paginatedCustomers.length > 0 ? (
                paginatedCustomers.map((customer, idx) => (
                  <motion.tr
                    key={customer.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, delay: idx * 0.03 }}
                    className="group hover:bg-white/[0.01] transition-colors"
                  >
                    <td className="py-4 px-6 font-medium text-white">{customer.name}</td>
                    <td className="py-4 px-6 text-neutral-400">{customer.email}</td>
                    <td className="py-4 px-6 text-neutral-400">{customer.country}</td>
                    <td className="py-4 px-6">{getStatusBadge(customer.status)}</td>
                  </motion.tr>
                ))
              ) : (
                /* Empty state container row */
                <motion.tr
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <td colSpan={4} className="py-16 px-6 text-center select-none">
                    <div className="flex flex-col items-center gap-3 max-w-sm mx-auto">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/5 bg-white/[0.02] text-neutral-500">
                        <AlertCircle className="h-5 w-5" />
                      </div>
                      <h3 className="text-sm font-semibold text-white tracking-tight">No customers found</h3>
                      <p className="text-[11px] text-neutral-500 leading-normal">
                        No customer metrics match your active query. Check typing constraints or clear filters.
                      </p>
                    </div>
                  </td>
                </motion.tr>
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default CustomerTable;
