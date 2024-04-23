import { useSaveInvoiceB2B, useSaveOrder, useSaveOrderBudget } from 'kokoas-client/src/hooksQuery';
import { SubmitErrorHandler, SubmitHandler } from 'react-hook-form';
// import { TOrderForm } from '../schema';
import { useCallback } from 'react';
import { useSnackBar } from 'kokoas-client/src/hooks';
// import { convertOrderItemsToKintone } from '../api/convertOrderItemsToKintone';
// import { convertOrderInfoToKintone } from '../api/convertOrderInfoToKintone';
import { useSetAtom } from 'jotai';
import { invoiceDialogAtom } from '../InvoiceFormDialog';
import { TInvoiceForm } from '../schema';
import { useInvoiceFormContext } from './useInvoiceRHF';
import { convertOrderInfoToKintone } from '../api/convertOrderInfoToKintone';
import { convertOrderItemsToKintone } from '../api/convertOrderItemsToKintone';
import { convertInvoiceToKintone } from '../api/convertInvoiceToKintone';


export const useSaveInvoiceForm = () => {
  const setInvoiceAtom = useSetAtom(invoiceDialogAtom);
  const { setSnackState } = useSnackBar();
  const { handleSubmit } = useInvoiceFormContext();
  const { 
    mutateAsync: saveOrderBudget, 
    isLoading: saveOrderBudgetIsLoading,
  } = useSaveOrderBudget();

  const { 
    mutateAsync: saveOrder,
    isLoading: saveOrderIsLoading,
  } = useSaveOrder();

  const {
    mutateAsync: saveInvoiceB2B,
    isLoading: saveInvoiceIsLoading,
  } = useSaveInvoiceB2B();

  const onSubmitValid: SubmitHandler<TInvoiceForm> = useCallback(async (data) => {
    await saveOrder({
      recordId: data.orderId,
      record: convertOrderInfoToKintone(data),
    });

    await   saveOrderBudget({
      recordId: data.projId,
      record: await convertOrderItemsToKintone(data),
    });

    const { recordId } = await saveInvoiceB2B({
      recordId: data.invoiceId,
      record: convertInvoiceToKintone(data),
    });

    setInvoiceAtom((prev) => ({
      ...prev,
      invoiceId: recordId,
    }));


  }, [
    saveOrderBudget,
    saveOrder,
    saveInvoiceB2B,
    setInvoiceAtom,
  ]);

  const onSubmitInvalid: SubmitErrorHandler<TInvoiceForm> = useCallback((errors) => {
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
    isLoading: saveOrderBudgetIsLoading || saveOrderIsLoading || saveInvoiceIsLoading,
  };
};