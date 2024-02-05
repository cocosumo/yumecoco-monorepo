import { Dialog, DialogTitle, Typography } from '@mui/material';
import { DialogCloseButton } from 'kokoas-client/src/components';
import { AlertDialogContent } from './AlertDialogContent';

export const AlertDialog = ({
  open,
  handleClose,
  projId,
}: {
  open: boolean
  handleClose: () => void
  projId: string
}) => {


  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={'sm'}
      fullWidth
      PaperProps={{
        sx: {
          height: '50vh',
        },
      }}
    >
      <DialogTitle
        sx={{
          pb: 1,
          display: 'relative',
        }}
      >
        <Typography variant='h6'>
          請求書未発行のアラートを担当者へ通知します
        </Typography>

      </DialogTitle>

      <AlertDialogContent projId={projId} />

      <DialogCloseButton handleClose={handleClose} />

    </Dialog>);

};
