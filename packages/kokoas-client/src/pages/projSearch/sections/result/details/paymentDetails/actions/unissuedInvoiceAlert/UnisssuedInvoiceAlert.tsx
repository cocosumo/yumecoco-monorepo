import { Stack } from '@mui/material';
import { AlertButton } from '../../../common/AlertButton';



export const UnisssuedInvoiceAlert = () => {

  return (
    <Stack
      direction={'row'}
      alignItems={'flex-start'}
      justifyContent={'flex-end'}
    >
      <AlertButton
        title='請求書発行を担当者へ通知する'
      >
        アラート発行
      </AlertButton>
    </Stack>
  );
};
