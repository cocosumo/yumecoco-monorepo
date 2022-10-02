import { Formik } from 'formik';
//import { useSnackBar } from '../../hooks';
//import { saveContractDetails } from './api/saveContractDetails';
import { initialValues, validationSchema } from './form';

import { FormContractPreview } from './FormContractPreview';

export const FormikContractPreview = () => {
  //const { setSnackState } = useSnackBar();


  return (
    <Formik
      initialValues={initialValues}
      initialStatus={'busy' as TFormStatus}
      validateOnMount
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        
        resetForm({ values });
        setSubmitting(false);
      }}
    >
      <FormContractPreview />
    </Formik>
  );
};