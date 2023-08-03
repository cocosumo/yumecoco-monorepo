import { Dialog, DialogTitle, Step, StepLabel, Stepper } from '@mui/material';
import { useState } from 'react';
import { StepConfirmation } from './StepConfirmation';
import { StepChooseSignMethod } from './StepChooseSignMethod';
import { TSignMethod } from 'types';
import { useSendContract } from 'kokoas-client/src/hooksQuery';
import { useFormContext } from 'react-hook-form';
import { TypeOfForm } from '../../../schema';
import { Loading } from 'kokoas-client/src/components/ui/loading/Loading';
import { ukeoiContractVersion } from 'config';
import { EnvelopeRecipients } from 'docusign-esign';
import { SigningFlow } from './SigningFlow';

const steps = ['契約日確認', '署名手法', '送信前確認'];

export const StartDialog = ({
  open,
  handleClose,
  recipients,
} : {
  open: boolean
  handleClose: () => void
  recipients?: EnvelopeRecipients
}) => {
  const [method, setMethod] = useState<TSignMethod>('electronic');
  const [activeStep, setActiveStep] = useState(0);

  const {
    getValues,
  } = useFormContext<TypeOfForm>();

  const {
    mutateAsync,
    isLoading,
  } = useSendContract();

  const handleSendContract = async () => {
    const contractId = getValues('contractId') as string;
    await mutateAsync({ contractId, signMethod: method, ukeoiDocVersion: ukeoiContractVersion });

    handleClose();
  };

  const handleCloseDialog = () => {
    handleClose();
    setActiveStep(0);
  };

  const handleChooseMethod = (selectedMethod: TSignMethod) => {
    setMethod(selectedMethod);
    setActiveStep(prev => prev + 1);
  };


  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth={'sm'}
      disablePortal
      sx={{
        zIndex: 5002, // So it will be above the App bar
      }}
      key={'start-dialog'}
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
      {activeStep === 0 && (
      <StepConfirmation 
        handleCancel={handleCloseDialog}
        handleYes={() => setActiveStep(prev => prev + 1)}
      /> 
      )}

      {activeStep === 1 && (
      <StepChooseSignMethod handleChooseMethod={handleChooseMethod} handleClose={handleCloseDialog} />
      )}

      {!isLoading && activeStep === 2 && (
        <SigningFlow 
          recipients={recipients}
          method={method}
          handleSendContract={handleSendContract}
          handleCancel={handleCloseDialog}
        />)}
 


      {isLoading && activeStep === 2 && (
      <Loading />
      )}

    </Dialog>

            
  );
};