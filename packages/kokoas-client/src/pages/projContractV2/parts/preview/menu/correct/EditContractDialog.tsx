import { Alert, AlertTitle, Button, Dialog, DialogActions, DialogContent, DialogTitle, Link } from '@mui/material';
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
    const envelopeId = getValues('envelopeId') as string;
    const {
      url,
    } = await getContractView({
      envelopeId,
      returnUrl: window.location.href,
    });

    handleClose();

    window.open(url, '_self');
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
          severity="warning"
        >
          <AlertTitle>
            送信したエンベロープが完了していない場合は、修正することができます。
          </AlertTitle>
  
          文書を修正したら、必ず［修正］または［変更の破棄］をクリックしてください。文書を修正した後でこれらをクリックせずにブラウザーを閉じると、受信者が文書にアクセスなくなります。
          詳細は
          <Link href='https://support.docusign.com/s/articles/FAQs-related-to-correcting-envelopes-in-DocuSign?language=ja&rsc_301' target='_blank'>
            こちら
          </Link>
          。
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