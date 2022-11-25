import { Formik } from 'formik';
import { initialValues } from './form';
import { FormContract } from './FormContract';
import { validationSchema } from './formValidation';
import { useResolveParams2 } from './hooks/useResolveParam2';
import { useSubmitContractInfo } from './hooks/useSubmitContractInfo';


export const FormikContract = () => {

  const { onSubmit } = useSubmitContractInfo();
  const {
    newFormVal,
  } = useResolveParams2();

  console.log(newFormVal);

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <FormContract />
    </Formik>
  );
};