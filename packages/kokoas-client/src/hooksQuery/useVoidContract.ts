import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AppIds } from 'config';
import { voidContract } from '../api/docusign/voidContract';

export const useVoidContract = () => {
  const qc = useQueryClient();

  return useMutation(
    voidContract,
    {
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: [AppIds.contracts] });
      },
    },
  );
};