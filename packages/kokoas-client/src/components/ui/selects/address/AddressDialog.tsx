import { Button, Dialog, DialogActions, DialogContent, DialogProps, Typography } from '@mui/material';
import { useReducer } from 'react';
import { AddressDialogTitle } from './AddressDialogTitle';
import { addressReducer, initialValues } from './addressReducer';
import { Cities } from './choices/Cities';
import { Prefectures } from './choices/Prefectures';
import { Towns } from './choices/Towns';

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
    prefecture,
    city,
  } = state;

  return (
    <Dialog
      {...otherDialogProps}
      open={true}
      onClose={handleClose}
      fullWidth
      maxWidth={'md'}
      PaperProps={{
        sx: {
          height: 650, // fix height across steps
        },
      }}
    >
      <AddressDialogTitle state={state} dispatch={dispatch}  />
      <DialogContent>
        {
          (() => {
            switch (activeStep) {
              case 0: 
                return <Prefectures handleClick={(value) => dispatch({ type: 'setPref', pref: value })} />;
              case 1:
                return <Cities prefecture={prefecture} handleClick={(value) => dispatch({ type: 'setCity', city: value })}  />;
              case 2:
                return <Towns prefecture={prefecture} city={city} handleClick={(value) => dispatch({ type: 'setTown', town: value })} />;
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