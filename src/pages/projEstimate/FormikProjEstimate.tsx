import { Formik } from 'formik';
/// import { saveForm } from './api/saveForm';
import { initialValues, validationSchema } from './form';
import FormProjEstimate from './FormProjEstimate';
// import { useSnackBar } from '../../hooks/useSnackBar';

export const FormikProjEstimate = () => {
  // const { setSnackState } = useSnackBar();

  return (
    <Formik
      initialValues={initialValues}
      initialStatus={((s: TFormStatus)=>s)('busy')}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);
        /* kintoneに保存する処理を追加する */
        setSubmitting(false);
      }}
    >

      <FormProjEstimate/>
    </Formik>
  );
};