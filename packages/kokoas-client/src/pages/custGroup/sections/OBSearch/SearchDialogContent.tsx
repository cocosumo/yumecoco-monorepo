import { Alert, CircularProgress, DialogContent, InputAdornment, Stack, TextField } from '@mui/material';
import { useState } from 'react';
import { useDebounce } from 'usehooks-ts';
import { useSearchCustGroupByKeyword } from 'kokoas-client/src/hooksQuery';
import { SearchResultList } from './searchResutlList/SearchResultList';

export const SearchDialogContent = () => {
  const [value, setValue] = useState('');

  const debouncedValue = useDebounce(value, 1500);

  const { 
    data = [], 
    isLoading, 
  } = useSearchCustGroupByKeyword({ keyword: debouncedValue });

  return (
    <DialogContent
      sx={{
        height: '70vh',
        overflow: 'hidden',
      }}
    >
      <Stack 
        mt={1} 
        spacing={2}
        height={'100%'}
      >
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
          placeholder='氏名・シメイ'
          helperText='2文字以上で検索できます'
        />

        <SearchResultList data={data} />

      </Stack>
    </DialogContent>
  );
};