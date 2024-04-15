import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AppIds } from 'config';
import { useCommonOptions } from './useCommonOptions';
import { saveOrder } from 'api-kintone/src/order/saveOrder';


/**
 * 発注明細を保存する
 */
export const useSaveOrder = () => {
  const commonOptions = useCommonOptions();
  const qc = useQueryClient();


  return useMutation({
    mutationFn: saveOrder,
    ...commonOptions,
    onSuccess: () => {
      commonOptions.onSuccess();
      qc.invalidateQueries({ queryKey: [AppIds.order] });
    },
  });
};