import { Button, Stack } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

export const FormActions = () => {
  return (
    <Stack direction={'row'} spacing={2}>
      <Button
        startIcon={<SaveIcon />}
        variant='contained'
      >
        保存
      </Button>
    </Stack>
  );
};