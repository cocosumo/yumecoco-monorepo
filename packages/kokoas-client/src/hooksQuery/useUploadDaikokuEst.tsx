import { useMutation } from '@tanstack/react-query';
import { uploadDaikokuEst } from 'api-kintone/src/estimates';
import { ParsedDaikokuEst } from 'types';
import { useCommonOptions } from './useCommonOptions';

export const useUploadDaikokuEst = ({
  onSuccess,
}: {
  onSuccess?: (data: ParsedDaikokuEst) => void
}) => {
  const commonOptions = useCommonOptions();

  return useMutation(
    uploadDaikokuEst,
    {
      ...commonOptions,
      onSuccess: (data) => {
        commonOptions.onSuccess();
        onSuccess?.(data);

      },
    },
  );
};