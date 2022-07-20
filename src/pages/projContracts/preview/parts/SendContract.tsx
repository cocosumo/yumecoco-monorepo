import { sendContract } from '../api/docusign/sendContract';
import {  useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import { useConfirmDialog, useSnackBar } from '../../../../hooks';
import { Tooltip } from '@mui/material';
import { useFormikContext } from 'formik';
import { TypeOfForm } from '../form';



export const SendContract = ({
  projId,
  isBusy,
}: {
  projId: string,
  isBusy: boolean,
})=>{

  const [isLoading, setIsLoading] = useState(false);
  const { values, setValues } = useFormikContext<TypeOfForm>();
  const { setDialogState } = useConfirmDialog();
  const { setSnackState }  = useSnackBar();


  const handleSendContract = async () => {
    setIsLoading(true);
    const result = await sendContract(projId );
    setIsLoading(false);
    const isSuccess = Boolean(result.envelopeStatus);

    if (isSuccess) {
      setValues({
        ...values,
        envelopeId: result.envelopeId,
        envelopeStatus: result.envelopeStatus,
      });
    }

    setSnackState({
      open: true,
      autoHideDuration: 20000,
      severity: isSuccess ? 'success' : 'error',
      message: isSuccess ? '送信が成功しました。' : `問題が発生しました。管理者に報告してください。 ${JSON.stringify(result)}`,
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
    <Tooltip title="契約書を送信する" arrow>
      <div> {/* Tooltip doesn't like disabled element, so I added extra layer */}
        <LoadingButton

        disabled={!projId || isBusy}
        loading={isLoading}
        onClick={handleConfirmSend}
        variant="contained"
        loadingPosition="center"
      >
          <SendIcon />
        </LoadingButton>
      </div>
    </Tooltip>
  );
};