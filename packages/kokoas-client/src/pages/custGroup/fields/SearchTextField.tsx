import { CircularProgress, InputAdornment, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDebounceValue } from 'usehooks-ts';
import SearchIcon from '@mui/icons-material/Search';


export const SearchTextField = ({
  handledDebouncedChange,
  isLoading,
}:{
  handledDebouncedChange: (newValue: string) => void,
  isLoading: boolean,
}) => {

  const [value, setValue] = useState('');

  const [debouncedValue ] = useDebounceValue(value, 1000);

  useEffect(() => handledDebouncedChange(debouncedValue), [handledDebouncedChange, debouncedValue]);

  return (
    <TextField 
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      size='small'
      label='顧客名'
      fullWidth
      InputProps={{
        startAdornment: (<InputAdornment position='start'>

          {isLoading 
            ? <CircularProgress size={18} />
            :   <SearchIcon />}

        </InputAdornment> ),
      }}
      placeholder='氏名・シメイ'
      helperText='2文字以上で検索できます'
    />
  );
};