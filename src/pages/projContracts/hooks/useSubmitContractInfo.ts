import { Formik } from 'formik';
import { ComponentProps } from 'react';
import { TypeOfForm } from '../form';

export const useSubmitContractInfo = () => {

  const onSubmit: ComponentProps<typeof Formik<TypeOfForm>>['onSubmit'] = async (
    values,
    { setSubmitting },
  ) => {
    alert('保存処理は開発中');

    setSubmitting(false);
  };


  return {
    onSubmit,
  };
};