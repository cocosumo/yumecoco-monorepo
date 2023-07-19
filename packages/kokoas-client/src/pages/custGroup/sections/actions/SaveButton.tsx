import { Button } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';


export const SaveButton = () => {
  return (
    <Button
      variant='contained'
      color='primary'
      type='submit'
      startIcon={<SaveIcon />}
    >
      {'保存'}
    </Button>
  );
};