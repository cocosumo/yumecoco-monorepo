import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { AndpadButton } from 'kokoas-client/src/components/ui/buttons/AndpadButton';
import { AndpadLogo } from 'kokoas-client/src/components/ui/icons';
import { useSnackBar } from 'kokoas-client/src/hooks';
import { SaveToAndpadDialogContent } from './SaveToAndpadDialogContent';

export const SaveToAndpadDialog = ({
  open,
  handleClose,
} : {
  open: boolean
  handleClose: () => void
}) => {
  const { setSnackState } = useSnackBar();

  const handleClick = () => {
    setSnackState({ open:true, message: '開発中です', severity: 'warning' });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      keepMounted={false}
      maxWidth={'xs'}
    >
      <DialogTitle>
        アンドパッドへ登録しますか。
      </DialogTitle>
      <SaveToAndpadDialogContent />
      <DialogActions>
        <Button onClick={handleClose}>
          キャンセル
        </Button>
        <AndpadButton
          onClick={handleClick}
          startIcon={<AndpadLogo />}
        >
          はい
        </AndpadButton>
      </DialogActions>
    </Dialog>
  );
};