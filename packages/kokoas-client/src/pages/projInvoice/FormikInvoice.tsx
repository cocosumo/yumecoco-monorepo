import { Formik } from 'formik';
import { useSaveInvoice } from 'kokoas-client/src/hooksQuery';
import { convertToKintone } from './api/convertToKintone';
import { initialValues } from './form';
import { FormInvoice } from './FormInvoice';
import { validationSchema } from './formValidation';


export const FormikInvoice = () => {

  const { mutateAsync } = useSaveInvoice();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        const { invoiceId } = values;

        const handleSave = () => setTimeout(() => {
          const record = convertToKintone(values);

          mutateAsync({
            recordId: invoiceId,
            record,
          });
        });

        handleSave(); // 後々、保存処理と請求書発行処理(保存処理も実施)に分割する
      }}
    >
      <FormInvoice />
    </Formik>
  );
};