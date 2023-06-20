import { Button, Stack } from '@mui/material';
import { GoToContractButton } from '../navigationComponents/GoToContractButton';
import SaveIcon from '@mui/icons-material/Save';

export const ActionButtons = ({
  handleSubmit,
}:{
  handleSubmit: () => void
}) => {
  return (

    <Stack 
      direction="row" 
      spacing={2}
    >
      <Button
        variant='outlined'
        startIcon={<SaveIcon />}
        type='submit'
        onClick={handleSubmit}
      >
        保存
      </Button>
      <GoToContractButton />
    </Stack>
  );
};