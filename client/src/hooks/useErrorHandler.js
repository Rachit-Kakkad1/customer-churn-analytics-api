import { useState, useCallback } from 'react';
import { toast } from 'sonner';

/**
 * Custom hook to handle API and operational runtime errors gracefully.
 * @returns {{error: any, handleError: (err: any) => void, resetError: () => void}}
 */
export const useErrorHandler = () => {
  const [error, setError] = useState(null);

  const handleError = useCallback((err) => {
    console.error('Operational Error Logged:', err);
    setError(err);

    // Format error message for human-readable Toast notifications
    const toastMessage = err.response?.data?.message || err.message || 'An unexpected server error occurred.';
    toast.error(`System Exception: ${toastMessage}`);
  }, []);

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  return {
    error,
    handleError,
    resetError,
  };
};

export default useErrorHandler;
