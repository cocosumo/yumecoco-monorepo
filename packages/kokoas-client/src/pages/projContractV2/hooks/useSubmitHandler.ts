import { useSnackBar } from 'kokoas-client/src/hooks';
import { useFormContext } from 'react-hook-form';

//import { useNavigate } from 'react-router-dom';
import { TypeOfForm } from '../schema';
import { convertToKintone } from '../api/convertToKintone';
import { useSaveContract } from 'kokoas-client/src/hooksQuery';

export const useSubmitHandler = () => {
  const { handleSubmit } = useFormContext<TypeOfForm>();
  const { setSnackState } = useSnackBar();
  const { mutateAsync } = useSaveContract();

  return () => handleSubmit(
    (data) => {
      // 成功の時
      const kintoneRecord = convertToKintone(data);
      
      const result = mutateAsync({
        record: kintoneRecord,
        recordId: data.contractId ?? '',
      });

      console.log(result);
      
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