import { Formik } from 'formik';
import { initialValues } from './form';
import { SearchForm } from './SearchForm';

export const FormikCustomerSearch = () => {
  return (<Formik
  initialValues={initialValues}
  onSubmit={(values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
  }} >

    <SearchForm />


  </Formik>);
};