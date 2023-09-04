import { Button } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useSubmitHandler } from '../../hooks/useSubmitHandler';


export const SaveButton = () => { 
  const {
    handleSave,
  } = useSubmitHandler();

  return (
    <Button
      variant='contained'
      color='primary'
      startIcon={<SaveIcon />}
      onClick={handleSave}
    >
      {'保存'}
    </Button>
  );
};