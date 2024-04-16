import SaveIcon from '@mui/icons-material/Save';
import { useSaveOrderRequest } from '../hooks/useSaveOrderRequest';
import { LoadingButton } from '@mui/lab';
import { useFormState } from 'react-hook-form';
import { useOrderFormContext } from '../hooks/useOrderRHF';

export const SaveButton = () => {

  const {
    handleSubmit,
  } = useSaveOrderRequest();

  const { control } = useOrderFormContext();
  const { isSubmitting } = useFormState({ control });


  return (
    <LoadingButton 
      loading={isSubmitting}
      color={'info'} 
      variant={'contained'}
      onClick={handleSubmit}
      startIcon={<SaveIcon />}
    >
      保存
    </LoadingButton>
  );
};