import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AppIds } from 'config';
import { voidContract } from '../api/docusign/voidContract';
import { useCommonOptions } from './useCommonOptions';

export const useVoidContract = () => {
  const commonOptions = useCommonOptions();
  const qc = useQueryClient();


  return useMutation(
    voidContract,
    {
      ...commonOptions,
      onSuccess: () => {
        commonOptions.onSuccess();
        qc.invalidateQueries({ queryKey: [AppIds.contracts] });
      },
    },
  );
};