import { Formik } from 'formik';
import { initialValues } from './form';
import { FormPaymentInvoice } from './FormPaymentInvoice';
import { validationSchema } from './formValidation';



export const FormikPaymentInvoice = () => {

  // const { onSubmit } = useSubmitContractInfo();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={() => {}}
    >
      <FormPaymentInvoice />
    </Formik>
  );
};