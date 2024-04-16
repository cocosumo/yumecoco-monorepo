import { Autocomplete, Box, Skeleton, TextField } from '@mui/material';
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

  const { data = [], isFetching } = useSupplierOptions();

  if (isFetching) {
    // prevent error when setting defaultValue after AutoComplete is rendered.
    // We may convert the component to controlled if Skeleton is undesirable.
    return <Skeleton variant={'rectangular'} width={300} height={40} />;
  }

  return (
    <Controller 
      name={'supplierId'}
      control={control}
      render={({ 
        field: {
          value,
          onChange,
        }, 
        fieldState: { 
          error, 
        },
      }) => {
        
        return (
          <Autocomplete
            key={value}
            options={data}
            getOptionLabel={(option) => option.label}
            defaultValue={data.find((d) => d.id === value)}
            renderOption={(props, option) => (
              <Box 
                component="li" 
                {...props}
              >
                {option.label}
              </Box>
            )}
            sx={{ width: 300 }}
            onChange={(_, newValue) => {

              onChange(newValue?.id);
              onChangeSupplierName(newValue?.label || '');

              const newOfficerId = newValue?.record.memberTable.value?.[0].value.memberUuid.value || '';

              setValue('supplierOfficerId', newOfficerId);
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
        );
      }}
    />

    
  );
};
