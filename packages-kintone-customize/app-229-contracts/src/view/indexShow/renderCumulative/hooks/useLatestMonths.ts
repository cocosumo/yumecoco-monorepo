import { useMemo } from 'react';
 
import subMonths from 'date-fns/subMonths';
import format from 'date-fns/format';

export const useLatestMonths = (maxMonths = 24) => {
  const latestMonthsChoices = useMemo(() => {
    // 24 months from today
    const currentDate = new Date();    
    const latestMonths = Array.from(
      { length: maxMonths },
      (_, index) => {
        
        return format(subMonths(currentDate, index), 'yyyy-MM');
      },
    );
    
    return latestMonths;
  }, [maxMonths]);

  return latestMonthsChoices;
};