import { useContracts } from '../../../../hooks/useContracts';


export const useContractsByFiscalYear = (fiscalYear: number) => {
  const fiscalYearKey: keyof DB.SavedRecord = '年度';

  const condition = [
    fiscalYear,
    fiscalYear - 1,
  ].map((year) => `${fiscalYearKey} = "${year}年度"`).join(' or ');

  return useContracts({ 
    condition, 
  });

};