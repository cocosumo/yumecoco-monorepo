import { Autocomplete, TextField, Tooltip } from '@mui/material';
import { defaultEmailFieldProps } from './CustomEmailField';
import { useOrderFormContext, useOrderWatch } from '../../hooks/useOrderRHF';
import { useAllSuppliers } from 'kokoas-client/src/hooksQuery';
import { useMemo } from 'react';
import { Controller } from 'react-hook-form';

export const EmailToField = () => {
  const { control, setValue } = useOrderFormContext();
  const supplierId = useOrderWatch({
    name: 'supplierId',
  });

  const { data = [] } = useAllSuppliers();

  const supplierMemberOptions = useMemo(() => {
    return data
      .find((supplier) => supplier.managementID.value === supplierId)
      ?.memberTable.value.map(({ value: member }) => ({
        officerId: member.memberUuid.value,
        officerName: member.memberName.value,
        officerTel: member.memberTel.value,
        name: member.memberName.value,

        /** メール */
        label: member.memberMail.value,
      }) );

  }, [supplierId, data]);

  return (   
    <Controller
      name={'supplierOfficerId'}
      control={control}
      render={({ 
        field: {
          value,
          ref,
        },
        fieldState: {
          error,
        },
      }) => {

        
        const selectedValue = supplierMemberOptions?.find((s) => s.officerId === value);

        return (
          <Autocomplete
            value={selectedValue ?? null}
            options={supplierMemberOptions ?? []}
            fullWidth
            size={'small'}
            onChange={(_, newValue) => {
              setValue('supplierOfficerId', newValue?.officerId ?? '');
              setValue('supplierOfficerName', newValue?.officerName ?? '');
              setValue('supplierOfficerEmail', newValue?.officerTel ?? '');
              setValue('supplierOfficerTel', newValue?.officerTel ?? '');
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