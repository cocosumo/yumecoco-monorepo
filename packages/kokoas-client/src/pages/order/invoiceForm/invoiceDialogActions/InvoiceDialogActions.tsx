import { Box, CircularProgress, DialogActions } from '@mui/material';
import { useIsFormIdle } from 'kokoas-client/src/hooks/useIsFormIdle';
import { NextStateButton } from './NextStateButton';
import { PrevStateButton } from './PrevStateButton';

export const InvoiceDialogActions = () => {
  const isFormIdle = useIsFormIdle();



  return (
    <DialogActions
      sx={{
        justifyContent: 'space-between',
        height: '50px',
      }}
    >
      <PrevStateButton />

      <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center' }}>
        <NextStateButton />
      </Box>
      
      {!isFormIdle && (
        <CircularProgress size={16} />
      )}
    </DialogActions>
  );
};