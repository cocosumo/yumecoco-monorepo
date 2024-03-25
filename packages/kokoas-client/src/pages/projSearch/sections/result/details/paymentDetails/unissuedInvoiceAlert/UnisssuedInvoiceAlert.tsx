import { Stack } from '@mui/material';
import { AlertButton } from './AlertButton';
import { isProd } from 'config';



export const UnisssuedInvoiceAlert = ({
  projId,
}: {
  projId: string
}) => {

  if (isProd) return;

  // アラート発行の担当者かどうかを確認する
  const getAlertIssuer = () => {
    // 経理担当者もしくはシステム担当者

    return false;
  };

  const isAlertIssuer = getAlertIssuer();

  if (isAlertIssuer) return;

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
