import { useFormContext } from 'react-hook-form';
import { TypeOfForm } from '../form';
import { TextField } from '@mui/material';
import { ja } from '../hooks/utils/fieldTranslations';

export const Remarks = () => {
  const { register } = useFormContext<TypeOfForm>();

  const regFieldProps = register('remarks');
  
  return (
    <TextField
      label={ja[regFieldProps.name]}
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