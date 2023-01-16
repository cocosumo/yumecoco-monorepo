import { useMutation } from '@tanstack/react-query';
import { uploadDaikokuGenka } from 'api-kintone/src/estimates';
import { ParsedDaikokuGenka } from 'types';
import { useCommonOptions } from './useCommonOptions';

export const useUploadDaikokuEst = ({
  onSuccess,
}: {
  onSuccess?: (data: ParsedDaikokuGenka) => void
}) => {
  const commonOptions = useCommonOptions();

  return useMutation(
    uploadDaikokuGenka,
    {
      ...commonOptions,
      onSuccess: (data) => {
        commonOptions.onSuccess();
        onSuccess?.(data);

      },
    },
  );
};