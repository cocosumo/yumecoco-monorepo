import { UseMutationOptions } from '@tanstack/react-query';
import { useBackdrop } from '../hooks/useBackdrop';
import { useSnackBar } from '../hooks/useSnackBar';

export const useCommonOptions = () => {
  const { setSnackState } = useSnackBar();
  const { setBackdropState } = useBackdrop();
  
  const options : UseMutationOptions = {
    onMutate: () => {
      setBackdropState({ open: true });
      
    },
    onSuccess: () => {
      setSnackState({
        open: true,
        severity: 'success',
        message: '保存が出来ました。',
      });
    },
    onError: (error) => {
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