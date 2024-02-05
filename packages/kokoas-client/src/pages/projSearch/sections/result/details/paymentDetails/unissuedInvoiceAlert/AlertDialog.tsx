import { Dialog, DialogTitle, Typography } from '@mui/material';
import { DialogCloseButton } from 'kokoas-client/src/components';

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
          pb: 0,
          display: 'relative',
        }}
      >
        <Typography variant='h6' >
          調整中です
        </Typography>
      </DialogTitle>

      <DialogCloseButton handleClose={handleClose} />

    </Dialog>);

};
