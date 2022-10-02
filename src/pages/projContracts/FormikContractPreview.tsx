import { Formik } from 'formik';
import { initialValues, validationSchema } from './form';
import { FormContractPreview } from './FormContractPreview';
import { useSubmitContractInfo } from './hooks/useSubmitContractInfo';


export const FormikContractPreview = () => {
  const { onSubmit } = useSubmitContractInfo();

  return (
    <Formik
      initialValues={initialValues}
      initialStatus={'busy' as TFormStatus}
      validateOnMount
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <FormContractPreview />
    </Formik>
  );
};