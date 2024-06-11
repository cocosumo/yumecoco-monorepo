import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCommonOptions } from './useCommonOptions';
import { AppIds } from 'config';
import { useSnackBar } from '../hooks/useSnackBar';
import { deleteOrderBy$Id } from 'api-kintone/src/order/deleteOrderBy$Id';


/**
 * 発注を削除する。
 * 
 */
export const useDeleteOrderBy$Id = () => {
  const commonOptions = useCommonOptions();
  const { setSnackState } = useSnackBar();
  const qc = useQueryClient();

  return useMutation(
    deleteOrderBy$Id,
    {
      ...commonOptions,
      onSuccess: () => {
        setSnackState({
          open: true,
          message: '発注が削除出来ました。',
          severity: 'success',
        });
        qc.invalidateQueries({ queryKey: [AppIds.order] });
        qc.invalidateQueries({ queryKey: [AppIds.orderBudget] });
      },
    },
  );
};