import { Button } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useSaveOrderRequest } from '../hooks/useSaveOrderRequest';

export const SaveButton = () => {
  const {
    handleSubmit,
  } = useSaveOrderRequest();

  return (
    <Button 
      color={'info'} 
      variant={'contained'}
      onClick={handleSubmit}
      startIcon={<SaveIcon />}
    >
      保存
    </Button>
  );
};