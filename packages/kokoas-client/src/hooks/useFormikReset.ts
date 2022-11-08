import { useCallback } from 'react';
import { useFormikContext } from 'formik';
import { useConfirmDialog } from './useConfirmDialog';

export const useFormikReset = <T>() => {
  const { setDialogState } = useConfirmDialog();
  const { resetForm } = useFormikContext<T>();

  const handleReset: ReturnType<typeof useFormikContext<T>>['resetForm'] = useCallback((params) => {
    setDialogState({
      open: true,
      title: '確認',
      content: '保存されていない変更があります。操作を続けますか',
      withYes: true,
      withNo: true,
      cancellable: false,
      willCloseOnYes: true,
      handleYes: () => resetForm(params),
    });
  }, [setDialogState, resetForm]);

  return handleReset;
};