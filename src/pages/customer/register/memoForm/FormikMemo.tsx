import { Formik } from 'formik';

import { initialValues, validationSchema } from './form';
import { MemoForm } from './MemoForm';

export const FormikMemo = () => {
  return (
    <Formik
    validateOnChange={false}
    validateOnMount
    initialValues={initialValues}
    enableReinitialize
    validationSchema={validationSchema}
    onSubmit={(values, { setSubmitting }) => {
      console.log(values);
      setSubmitting(false);
    }}
    >
      <MemoForm/>
    </Formik>
  );
};

