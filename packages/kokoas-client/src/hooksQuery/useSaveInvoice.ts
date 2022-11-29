import { useMutation, useQueryClient } from '@tanstack/react-query';
import { saveInvoices } from 'api-kintone/src/invoice/saveInvoices';
import { AppIds } from 'config';
import { useCommonOptions } from './useCommonOptions';

export const useSaveInvoice = () => {
  const commonOptions = useCommonOptions();
  const queryClient = useQueryClient();


  return useMutation(
    saveInvoices,
    {
      ...commonOptions,
      onSuccess: () => {
        commonOptions.onSuccess();
        queryClient.invalidateQueries({ queryKey: [AppIds.invoices] });
      },
    },
  );
};
