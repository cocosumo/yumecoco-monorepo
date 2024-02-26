import { useQuery } from '@tanstack/react-query';
import { getActiveUnissuedInvoiceAlerts } from 'api-kintone/src/unissuedInvoiceAlert/getActiveUnissuedInvoiceAlerts';
import { AppIds } from 'config';
import { IUnissuedinvoicealert } from 'types';



export const useActiveUnissuedInvReminders = <T = IUnissuedinvoicealert[]>(options?: {
  select: (data: IUnissuedinvoicealert[]) => T
}) => {
  return useQuery(
    [AppIds.unissuedInvoiceAlert ],
    getActiveUnissuedInvoiceAlerts,
    {
      ...options,
    },
  );
};
