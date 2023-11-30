import { useMutation, useQueryClient } from '@tanstack/react-query';
import { saveProject } from 'api-kintone';
import { AppIds } from 'config';

export const useSaveReceivableCompleteDate = () => {
  const queryClient = useQueryClient();


  return useMutation(
    saveProject,
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [AppIds.projects] });
        queryClient.invalidateQueries({ queryKey: ['andpad'] });
      },
    },
  );
};