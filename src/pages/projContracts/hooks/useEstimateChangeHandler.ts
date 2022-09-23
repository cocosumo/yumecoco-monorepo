import { useState, useCallback } from 'react';

/**
 * Wrapper hook to generate contract preview
 * in a declarative way.
 * 
 * @returns {object} obj.selectedEstimate 選択された見積のレコード
 * @returns {object} obj.handleChangeEstimate 選択の変更際の関数
 */
export const useEstimateChangeHandler = () => {
  const [selectedEstimate, setSelectedEstimate] = useState<Estimates.main.SavedData | null>(null);
  
  const handleChangeEstimate = useCallback((
    selected: Estimates.main.SavedData,
  ) => {
    setSelectedEstimate(selected);
    
  }, []);
  
  return {
    selectedEstimate,
    handleChangeEstimate,
  };
};