import { useBackdrop } from '../hooks/useBackdrop';
import { useSnackBar } from '../hooks/useSnackBar';

export const useCommonOptions = () => {
  const { setSnackState } = useSnackBar();
  const { setBackdropState } = useBackdrop();

  const options = {
    onMutate: () => {
      console.log('STARTED!');
      setBackdropState({ open: true });

    },
    onSuccess: () => {
      setSnackState({
        open: true,
        severity: 'success',
        message: '保存が出来ました。',
      });
    },
    onError: (error: unknown) => {
      setSnackState({
        open: true,
        severity: 'error',
        message: `エラーが発生しました。${(error as Error).message}`,
      });
    },

    onSettled: () => {
      setBackdropState({ open: false });
    },
  };

  return options;
};