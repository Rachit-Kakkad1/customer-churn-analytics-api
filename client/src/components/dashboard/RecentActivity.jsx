import React from 'react';
import { UserPlus, Cpu, RefreshCw, FileDown, Clock } from 'lucide-react';

// Mock system activities log
const staticActivities = [
  {
    id: 1,
    type: 'add',
    title: 'Customer Added',
    description: 'Acme Corp (ID: #4092) was added to the analytics stream.',
    time: '12 mins ago',
    icon: UserPlus,
    color: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  },
  {
    id: 2,
    type: 'generate',
    title: 'Analytics Generated',
    description: 'Customer churn prediction score updated for enterprise accounts.',
    time: '1 hour ago',
    icon: Cpu,
    color: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
  },
  {
    id: 3,
    type: 'sync',
    title: 'Segment Updated',
    description: 'High-risk premium customer segment synchronized with marketing integrations.',
    time: '3 hours ago',
    icon: RefreshCw,
    color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  },
  {
    id: 4,
    type: 'export',
    title: 'Export Completed',
    description: 'Churn diagnostics report downloaded in PDF format by Rachit.',
    time: '5 hours ago',
    icon: FileDown,
    color: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
  },
];

/**
 * RecentActivity timeline displaying system events.
 */
export const RecentActivity = () => {
  return (
    <div className="rounded-xl border border-white/5 bg-gradient-to-b from-[#0c0c14] to-[#07070a] p-6 shadow-xl shadow-black/40 h-full flex flex-col">
      {/* Header */}
      <div className="border-b border-white/5 pb-5 mb-6">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Clock className="h-4 w-4 text-indigo-400" />
          Recent Activity
        </h2>
        <p className="text-xs text-neutral-500">Live operational ledger logs.</p>
      </div>

      {/* Timeline List */}
      <div className="flex-1 space-y-6 overflow-y-auto pr-1">
        {staticActivities.map((activity, idx) => {
          const Icon = activity.icon;
          const isLast = idx === staticActivities.length - 1;

          return (
            <div key={activity.id} className="relative flex items-start gap-4">
              {/* Timeline Connector Line */}
              {!isLast && (
                <span className="absolute top-8 left-4.5 -ml-px h-[calc(100%+16px)] w-0.5 bg-white/5" aria-hidden="true" />
              )}

              {/* Activity Indicator Icon */}
              <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${activity.color}`}>
                <Icon className="h-4.5 w-4.5" />
              </div>

              {/* Description body */}
              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-xs font-semibold text-white">{activity.title}</h3>
                  <span className="text-[10px] text-neutral-500 font-medium whitespace-nowrap">{activity.time}</span>
                </div>
                <p className="text-[11px] text-neutral-400 leading-relaxed font-normal">{activity.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default RecentActivity;
