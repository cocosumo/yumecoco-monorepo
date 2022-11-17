import { Formik } from 'formik';
import { initialValues } from './form';
import { FormInvoice } from './FormInvoice';
import { validationSchema } from './formValidation';
import { useSubmitInvoice } from './hooks/useSubmitInvoice';



export const FormikInvoice = () => {

  const { onSubmit } = useSubmitInvoice();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <FormInvoice />
    </Formik>
  );
};