import { DialogActions, Stack } from '@mui/material';
import { SaveButton } from './SaveButton';
import { DownloadButton } from './DownloadButton';
import { ReturnButton } from './returnButton.tsx/ReturnButton';
import { useOrderWatch } from '../hooks/useOrderRHF';
import { TOrderForm } from '../schema';

export const OrderDialogActions = () => {
  const orderId = useOrderWatch({
    name: 'orderId',
  }) as TOrderForm['orderId'];

  const hasOrder = !!orderId;

  return (
    <DialogActions>
      {hasOrder && <ReturnButton />}
      
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