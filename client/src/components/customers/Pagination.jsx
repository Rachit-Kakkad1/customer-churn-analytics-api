import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Reusable premium Pagination component styled with glassmorphism and Vercel/Linear aesthetics.
 * 
 * @param {Object} props - Component properties
 * @param {number} props.currentPage - Active page index passed from parent state
 * @param {function} props.setCurrentPage - Setter handler updating active page index
 * @param {number} props.totalPages - Total available pages computed from dataset bounds
 */
export const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
  // Handle layout boundary cases where pagination is not needed
  if (totalPages <= 1) return null;

  // Generate page numbers to render
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 px-2 select-none">
      {/* Page Info */}
      <span className="text-xs text-neutral-400">
        Page <span className="text-white font-medium">{currentPage}</span> of{' '}
        <span className="text-white font-medium">{totalPages}</span>
      </span>

      {/* Pagination Controls */}
      <div className="flex items-center gap-1.5 bg-white/[0.01] border border-white/5 p-1 rounded-lg backdrop-blur-md">
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className={`flex h-8 w-8 items-center justify-center rounded-md border border-white/5 transition-all cursor-pointer ${
            currentPage === 1
              ? 'opacity-40 cursor-not-allowed bg-transparent text-neutral-600'
              : 'bg-white/[0.02] text-neutral-400 hover:text-white hover:bg-white/5 hover:border-white/10 active:scale-95'
          }`}
          title="Previous Page"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {/* Page Number Buttons */}
        {pageNumbers.map((number) => {
          const isActive = number === currentPage;

          return (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              className={`relative flex h-8 w-8 items-center justify-center rounded-md text-xs font-medium border transition-all cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-tr from-indigo-500 to-violet-500 text-white border-indigo-500/30 shadow-lg shadow-indigo-500/10'
                  : 'bg-transparent border-transparent text-neutral-400 hover:bg-white/[0.02] hover:text-neutral-200 active:scale-95'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="active-page-glow"
                  className="absolute inset-0 rounded-md bg-indigo-500/10 blur-[2px] -z-10"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              {number}
            </button>
          );
        })}

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`flex h-8 w-8 items-center justify-center rounded-md border border-white/5 transition-all cursor-pointer ${
            currentPage === totalPages
              ? 'opacity-40 cursor-not-allowed bg-transparent text-neutral-600'
              : 'bg-white/[0.02] text-neutral-400 hover:text-white hover:bg-white/5 hover:border-white/10 active:scale-95'
          }`}
          title="Next Page"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
