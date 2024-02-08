import { Button, Dialog, DialogActions, DialogTitle, Typography } from '@mui/material';
import { DialogCloseButton } from 'kokoas-client/src/components';
import { AlertDialogContent } from './AlertDialogContent';
import { useProjById } from 'kokoas-client/src/hooksQuery';
import { saveReminder } from './saveReminder/saveReminder';
import { IProjects } from 'types';

export const AlertDialog = ({
  open,
  handleClose,
  projId,
}: {
  open: boolean
  handleClose: () => void
  projId: string
}) => {

  const { data: recProj } = useProjById(projId);

  const handleAlert = () => {
    handleClose();
    saveReminder(recProj || {} as IProjects);


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

      <AlertDialogContent agents={recProj?.agents} />

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
