import { Button, Dialog, DialogActions, DialogContent, DialogProps, Typography } from '@mui/material';
import { useReducer } from 'react';
import { AddressDialogTitle } from './AddressDialogTitle';
import { addressReducer, initialValues } from './addressReducer';
import { Areas } from './choices/Areas';

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

  const {
    activeStep,
  } = state;

  return (
    <Dialog
      {...otherDialogProps}
      open={true}
      onClose={handleClose}
      maxWidth={'md'}
    >
      <AddressDialogTitle state={state} dispatch={dispatch}  />
      <DialogContent>
        {
          (() => {
            switch (activeStep) {
              case 0: 
                return <Areas handleClick={(value) => dispatch({ type: 'setPref', pref: value })} />;
            }
          })()
        }
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