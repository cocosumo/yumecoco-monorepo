import { useQuery } from '@tanstack/react-query';
import { getActiveUnissuedInvoiceAlertsByProjId } from 'api-kintone/src/unissuedInvoiceAlert/getActiveUnissuedInvoiceAlertsByProjId';
import { AppIds } from 'config';



export const useActiveUnissuedInvRemindersByProjId = (projId: string) => {
  return useQuery(
    [AppIds.unissuedInvoiceAlert, { projId }],
    () => getActiveUnissuedInvoiceAlertsByProjId(projId),
    {
      enabled: !!projId,
    },
  );
};
