import { useSnackBar } from 'kokoas-client/src/hooks';
import { useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { pages } from '../../Router';
import { generateParams } from 'kokoas-client/src/helpers/url';
import { TForm } from '../schema';
import { useSaveInvoiceB2C } from 'kokoas-client/src/hooksQuery';
import { convertToKintone } from '../api/convertToKintone';



export const useSaveHandler = () => {
  const { handleSubmit } = useFormContext<TForm>();
  const { setSnackState } = useSnackBar();
  const { mutateAsync } = useSaveInvoiceB2C();
  const navigate = useNavigate();

  
  return () => handleSubmit(
    async (data) => {
      // 成功の時
      const kintoneRecord = convertToKintone(data);

      const result = await mutateAsync({
        record: {
          ...kintoneRecord,
          invoiceStatus: { value: '作成済' },
        },
        recordId: data.invoiceId,
      });

      navigate(`${pages.projInvoiceV2}?${generateParams({
        projId: data.projId,
        invoiceId: result.id,
      })}`);
    },
    (errors) => {
      const [key, errorField] = Object.entries(errors)[0]; // Show first validation error instance

      setSnackState({
        open: true,
        message: `${key} - ${errorField.message}`,
        severity: 'error',
      });
    },
  )();
};