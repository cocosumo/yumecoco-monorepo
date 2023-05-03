import { ListItemText, MenuItem  } from '@mui/material';

import { VoidContractDialog } from './VoidContractDialog';
import { useState } from 'react';



export const MenuVoidContract = () => {
  const [open, setOpen] = useState(false);


  /*  const {
    values,
    setValues,
    setStatus,
  } = useFormikContext<TypeOfForm>();
  const { envelopeId } = values;
  const {
    setDialogState,
    handleClose: handleCloseDialog,
  } = useConfirmDialog();

  const { setSnackState } = useSnackBar();

  const reasonRef = useRef('');
  const { handleClose } = props;


  const handleSubmitVoidReason = async () => {
    handleCloseDialog();
    try {
      setStatus('busy');
      await voidContract({
        envelopeId,
        voidedReason: reasonRef.current,
      });
      setStatus('');
      setSnackState({
        open: true,
        severity: 'success',
        message: `無効になりました。エンベロープ番号: ${envelopeId}`,
      });

      setValues({
        ...values,
        envDocFileKeys: [],
        envelopeId: '',
        envelopeStatus: 'voiding',
      });

    } catch (err) {

      setSnackState({
        open: true,
        severity: 'error',
        autoHideDuration: 10000,
        message: `エラーが発生しました。${err.message}`,
      });

    }

  };

  const handleCaptureVoidReason = () => {
    setDialogState({
      title: '無効にする理由を入力してください。',
      willCloseOnYes: false,
      yesText: '無効にする',
      noText: 'キャンセル',
      handleYes: handleSubmitVoidReason,
      content: <ReasonForm
        handleSetReason={(r)=> {
          reasonRef.current = r;
        }}
               />,
    });
  };


  const handleVoidContract = () => {
    setDialogState({
      title: 'エンベロープを無効にしますか。',
      cancellable: true,
      willCloseOnYes: false,
      handleYes: handleCaptureVoidReason,
      content: <CustomDialogContent
        severity='warning'
        message={
          <>
            エンベロープを無効にすると、受信者はそのエンベロープを表示したり署名したりできなくなります。
            <Button fullWidth target="_blank" href='https://support.docusign.com/s/articles/How-do-I-void-or-cancel-an-envelope?language=ja&rsc_301'>
              無効化についてもっと知りたい
            </Button>
          </>
        }
               />,

    });
    handleClose();
  }; */

  return (
    <>
      <MenuItem onClick={() => {
        setOpen(true);
      }}
      >
        <ListItemText>
          無効化する
        </ListItemText>
      </MenuItem>
      <VoidContractDialog 
        handleClose={()=> setOpen(false)} 
        open={open}
      />
    </>
  );
};