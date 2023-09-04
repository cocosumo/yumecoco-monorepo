import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackBar } from '../hooks/useSnackBar';
import { useCommonOptions } from './useCommonOptions';
import { AppIds } from 'config';
import { logicalDeleteByCustGroupId } from 'api-kintone/src/custgroups/logicalDeleteByCustGroupId';

export const useLogicalDeleteCustGroupById  = () => {
  const commonOptions = useCommonOptions();
  const { setSnackState } = useSnackBar();

  const qc = useQueryClient();

  return useMutation(
    logicalDeleteByCustGroupId,
    {
      ...commonOptions,
      onSuccess: () => {
        setSnackState({
          open: true,
          message: '成功しました',
          severity: 'success',
        });
        qc.invalidateQueries({ queryKey: [AppIds.custGroups] });
      },
    },
  );
};