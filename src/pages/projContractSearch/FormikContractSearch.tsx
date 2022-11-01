import { Formik } from 'formik';
import { initialValues } from './form';
import { FormContractSearch } from './FormContractSearch';
import { validationSchema } from './formValidation';



export const FormikContractSearch = () => {


  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(_, { setSubmitting })=>{
        setTimeout(() => {
          alert('Submitted');
          setSubmitting(false);
        }, 2000);

      }}
    >
      <FormContractSearch />
    </Formik>
  );
};