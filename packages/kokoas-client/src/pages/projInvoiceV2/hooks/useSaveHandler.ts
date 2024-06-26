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
      console.warn('ERRORS', errors); // 保存できない原因確認で残す
      // summarize errors into string
      const errorString = Object.entries(errors).reduce((acc, [_, value]) => {
        let newAcc = acc;
        if (Array.isArray(value)) {
          value.forEach((v) => {
            for (const [itemKey] of Object.entries(v)) {
              newAcc += `${v[itemKey].message}\n`;
            }
          });
        } else if (value) {
          newAcc += `${value.message}\n`;
        }
        return newAcc;
      }, '');

      setSnackState({
        open: true,
        message: `${errorString ? errorString : 'エラーが発生しました。管理者に連絡をお願いします。'}`,
        severity: 'error',

      });
    },
  )();
};
