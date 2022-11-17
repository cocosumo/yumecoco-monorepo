import { Formik } from 'formik';
import { useSaveEstimate } from 'kokoas-client/src/hooksQuery/useSaveEstimate';
import { ComponentProps } from 'react';
import { useBackdrop, useSnackBar } from '../../../hooks';
import { sleep } from '../../../lib/promisify';
import { convertToKintone } from '../api/convertToKintone';
import { TypeOfForm } from '../form';

export const useSubmitContractInfo = () => {
  const { setSnackState } = useSnackBar();
  const { setBackdropState } = useBackdrop();
  const { mutateAsync } = useSaveEstimate();

  const onSubmit: ComponentProps<typeof Formik<TypeOfForm>>['onSubmit'] = async (
    values,
    {
      resetForm,
    },
  ) => {
    const {
      projEstimateId,
      submitMethod,
      projEstimateRevision,
    } = values;
    try {

      setBackdropState({ open: true });

      /* Throttle */
      if (submitMethod === 'normal') {
        await sleep(2000);
      }

      const record = convertToKintone(values);
      const { revision } = await mutateAsync({
        recordId: projEstimateId,
        record,
        revision: projEstimateRevision,
      });


      setSnackState({
        open: true,
        severity:  'success',
        message: `保存が出来ました。更新番号：${revision}`,
      });

      resetForm({ values: {
        ...values,
        projEstimateRevision: revision,
      } });


      setBackdropState({ open: false });


    } catch (err) {
      setSnackState({
        open: true,
        severity:  'error',
        message: `エラーが発生しました。ブラウザーをリフレッシュして直良かったら、管理者にお知らせください。${err.message}。`,
      });
      setBackdropState({ open: false });
    }

  };


  return {
    onSubmit,
  };
};