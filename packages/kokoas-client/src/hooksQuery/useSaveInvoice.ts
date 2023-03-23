import { useMutation, useQueryClient } from '@tanstack/react-query';
import { saveInvoices } from 'api-kintone/src/invoice/saveInvoices';
import { AppIds } from 'config';
import { useSnackBar } from '../hooks/useSnackBar';
import { useCommonOptions } from './useCommonOptions';

export const useSaveInvoice = () => {
  const commonOptions = useCommonOptions();
  const queryClient = useQueryClient();
  const { setSnackState } = useSnackBar();


  return useMutation(
    saveInvoices,
    {
      ...commonOptions,
      onSuccess: ({ revision }) => {
        // commonOptions.onSuccess();
        setSnackState({
          open: true,
          message: `保存しました。更新番号：${revision}`,
          severity: 'success',
        });
        queryClient.invalidateQueries({ queryKey: [AppIds.invoices] });
      },
    },
  );
};
