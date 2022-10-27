import { useMutation } from '@tanstack/react-query';
import { useBackdrop, useSnackBar } from '../../../hooks';
import { saveForm } from '../api/saveForm';

export const useSave = () => {
  const { setBackdropState } = useBackdrop();
  const { setSnackState } = useSnackBar();

  return useMutation(saveForm,
    {
      networkMode: 'online',
      onMutate: () => {        /* ローディング中 */
        setBackdropState({ open: true });

      },
      onSuccess: () => {
        setSnackState({ 
          open: true,
          severity: 'success',
          message: '保存しました',
        });
      },
      onError: (error) => {
        console.log('error chk');
        if (error instanceof Error)
          setSnackState({
            open: true,
            severity: 'error',
            message: `保存に失敗しました。${error.message}`,
          });
      },
      onSettled: () => {
        setBackdropState({ open: false });
      },


    });
};