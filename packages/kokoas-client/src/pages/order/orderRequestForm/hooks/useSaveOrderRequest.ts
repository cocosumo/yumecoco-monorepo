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
  const { handleSubmit } = useOrderFormContext();
  const { 
    mutateAsync: saveOrderBudget, 
    isLoading: saveOrderBudgetIsLoading, 
  } = useSaveOrderBudget();
  const { 
    mutateAsync: saveOrder,
    isLoading: saveOrderIsLoading,
  } = useSaveOrder();

  const onSubmitValid: SubmitHandler<TOrderForm> = useCallback(async (data) => {

    const { id: orderId } = await saveOrder({
      recordId: data.projId,
      record: convertOrderInfoToKintone(data),
    });

    const { revision } = await saveOrderBudget({
      recordId: data.projId,
      record: await convertOrderItemsToKintone(data, orderId),
    });

    setSnackState({
      open: true,
      severity: 'success',
      message: `保存しました。 更新回数：${revision} `,
      autoHideDuration: 500,
    });
    
  }, [saveOrderBudget, saveOrder, setSnackState]);

  const onSubmitInvalid: SubmitErrorHandler<TOrderForm> = useCallback((errors) => {
    // TODO: 詳しいエラーを出す

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