import { TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { TypeOfForm } from '../../schema';
import { useStartSearch } from '../../hooks/useStartSearch';

export const Keyword = () => {

  const {
    register,
  } = useFormContext<TypeOfForm>();
  
  const handleStartSearch = useStartSearch();

  return (

    <TextField 
      size='small' 
      label={'キーワード'}
      placeholder='氏名や工事名や住所など'
      style={{ width: '200px' }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          handleStartSearch();
        }
      }}
      {...register('keyword')}
    />
    
  );
};