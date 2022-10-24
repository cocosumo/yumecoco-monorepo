import { Formik } from 'formik';
import { initialValues } from './form';
import { FormContract } from './FormContract';
import { validationSchema } from './formValidation';



export const FormikContract = () => {


  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={()=>{
        alert('Submitted');
      }}
    >
      <FormContract />
    </Formik>
  );
};