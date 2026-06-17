import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Sparkles } from 'lucide-react';
import { DashboardLayout } from '../layouts/DashboardLayout.jsx';
import { SearchBar } from '../components/customers/SearchBar.jsx';
import { FilterPanel } from '../components/customers/FilterPanel.jsx';
import { CustomerTable } from '../components/customers/CustomerTable.jsx';
import { Pagination } from '../components/customers/Pagination.jsx';
import customerService from '../services/customerService.js';

/**
 * Customers Landing View coordinating customer lists, search input bars, filter panels,
 * and table grids with pagination connected to the backend API.
 */
export const Customers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    country: '',
    gender: '',
    status: '',
  });

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;

  const fetchCustomers = async () => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = {
        page: currentPage,
        limit: limit,
      };

      if (searchTerm.trim()) {
        queryParams.search = searchTerm.trim();
      }
      if (filters.country) {
        queryParams.country = filters.country;
      }
      if (filters.gender) {
        queryParams.gender = filters.gender;
      }
      if (filters.status) {
        queryParams.status = filters.status;
      }

      const res = await customerService.getCustomers(queryParams);
      if (res && res.success) {
        setCustomers(res.data || []);
        
        // Handle backend pagination metadata if present, else fallback
        const returnedCount = res.data ? res.data.length : 0;
        if (res.totalPages !== undefined) {
          setTotalPages(res.totalPages);
        } else if (res.totalCount !== undefined) {
          setTotalPages(Math.ceil(res.totalCount / limit));
        } else {
          // If no count is returned, estimate pages based on limit threshold
          if (returnedCount === limit) {
            setTotalPages(currentPage + 1);
          } else {
            setTotalPages(currentPage);
          }
        }
      } else {
        throw new Error(res.message || 'Failed to fetch customer data.');
      }
    } catch (err) {
      console.error('Error fetching customers:', err);
      setError(err.message || 'Unable to connect to the backend server.');
    } finally {
      setLoading(false);
    }
  };

  // Reset page index on search queries or filter updates to avoid out of bounds
  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    } else {
      fetchCustomers();
    }
  }, [searchTerm, filters]);

  // Fetch customers whenever page selection shifts
  useEffect(() => {
    fetchCustomers();
  }, [currentPage]);

  const handleClearFilters = () => {
    setFilters({
      country: '',
      gender: '',
      status: '',
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 select-none">
        {/* Banner Headers */}
        <div className="flex flex-col gap-2">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-400"
          >
            <Sparkles className="h-3 w-3" />
            Index Directory
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="text-3xl font-bold tracking-tight text-white flex items-center gap-3"
          >
            <Users className="h-7 w-7 text-indigo-400" />
            Customers
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-sm text-neutral-400"
          >
            View customer diagnostics, activity profiles, and churn status metrics.
          </motion.p>
        </div>

        {/* Search & Advanced Filters Panel Controls */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <SearchBar onSearch={setSearchTerm} />
            <div className="text-[10px] text-neutral-500 font-medium whitespace-nowrap bg-white/[0.01] border border-white/5 rounded-lg px-3 py-2 animate-fade-in">
              Showing <span className="text-white font-semibold">{customers.length}</span> records on this page
            </div>
          </div>

          <FilterPanel
            filters={filters}
            setFilters={setFilters}
            onClear={handleClearFilters}
          />
        </motion.div>

        {/* Index Table Grid Viewport and Pagination Controls */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <CustomerTable
            customers={customers}
            loading={loading}
            error={error}
          />
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Customers;
