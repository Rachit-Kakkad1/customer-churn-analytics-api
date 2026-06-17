import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { X, UserPlus, Edit2 } from 'lucide-react';

// Validation Schema using Zod
const customerFormSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters'),
  email: z.string().trim().email('Please provide a valid email address'),
  country: z.string().trim().min(1, 'Country is required'),
  age: z.coerce
    .number({ invalid_type_error: 'Age must be a number' })
    .int()
    .min(0, 'Age cannot be negative')
    .max(120, 'Age cannot exceed 120'),
  gender: z.enum(['Male', 'Female', 'Other', 'Non-binary', 'Prefer not to say'], {
    errorMap: () => ({ message: 'Please select a gender option' }),
  }),
  status: z.enum(['active', 'warning', 'danger'], {
    errorMap: () => ({ message: 'Please select a status option' }),
  }),
});

/**
 * Premium reusable customer dialog supporting Create/Edit workflows, Zod validators, and layout entries.
 */
export const CustomerModal = ({ isOpen, onClose, onSubmit, customer }) => {
  const isEditMode = !!customer;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      country: '',
      age: '',
      gender: '',
      status: '',
    },
  });

  // Dynamically load forms when active record shifts
  useEffect(() => {
    if (isOpen) {
      if (customer) {
        const idSuffix = customer._id ? customer._id.slice(-6).toUpperCase() : '';
        reset({
          name: customer.name || `User #${idSuffix}`,
          email: customer.email || `user.${idSuffix.toLowerCase()}@churnly.com`,
          country: customer.country || '',
          age: customer.age || '',
          gender: customer.gender || '',
          status: customer.status || (customer.churned ? 'danger' : 'active'),
        });
      } else {
        reset({
          name: '',
          email: '',
          country: '',
          age: '',
          gender: '',
          status: '',
        });
      }
    }
  }, [customer, isOpen, reset]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Blur Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm cursor-default"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#0c0c14] to-[#07070a] p-6 shadow-2xl shadow-black/80 z-10"
          >
            {/* Header section */}
            <div className="flex items-center justify-between pb-4 border-b border-white/5 select-none">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  {isEditMode ? <Edit2 className="h-5 w-5" /> : <UserPlus className="h-5 w-5" />}
                </div>
                <div>
                  <h2 className="text-md font-bold text-white tracking-tight">
                    {isEditMode ? 'Update Customer Record' : 'Add New Customer'}
                  </h2>
                  <p className="text-[10px] text-neutral-400">
                    {isEditMode ? 'Modify customer parameters in database' : 'Register a new customer analytics profile'}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/5 bg-white/[0.02] text-neutral-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Form body */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-5 select-none text-left">
              {/* Row: Name and Email */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">Name</label>
                  <input
                    type="text"
                    {...register('name')}
                    placeholder="John Doe"
                    className="w-full rounded-lg border border-white/5 bg-[#0c0c14]/60 px-3 py-2 text-xs text-white placeholder-neutral-600 transition-all focus:border-indigo-500/30 focus:outline-none focus:ring-1 focus:ring-indigo-500/20 shadow-inner"
                  />
                  {errors.name && <span className="text-[10px] text-rose-400 mt-1 font-medium">{errors.name.message}</span>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">Email</label>
                  <input
                    type="email"
                    {...register('email')}
                    placeholder="john@example.com"
                    className="w-full rounded-lg border border-white/5 bg-[#0c0c14]/60 px-3 py-2 text-xs text-white placeholder-neutral-600 transition-all focus:border-indigo-500/30 focus:outline-none focus:ring-1 focus:ring-indigo-500/20 shadow-inner"
                  />
                  {errors.email && <span className="text-[10px] text-rose-400 mt-1 font-medium">{errors.email.message}</span>}
                </div>
              </div>

              {/* Row: Country and Age */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">Country</label>
                  <input
                    type="text"
                    {...register('country')}
                    placeholder="Germany"
                    className="w-full rounded-lg border border-white/5 bg-[#0c0c14]/60 px-3 py-2 text-xs text-white placeholder-neutral-600 transition-all focus:border-indigo-500/30 focus:outline-none focus:ring-1 focus:ring-indigo-500/20 shadow-inner"
                  />
                  {errors.country && <span className="text-[10px] text-rose-400 mt-1 font-medium">{errors.country.message}</span>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">Age</label>
                  <input
                    type="number"
                    {...register('age')}
                    placeholder="34"
                    className="w-full rounded-lg border border-white/5 bg-[#0c0c14]/60 px-3 py-2 text-xs text-white placeholder-neutral-600 transition-all focus:border-indigo-500/30 focus:outline-none focus:ring-1 focus:ring-indigo-500/20 shadow-inner"
                  />
                  {errors.age && <span className="text-[10px] text-rose-400 mt-1 font-medium">{errors.age.message}</span>}
                </div>
              </div>

              {/* Row: Gender and Churn Status */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">Gender</label>
                  <select
                    {...register('gender')}
                    className="w-full rounded-lg border border-white/5 bg-[#0c0c14]/60 px-3 py-2 text-xs text-white transition-all focus:border-indigo-500/30 focus:outline-none focus:ring-1 focus:ring-indigo-500/20 shadow-inner cursor-pointer"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Non-binary">Non-binary</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                  {errors.gender && <span className="text-[10px] text-rose-400 mt-1 font-medium">{errors.gender.message}</span>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">Churn Status</label>
                  <select
                    {...register('status')}
                    className="w-full rounded-lg border border-white/5 bg-[#0c0c14]/60 px-3 py-2 text-xs text-white transition-all focus:border-indigo-500/30 focus:outline-none focus:ring-1 focus:ring-indigo-500/20 shadow-inner cursor-pointer"
                  >
                    <option value="">Select Status</option>
                    <option value="active">Active</option>
                    <option value="warning">Warning</option>
                    <option value="danger">High Risk / Churned</option>
                  </select>
                  {errors.status && <span className="text-[10px] text-rose-400 mt-1 font-medium">{errors.status.message}</span>}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="flex items-center justify-end gap-3 pt-6 border-t border-white/5">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="flex h-9 items-center justify-center rounded-lg border border-white/5 bg-white/[0.02] px-4 text-xs font-semibold text-neutral-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex h-9 items-center justify-center rounded-lg bg-gradient-to-tr from-indigo-500 to-violet-500 px-5 text-xs font-semibold text-white shadow-lg shadow-indigo-500/20 hover:from-indigo-400 hover:to-violet-400 transition-all cursor-pointer disabled:opacity-50 active:scale-95"
                >
                  {isSubmitting ? 'Saving...' : isEditMode ? 'Update Record' : 'Add Customer'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CustomerModal;
