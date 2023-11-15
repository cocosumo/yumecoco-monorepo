import { Box, CircularProgress, DialogContent, InputAdornment, TextField } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useDebounce } from 'usehooks-ts';
import { useSearchCustGroupByKeyword } from 'kokoas-client/src/hooksQuery';
import { SearchResultList } from './searchResutlList/SearchResultList';
import SearchIcon from '@mui/icons-material/Search';

const DebouncedTextField = ({
  handledDebouncedChange,
  isLoading,
}:{
  handledDebouncedChange: (newValue: string) => void,
  isLoading: boolean,
}) => {

  const [value, setValue] = useState('');

  const debouncedValue = useDebounce(value, 500);

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
        endAdornment: (<InputAdornment position='end'>

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

export const SearchDialogContent = ({
  handleCloseDialog,
}:{
  handleCloseDialog: () => void,
}) => {
  const [value, setValue] = useState('');

  const debouncedValue = useDebounce(value, 1500);

  const handleDebounceValue = useCallback((newValue: string) => {
    setValue(newValue);
  }, []);

  const { 
    data = [], 
    isFetching, 
  } = useSearchCustGroupByKeyword({ keyword: debouncedValue });

  return (
    <DialogContent
      sx={{
        height: '70vh',
        overflow: 'hidden',
        px: 0,
      }}
      
    >
      <Box 
        mt={1} 
        px={2}
        pb={2}
      >
        
        <DebouncedTextField
          handledDebouncedChange={handleDebounceValue}
          isLoading={isFetching}
        />
      </Box>
      <SearchResultList 
        data={data}
        handleCloseDialog={handleCloseDialog}
      />

    </DialogContent>
  );
};