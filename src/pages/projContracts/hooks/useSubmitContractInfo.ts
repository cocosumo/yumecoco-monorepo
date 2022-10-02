import { Formik } from 'formik';
import { ComponentProps } from 'react';
import { TypeOfForm } from '../form';

export const useSubmitContractInfo = () => {

  const onSubmit: ComponentProps<typeof Formik<TypeOfForm>>['onSubmit'] = async (
    values, 
    { setSubmitting },
  ) => {
    console.log(values.submitMethod, 'he2llo');
   
    setSubmitting(false);
  };
  

  return {
    onSubmit,
  };
};