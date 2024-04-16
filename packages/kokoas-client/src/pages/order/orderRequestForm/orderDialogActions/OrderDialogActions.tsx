import { DialogActions } from '@mui/material';
import { SaveButton } from './SaveButton';
import { DownloadButton } from './DownloadButton';

export const OrderDialogActions = () => {
  return (
    <DialogActions
      sx={{
        justifyContent: 'center',
      }}
    >
      <SaveButton />
      <DownloadButton />
    </DialogActions>
  );
};