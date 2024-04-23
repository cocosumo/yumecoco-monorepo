import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AppIds } from 'config';
import { useCommonOptions } from './useCommonOptions';
import { saveInvoiceB2B } from 'api-kintone/src/invoiceB2B/saveInvoiceB2B';

export type UseSaveInvoiceB2B = {
  enabledOnSuccess?: boolean;
};

/**
 * 請求データを保存する
 */
export const useSaveInvoiceB2B = (params?: UseSaveInvoiceB2B) => {
  const {
    enabledOnSuccess = true,
  } = params || {};
  const commonOptions = useCommonOptions();
  const qc = useQueryClient();

  const handleOnSuccess = () => {
    commonOptions.onSuccess();
    qc.invalidateQueries({ queryKey: [AppIds.invoiceB2B] });
  };


  return useMutation({
    mutationFn: saveInvoiceB2B,
    ...commonOptions,
    onSuccess: handleOnSuccess,
    onMutate: enabledOnSuccess ? commonOptions.onMutate : undefined,
  });
};