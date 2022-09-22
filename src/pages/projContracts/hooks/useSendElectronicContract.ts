import { useFormikContext } from 'formik';
import { useBackdrop, useSnackBar } from '../../../hooks';
import { sendContract } from '../api/docusign/sendContract';
import { TypeOfForm } from '../form';

export const useSendElectronicContract = () => {
  const {
    setValues,
    values: {
      projEstimateId,
    },
  } = useFormikContext<TypeOfForm>();
  const { setBackdropState } = useBackdrop();
  const { setSnackState } = useSnackBar();

  const handleSendContract = async () => {
    try {
      /* 操作を無効化するため */
      setBackdropState({ open: true });

      const { envelopeId, envelopeStatus } = await sendContract({ projEstimateId });

      setValues( (prev) => ({
        ...prev,
        envelopeId,
        envelopeStatus,
      }));

      setSnackState({
        open: true,
        autoHideDuration: 10000,
        severity: 'success',
        message: '送信が成功しました。',
      });

      /* 操作を有効化するため */

    } catch (err: any) {
      setSnackState({
        open: true,
        autoHideDuration: 20000,
        severity: 'error',
        message: err.message,
      });

    } finally {
      setBackdropState({ open: false });
    }

  };

  return {
    handleSendContract,
  };
};