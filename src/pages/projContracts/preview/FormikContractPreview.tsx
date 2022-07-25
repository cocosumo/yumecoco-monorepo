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
        console.log(values);
        setSubmitting(false);
        /*  saveForm(values)
          .then((r) => {
            setSnackState({ open: true, message: `保存が出来ました。 ${r?.revision}回目`, severity: 'success' });
            setSubmitting(false);
          }); */

      }}
    >

      <FormContractPreview/>
    </Formik>
  );
};