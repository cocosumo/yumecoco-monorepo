import { useSaveOrder, useSaveOrderBudget } from 'kokoas-client/src/hooksQuery';
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

  const onSubmitValid: SubmitHandler<TInvoiceForm> = useCallback(async (data) => {
    alert('Save not yet implemented.');

    // const buttonValue = (e?.target as HTMLButtonElement)?.value;

    /*  await saveOrder(
      {
        recordId: data.orderId,
        record: convertOrderInfoToKintone(data, buttonValue),
      }, 
      {
        onSuccess: async ({ recordId: orderId }) => {
          await saveOrderBudget({
            recordId: data.projId,
            record: await convertOrderItemsToKintone(data, orderId),
          });
          setInvoiceAtom({
            open: true,
            orderId,
            projId: data.projId,
            projName: data.projName,
            storeName: data.storeName,
          });
        },
      },
    ); */

  }, []);

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
    isLoading: saveOrderBudgetIsLoading || saveOrderIsLoading,
  };
};