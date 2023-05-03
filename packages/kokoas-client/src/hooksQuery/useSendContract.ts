import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AppIds } from 'config';
import { sendContractV2 } from '../api/docusign/sendContractV2';
import { useCommonOptions } from './useCommonOptions';

export const useSendContract = () => {
  const commonOptions = useCommonOptions();
  const qc = useQueryClient();


  return useMutation(
    sendContractV2,
    {
      ...commonOptions,
      onSuccess: () => {
        commonOptions.onSuccess();
        qc.invalidateQueries({ queryKey: [AppIds.contracts] });
      },
    },
  );
};