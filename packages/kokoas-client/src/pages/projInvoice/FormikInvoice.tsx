import { Formik } from 'formik';
import { useSaveInvoice } from 'kokoas-client/src/hooksQuery';
import { useNavigate } from 'react-router-dom';
import { convertToKintone } from './api/convertToKintone';
import { FormInvoice } from './FormInvoice';
import { validationSchema } from './formValidation';
import { generateParams } from 'kokoas-client/src/helpers/url';
import { useResolveParams } from './hooks/useResolveParams';


export const FormikInvoice = () => {

  const { mutateAsync } = useSaveInvoice();
  const navigate = useNavigate();

  const initialValues = useResolveParams();


  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        const { invoiceId } = values;


        const handleSave = async () => {
          const record = convertToKintone(values);

          const { id } = await mutateAsync({
            recordId: invoiceId,
            record,
          });


          navigate(`?${generateParams({ invoiceId: id })}`);
        };

        handleSave();
      }}
    >

      <FormInvoice />

    </Formik>
  );
};