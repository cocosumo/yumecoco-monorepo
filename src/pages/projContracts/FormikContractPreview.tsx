import { Formik } from 'formik';
import { useSnackBar } from '../../hooks';
import { saveContractDetails } from './api/saveContractDetails';
import { initialValues, validationSchema } from './form';

import { FormContractPreview } from './FormContractPreview';

export const FormikContractPreview = () => {
  const { setSnackState } = useSnackBar();


  return (
    <Formik
      initialValues={initialValues}
      initialStatus={'busy' as TFormStatus}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const { revision } = await saveContractDetails(values);
          setSnackState({
            open: true,
            severity: 'success',
            message: `保存が出来ました。更新番：${revision}`,
          });

        } catch (err) {
          setSnackState({
            open: true,
            severity: 'error',
            message: `エラーが発生しました。次のエラーは管理者にお知らせください。${err.message}`,
          });
        } finally {
          setSubmitting(false);
        }

      }}
    >
      <FormContractPreview />
    </Formik>
  );
};