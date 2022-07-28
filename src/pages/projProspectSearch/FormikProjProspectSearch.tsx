import { Formik } from 'formik';
import { initialValues } from './form';
import { FormProjProspectSearch } from './FormProjProspectSearch';

export const FormikProjProspectSearch = () => {
  return (
    <Formik
      initialValues={initialValues}
      validateOnChange={false}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);
        setSubmitting(false);
      }}
    >
      <FormProjProspectSearch />

    </Formik>
  );
};