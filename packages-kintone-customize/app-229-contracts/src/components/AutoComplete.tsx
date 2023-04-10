import { Autocomplete, TextField } from '@mui/material';
import { useState } from 'react';

export interface AutocCompleteOption {
  label: string,
  id: string,
}

export const AutoLookup = ({
  label,
  initialValue,
  fetchOptions,
} : {
  label: string,
  initialValue?: AutocCompleteOption,
  fetchOptions: () => Promise<AutocCompleteOption[]>,
}) => {
  const [options, setOptions] = useState<AutocCompleteOption[]>([]);
  
  const handleOpen = async () => {
    console.log('handleOpen');
    const newOptions = await fetchOptions();
    setOptions(newOptions);
  };

  return (
    <Autocomplete
      disablePortal
      value={initialValue}
      onOpen={handleOpen}
      options={options}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );

};