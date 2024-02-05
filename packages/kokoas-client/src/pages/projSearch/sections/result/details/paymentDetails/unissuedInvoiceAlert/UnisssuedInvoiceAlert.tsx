import { Stack } from '@mui/material';
import { AlertButton } from './AlertButton';



export const UnisssuedInvoiceAlert = ({
  projId,
}:{
  projId: string
}) => {

  return (
    <Stack
      direction={'row'}
      alignItems={'flex-start'}
      justifyContent={'flex-end'}
    >
      <AlertButton projId={projId} />
    </Stack>
  );
};
