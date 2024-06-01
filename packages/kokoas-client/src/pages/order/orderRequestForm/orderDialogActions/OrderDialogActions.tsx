import { DialogActions, Stack } from '@mui/material';
import { SaveButton } from './SaveButton';
import { DownloadButton } from './DownloadButton';
import { ReturnButton } from './returnButton.tsx/ReturnButton';
import { useOrderStatus } from '../hooks/useOrderStatus';

export const OrderDialogActions = () => {
  const {
    orderStatus,
  } = useOrderStatus();


  return (
    <DialogActions>
      {orderStatus === '発注済' && <ReturnButton />}
      
      <Stack
        spacing={2}
        direction="row"
        justifyContent="center"
        flexGrow={1}
      >
        <SaveButton />
        <DownloadButton />
      </Stack>

    </DialogActions>
  );
};