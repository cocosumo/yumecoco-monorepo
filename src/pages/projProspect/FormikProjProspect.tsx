import { Formik } from 'formik';
import { initialValues } from '.';
import { ProjProspectForm } from './ProjProspectForm';

export const FormikProjProspect = () => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {

        console.log(values);
        setSubmitting(false);
      }}
    >
      <ProjProspectForm/>

    </Formik>
  );
};