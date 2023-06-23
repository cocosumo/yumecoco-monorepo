import { useFormContext } from 'react-hook-form';
import { TextField } from '@mui/material';
import { TForm } from '../schema';

export const Remarks = () => {
  const { register } = useFormContext<TForm>();

  const regFieldProps = register('remarks');
  
  return (
    <TextField
      label={'備考'}
      multiline
      rows={4}
      fullWidth
      placeholder='備考を入力してください。'
      size='small'
      sx={{
        maxWidth: 400,
      }}
      {...regFieldProps}
    />
  );
};