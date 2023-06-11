import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { DetailsContent } from './DetailsContent';

export const DetailsDialog = ({
  open,
  projId,
  handleClose,
}: {
  open: boolean
  projId: string
  handleClose: () => void
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={'md'}
      fullWidth
    >
      <DialogTitle>
        詳細
      </DialogTitle>

      <DetailsContent projId={projId} />

      <DialogActions>
        <Button onClick={handleClose}>
          閉じる
        </Button>
      </DialogActions>
    </Dialog>
  );
};