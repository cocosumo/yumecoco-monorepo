import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AppIds } from 'config';
import { useCommonOptions } from './useCommonOptions';
import { saveOrderBudget } from 'api-kintone/src/orderBudget/saveOrderBudget';

export const useSaveOrderBudget = () => {
  const commonOptions = useCommonOptions();
  const qc = useQueryClient();


  return useMutation(
    saveOrderBudget,
    {
      ...commonOptions,
      onSuccess: () => {
        commonOptions.onSuccess();
        qc.invalidateQueries({ queryKey: [AppIds.orderBudget] });
      },
    },
  );
};