import { CircularProgress, DialogActions } from '@mui/material';
import { useIsFormIdle } from 'kokoas-client/src/hooks/useIsFormIdle';
import { NextStateButton } from './NextStateButton';
import { PrevStateButton } from './PrevStateButton';

export const InvoiceDialogActions = () => {
  const isFormIdle = useIsFormIdle();



  return (
    <DialogActions
      sx={{
        justifyContent: 'center',
        height: '50px',
      }}
    >
      <NextStateButton />
      <PrevStateButton />
      
      {!isFormIdle && (
        <CircularProgress size={16} />
      )}
    </DialogActions>
  );
};