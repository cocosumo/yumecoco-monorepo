import { useFormikContext } from 'formik';
import { useBackdrop, useSnackBar } from '../../../hooks';
import { useMutation } from '@tanstack/react-query';
import { TypeOfForm } from '../form';
import { sendContract } from '../../../api/docusign/sendContract';
import { ReqSendContract } from 'types';

export const useContractProcess = () => {
  const {
    setValues,
    values: {
      projEstimateId,
    },
  } = useFormikContext<TypeOfForm>();
  const { setBackdropState } = useBackdrop();
  const { setSnackState } = useSnackBar();

  const contractMutation = useMutation(
    sendContract,
    {
      onMutate: () => {
        console.log('Starting!');
        setBackdropState({ open: true });
      },

      onError: (error) =>{
        setSnackState({
          open: true,
          autoHideDuration: 20000,
          severity: 'error',
          message: error instanceof Error ? error.message : error as string,
        });
      },

      onSuccess: ({
        envelopeId,
        envelopeStatus,
      }, {
        signMethod,
      }) => {
        setValues( (prev) => ({
          ...prev,
          envelopeId,
          envelopeStatus,
          signMethod,
        }));
        setSnackState({
          open: true,
          autoHideDuration: 10000,
          severity: 'success',
          message: `送信が成功しました。${envelopeId}`,
        });
      },
      onSettled: () => {
        console.log('DONE!');
        setBackdropState({ open: false });
      },
    });

  const {
    mutate,
  }  = contractMutation;

  const handleSendContract = async (
    signMethod: ReqSendContract['signMethod'],
  ) => {


    mutate({
      projEstimateId,
      userCode: kintone.getLoginUser().code,
      signMethod,
    });
  };


  return {
    handleSendContract,
    ...contractMutation,
  };
};