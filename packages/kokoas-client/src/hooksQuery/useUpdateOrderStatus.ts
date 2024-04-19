import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AppIds } from 'config';
import { useCommonOptions } from './useCommonOptions';
import { saveOrder } from 'api-kintone/src/order/saveOrder';

export type UseSaveOrderParams = {
  projId: string;
  enabledOnSuccess?: boolean;
};

/**
 * 発注明細のステータスを更新する
 */
export const useUpdateOrderStatus = (params: UseSaveOrderParams) => {
  const {
    projId,
    enabledOnSuccess = true,
  } = params;
  const commonOptions = useCommonOptions();
  const qc = useQueryClient();

  const handleOnSuccess = () => {
    commonOptions.onSuccess();
    qc.invalidateQueries({ queryKey: [AppIds.order] });
    qc.invalidateQueries({ queryKey: [AppIds.orderBudget, projId] });
  };


  return useMutation({
    mutationFn: saveOrder,
    ...commonOptions,
    onSuccess: enabledOnSuccess ? handleOnSuccess : undefined,
    onMutate: enabledOnSuccess ? commonOptions.onMutate : undefined,
    retry: 2,
    retryDelay: 1000,
  });
};