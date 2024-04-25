import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCommonOptions } from './useCommonOptions';
import { AppIds } from 'config';
import { useSnackBar } from '../hooks/useSnackBar';
import { deleteInvoiceB2BBy$Id } from 'api-kintone/src/invoiceB2B/deleteInvoiceB2BBy$Id';


/**
 * 契約を削除する。
 * 
 */
export const useDeleteInvoiceB2BBy$Id = () => {
  const commonOptions = useCommonOptions();
  const { setSnackState } = useSnackBar();
  const qc = useQueryClient();

  return useMutation(
    deleteInvoiceB2BBy$Id,
    {
      ...commonOptions,
      onSuccess: () => {
        setSnackState({
          open: true,
          message: '請求書が削除出来ました。',
          severity: 'success',
        });
        qc.invalidateQueries({ queryKey: [AppIds.invoiceB2B] });
      },
    },
  );
};