import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteContractById } from 'api-kintone';
import { useCommonOptions } from './useCommonOptions';
import { AppIds } from 'config';
import { useSnackBar } from '../hooks/useSnackBar';


/**
 * 契約を削除する。
 * 
 */
export const useDeleteContractById = () => {
  const commonOptions = useCommonOptions();
  const { setSnackState } = useSnackBar();

  const qc = useQueryClient();

  return useMutation(
    deleteContractById,
    {
      ...commonOptions,
      onSuccess: () => {
        setSnackState({
          open: true,
          message: '削除が出来ました。',
          severity: 'success',
        });
        qc.invalidateQueries({ queryKey: [AppIds.contracts] });
      },
    },
  );
};