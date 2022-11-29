import { useMutation, useQueryClient } from '@tanstack/react-query';
import { saveCustGroup } from 'api-kintone';
import { AppIds } from 'config';
import { useCommonOptions } from './useCommonOptions';

export const useSaveCustGroup = () => {
  const commonOptions = useCommonOptions();
  const qc = useQueryClient();


  return useMutation(
    saveCustGroup,
    {
      ...commonOptions,
      onSuccess: () => {
        commonOptions.onSuccess();
        qc.invalidateQueries({ queryKey: [AppIds.custGroups] });
        qc.invalidateQueries({ queryKey: [AppIds.customers] });
        qc.invalidateQueries({ queryKey: [AppIds.projects] });
        qc.invalidateQueries({ queryKey: [AppIds.projEstimates] });
        
      },
    },
  );
};