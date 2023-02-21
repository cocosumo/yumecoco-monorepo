import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { AndpadButton } from 'kokoas-client/src/components/ui/buttons/AndpadButton';
import { AndpadLogo } from 'kokoas-client/src/components/ui/icons';
import { useURLParams } from 'kokoas-client/src/hooks/useURLParams';
import { useConvertToAndpadByProjId, useSaveAndpadProject } from 'kokoas-client/src/hooksQuery';
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
  const { data, isLoading } = useConvertToAndpadByProjId(open ? projId : '');

  const { mutate: mutateAndpad } = useSaveAndpadProject();


  const handleClick = () => {
    if (data) {
      mutateAndpad(data);
    }
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      keepMounted={false}
      maxWidth={'xs'}
      fullWidth
    >
      <DialogTitle>
        アンドパッドへ登録しますか。
      </DialogTitle>
      <SaveToAndpadDialogContent isLoading={isLoading} convertedData={data} />
      <DialogActions>
        <Button onClick={handleClose}>
          キャンセル
        </Button>
        <AndpadButton
          onClick={handleClick}
          startIcon={<AndpadLogo />}
          disabled={isLoading}
        >
          はい
        </AndpadButton>
      </DialogActions>
    </Dialog>
  );
};