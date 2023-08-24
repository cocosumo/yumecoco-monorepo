import { TextField } from '@mui/material';
//import { useStartSearch } from '../../hooks/useStartSearch';
import { useTypedFormContext } from '../hooks/useTypedHooks';

export const Keyword = () => {

  const {
    register,
  } = useTypedFormContext();
  
  //const handleStartSearch = useStartSearch();

  return (

    <TextField 
      size='small' 
      label={'キーワード'}
      placeholder='氏名や工事名や住所など'
      style={{ width: '200px' }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          //handleStartSearch();
        }
      }}
      {...register('keyword')}
    />
    
  );
};