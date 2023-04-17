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
      fullWidth
      placeholder='備考を入力してください。'
      {...regFieldProps}
    />
  );
};