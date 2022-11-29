import { Button, Dialog, DialogActions, DialogContent, DialogProps, Typography } from '@mui/material';
import { useReducer } from 'react';
import { AddressDialogTitle } from './AddressDialogTitle';
import { addressReducer, initialValues } from './addressReducer';

export const AddressDialog = ({
  open,
  handleClose,
  ...otherDialogProps
} : DialogProps & {
  handleClose: () => void
}) => {

  const [
    state, 
    dispatch,
  ] = useReducer(addressReducer, initialValues);

  return (
    <Dialog
      {...otherDialogProps}
      open={open}
      PaperProps={{ sx: { height: '80vh' } }}
      onClose={handleClose}
      fullWidth
      maxWidth={'md'}
    >
      <AddressDialogTitle state={state} dispatch={dispatch}  />
      <DialogContent>

      </DialogContent>
      <DialogActions sx={{
        justifyContent: 'space-between',
      }}
      >
        <Typography variant="caption">
          出典: 日本郵便株式会社
        </Typography>
        <Button variant={'outlined'} onClick={handleClose}>
          閉じる
        </Button>
      </DialogActions>
      
    </Dialog>
  );
};