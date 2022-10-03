import { Formik } from 'formik';
import { ComponentProps } from 'react';
import { useBackdrop, useSnackBar } from '../../../hooks';
import { sleep } from '../../../lib/promisify';
import { saveContractDetails } from '../api/saveContractDetails';
import { TypeOfForm } from '../form';

export const useSubmitContractInfo = () => {
  const { setSnackState } = useSnackBar();
  const { setBackdropState } = useBackdrop();

  const onSubmit: ComponentProps<typeof Formik<TypeOfForm>>['onSubmit'] = async (
    values,
    {
      resetForm,
    },
  ) => {
    try {
      setBackdropState({ open: true });
      const { revision } = await saveContractDetails(values);

      /* Throttle */
      await sleep(2000);

      setBackdropState({ open: false });
      setSnackState({
        open: true,
        severity:  'success',
        message: `保存が出来ました。更新番号：${revision}`,
      });

      resetForm({ values: {
        ...values,
        projEstimateRevision: revision,
      } });

    } catch (err) {
      setSnackState({
        open: true,
        severity:  'error',
        message: `エラーが発生しました。ブラウザーをリフレッシュして直良かったら、管理者にお知らせください。${err.message}。`,
      });
    }

  };


  return {
    onSubmit,
  };
};