import { useMutation } from '@tanstack/react-query';
import { saveAndpadProject } from '../api/andpad/saveAndpadProject';

import { useCommonOptions } from './useCommonOptions';



export const useSaveAndpadProject = () => {
  const commonOptions = useCommonOptions();
  return useMutation(
    saveAndpadProject,
    {
      ...commonOptions,
    },
  );
};