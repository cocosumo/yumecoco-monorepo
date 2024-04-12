import { Autocomplete, Box, TextField } from '@mui/material';
import { useSupplierOptions } from './useSupplierOptions';
import { useOrderFormContext } from '../../hooks/useOrderRHF';
import { Controller, useController } from 'react-hook-form';


export const SelectSupplier = () => {
  const { control, setValue } = useOrderFormContext();

  // Dummy control to store supplier name
  // setValue of useForm also works, but it won't appear on devtools
  const { 
    field: {
      onChange: onChangeSupplierName,
    }, 
  } = useController({
    name: 'supplierName',
    control,
  });

  const { data = [] } = useSupplierOptions();

  return (
    <Controller
      name={'supplierId'}
      control={control}
      render={({ 
        field: {
          onChange,
        }, 
        fieldState: { 
          error, 
        },
      }) => (
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
          onChange={(_, value) => {
            onChange(value?.id);
            onChangeSupplierName(value?.label || '');

            const newEmailTo = value?.record.memberTable.value?.[0].value.memberMail.value || '';

            setValue('emailTo', newEmailTo);
            setValue('emailCc', '');
            setValue('emailBcc', '');
          }}
          renderInput={(params) => {
            return (
              <TextField
                {...params}
                label={'業者名'}
                size={'small'}
                fullWidth
                variant={'outlined'}
                required
                error={!!error}
                helperText={error?.message}
              />
            );
          }}
        />
      )}
    />

    
  );
};
