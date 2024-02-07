import { Button, Dialog, DialogActions, DialogTitle, Typography } from '@mui/material';
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
  const handleAlert = () => {
    handleClose();
    // TODO リマインダーアプリ登録処理

    // TODO アラート通知処理
  };


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
          担当者へ請求書の発行要求を通知します
        </Typography>

      </DialogTitle>

      <AlertDialogContent projId={projId} />

      <DialogCloseButton handleClose={handleClose} />
      <DialogActions>
        <Button onClick={handleClose}>
          キャンセル
        </Button>
        <Button onClick={handleAlert} autoFocus>
          chatworkに送信
        </Button>
      </DialogActions>

    </Dialog>);

};
