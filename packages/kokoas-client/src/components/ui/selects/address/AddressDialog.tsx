import {  Dialog, DialogContent, DialogProps } from '@mui/material';
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
    town,
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
      <AddressDialogTitle
        state={state}
        dispatch={dispatch}
        handleClose={handleClose}
      />
      <DialogContent>
        {(() => {
          switch (activeStep) {
            case 0:
              return (
                <Prefectures
                  selected={prefecture}
                  handleClick={(value) => dispatch({ type: 'setPref', payload: value })}
                />);
            case 1:
              return (
                <Cities
                  selectedCity={city}
                  prefecture={prefecture} handleClick={(value) => dispatch({ type: 'setCity', payload: value })}
                />);
            case 2:
              return (
                <Towns
                  selectedTown={town}
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
        })()}

      </DialogContent>

    </Dialog>
  );
};