import { Button, DialogActions } from '@mui/material';

export const ORDialogActions = () => {
  return (
    <DialogActions
      sx={{
        justifyContent: 'center',
      }}
    >
      <Button 
        color={'info'} 
        variant={'contained'}
        onClick={() => alert('未実装です。もうしばらくお待ちください。')}
      >
        発注書発行
      </Button>
    </DialogActions>
  );
};