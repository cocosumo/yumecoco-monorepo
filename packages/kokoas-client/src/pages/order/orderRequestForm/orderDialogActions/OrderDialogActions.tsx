import { DialogActions, Stack } from '@mui/material';
import { SaveButton } from './SaveButton';
import { DownloadButton } from './DownloadButton';
import { ReturnButton } from './returnButton/ReturnButton';
import { useOrderStatus } from '../hooks/useOrderStatus';
import { DeleteButton } from './deleteButton/DeleteButton';

export const OrderDialogActions = () => {
  const {
    orderStatus,
  } = useOrderStatus();


  return (
    <DialogActions>
      {orderStatus === '発注済' && <ReturnButton />}
      {orderStatus === '未発注' && <DeleteButton />}
      
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