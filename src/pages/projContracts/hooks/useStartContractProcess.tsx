import { useFormikContext } from 'formik';
import { useBackdrop, useConfirmDialog } from '../../../hooks';
import { TypeOfForm } from '../form';
import { MethodChoice } from '../parts/Preview/PreviewMenu/startContract/MethodChoices';
import { useSendContract } from './useSendContract';

export const useStartContractProcess = () => {
  const formikContext = useFormikContext<TypeOfForm>();
  const { values } = formikContext;
  const {
    setDialogState,
    handleClose: handleCloseDialog } = useConfirmDialog();
  const {
    backdropState: { open },
  } = useBackdrop();

  const { handleSendContract } = useSendContract(formikContext);

  const isBackdropOpen = open;

  const handleClickStart = () => {
    setDialogState({
      title: '契約手続きを開始',
      content: (
        <MethodChoice
          handleSendContract={(
            signMethod: ReqSendContract['signMethod'],
          ) => {
            handleCloseDialog();
            handleSendContract(signMethod);
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