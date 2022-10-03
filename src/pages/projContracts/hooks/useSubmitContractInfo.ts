import { Formik } from 'formik';
import { ComponentProps } from 'react';
import { useSnackBar } from '../../../hooks';
import { saveContractDetails } from '../api/saveContractDetails';
import { TypeOfForm } from '../form';

export const useSubmitContractInfo = () => {
  const { setSnackState } = useSnackBar();

  const onSubmit: ComponentProps<typeof Formik<TypeOfForm>>['onSubmit'] = async (
    values,
    {
      setSubmitting,
      resetForm,
    },
  ) => {
    try {
      const { revision } = await saveContractDetails(values);


      resetForm({ values: {
        ...values,
        projEstimateRevision: revision,
      } });

      setSnackState({
        open: true,
        severity:  'success',
        message: '保存が出来ました。',
      });


    } catch (err) {
      setSnackState({
        open: true,
        severity:  'error',
        message: `エラーが発生しました。ブラウザーをリフレッシュをして直良かったら、管理者にお知らせください。${err.message}。`,
      });
    } finally {

      /* Throttle */
      setTimeout(()=>setSubmitting(false), 1000);

    }

  };


  return {
    onSubmit,
  };
};