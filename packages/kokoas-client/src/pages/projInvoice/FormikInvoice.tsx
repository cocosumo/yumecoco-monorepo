import { Formik } from 'formik';
import { useSnackBar } from 'kokoas-client/src/hooks';
import { useSaveInvoice } from 'kokoas-client/src/hooksQuery';
import { convertToKintone } from './api/convertToKintone';
import { initialValues } from './form';
import { FormInvoice } from './FormInvoice';
import { validationSchema } from './formValidation';


export const FormikInvoice = () => {

  const { setSnackState } = useSnackBar();
  const { mutateAsync } = useSaveInvoice();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        const { invoiceId } = values;

        const handleSave = (actionAfterSave?: () => void) => setTimeout(() => {
          const record = convertToKintone(values);

          mutateAsync({
            recordId: invoiceId,
            record,
          })
            .then(({ id }) => {
              setSnackState({
                open: true,
                severity: 'success',
                message: '保存しました。',
                handleClose: actionAfterSave,
              });
              resetForm({ values: { ...values, invoiceId: id } });
            })
            .catch((err) => {
              setSnackState({
                open: true,
                severity: 'error',
                message: `保存が失敗しました。${err.message}`,
              });
            })
            .finally(() => {
              setSubmitting(false);
            });
        }, 1500); // Throttle to limit API calls

        handleSave(); // 後々、保存処理と請求書発行処理(保存処理も実施)に分割する
      }}
    >
      <FormInvoice />
    </Formik>
  );
};