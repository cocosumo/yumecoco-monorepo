import { TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { TypeOfForm } from '../../schema';

export const Keyword = () => {

  const {
    register,
  } = useFormContext<TypeOfForm>();
  
  return (

    <TextField 
      size='small' 
      label={'キーワード'}
      placeholder='氏名や工事名や住所など'
      style={{ width: '100%' }}
      {...register('keyword')}
    />
    
  );
};