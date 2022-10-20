import { FormikContextType } from 'formik';
import { useBackdrop, useSnackBar } from '../../../hooks';
import { sendContract } from '../api/docusign/sendContract';
import { TypeOfForm } from '../form';

/*
  Passing Formik's context here because this hook
  is being called inside a global context hook (useConfirmDialog)
  that is outside the scope of Formik's context.

  Hopefully, new requirements will improve this spaghetty code on next iterations.
  Should you find a way to untangle this, fill free to make a PR.

  ~ Ras 2022.09.22

*/

export const useSendElectronicContract = (
  formikContext: FormikContextType<TypeOfForm>,
) => {

  const {
    setValues,
    values: {
      projEstimateId,
    },
  } = formikContext;
  const { setBackdropState } = useBackdrop();
  const { setSnackState } = useSnackBar();

  const handleSendElectronicContract = async () => {
    try {
      /* 操作を無効化するため */
      setBackdropState({ open: true });

      const { envelopeId, envelopeStatus } = await sendContract({
        projEstimateId,
        userCode: kintone.getLoginUser().code,
      });

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

    } catch (err: any) {
      setSnackState({
        open: true,
        autoHideDuration: 20000,
        severity: 'error',
        message: err.message,
      });

    } finally {
      /* 操作を有効化するため */
      setBackdropState({ open: false });
    }

  };

  return {
    handleSendElectronicContract,
  };
};