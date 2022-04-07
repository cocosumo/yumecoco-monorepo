import { Formik } from 'formik';
import { initialValues, validationSchema } from './form';
import { SearchForm } from './SearchForm';

export const FormikCustomerSearch = () => {
  return (<Formik

  initialValues={initialValues}
  validationSchema={validationSchema}
  onSubmit={(values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
  }} >

    <SearchForm />


  </Formik>);
};