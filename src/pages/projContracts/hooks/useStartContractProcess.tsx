import { useFormikContext } from 'formik';
import { useBackdrop, useConfirmDialog } from '../../../hooks';
import { TypeOfForm } from '../form';
import { MethodChoice } from '../parts/PreviewToolBar/startContract/MethodChoices';

export const useStartContractProcess = () => {
  const { values } = useFormikContext<TypeOfForm>();
  const { setDialogState } = useConfirmDialog();
  const {
    backdropState: { open },
  } = useBackdrop();

  const isBackdropOpen = open;

  const handleClickStart = () => {
    setDialogState({
      title: '契約手続きを開始',
      content: <MethodChoice />,
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