import { Alert, CircularProgress, DialogContent, InputAdornment, Stack, TextField } from '@mui/material';
import { useState } from 'react';
import { useDebounce } from 'usehooks-ts';
import { SearchResultList } from './SearchResult';
import { useSearchCustGroupByKeyword } from 'kokoas-client/src/hooksQuery';

export const SearchDialogContent = () => {
  const [value, setValue] = useState('');

  const debouncedValue = useDebounce(value, 1500);

  const { 
    data = [], 
    isLoading, 
  } = useSearchCustGroupByKeyword({ keyword: debouncedValue });

  return (
    <DialogContent>
      <Stack mt={1} spacing={2}>
        <Alert severity='info'>
          開発段階です。しばらくお待ちください。
          提案がありましたら、気楽にお声がけください。
        </Alert>
        <TextField 
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          size='small'
          label='顧客名'
          sx={{
            maxWidth: '300px',
          }}
          InputProps={{
            endAdornment: isLoading && (
            <InputAdornment position='end'>
              <CircularProgress size={20} />
            </InputAdornment> ),
          }}
        />
        <SearchResultList value={`結果：${data.length} ${data
          .map(({ members }) => members.value.map(({ value: { customerName, custNameReading } }) => `(${customerName.value}, ${custNameReading.value})`) )}`}
        />
      </Stack>
    </DialogContent>
  );
};