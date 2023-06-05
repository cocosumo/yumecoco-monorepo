import { useMutation, useQueryClient } from '@tanstack/react-query';
import { saveContract } from 'api-kintone';
import { AppIds } from 'config';
import { useCommonOptions } from './useCommonOptions';

export const useSaveContract = () => {
  const commonOptions = useCommonOptions();
  const qc = useQueryClient();


  return useMutation(
    saveContract,
    {
      ...commonOptions,
      onSuccess: () => {
        commonOptions.onSuccess();
        qc.invalidateQueries({ queryKey: [AppIds.contracts] });
      },
    },
  );
};