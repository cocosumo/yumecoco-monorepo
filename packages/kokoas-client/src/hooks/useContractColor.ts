import { useCallback } from 'react';

export const useContractColor = () => {
  
  const contractColor = useCallback((envStatus: string) => {
    switch (envStatus) {
      case 'completed':
        return 'success';
      case 'sent':
        return 'info';
      case 'voided':
      case 'voiding':
        return 'error';
      default:
        return 'disabled';
    }
  }, []);

  return contractColor;
};