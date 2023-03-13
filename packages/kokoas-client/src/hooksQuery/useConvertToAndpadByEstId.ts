import { useMutation } from '@tanstack/react-query';
import { convertToAndpadByEstId } from '../api/andpad/convertToAndpadByEstId';
import { useCommonOptions } from './useCommonOptions';

export const useConvertToAndpadByEstId = () => {
  const commonOptions = useCommonOptions();
  return useMutation(
    convertToAndpadByEstId,
    {
      ...commonOptions,
    },
  );
};