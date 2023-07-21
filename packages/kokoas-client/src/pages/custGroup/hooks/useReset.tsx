import { useConfirmDialog } from 'kokoas-client/src/hooks';
import { useTypedFormContext } from './useTypedHooks';
import { Alert } from '@mui/material';


export const useReset = () => {
  const { 
    reset,
  } = useTypedFormContext();

  const { setDialogState } = useConfirmDialog();
  
  return () => setDialogState({
    title: 'もう一度確認しますが、リセットしますか？',
    content:  (
      <Alert severity="warning">
        最後に保存した状態に戻ります。
      </Alert>),
    handleYes: reset,
  });
};