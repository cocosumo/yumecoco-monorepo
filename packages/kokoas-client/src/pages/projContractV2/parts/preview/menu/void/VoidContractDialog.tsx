import { Dialog, DialogContent, DialogTitle, Step, StepLabel, Stepper } from '@mui/material';
import { DialogCloseButton } from 'kokoas-client/src/components';
import { useState } from 'react';
import { StepConfirmation } from './StepConfirmation';
import { StepReason } from './StepReason';

const steps = ['確認', '理由記入'];

export const VoidContractDialog = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleCloseDialog = () => {
    setActiveStep(0);
    handleClose();
  };

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };


  return (
    <Dialog
      open={open}
      onClose={handleCloseDialog}
      fullWidth
      maxWidth={'sm'}
    >
      <DialogTitle sx={{ px: 4, pt: 5, pb: 4 }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        <DialogCloseButton handleClose={handleCloseDialog} />
      </DialogTitle>
      <DialogContent>
        {activeStep === 0 && (
          <StepConfirmation handleNext={handleNext} />
        )}
        {activeStep === 1 && (
          <StepReason 
            handleCloseDialog={handleCloseDialog}
            handleNext={handleNext}
          />
        )}
      </DialogContent>

    </Dialog>
  );
};