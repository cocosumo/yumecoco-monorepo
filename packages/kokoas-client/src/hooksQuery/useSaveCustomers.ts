import { useMutation } from '@tanstack/react-query';
import { saveCustomers } from 'api-kintone';
import { useCommonOptions } from './useCommonOptions';

export const useSaveCustomers = () => {
  const commonOptions = useCommonOptions();
  return useMutation(
    saveCustomers,
    {
      ...commonOptions,
    },
  ); 
};