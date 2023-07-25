import { Box, LinearProgress } from '@mui/material';
import { imageAssets } from 'config';
import { useExternalImage } from 'kokoas-client/src/hooksQuery';
import { forwardRef } from 'react';

interface CertViewerContentProps {
  contractId: string;
}

const frameUrl = `${imageAssets}/ContractReport.png`;

export const CertViewerContent = forwardRef<HTMLDivElement, CertViewerContentProps>((props, ref) => {

  const  {
    contractId,
  } = props;

  const {
    data: base64Png,
    isLoading,
  } = useExternalImage({
    url: frameUrl,
  });

  if (isLoading) {
    return <LinearProgress />;
  }

  return (
    <Box
      ref={ref}
      sx={{
        height: '75vh',
        // fit image to container
        backgroundSize: 'contain',
        overflow: 'hidden',
        width: 'fit-content',
      }}
    >
      <img 
        src={`data:image/png;base64,${base64Png}`}
        height={'100%'}
      />
    </Box>
  );
});

CertViewerContent.displayName = 'CertViewerContent';