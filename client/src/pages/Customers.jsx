import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Users, Sparkles, UserPlus } from 'lucide-react';
import { toast } from 'sonner';
import { DashboardLayout } from '../layouts/DashboardLayout.jsx';
import { SearchBar } from '../components/customers/SearchBar.jsx';
import { FilterPanel } from '../components/customers/FilterPanel.jsx';
import { CustomerTable } from '../components/customers/CustomerTable.jsx';
import { Pagination } from '../components/customers/Pagination.jsx';
import { CustomerModal } from '../components/customers/CustomerModal.jsx';
import customerService from '../services/customerService.js';

/**
 * Customers Landing View coordinating customer lists, search input bars, filter panels,
 * customer modals, and table grids with pagination connected to the backend API.
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

  // Modal States
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);

  const fetchCustomers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = { page: currentPage, limit };
      if (searchTerm.trim()) queryParams.search = searchTerm.trim();
      if (filters.country) queryParams.country = filters.country;
      if (filters.gender) queryParams.gender = filters.gender;
      if (filters.status) queryParams.status = filters.status;

      const res = await customerService.getCustomers(queryParams);
      if (res && res.success) {
        setCustomers(res.data || []);
        const returnedCount = res.data ? res.data.length : 0;
        if (res.totalPages !== undefined) {
          setTotalPages(res.totalPages);
        } else if (res.totalCount !== undefined) {
          setTotalPages(Math.ceil(res.totalCount / limit));
        } else {
          setTotalPages(returnedCount === limit ? currentPage + 1 : currentPage);
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
  }, [currentPage, searchTerm, filters]);

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
  }, [fetchCustomers]);

  const handleClearFilters = useCallback(() => {
    setFilters({
      country: '',
      gender: '',
      status: '',
    });
  }, []);

  const handleOpenCreate = useCallback(() => {
    setEditingCustomer(null);
    setModalOpen(true);
  }, []);

  const handleOpenEdit = useCallback((customer) => {
    setEditingCustomer(customer);
    setModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  const handleModalSubmit = useCallback(async (data) => {
    try {
      if (editingCustomer) {
        await customerService.updateCustomer(editingCustomer._id, data);
        toast.success('Customer record updated successfully.');
      } else {
        await customerService.createCustomer(data);
        toast.success('New customer record added successfully.');
      }
      setModalOpen(false);
      fetchCustomers();
    } catch (err) {
      console.error('Error saving customer:', err);
      const message = err.response?.data?.message || err.message || 'Operation failed.';
      toast.error(message);
    }
  }, [editingCustomer, fetchCustomers]);

  const handleDelete = useCallback(async (id) => {
    if (window.confirm('Are you sure you want to permanently delete this customer record?')) {
      try {
        await customerService.deleteCustomer(id);
        toast.success('Customer record deleted successfully.');
        fetchCustomers();
      } catch (err) {
        console.error('Error deleting customer:', err);
        const message = err.response?.data?.message || err.message || 'Deletion failed.';
        toast.error(message);
      }
    }
  }, [fetchCustomers]);

  return (
    <DashboardLayout>
      <div className="space-y-8 select-none">
        {/* Banner Headers */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
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

          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            onClick={handleOpenCreate}
            className="flex h-10 items-center justify-center gap-2 rounded-lg bg-gradient-to-tr from-indigo-500 to-violet-500 px-5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 hover:from-indigo-400 hover:to-violet-400 transition-all cursor-pointer active:scale-95 self-start sm:self-center"
          >
            <UserPlus className="h-4 w-4" />
            Add Customer
          </motion.button>
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
            onEdit={handleOpenEdit}
            onDelete={handleDelete}
          />
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </motion.div>

        {/* Customer Modal dialogue overlay */}
        <CustomerModal
          isOpen={modalOpen}
          onClose={handleCloseModal}
          onSubmit={handleModalSubmit}
          customer={editingCustomer}
        />
      </div>
    </DashboardLayout>
  );
};

export default Customers;
