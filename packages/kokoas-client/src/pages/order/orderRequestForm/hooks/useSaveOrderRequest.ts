import { useSaveOrder, useSaveOrderBudget } from 'kokoas-client/src/hooksQuery';
import { useOrderFormContext } from './useOrderRHF';
import { SubmitErrorHandler, SubmitHandler } from 'react-hook-form';
import { TOrderForm } from '../schema';
import { useCallback } from 'react';
import { useSnackBar } from 'kokoas-client/src/hooks';
import { convertOrderItemsToKintone } from '../api/convertOrderItemsToKintone';
import { convertOrderInfoToKintone } from '../api/convertOrderInfoToKintone';

export const useSaveOrderRequest = () => {
  const { setSnackState } = useSnackBar();
  const { handleSubmit, reset } = useOrderFormContext();
  const { 
    mutateAsync: saveOrderBudget, 
    isLoading: saveOrderBudgetIsLoading,
  } = useSaveOrderBudget();

  const { 
    mutateAsync: saveOrder,
    isLoading: saveOrderIsLoading,
  } = useSaveOrder();

  const onSubmitValid: SubmitHandler<TOrderForm> = useCallback(async (data) => {

    await saveOrder(
      {
        recordId: data.orderId,
        record: convertOrderInfoToKintone(data),
      }, 
      {
        onSuccess: async ({ recordId: orderId }) => {
          await saveOrderBudget({
            recordId: data.projId,
            record: await convertOrderItemsToKintone(data, orderId),
          });
          reset({ ...data, orderId });
        },
      },
    );

  }, [saveOrderBudget, saveOrder, reset]);

  const onSubmitInvalid: SubmitErrorHandler<TOrderForm> = useCallback((errors) => {
    // TODO: 依頼により、詳しいエラーを出す。エラーのある行が多いとどう表示するか、検討が必要。

    // 本番で保存出来ない原因を特定するため、残す。
    console.warn('Validation Errors', errors);
     
    setSnackState({
      open: true,
      severity: 'error',
      message: '入力内容に誤りがあります。',
      autoHideDuration: 500,
    });
  }, [setSnackState]);

  return {
    handleSubmit: handleSubmit(onSubmitValid, onSubmitInvalid),
    isLoading: saveOrderBudgetIsLoading || saveOrderIsLoading,
  };
};