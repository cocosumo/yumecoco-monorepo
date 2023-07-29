import { Paper, Stack } from '@mui/material';
import { InputForm } from './inputForm/InputForm';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

interface CertViewerContentProps {
  canvasRef: (node: HTMLCanvasElement) =>  void;
  hideCanvas?: boolean;
}


export const CertViewerContent = (props: CertViewerContentProps) => {

  const {
    canvasRef,
  } = props;

  return (
    <Stack
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

      <TransformWrapper>
        <TransformComponent>

          <canvas 
            ref={canvasRef}
          />

        </TransformComponent>

      </TransformWrapper>   


      <InputForm />
    </Stack>
  );


};