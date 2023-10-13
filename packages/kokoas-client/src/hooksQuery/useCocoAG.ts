import { EmpAffiliations } from 'types';
import { useEmployees } from './useEmployees';
import { useMemo } from 'react';



export const useCocoAG = (includeInactive = true) => {

  const { data, ...others } = useEmployees({
    isActiveOnly: !includeInactive,
  });

  const filtered = useMemo(() => {
    return data
      ?.filter(({
        affiliation,
      }) => (affiliation.value as EmpAffiliations) === 'ここすも')
      .sort((
        { 
          状態: aStatus, 
          sort: aSortNumber,
        }, 
        {
          sort: bSortNumber,
          状態: bStatus,
        },
      ) => {
        
        // Convert sortNumbers to numbers
        const parsedAsortNumber = aSortNumber.value ? +aSortNumber.value : Infinity;
        const parsedBsortNumber = bSortNumber.value ? +bSortNumber.value : Infinity;

        // Compare sortNumber first
        if (parsedAsortNumber < parsedBsortNumber) {
          return -1;
        } else if (parsedAsortNumber > parsedBsortNumber) {
          return 1;
        } else {
          // If sortNumbers are equal, handle aStatus
          if (aStatus.value !== '有効' && bStatus.value !== '有効') {
            return 0; // Both are not '有効', no change in order
          } else if (aStatus.value !== '有効') {
            return 1; // Move aStatus !== '有効' to the bottom
          } else if (bStatus.value !== '有効') {
            return -1; // Move bStatus !== '有効' to the bottom
          } else {
            return 0; // Everything is equal
          }
        }
      
      
      });

  }, [data]); 

  return {
    data: filtered,
    ...others,
  }; 
};