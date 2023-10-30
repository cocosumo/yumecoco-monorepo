import { useSnackBar } from 'kokoas-client/src/hooks';
import { useFormContext } from 'react-hook-form';

//import { useNavigate } from 'react-router-dom';
import { TypeOfForm } from '../schema';
import { convertToKintone } from '../api/convertToKintone';
import { useSaveContract, useSaveProject } from 'kokoas-client/src/hooksQuery';
import { useNavigate } from 'react-router-dom';
import { pages } from '../../Router';
import { generateParams } from 'kokoas-client/src/helpers/url';

export const useSubmitHandler = () => {
  const { handleSubmit } = useFormContext<TypeOfForm>();
  const { setSnackState } = useSnackBar();
  const { mutateAsync } = useSaveContract();
  const { mutate } = useSaveProject();
  const navigate = useNavigate();

  return () => handleSubmit(
    async (data) => {
      // 成功の時
      const kintoneRecord = convertToKintone(data);
      
      const result = await mutateAsync({
        record: kintoneRecord,
        recordId: data.contractId ?? '',
      });

      if (data.contractType === '設計契約') {
        // 依頼：K229
        mutate({ 
          projId: data.projId,
          record: { 
            planApplicationDate: kintoneRecord.contractDate, 
          }, 
        });
      }

      navigate(`${pages.projContractPreviewV2}?${generateParams({
        projId: data.projId,
        contractId: result.id,
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