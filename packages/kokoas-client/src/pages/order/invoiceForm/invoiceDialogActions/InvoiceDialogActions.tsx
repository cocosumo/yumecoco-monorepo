import { Button, DialogActions } from '@mui/material';
import { useSaveInvoiceForm } from '../hooks/useSaveInvoiceForm';

export const InvoiceDialogActions = () => {
  const {
    handleSubmit,
  } = useSaveInvoiceForm();

  return (
    <DialogActions
      sx={{
        justifyContent: 'center',
      }}
    >
      <Button
        color='info'   
        variant='contained' 
        onClick={() => {
          handleSubmit();
        }}
      >
        請求確認
      </Button>
    </DialogActions>
  );
};