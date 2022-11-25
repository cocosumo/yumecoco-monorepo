import { useMutation, useQueryClient } from '@tanstack/react-query';
import { saveCustGroup } from 'api-kintone';
import { AppIds } from 'config';
import { useCommonOptions } from './useCommonOptions';

export const useSaveCustGroup = () => {
  const commonOptions = useCommonOptions();
  const queryClient = useQueryClient();


  return useMutation(
    saveCustGroup,
    {
      ...commonOptions,
      onSuccess: () => {
        commonOptions.onSuccess();
        queryClient.invalidateQueries({ queryKey: [AppIds.custGroups] });
        queryClient.invalidateQueries({ queryKey: [AppIds.customers] });

      },
      onError: ((err) => {
        console.log(JSON.stringify(err, null, 2));
      }),
    },
  );
};