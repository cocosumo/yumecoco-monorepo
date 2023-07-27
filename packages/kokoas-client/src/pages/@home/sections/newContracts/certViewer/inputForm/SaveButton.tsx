import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';

export const SaveButton = () => {


  return (
    <LoadingButton
      variant='outlined'
      loading={false}
      startIcon={<SaveIcon />}
      disabled={true}
    >
      保存
    </LoadingButton>
  );
};