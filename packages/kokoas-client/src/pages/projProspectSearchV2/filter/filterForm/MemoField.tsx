import { TextField } from '@mui/material';
import { useTypedFormContext } from '../../hooks/useTypedHooks';

export const MemoField = () => {
  const { register } = useTypedFormContext();

  return (
    <TextField 
      fullWidth
      label="メモ"
      placeholder='工事内容のメモで検索'
      rows={2}
      multiline
      {...register('memo')}
    />
  );
};