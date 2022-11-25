import { useMutation, useQueryClient } from '@tanstack/react-query';
import { saveEstimate } from 'api-kintone';
import { AppIds } from 'config';
import { useCommonOptions } from './useCommonOptions';

export const useSaveEstimate = () => {
  const commonOptions = useCommonOptions();
  const queryClient = useQueryClient();


  return useMutation(
    saveEstimate,
    {
      ...commonOptions,
      onSuccess: () => {
        commonOptions.onSuccess();
        queryClient.invalidateQueries({ queryKey: [AppIds.projEstimates] });
        queryClient.invalidateQueries({ queryKey: [AppIds.projects] });
      },
    },
  );
};