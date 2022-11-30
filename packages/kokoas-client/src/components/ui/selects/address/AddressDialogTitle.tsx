import { Button, DialogTitle, Grid, Step, StepButton, Stepper } from '@mui/material';
import { Dispatch, useMemo } from 'react';
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

  

  const steps = useMemo(() => ([
    prefecture || '都道府県',
    city || '市区町村',
    town || '町域',
  ]), [prefecture, city, town]);
  

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
          <Stepper activeStep={activeStep} alternativeLabel>
 
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