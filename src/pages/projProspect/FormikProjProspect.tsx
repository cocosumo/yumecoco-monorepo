import { Formik } from 'formik';
import { saveForm } from './api/saveForm';
import { initialValues, validationSchema } from './form';

import { FormProjProspect } from './FormProjProspect';

import { useSnackBar } from '../../hooks/useSnackBar';



export const FormikProjProspect = () => {

  const { setSnackState } = useSnackBar();

  return (
    <Formik
      initialValues={initialValues}
      initialStatus={((s: TFormStatus)=>s)('busy')}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        saveForm(values)
          .then((r) => {
            setSnackState({ open: true, message: `保存が出来ました。 ${r?.revision}回目`, severity: 'success' });
            setSubmitting(false);
          });

      }}
    >

      <FormProjProspect/>
    </Formik>
  );
};