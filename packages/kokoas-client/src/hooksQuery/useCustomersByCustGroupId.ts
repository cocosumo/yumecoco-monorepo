import { useMemo } from 'react';
import { useCustGroupById } from './useCustGroupById';
import { useCustomersByIds } from './useCustomersByIds';

export const useCustomersByCustGroupId = (custGroupId?: string) => {
  const { data: custGroupRecord } = useCustGroupById(custGroupId ?? '');

  const custIds = useMemo(
    () => custGroupRecord?.members.value.map((m) => m.value.customerId.value),
    [custGroupRecord],
  );

  return useCustomersByIds(custIds);
};