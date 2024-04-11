import { Autocomplete, TextField } from '@mui/material';
import { useAllSuppliers } from 'kokoas-client/src/hooksQuery';

export const SelectSupplier = () => {


  const { data = [] } = useAllSuppliers();

  console.log(data);

  return (
    <Autocomplete
      options={data}
      getOptionLabel={(option) => option.supplierName.value}
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