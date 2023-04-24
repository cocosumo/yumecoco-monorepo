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
  mode,
} : {
  open: boolean
  handleClose: () => void
  mode: '登録' | '更新'
}) => {
  const { projId } = useURLParams<TypeOfForm>();
  const { data, isLoading } = useConvertToAndpadByProjId(
    open ? projId : '',
    {
      onError: handleClose,
    },
  );

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
      maxWidth={'md'}
      fullWidth
    >
      <DialogTitle>
        {`Andpadへ案件${mode}しますか？`}
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