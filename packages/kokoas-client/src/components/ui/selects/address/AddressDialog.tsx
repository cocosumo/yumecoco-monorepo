import { Button, Dialog, DialogActions, DialogContent, DialogProps, Typography } from '@mui/material';
import { useReducer } from 'react';
import { AddressDialogTitle } from './AddressDialogTitle';
import { addressReducer, initialValues, TypeOfForm } from './addressReducer';
import { Cities } from './choices/Cities';
import { Prefectures } from './choices/Prefectures';
import { Towns } from './choices/Towns';

export const AddressDialog = ({
  open,
  handleClose,
  handleChange,
  ...otherDialogProps
} : DialogProps & {
  handleClose: () => void,
  handleChange: (address: TypeOfForm) => void
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
      open={open}
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
                return <Prefectures handleClick={(value) => dispatch({ type: 'setPref', payload: value })} />;
              case 1:
                return <Cities prefecture={prefecture} handleClick={(value) => dispatch({ type: 'setCity', payload: value })}  />;
              case 2:
                return (
                  <Towns 
                    prefecture={prefecture} 
                    city={city} 
                    handleClick={(location) => {
                      dispatch({ type: 'setTown', payload: location });
                      handleChange({ 
                        ...state,
                        ...location,
                      });
                    }}
                  />);
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