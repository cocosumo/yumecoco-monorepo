import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AppIds } from 'config';
import { useCommonOptions } from './useCommonOptions';
import { saveInvoiceB2C } from 'api-kintone/src/invoiceB2C/saveInvoiceB2C';

export const useSaveInvoiceB2C = () => {
  const commonOptions = useCommonOptions();
  const qc = useQueryClient();


  return useMutation(
    saveInvoiceB2C,
    {
      ...commonOptions,
      onSuccess: () => {
        commonOptions.onSuccess();
        qc.invalidateQueries({ queryKey: [AppIds.invoiceB2C] });
      },
    },
  );
};
