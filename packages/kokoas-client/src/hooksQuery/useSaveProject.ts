import { useMutation, useQueryClient } from '@tanstack/react-query';
import { saveProject } from 'api-kintone';
import { AppIds } from 'config';
import { useCommonOptions } from './useCommonOptions';

export const useSaveProject = () => {
  const commonOptions = useCommonOptions();
  const queryClient = useQueryClient();


  return useMutation(
    saveProject,
    {
      ...commonOptions,
      onSuccess: (data) => {
        console.log('DATA, ', data);
        commonOptions.onSuccess();
        queryClient.invalidateQueries({ queryKey: [AppIds.projects] });
      },
    },
  );
};