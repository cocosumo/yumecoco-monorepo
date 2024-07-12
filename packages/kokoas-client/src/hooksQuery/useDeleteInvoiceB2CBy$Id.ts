import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCommonOptions } from './useCommonOptions';
import { AppIds } from 'config';
import { useSnackBar } from '../hooks/useSnackBar';
import { deleteInvoiceB2CBy$Id } from 'api-kintone/src/invoiceB2C/deleteInvoiceB2CBy$Id';


/**
 * 請求書B2Cを削除する。
 * 
 */
export const useDeleteInvoiceB2CBy$Id = () => {
  const commonOptions = useCommonOptions();
  const { setSnackState } = useSnackBar();
  const qc = useQueryClient();

  return useMutation(
    deleteInvoiceB2CBy$Id,
    {
      ...commonOptions,
      onSuccess: () => {
        setSnackState({
          open: true,
          message: '請求書が削除出来ました。',
          severity: 'success',
        });
        qc.invalidateQueries({ queryKey: [AppIds.invoiceB2C] });
      },
    },
  );
};