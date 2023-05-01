import { useSnackBar } from 'kokoas-client/src/hooks';
import { useFormContext } from 'react-hook-form';

//import { useNavigate } from 'react-router-dom';
import { TypeOfForm } from '../schema';

export const useSubmitHandler = () => {
  const { handleSubmit } = useFormContext<TypeOfForm>();
  const { setSnackState } = useSnackBar();
  //const navigate = useNavigate();

  return () => handleSubmit(
    () => {
      // 成功の時
      setSnackState({
        open: true,
        message: '保存しました',
        severity: 'success',
      });
      
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