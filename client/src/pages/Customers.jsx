import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Sparkles } from 'lucide-react';
import { DashboardLayout } from '../layouts/DashboardLayout.jsx';
import { SearchBar } from '../components/customers/SearchBar.jsx';
import { CustomerTable } from '../components/customers/CustomerTable.jsx';
import { Pagination } from '../components/customers/Pagination.jsx';

// Local static mock customers list dataset
const mockCustomersList = [
  { id: 1, name: 'Rachit Kakkad', email: 'rachit@churnly.com', country: 'Germany', status: 'active' },
  { id: 2, name: 'Acme Enterprise', email: 'billing@acme.com', country: 'United States', status: 'danger' },
  { id: 3, name: 'Helena Vance', email: 'helena.v@vancecorp.io', country: 'United Kingdom', status: 'warning' },
  { id: 4, name: 'Douglas Adams', email: 'doug@guide.net', country: 'United Kingdom', status: 'active' },
  { id: 5, name: 'Globex Software', email: 'contact@globex.de', country: 'Germany', status: 'warning' },
  { id: 6, name: 'Hiroshi Tanaka', email: 'tanaka.h@nexus.jp', country: 'Japan', status: 'active' },
  { id: 7, name: 'Sophie Dubois', email: 's.dubois@aurora.fr', country: 'France', status: 'danger' },
  { id: 8, name: 'Marcus Aurelius', email: 'marcus@stoic.it', country: 'Italy', status: 'active' },
  { id: 9, name: 'Nova Logistics', email: 'operations@nova.ca', country: 'Canada', status: 'active' },
  { id: 10, name: 'Evelyn Martinez', email: 'evelyn@martinez-group.es', country: 'Spain', status: 'warning' },
];

/**
 * Customers Landing View coordinating customer lists, search input bars, and table grids with pagination.
 */
export const Customers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Reset page index on new search queries
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Memoized search filter checking name, email, and country properties case-insensitively
  const filteredCustomers = useMemo(() => {
    if (!searchTerm.trim()) {
      return mockCustomersList;
    }
    const query = searchTerm.toLowerCase().trim();
    return mockCustomersList.filter(
      (customer) =>
        customer.name.toLowerCase().includes(query) ||
        customer.email.toLowerCase().includes(query) ||
        customer.country.toLowerCase().includes(query)
    );
  }, [searchTerm]);

  // Pagination Calculations
  const totalPages = useMemo(() => {
    return Math.ceil(filteredCustomers.length / itemsPerPage);
  }, [filteredCustomers.length]);

  const startIndex = useMemo(() => {
    return (currentPage - 1) * itemsPerPage;
  }, [currentPage]);

  const endIndex = useMemo(() => {
    return startIndex + itemsPerPage;
  }, [startIndex]);

  const paginatedCustomers = useMemo(() => {
    return filteredCustomers.slice(startIndex, endIndex);
  }, [filteredCustomers, startIndex, endIndex]);

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

        {/* Search Input Filter Controls */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <SearchBar onSearch={setSearchTerm} />
          <div className="text-[10px] text-neutral-500 font-medium whitespace-nowrap bg-white/[0.01] border border-white/5 rounded-lg px-3 py-2 animate-fade-in">
            Showing <span className="text-white font-semibold">{paginatedCustomers.length}</span> of{' '}
            <span className="text-white font-semibold">{filteredCustomers.length}</span> records
          </div>
        </motion.div>

        {/* Index Table Grid Viewport and Pagination Controls */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <CustomerTable paginatedCustomers={paginatedCustomers} />
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
