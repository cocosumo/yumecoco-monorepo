import { Formik } from 'formik';
import { initialValues } from './form';
import { FormContractSearch } from './FormContractSearch';
import { validationSchema } from './formValidation';



export const FormikContractSearch = () => {


  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={()=>{
        alert('Submitted');
      }}
    >
      <FormContractSearch />
    </Formik>
  );
};