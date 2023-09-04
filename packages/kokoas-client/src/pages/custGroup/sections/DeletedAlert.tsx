import { Alert } from '@mui/material';
import { useTypedWatch } from '../hooks/useTypedHooks';

export const DeletedAlert = () => {
  const isDeleted = useTypedWatch({
    name: 'isDeleted',
  }) as boolean;

  if (!isDeleted) {
    return null;
  }

  return (
    <Alert severity="warning">
      無効状態です。工事作成などに仕様出来ません。復元には下記の「復元」ボタンを押してください。
    </Alert> 
  );
};