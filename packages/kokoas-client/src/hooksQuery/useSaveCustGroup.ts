import { useMutation } from '@tanstack/react-query';
import { saveCustGroup } from '../api/kintone/custgroups/saveCustGroup';
import { useCommonOptions } from './useCommonOptions';

export const useSaveCustGroup = () => {
  const commonOptions = useCommonOptions();
  return useMutation(
    saveCustGroup,
    {
      ...commonOptions,
    },
  ); 
};