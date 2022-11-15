import { Formik } from 'formik';
import { saveForm } from './api/saveForm';
import { validationSchema } from './form';

import { FormProjProspect } from './FormProjProspect';

import { useSnackBar } from '../../hooks/useSnackBar';
import { useResolveParams } from './hooks/useResolveParams';



export const FormikProjProspect = () => {

  const { setSnackState } = useSnackBar();
  const initialValues = useResolveParams();

  return (
    <Formik
      initialValues={initialValues}
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

      <FormProjProspect />
    </Formik>
  );
};