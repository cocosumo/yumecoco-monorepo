import { useFormikContext } from 'formik';
import { useBackdrop, useConfirmDialog } from '../../../hooks';
import { TypeOfForm } from '../form';
import { MethodChoice } from '../parts/Preview/startContract/MethodChoices';
import { useSendElectronicContract } from './useSendElectronicContract';

export const useStartContractProcess = () => {
  const formikContext = useFormikContext<TypeOfForm>();
  const { values } = formikContext;
  const {
    setDialogState,
    handleClose: handleCloseDialog } = useConfirmDialog();
  const {
    backdropState: { open },
  } = useBackdrop();

  const { handleSendElectronicContract } = useSendElectronicContract(formikContext);

  const isBackdropOpen = open;

  const handleClickStart = () => {
    setDialogState({
      title: '契約手続きを開始',
      content: (
        <MethodChoice
          handleSendElectronicContract={() => {
            handleCloseDialog();
            handleSendElectronicContract();
          }}
        />),
      withYes: false,
      withNo: true,
      noText: 'キャンセル',
    });
  };

  return {
    handleClickStart,
    isBackdropOpen,
    values,
  };

};