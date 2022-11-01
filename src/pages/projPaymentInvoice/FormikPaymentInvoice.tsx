import { Formik } from 'formik';
import { initialValues } from './form';
import { FormPaymentInvoice } from './FormPaymentInvoice';
import { validationSchema } from './formValidation';
import { useSubmitPaymentInvoice } from './hooks/useSubmitPaymentInvoice';



export const FormikPaymentInvoice = () => {

  const { onSubmit } = useSubmitPaymentInvoice();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <FormPaymentInvoice />
    </Formik>
  );
};