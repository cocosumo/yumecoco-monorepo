import { Autocomplete, TextField, Tooltip } from '@mui/material';
import { defaultEmailFieldProps } from './CustomEmailField';
import { useOrderFormContext, useOrderWatch } from '../../hooks/useOrderRHF';
import { useAllSuppliers } from 'kokoas-client/src/hooksQuery';
import { useMemo } from 'react';
import { Controller } from 'react-hook-form';

export const EmailToField = () => {
  const { control } = useOrderFormContext();
  const supplierId = useOrderWatch({
    name: 'supplierId',
  });

  const { data = [] } = useAllSuppliers();

  const supplierMemberOptions = useMemo(() => {
    return data
      .find((supplier) => supplier.managementID.value === supplierId)
      ?.memberTable.value.map(({ value: member }) => ({
        name: member.memberName.value,
        label: member.memberMail.value,
      }) );

  }, [supplierId, data]);

  return (   
    <Controller
      name={'emailTo'}
      control={control}
      render={({ 
        field: {
          value,
          onChange,
          ref,
        },
        fieldState: {
          error,
        },
      }) => {

        const selectedValue = supplierMemberOptions?.find((s) => s.label === value);

        return (
          <Autocomplete
            value={selectedValue ?? null}
            options={supplierMemberOptions ?? []}
            fullWidth
            size={'small'}
            onChange={(_, newValue) => {
              onChange(newValue?.label);
            }}
            renderInput={(params) => (
              <Tooltip 
                title={selectedValue?.name} 
                placement='top' 
                followCursor
                arrow
              >
                <TextField
                  {...defaultEmailFieldProps}
                  {...params}
                  label="宛先" 
                  required
                  inputRef={ref}
                  error={!!error}
                  helperText={error?.message}
                />
              </Tooltip>
            )}
          />
        );
      }}
    
    />
  );
};