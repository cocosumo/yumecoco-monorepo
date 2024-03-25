import { Stack } from '@mui/material';
import { AlertButton } from './AlertButton';
import { isProd } from 'config';
import { getAlertIssuer } from './getAlertIssuer';
import { useEmployees } from 'kokoas-client/src/hooksQuery';



export const UnisssuedInvoiceAlert = ({
  projId,
}: {
  projId: string
}) => {
  const { data: employees } = useEmployees();

  if (isProd) return; // 開発中設定、機能実装時に削除すること

  // アラート発行権限の確認
  const isAlertIssuer = getAlertIssuer(employees);
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
