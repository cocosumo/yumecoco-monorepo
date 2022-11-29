/* 請求書発行ボタンを押したときの保存処理 */

import { Formik } from 'formik';
import { useSaveInvoice } from 'kokoas-client/src/hooksQuery';
import { ComponentProps, useEffect } from 'react';
import { useBackdrop, useSnackBar } from '../../../hooks';
import { convertToKintone } from '../api/convertToKintone';
import { TypeOfForm } from '../form';

export const useSubmitInvoice = () => {

  const { mutateAsync, isPaused } = useSaveInvoice();

  const { setBackdropState } = useBackdrop();
  const { setSnackState } = useSnackBar();


  useEffect(() => {
    if (isPaused) {
      setSnackState({
        open: true,
        severity: 'error',
        message: '保存に失敗しました。ネットワークエラーです。',
      });
      setBackdropState({ open: false });
    }

  }, [isPaused, setSnackState, setBackdropState]);

  const onSubmit: ComponentProps<typeof Formik<TypeOfForm>>['onSubmit'] = async (
    values,
    {
      resetForm,
    },
  ) => {

    const kintoneRecord = convertToKintone(values);
    await mutateAsync({
      record: kintoneRecord,
      recordId: values.invoiceId,
    }).then((res) => {
      setSnackState({
        open: true,
        severity: 'success',
        message: '保存しました。',
      });
      console.log('res', res);
      resetForm({
        values: { ...values, invoiceId: res.id },
      });
    }).catch((err) => {
      setSnackState({
        open: true,
        severity: 'error',
        message: `保存が失敗しました。${err.message}`,
      });
    });
  };

  return {
    onSubmit,
  };

};