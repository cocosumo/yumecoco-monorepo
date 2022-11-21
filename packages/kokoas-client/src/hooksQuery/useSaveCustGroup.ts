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
      onSuccess: (data) => {
        commonOptions.onSuccess();
        queryClient.invalidateQueries({ queryKey: [AppIds.custGroups, { custGroupId: data.id }] });
        queryClient.invalidateQueries({ queryKey: [AppIds.customers, { custGroupId: data.id }] });

      },
    },
  );
};