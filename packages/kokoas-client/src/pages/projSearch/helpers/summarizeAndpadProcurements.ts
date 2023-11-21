import { IAndpadprocurements } from 'types';

/**
 * Summarizes procurements by systemId.
 * 
 * @param systemId - The system ID to filter procurements by.
 * @param procurements - A presorted array of all procurements.
 * @returns Summarized procurement details
 */
export const summarizeAndpadProcurementsBySystemId = (
  systemId: string, 
  procurements: IAndpadprocurements[],
) => {
  const andpadProcurement = !!systemId 
    && procurements
      .filter((procurement) => procurement.andpadProjId.value === systemId) || [];

  return {
    procurements: andpadProcurement,
    paymentDateStart: andpadProcurement[0]?.支払日.value,
    paymentDateEnd: andpadProcurement.at(-1)?.支払日.value,
    
  };

};