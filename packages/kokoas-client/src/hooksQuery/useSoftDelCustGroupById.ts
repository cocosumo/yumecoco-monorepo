import { useMutation, useQueryClient } from '@tanstack/react-query';
import { softDelCustGroupById } from 'api-kintone';
import { AppIds } from 'config';
import { useSnackBar } from '../hooks/useSnackBar';
import { useCommonOptions } from './useCommonOptions';

export const useSoftDelCustGroupById = () => {
  const { setSnackState } = useSnackBar();
  const commonOptions = useCommonOptions();
  const qc = useQueryClient();


  return useMutation(
    softDelCustGroupById,
    {
      ...commonOptions,
      onSuccess: () => {
        setSnackState({
          open: true,
          severity: 'success',
          message: '削除しました！',
        });
        qc.invalidateQueries({ queryKey: [AppIds.custGroups] });
        qc.invalidateQueries({ queryKey: [AppIds.customers] });
        qc.invalidateQueries({ queryKey: [AppIds.projects] });
        qc.invalidateQueries({ queryKey: [AppIds.projEstimates] });
      },
    },
  );
};