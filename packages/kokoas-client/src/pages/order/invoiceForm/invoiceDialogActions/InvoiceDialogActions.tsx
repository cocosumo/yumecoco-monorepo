import { Button, DialogActions } from '@mui/material';

export const InvoiceDialogActions = () => {
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
          alert('請求確認はまだ実装されていません。');
        }}
      >
        請求確認
      </Button>
    </DialogActions>
  );
};