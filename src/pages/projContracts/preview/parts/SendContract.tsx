import { sendContract } from '../api/docusign/sendContract';
import {  useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import { useConfirmDialog, useSnackBar } from '../../../../hooks';



export const SendContract = (props: { projId: string })=>{
  const [isLoading, setIsLoading] = useState(false);
  const { setDialogState } = useConfirmDialog();
  const { setSnackState }  = useSnackBar();

  const handleSendContract = async () => {
    setIsLoading(true);
    const result = await sendContract(props.projId);
    setIsLoading(false);
    setSnackState({
      open: true,
      message: `送信が成功しました。${result.envelopeId}`,
    });
  };


  const handleConfirmSend = () => {
    setDialogState({
      title: '操作確認',
      content: '契約を送信しますか。',
      handleYes: handleSendContract,

    });
  };

  return (
    <LoadingButton
    disabled={!props.projId}
    loading={isLoading}
    onClick={handleConfirmSend}
    variant="contained"
    endIcon={<SendIcon />}
    loadingPosition="end"
    fullWidth>
      送信
    </LoadingButton>
  );
};