import { TextField } from '@mui/material';
import { useTypedFormContext } from '../hooks/useTypedHooks';
import { useStartSearch } from '../hooks/useStartSearch';

export const Keyword = () => {

  const {
    register,
  } = useTypedFormContext();
  
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