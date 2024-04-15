import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AppIds } from 'config';
import { useCommonOptions } from './useCommonOptions';
import { saveOrderBudget } from 'api-kintone/src/orderBudget/saveOrderBudget';


/**
 * 発注一覧を保存する
 */
export const useSaveOrderBudget = () => {
  const commonOptions = useCommonOptions();
  const qc = useQueryClient();


  return useMutation({
    mutationFn: saveOrderBudget,
    ...commonOptions,
    onSuccess: () => {
      commonOptions.onSuccess();
      qc.invalidateQueries({ queryKey: [AppIds.orderBudget] });
      qc.invalidateQueries({ queryKey: [AppIds.order] });
    },
  });
};