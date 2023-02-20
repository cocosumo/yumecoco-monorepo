import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { AndpadButton } from 'kokoas-client/src/components/ui/buttons/AndpadButton';
import { AndpadLogo } from 'kokoas-client/src/components/ui/icons';
import { useURLParams } from 'kokoas-client/src/hooks/useURLParams';
import { useSaveAndpadProject } from 'kokoas-client/src/hooksQuery';
import { TypeOfForm } from '../../form';
import { SaveToAndpadDialogContent } from './SaveToAndpadDialogContent';

export const SaveToAndpadDialog = ({
  open,
  handleClose,
} : {
  open: boolean
  handleClose: () => void
}) => {
  const { projId } = useURLParams<TypeOfForm>();
  const { mutate: mutateAndpad } = useSaveAndpadProject(projId || '');


  const handleClick = () => {
    mutateAndpad();
    handleClose();
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
      <SaveToAndpadDialogContent andpadProject={{} as any} />
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