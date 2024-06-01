import { useInvoiceB2BByProjId } from 'kokoas-client/src/hooksQuery';
import { useOrderWatch } from '../../hooks/useOrderRHF';
import { IInvoiceb2b } from 'types';
import { useMemo } from 'react';
import { TOrderForm } from '../../schema';

export const useHasInvoiceB2B = () => {
  const [
    projId,
    orderId,
  ] = useOrderWatch({
    name: ['projId', 'orderId'],
  }) as [
    TOrderForm['projId'],
    TOrderForm['orderId'],
  ];

  const { data } = useInvoiceB2BByProjId<IInvoiceb2b[]>({ projId });

  return useMemo(() => {
    if (!data || !orderId) return false;

    return data.some((d) => d.orderId.value === orderId);
  }, [data, orderId]);
};