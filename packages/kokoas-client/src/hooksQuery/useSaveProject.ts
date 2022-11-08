import { useMutation } from '@tanstack/react-query';
import { saveProject } from 'api-kintone';
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