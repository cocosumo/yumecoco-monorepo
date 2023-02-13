import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { AndpadButton } from 'kokoas-client/src/components/ui/buttons/AndpadButton';
import { AndpadLogo } from 'kokoas-client/src/components/ui/icons';
import { useURLParams } from 'kokoas-client/src/hooks/useURLParams';
import { TypeOfForm } from '../../form';

export const SaveToAndpadDialog = ({
  open,
  handleClose,
} : {
  open: boolean
  handleClose: () => void
}) => {
  const { projId } = useURLParams<TypeOfForm>();
  console.log(projId);

  return (
    <Dialog open={open} onClose={handleClose} keepMounted={false}>
      <DialogTitle>
        アンドパッドへ登録
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          すでに登録しているなら、更新されます。
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>
          キャンセル
        </Button>
        <AndpadButton startIcon={<AndpadLogo />}>

          登録
        </AndpadButton>
      </DialogActions>
    </Dialog>
  );
};