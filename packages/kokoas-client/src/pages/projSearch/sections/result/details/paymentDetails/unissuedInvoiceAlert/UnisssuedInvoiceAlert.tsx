import { Stack } from '@mui/material';
import { AlertButton } from './AlertButton';
import { isProd } from 'config';



export const UnisssuedInvoiceAlert = ({
  projId,
}:{
  projId: string
}) => {
  if (isProd) return;

  return (
    <Stack
      direction={'row'}
      alignItems={'flex-end'}
      justifyContent={'flex-end'}
    >
      <AlertButton projId={projId} />
    </Stack>
  );
};
