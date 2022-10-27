/* 請求書発行ボタンを押したときの保存処理 */

import { Formik } from 'formik';
import { ComponentProps, useEffect } from 'react';
import { useBackdrop, useSnackBar } from '../../../hooks';
import { TypeOfForm } from '../form';
import { useSave } from './useSave';

export const useSubmitPaymentInvoice = () => {

  const { mutateAsync, isPaused } = useSave();


  const { setBackdropState } = useBackdrop();
  const { setSnackState } = useSnackBar();

  console.log('isPaused', isPaused);

  useEffect(() => {
    if (isPaused) {
      setSnackState({
        open: true,
        severity: 'error',
        message: '保存に失敗しました。ネットワークエラーです。',
      });
      setBackdropState({ open: false });
    }

  }, [isPaused]);

  const onSubmit: ComponentProps<typeof Formik<TypeOfForm>>['onSubmit'] =
    (form, { setSubmitting, resetForm }) => {

      setSubmitting(true);
      mutateAsync(form)
        .then((res) => {
          console.log('res', res);
          resetForm({
            values: { ...form, invoiceId: res.id },
          });
          setSubmitting(false);
        });
    };

  return {
    onSubmit,
  };

};