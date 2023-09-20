import { Stack, TextField } from '@mui/material';
import { useTypedFormContext } from '../../hooks/useTypedHooks';

export const NameFields = () => {
  const { register } = useTypedFormContext();

  return (
    <Stack
      direction={'row'}
      spacing={2}
    >
      <TextField 
        size="small" 
        label="お客様名"
        placeholder='氏名・シメイ'
        fullWidth
        {...register('custName')}
      />
      <TextField 
        size="small" 
        label="工事名"
        placeholder='大谷　様　新築工事'
        fullWidth
        {...register('projName')}
      />
      
    </Stack>
  );
};