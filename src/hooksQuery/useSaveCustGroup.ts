import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { saveCustGroup } from '../api/kintone/custgroups/saveCustGroup';
import { useCommonOptions } from './useCommonOptions';

export const useSaveCustGroup = (
  params: Parameters<typeof saveCustGroup>[0], 
  options?: UseMutationOptions,
) => {
  const commonOptions = useCommonOptions();
  return useMutation(
    () => saveCustGroup(params), 
    {
      ...commonOptions,
      ...options,
    }); 
};