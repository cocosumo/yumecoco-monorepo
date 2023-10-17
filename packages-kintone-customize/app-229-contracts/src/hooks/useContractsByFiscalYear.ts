import { useContracts } from './useContracts';

export const useContractsByFiscalYear = (fiscalYear: number) => {
  const fiscalYearKey: keyof DB.SavedRecord = '年度';

  return useContracts({ condition: `${fiscalYearKey} = "${fiscalYear}年度"` });

};