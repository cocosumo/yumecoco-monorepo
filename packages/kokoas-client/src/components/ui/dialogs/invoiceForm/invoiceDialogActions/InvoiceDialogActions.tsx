import {  CircularProgress, DialogActions, Stack } from '@mui/material';
import { useIsFormIdle } from 'kokoas-client/src/hooks/useIsFormIdle';
import { NextStateButton } from './NextStateButton';
import { PrevStateButton } from './PrevStateButton';
import { Checker } from './Checker';

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

      {isFormIdle && (
        <Stack 
          justifyContent={'center'}
          alignItems={'center'}
          flexGrow={1}
          direction={'row'}
          spacing={2}
        >

          <NextStateButton />
          <Checker />
        </Stack>

      )}
      
      {!isFormIdle && (
        <CircularProgress size={16} />
      )}
    </DialogActions>
  );
};