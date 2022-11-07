import { useMutation, useQueryClient } from '@tanstack/react-query';
import { saveProject } from 'api-kintone';
import { AppIds } from 'config';
import { useCommonOptions } from './useCommonOptions';

export const useSaveProject = () => {
  const commonOptions = useCommonOptions();

  return useMutation(
    saveProject,
    {
      ...commonOptions,
    },
  );
};