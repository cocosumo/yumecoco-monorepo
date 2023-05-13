import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { DialogCloseButton } from 'kokoas-client/src/components';
import { Loading } from 'kokoas-client/src/components/ui/loading/Loading';
import { useContractCorrectView } from 'kokoas-client/src/hooksQuery';
import { TypeOfForm } from 'kokoas-client/src/pages/projContractV2/schema';
import { useFormContext } from 'react-hook-form';


export const EditContractDialog = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const { getValues } = useFormContext<TypeOfForm>();
  const { 
    mutateAsync: getContractView, 
    isLoading,
  } = useContractCorrectView();

  const handleOpenCorrectView = async () => {
    const envelopeId = getValues('envelopeId');
    const {
      url,
    } = await getContractView(envelopeId as string);
    window.open(url, '_blank');
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth={'sm'}
    >
      <DialogTitle >
        修正しますか。
        <DialogCloseButton handleClose={handleClose} />
      </DialogTitle>
      <DialogContent>
        {isLoading && (
          <Loading />
        )}
        {!isLoading && (
        <Alert
          severity="info"
        >
          送信したエンベロープが完了していない場合は、そのエンベロープを修正することができます。
        </Alert>
        )}

      </DialogContent>

      {!isLoading && (
        <DialogActions>
          <Button onClick={handleClose}>
            キャンセル
          </Button>
          <Button
            variant='contained'
            onClick={handleOpenCorrectView}
          >
            修正
          </Button>
        </DialogActions>
      )}
      

    </Dialog>
  );
};