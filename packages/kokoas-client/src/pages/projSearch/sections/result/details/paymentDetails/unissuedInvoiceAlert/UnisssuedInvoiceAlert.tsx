import { Stack } from '@mui/material';
import { AlertButton } from './AlertButton';
import { useAlertIssuer } from './hooks/useAlertIssuer';



export const UnisssuedInvoiceAlert = ({
  projId,
}: {
  projId: string
}) => {
  // アラート発行権限の確認
  const isAlertIssuer = useAlertIssuer();
  if (!isAlertIssuer) return;

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
