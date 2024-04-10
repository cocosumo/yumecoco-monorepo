import { Autocomplete, TextField } from '@mui/material';

export const SelectSupplier = () => {
  return (
    <Autocomplete
      options={[]}
      freeSolo
      getOptionLabel={(option) => option}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            label={'業者'}
            size={'small'}
            fullWidth
            variant={'outlined'}
            name={'supplier'}
            InputProps={{
              style: { maxWidth: '400px' },
            }}
            required
          />
        );
      }}
    />
  );
};