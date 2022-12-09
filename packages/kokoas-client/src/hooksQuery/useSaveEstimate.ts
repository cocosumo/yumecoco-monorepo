import { useMutation, useQueryClient } from '@tanstack/react-query';
import { saveEstimate } from 'api-kintone';
import { AppIds } from 'config';
import { useCommonOptions } from './useCommonOptions';

export const useSaveEstimate = () => {
  const commonOptions = useCommonOptions();
  const qc = useQueryClient();


  return useMutation(
    saveEstimate,
    {
      ...commonOptions,
      onSuccess: () => {
        commonOptions.onSuccess();
        qc.invalidateQueries({ queryKey: [AppIds.projEstimates] });
      },
    },
  );
};