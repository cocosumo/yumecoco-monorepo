import { Button, DialogTitle, Grid, Step, StepButton, Stepper } from '@mui/material';
import { Dispatch } from 'react';
import { Actions, TypeOfForm } from './addressReducer';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
const steps = [
  '都道府県',
  '市区町村',
  '町域',
];

export const AddressDialogTitle = ({
  state,
  dispatch,
}: {
  state: TypeOfForm
  dispatch: Dispatch<Actions>
}) => {
  const { activeStep } = state;

  return (
    <DialogTitle component={'span'} mt={2}>
      <Grid container>
        <Grid item xs={2}>
          <Button 
            disabled={activeStep === 0}
            onClick={()=> dispatch({ type: 'stepback' })}
            startIcon={<ArrowBackIosIcon />}
          >
            戻る
          </Button>
        </Grid>
        <Grid item xs={8}>
          <Stepper activeStep={activeStep}>
 
            {steps.map((label, index) => (
              <Step key={label}>
                <StepButton onClick={()=>dispatch({ type: 'stepTo', index })} >
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>
        </Grid>

      </Grid>



    </DialogTitle>
  );
};