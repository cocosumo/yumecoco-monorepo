import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AppIds } from 'config';
import { useCommonOptions } from './useCommonOptions';
import { saveOrder } from 'api-kintone/src/order/saveOrder';

export type UseSaveOrderParams = {
  enabledOnSuccess?: boolean;
};

/**
 * 発注明細を保存する
 */
export const useSaveOrder = (params?: UseSaveOrderParams) => {
  const {
    enabledOnSuccess = true,
  } = params || {};
  const commonOptions = useCommonOptions();
  const qc = useQueryClient();

  const handleOnSuccess = () => {
    commonOptions.onSuccess();
    qc.invalidateQueries({ queryKey: [AppIds.order] });
  };


  return useMutation({
    mutationFn: saveOrder,
    ...commonOptions,
    onSuccess: enabledOnSuccess ? handleOnSuccess : undefined,
    onMutate: enabledOnSuccess ? commonOptions.onMutate : undefined,
    retry: 3,
    retryDelay: 1000,
  });
};