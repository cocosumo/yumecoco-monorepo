import { Button, DialogTitle, Grid, Step, StepButton, Stepper } from '@mui/material';
import { Dispatch } from 'react';
import { Actions, TypeOfForm } from './addressReducer';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export const AddressDialogTitle = ({
  state,
  dispatch,
}: {
  state: TypeOfForm
  dispatch: Dispatch<Actions>
}) => {
  const { 
    activeStep, 
    prefecture,
    city,
    town,
  } = state;

  

  const steps = [
    prefecture || '都道府県',
    city || '市区町村',
    town || '町域',
  ];

  const completed = [!!prefecture, !!city, !!town];

  const resolveDisabled = (index: number) => {
  
    switch (index) {
      case 0: return false;
      case 1: 
      case 2: {
        return !completed[index - 1];
      }
    }
  };   

  return (
    <DialogTitle component={'span'} mt={2}>
      <Grid container>
        <Grid item xs={2}>
          <Button 
            disabled={activeStep === 0}
            onClick={()=> dispatch({ type: 'stepback' })}
            startIcon={<ArrowBackIosIcon />}
            size={'large'}
          >
            戻る
          </Button>
        </Grid>
        <Grid item xs={8}>
          <Stepper nonLinear activeStep={activeStep} alternativeLabel>
 
            {steps.map((label, index) => (
              <Step 
                key={label} 
                completed={completed[index]} 
                disabled={resolveDisabled(index)}
              >
                <StepButton onClick={()=>dispatch({ type: 'stepTo', payload: index })} >
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