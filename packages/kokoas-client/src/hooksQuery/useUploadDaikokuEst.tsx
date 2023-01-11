import { useMutation } from '@tanstack/react-query';
import { uploadDaikokuEst } from 'api-kintone/src/estimates';
import { useCommonOptions } from './useCommonOptions';

export const useUploadDaikokuEst = () => {
  const commonOptions = useCommonOptions();
  return useMutation(
    uploadDaikokuEst,
    {
      ...commonOptions,
    },
  );
};