import { Formik } from 'formik';
import { initialValues, validationSchema } from './form';

import { FormContractPreview } from './FormContractPreview';




export const FormikContractPreview = () => {


  return (
    <Formik
      initialValues={initialValues}
      initialStatus={'busy' as TFormStatus}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {

        setSubmitting(false);
      }}
    >
      <FormContractPreview/>
    </Formik>
  );
};