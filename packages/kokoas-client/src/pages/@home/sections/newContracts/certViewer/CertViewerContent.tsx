import { Box, Paper, Stack } from '@mui/material';
import { forwardRef } from 'react';
import { InputForm } from './InputForm';

interface CertViewerContentProps {
  imageBase64: string;
}


export const CertViewerContent = forwardRef<HTMLDivElement, CertViewerContentProps>((props, ref) => {

  const  {
    imageBase64,
  } = props;


  return (
    <Stack
      ref={ref}
      direction='row'
      spacing={2}
      sx={{
        // fit image to container
        backgroundSize: 'contain',
        overflow: 'hidden',
        height: '100%',
      }}
    >
      <Box
        component={Paper}
      >
        <img 
          src={imageBase64}
          height={'100%'}
        />
      </Box>

      <InputForm />
    </Stack>
  );
});

CertViewerContent.displayName = 'CertViewerContent';