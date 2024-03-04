import { useQuery } from '@tanstack/react-query';
import { getAllUnissuedInvoiceAlerts } from 'api-kintone';
import { AppIds } from 'config';



export const useActiveUnissuedInvReminders = () => {
  return useQuery(
    [AppIds.unissuedInvoiceAlert],
    () => getAllUnissuedInvoiceAlerts(),
  );
};
