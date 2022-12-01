import { Button, DialogTitle, Grid, Step, StepButton, Stepper } from '@mui/material';
import { Dispatch } from 'react';
import { Actions, TypeOfForm } from './addressReducer';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { CloseButton } from '../../buttons/CloseButton';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const AddressDialogTitle = ({
  state,
  dispatch,
  handleClose,
}: {
  state: TypeOfForm,
  dispatch: Dispatch<Actions>,
  handleClose: () => void
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
    <DialogTitle component={'span'}>
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
                <StepButton
                  disableRipple
                  icon={completed[index] ? <CheckCircleIcon color='success' /> : undefined}
                  onClick={()=>dispatch({ type: 'stepTo', payload: index })}
                  sx={{
                    transform: `scale(${activeStep === index ? 1.2 : 1})`,
                    transition: 'all 0.2s ease-in',
                  }}
                >
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>
        </Grid>

        <Grid
          item
          xs={2}
        >
          <CloseButton
            onClick={handleClose}
            sx={{
              position: 'relative',
              top: '-6px',
              left: '115px',
            }}
          />
        </Grid>

      </Grid>

    </DialogTitle>
  );
};