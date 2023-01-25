import { Formik } from 'formik';
import { FormContract } from './FormContract';
import { validationSchema } from './formValidation';
import { useResolveParams } from './hooks/useResolveParam';
import { useSubmitContractInfo } from './hooks/useSubmitContractInfo';


export const FormikContract = () => {

  const { onSubmit } = useSubmitContractInfo();
  const {
    newFormVal,
    calculated,
  } = useResolveParams();


  
  return (
    <Formik
      initialValues={newFormVal}
      enableReinitialize
      validateOnMount
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <FormContract calculated={calculated} />
    </Formik>
  );
};