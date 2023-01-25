
import useFileUpload from 'react-use-file-upload';
import { Stack } from '@mui/material';
import { StepAttach } from './StepAttach';
import { StepSelectProject } from './StepSelectProject';
import { EstDragAreaContainer } from './EstDragAreaContainer';
import { useUploadDaikokuGenka } from 'kokoas-client/src/hooksQuery';
import { useURLParams } from 'kokoas-client/src/hooks/useURLParams';
import { Steps } from './Steps';
import { useCallback, useState } from 'react';
import { Loading } from '../../../loading/Loading';
import { StepCheckInfo } from './StepCheckInfo';
import { StepCheckItems } from './stepCheckItems';
import { useIsMutating } from '@tanstack/react-query';
import { StepComplete } from './StepComplete';

export const EstUploadDialogContent = () => {
  const { projId } = useURLParams();
  const [activeStep, setActiveStep] = useState(0);
  const fileUploadReturn = useFileUpload();
  const isLoading = useIsMutating();

  const {
    files,
    setFiles,
    clearAllFiles,
  } = fileUploadReturn;

  const {
    mutate,
    data: parsedDaikoku,
  } = useUploadDaikokuGenka({
    onSuccess: () => {
      setActiveStep(2);
    },
  });


  const handleReset = () => {
    clearAllFiles();
    setActiveStep(0);
  };

  const handleNext = () => {
    setActiveStep(prev => prev + 1);
  };

  const handleFileAttached = useCallback((e: Event) => {
    setActiveStep(1);
    setFiles(e);
  }, [setFiles]);

  const handleSubmit = useCallback(async (e: Event) => {
    e.preventDefault();
    mutate({
      projId: projId ?? '',
      fileBlob: files[0],
    });
  }, [mutate, files, projId]);

  return (
    <Stack
      spacing={2}
      height={'100%'}
      alignItems={'center'} // center children, but bypassed default behavior of flex where children take full width.
    >
      <Steps activeStep={activeStep} />
      {!!isLoading && (
        <Loading />
      )}
      {!isLoading && (
        <EstDragAreaContainer {...fileUploadReturn} handleFileAttached={handleFileAttached} >

          {activeStep === 0 && (
          <StepAttach handleFileAttached={handleFileAttached} />)}

          {activeStep === 1 && (
          <StepSelectProject
            {...fileUploadReturn}
            handleReset={handleReset}
            handleSubmit={handleSubmit}
            projId={projId}
          />)}

          {activeStep === 2 && !!parsedDaikoku && (
            <StepCheckInfo
              parsedDaikoku={parsedDaikoku}
              projId={projId}
              handleNext={handleNext}
            />
          )}

          {activeStep === 3 && !!parsedDaikoku && !!projId && (
            <StepCheckItems
              projId={projId}
              handleNext={handleNext}
              parsedDaikoku={parsedDaikoku}
            />
          )}

          {activeStep === 4 && (
            <StepComplete handleReset={handleReset} />
          )}

        </EstDragAreaContainer>
      )}

    </Stack>
  );
};