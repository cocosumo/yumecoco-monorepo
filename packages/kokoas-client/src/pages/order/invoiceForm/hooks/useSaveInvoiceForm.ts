import { useSaveInvoiceB2B, useSaveOrder, useSaveOrderBudget } from 'kokoas-client/src/hooksQuery';
import { SubmitErrorHandler, SubmitHandler } from 'react-hook-form';
// import { TOrderForm } from '../schema';
import { useCallback, useState } from 'react';
import { useConfirmDialog, useSnackBar } from 'kokoas-client/src/hooks';
// import { convertOrderItemsToKintone } from '../api/convertOrderItemsToKintone';
// import { convertOrderInfoToKintone } from '../api/convertOrderInfoToKintone';
import { useSetAtom } from 'jotai';
import { invoiceDialogAtom } from '../InvoiceFormDialog';
import { TInvoiceForm } from '../schema';
import { useInvoiceFormContext } from './useInvoiceRHF';
import { convertOrderInfoToKintone } from '../api/convertOrderInfoToKintone';
import { convertOrderItemsToKintone } from '../api/convertOrderItemsToKintone';
import { convertInvoiceToKintone } from '../api/convertInvoiceToKintone';
import { useInvoiceStatus } from './useInvoiceStatus';

export const useSaveInvoiceForm = () => {
  const [isSaving, setIsSaving] = useState(false);
  const setInvoiceAtom = useSetAtom(invoiceDialogAtom);
  const { setDialogState } = useConfirmDialog();
  const { setSnackState } = useSnackBar();
  const { handleSubmit } = useInvoiceFormContext();
  const { 
    mutateAsync: saveOrderBudget, 
    isLoading: saveOrderBudgetIsLoading,
  } = useSaveOrderBudget();

  const { 
    mutateAsync: saveOrder,
    isLoading: saveOrderIsLoading,
  } = useSaveOrder({
    enabledOnSuccess: false,
  });

  const {
    mutateAsync: saveInvoiceB2B,
    isLoading: saveInvoiceIsLoading,
  } = useSaveInvoiceB2B();

  const {
    next,
    prev,
  } = useInvoiceStatus();

  const onSubmitValid: SubmitHandler<TInvoiceForm> = useCallback(async (data, e) => {
    const buttonValue = (e?.target as HTMLButtonElement)?.value as 'next' | 'prev';

    const saveProcess  = async () => {
      setIsSaving(true);
      await saveOrder({
        recordId: data.orderId,
        record: convertOrderInfoToKintone(data),
      });

      await saveOrderBudget({
        recordId: data.projId,
        record: await convertOrderItemsToKintone(data),
      });

      const { recordId } = await saveInvoiceB2B({
        recordId: data.invoiceId,
        record: convertInvoiceToKintone(data, buttonValue),
      });

      setInvoiceAtom((prevDialog) => ({
        ...prevDialog,
        invoiceId: recordId,
      }));
      setIsSaving(false);
    };


    // Display prompt except for the case of '支払済'
    // always display on prev button
    if (buttonValue === 'next' && next === '支払済') {
      saveProcess();
    } else {
      setDialogState({
        open: true,
        title: `ステータスは【${ buttonValue === 'next' ? next : prev}】に${buttonValue ? '更新' : '差しも度'}しますか？`,
        handleYes: saveProcess,
      });
    }


  }, [
    next,
    prev,
    setDialogState,
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
      autoHideDuration: 2000,
    });
  }, [setSnackState]);

  return {
    handleSubmit: handleSubmit(onSubmitValid, onSubmitInvalid),
    isLoading: saveOrderBudgetIsLoading || saveOrderIsLoading || saveInvoiceIsLoading,
    isSaving: isSaving,
  };
};