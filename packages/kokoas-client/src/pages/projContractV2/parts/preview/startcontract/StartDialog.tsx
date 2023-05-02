import { Dialog, DialogContent, DialogTitle, Step, StepLabel, Stepper } from '@mui/material';
import { useState } from 'react';
import { StepConfirmation } from './StepConfirmation';
import { StepChooseSignMethod } from './StepChooseSignMethod';

const steps = ['契約日確認', '署名手法', '送信済'];

export const StartDialog = ({
  open,
  handleClose,
} : {
  open: boolean
  handleClose: () => void
}) => {

  const [activeStep, setActiveStep] = useState(0);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth={'sm'}
      disablePortal
      sx={{
        zIndex: 5002, // So it will be above the App bar
      }}
    >
      <DialogTitle sx={{ p: 4 }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </DialogTitle>
      <DialogContent>

        {activeStep === 0 && (
        <StepConfirmation 
          handleCancel={handleClose}
          handleYes={() => setActiveStep(prev => prev + 1)}
        />)}

        {activeStep === 1 && (
          <StepChooseSignMethod />
        )}

      </DialogContent>

    </Dialog>

            
  );
};