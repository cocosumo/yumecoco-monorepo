import format from 'date-fns/format';
import { useContracts } from './useContracts';

const contractDateKey: keyof DB.SavedRecord = 'contractDate';


export const useContractsByYearMonth = ({
  year,
  month,
}:{
  year: number,
  month: number,
}) => {


  const minDateStr = format(new Date(+year, +month - 1, 1), 'yyyy-MM-dd');
  const maxDateteStr = format(new Date(+year, +month, 0), 'yyyy-MM-dd');
  
  const condition = [
    `${contractDateKey} >= "${minDateStr}"`,
    `${contractDateKey} <= "${maxDateteStr}"`,
  ].join(' and ');

  return useContracts({
    condition,
  });
  

};