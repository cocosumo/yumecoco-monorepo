import { useFormikContext } from 'formik';
import { useBackdrop, useSnackBar } from '../../../hooks';
import { TypeOfForm } from '../form';

export const useContractProcess = () => {
  const {
    setValues,
    values: {
      projEstimateId,
    },
  } = useFormikContext<TypeOfForm>();
  const { setBackdropState } = useBackdrop();
  const { setSnackState } = useSnackBar();

  const handleSendContract = async (
    signMethod: ReqSendContract['signMethod'],
  ) => {

  };

  return {
    handleSendContract,
  };
};