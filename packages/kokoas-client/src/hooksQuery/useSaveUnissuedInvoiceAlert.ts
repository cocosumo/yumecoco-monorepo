import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AppIds } from 'config';
import { useCommonOptions } from './useCommonOptions';
import { saveUnissuedInvoiceAlert } from 'api-kintone/src/unissuedInvoiceAlert/saveUnissuedInvoiceAlert';

export const useSaveUnissuedInvoiceAlert = () => {
  const commonOptions = useCommonOptions();
  const queryClient = useQueryClient();


  return useMutation(
    saveUnissuedInvoiceAlert,
    {
      ...commonOptions,
      onSuccess: () => {
        commonOptions.onSuccess();
        queryClient.invalidateQueries({ queryKey: [AppIds.unissuedInvoiceAlert] });
      },
    },
  );
};
