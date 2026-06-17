import React from 'react';
import { RotateCcw } from 'lucide-react';

/**
 * FilterPanel component containing dropdown selectors for Country, Gender, and Churn Status.
 */
export const FilterPanel = ({ filters, setFilters, onClear }) => {
  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const countries = [
    { value: 'Germany', label: 'Germany' },
    { value: 'United States', label: 'USA' },
    { value: 'United Kingdom', label: 'United Kingdom' },
    { value: 'Japan', label: 'Japan' },
    { value: 'France', label: 'France' },
    { value: 'Italy', label: 'Italy' },
    { value: 'Canada', label: 'Canada' },
    { value: 'Spain', label: 'Spain' },
    { value: 'India', label: 'India' },
  ];

  const genders = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Other', label: 'Other' },
  ];

  const statuses = [
    { value: 'active', label: 'Active' },
    { value: 'warning', label: 'Warning' },
    { value: 'danger', label: 'High Risk / Churned' },
  ];

  const hasActiveFilters = Object.values(filters).some((val) => val !== '');

  return (
    <div className="flex flex-wrap items-center gap-3 bg-white/[0.01] border border-white/5 p-4 rounded-xl backdrop-blur-md w-full select-none">
      {/* Country Selector */}
      <div className="flex flex-col gap-1.5 min-w-[140px] flex-1 sm:flex-initial">
        <label className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">Country</label>
        <select
          name="country"
          value={filters.country}
          onChange={handleSelectChange}
          className="rounded-lg border border-white/5 bg-[#0c0c14]/60 px-3 py-2 text-xs text-white placeholder-neutral-500 transition-all focus:border-indigo-500/30 focus:outline-none focus:ring-1 focus:ring-indigo-500/20 shadow-inner cursor-pointer"
        >
          <option value="">All Countries</option>
          {countries.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      {/* Gender Selector */}
      <div className="flex flex-col gap-1.5 min-w-[120px] flex-1 sm:flex-initial">
        <label className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">Gender</label>
        <select
          name="gender"
          value={filters.gender}
          onChange={handleSelectChange}
          className="rounded-lg border border-white/5 bg-[#0c0c14]/60 px-3 py-2 text-xs text-white placeholder-neutral-500 transition-all focus:border-indigo-500/30 focus:outline-none focus:ring-1 focus:ring-indigo-500/20 shadow-inner cursor-pointer"
        >
          <option value="">All Genders</option>
          {genders.map((g) => (
            <option key={g.value} value={g.value}>
              {g.label}
            </option>
          ))}
        </select>
      </div>

      {/* Status Selector */}
      <div className="flex flex-col gap-1.5 min-w-[130px] flex-1 sm:flex-initial">
        <label className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">Churn Status</label>
        <select
          name="status"
          value={filters.status}
          onChange={handleSelectChange}
          className="rounded-lg border border-white/5 bg-[#0c0c14]/60 px-3 py-2 text-xs text-white placeholder-neutral-500 transition-all focus:border-indigo-500/30 focus:outline-none focus:ring-1 focus:ring-indigo-500/20 shadow-inner cursor-pointer"
        >
          <option value="">All Statuses</option>
          {statuses.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {/* Reset/Clear Action Button */}
      {hasActiveFilters && (
        <button
          onClick={onClear}
          className="flex items-center justify-center gap-1.5 self-end h-9 px-4 rounded-lg border border-red-500/20 bg-red-500/5 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all text-xs font-semibold cursor-pointer active:scale-95"
          title="Reset Filters"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Clear Filters
        </button>
      )}
    </div>
  );
};

export default FilterPanel;
