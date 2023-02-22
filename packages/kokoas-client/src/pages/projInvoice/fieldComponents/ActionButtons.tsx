import { Button, Stack } from '@mui/material';
import { useFormikContext } from 'formik';
import { useSnackBar } from 'kokoas-client/src/hooks';
import { TypeOfForm } from '../form';

export const ActionButtons = () => {

  const { submitForm, values } = useFormikContext<TypeOfForm>();
  const { invoiceStatus } = values;
  const { setSnackState } = useSnackBar();
  const isCreating = invoiceStatus === 'created' || invoiceStatus === '';
  const isSent = invoiceStatus === 'sent';


  const handlesubmit = () => {
    setSnackState({
      open: true,
      severity: 'warning',
      message: '開発中です',
    });
  };

  return (
    <Stack
      direction="row"
      justifyContent="flex-start"
      spacing={2}
    >
      <Button
        variant="contained"
        onClick={submitForm}
        disabled={isSent}
      >
        保存
      </Button>
      
      <Button
        variant="contained"
        onClick={handlesubmit}
        disabled={isSent}
      >
        請求書発行
      </Button>
      
      {!isCreating && 
      <Button
        variant="contained"
        onClick={handlesubmit}
      >
        再発行
      </Button>}
      
      {!isCreating && 
      <Button
        variant="contained"
        onClick={handlesubmit}
      >
        破棄
      </Button>}
    </Stack>
  );
};