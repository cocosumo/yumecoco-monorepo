import { DialogContent, Stack, TextField } from '@mui/material';
import { useState } from 'react';
import { useDebounce } from 'usehooks-ts';
import { SearchResultList } from './SearchResult';

export const SearchDialogContent = () => {
  const [value, setValue] = useState('');

  const debouncedValue = useDebounce(value, 1500);

  return (
    <DialogContent>
      <Stack mt={1}>
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
        />
        <SearchResultList value={debouncedValue} />
      </Stack>
    </DialogContent>
  );
};