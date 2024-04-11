import { Autocomplete, Box, TextField } from '@mui/material';
import { useSupplierOptions } from './useSupplierOptions';


export const SelectSupplier = () => {

  const { data = [] } = useSupplierOptions();

  return (
    <Autocomplete
      options={data}
      getOptionLabel={(option) => option.label}
      renderOption={(props, option) => (
        <Box 
          component="li" 
          {...props}
        >
          {option.label}
        </Box>
      )}
      sx={{ width: 300 }}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            label={'業者名'}
            size={'small'}
            fullWidth
            variant={'outlined'}
            required
          />
        );
      }}
    />
  );
};
