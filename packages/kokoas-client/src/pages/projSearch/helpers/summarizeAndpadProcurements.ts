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

  // could have used the first element of the array, but there is no guarantee that the first element has a payment date
  const firstOrderWithPaymentDate = andpadProcurement.find((procurement) => !!procurement.支払日.value);

  return {
    procurements: andpadProcurement,
    paymentDateStart: firstOrderWithPaymentDate?.支払日.value,
    paymentDateEnd: andpadProcurement.at(-1)?.支払日.value,
    
  };

};