
import { useAndpadPaymentsBySystemId } from 'kokoas-client/src/hooksQuery';
import { useMemo } from 'react';

export const useLastBillingDate = (systemId: number) => {

  const { data, isLoading } = useAndpadPaymentsBySystemId(systemId);


  const sortedData = useMemo(() => {
    // find the last billing date
    return data
      ?.sort((a, b) => {
        const aBillDate = a.billingDate.value;
        const bBillDate = b.billingDate.value;
        const aPayDate = a.paymentDate.value;
        const bPayDate = b.paymentDate.value;
        
        /**
         * Sort by billing date first, then payment date, 
         */
        if (aBillDate > bBillDate) {
          return -1;
        } else if (aBillDate < bBillDate) {
          return 1;
        }

        if (aPayDate > bPayDate) {
          return -1;
        } else if (aPayDate < bPayDate) {
          return 1;
        }

        return 0;

      });
  
  }, [
    data,
  ]);

  const {
    billingDate,
    paymentDate,
  } = sortedData?.[0] ?? {};

  return {
    isLoading,
    sortedData,
    lastBillingDate : (billingDate?.value || paymentDate?.value) ?? null,
  };
};