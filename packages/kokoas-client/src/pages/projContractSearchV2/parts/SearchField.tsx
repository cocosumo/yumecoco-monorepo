import { Controller } from 'react-hook-form';
import { useTypedFormContext } from '../hooks/useTypedHooks';
import { TextField } from '@mui/material';

export const SearchField = () => {
  const { control } = useTypedFormContext();

  return (
    <Controller
      control={control}
      name={'mainSearch'}
      render={({
        field: {
          ref,
          ...otherFields
        },
      }) => {
        return (
          <TextField
            {...otherFields}
            inputRef={ref}
            fullWidth
            label={'キーワード'}
            variant={'outlined'}
            placeholder={'工事番号や工事名や顧客名など'} 
            size='small'
          />
        );
      }}
    />
  );
};