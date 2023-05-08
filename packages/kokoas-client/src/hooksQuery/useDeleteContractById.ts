import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteContractById } from 'api-kintone';
import { useCommonOptions } from './useCommonOptions';
import { AppIds } from 'config';


/**
 * 契約を削除する。
 * 
 */
export const useDeleteContractById = () => {
  const commonOptions = useCommonOptions();
  const qc = useQueryClient();

  return useMutation(
    deleteContractById,
    {
      ...commonOptions,
      onSuccess: () => {
        commonOptions.onSuccess();
        qc.invalidateQueries({ queryKey: [AppIds.contracts] });
      },
    },
  );
};