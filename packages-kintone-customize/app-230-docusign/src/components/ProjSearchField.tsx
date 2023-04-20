import { Autocomplete, Chip, CircularProgress, TextField } from '@mui/material';
import { useState } from 'react';
import { useDebounce } from 'usehooks-ts';
import { setFieldValue } from 'api-kintone';
import { useSearchAndpadOrders } from '../hooks/useSearchAndpadOrders';
import type { AutoCompleteOption } from '../../types/types';

export interface ProjSearchFieldOption extends AutoCompleteOption {
  projStatus: string;
}

export const ProjSearchField = ({
  initialValue,
}: {
  initialValue?: ProjSearchFieldOption,
}) => {

  const [inputValue, setInputValue] = useState<string>('');
  const [value, setValue] = useState<ProjSearchFieldOption | null>(initialValue?.id ? initialValue : null);
  const [open, setOpen] = useState(false);

  const debouncedValue = useDebounce(inputValue, 300);
  
  const handleOpen = async () => {
    setOpen(true);
  };
  
  const { 
    data: options, 
    isLoading,
  } = useSearchAndpadOrders({
    searchStr: debouncedValue,
    enabled: open,
  });

  return (
    <Autocomplete
      disablePortal
      fullWidth
      value={value}
      onOpen={handleOpen}
      options={options ?? []}
      loading={isLoading}
      loadingText={<CircularProgress />}
      noOptionsText="案件が見つかりません"
      onClose={() => setOpen(false)}
      onInput={(e) => {
        setInputValue((e.target as HTMLInputElement).value);
      }}
      onChange={(_, newValue, reason) => {
        setValue(newValue);
        setFieldValue<keyof DB.SavedRecord>('systemId', newValue?.id ?? '');
        setFieldValue<keyof DB.SavedRecord>('projName', newValue?.id ?? '');
        if (reason === 'clear') {
          setInputValue('');
        }
      }}
      renderOption={(props, option) => (
        <li {...props} key={option.id}>
          <Chip label={option.id} size='small' sx={{ mr: 2 }} />
          <Chip label={option.projStatus} size='small' sx={{ mr: 2 }} />
          {option.label}
        </li>
      )}
      renderInput={({ InputProps, ...params }) => (
        <TextField 
          {...params} 
          label='案件名'
          InputProps={{
            ...InputProps,
            style: {
              backgroundColor: 'white',
            },
          }}
          placeholder='案件名かシステムID'
          required
        />
      )}
    />
  );
};