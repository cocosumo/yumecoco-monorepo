import { Button, Stack } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import PreviewIcon from '@mui/icons-material/Preview';
export const PaymentFormActions = () => {
  return (
    <Stack
      direction="row"
      justifyContent={'center'}
      spacing={2}
      pt={2}
    >
      <Button variant="outlined" size="large" startIcon={<SaveIcon />}>
        保存
      </Button>
      <Button variant="outlined" size="large" startIcon={<PreviewIcon />}>
        契約
      </Button>
    </Stack>
  );
};