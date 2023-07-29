import { Paper, Stack } from '@mui/material';
import { forwardRef } from 'react';
import { InputForm } from './inputForm/InputForm';

interface CertViewerContentProps {
  canvasRef: (node: HTMLCanvasElement) =>  void;
}


export const CertViewerContent = forwardRef<HTMLDivElement, CertViewerContentProps>((props, ref) => {

  const {
    canvasRef,
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
      justifyContent={'center'}
    >
      <Paper
        sx={{
          m: 1,
        }}
      >
        <canvas 
          ref={canvasRef} 
        />

      </Paper>

      <InputForm />
    </Stack>
  );
});

CertViewerContent.displayName = 'CertViewerContent';