import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { useProjTypes } from 'kokoas-client/src/hooksQuery';
import { useTypedFormContext } from '../../hooks/useTypedRHF';
import { Controller } from 'react-hook-form';
import { useEffect } from 'react';


export const ProjectType = () => {
  const { control, setValue, register, getValues } = useTypedFormContext();

  const { data: projTypeOptions } = useProjTypes({
    select: (d) => d
      ?.map(({
        label, uuid,
      }) => ({
        label: label?.value,
        value: uuid?.value,
      })),
  });

  useEffect(() => {
    register('projTypeName');
  }, [register]);
  

  return (
    
    <Controller 
      control={control}
      name="projTypeId"
      render={({
        field:{
          onChange,
          value: newValue,
        },
        fieldState: {
          error,
          isTouched,
        },
      }) => {
        return (
          <FormControl 
            size='small'
            sx={{
              width: 300,
            }}
            placeholder='工事種別'
            error={isTouched && !!error}
          >
            <InputLabel>
              工事種別
            </InputLabel>
            <Select
              value={newValue}
              label="工事種別"
              onChange={(e) => {
                const newProjTypeName = projTypeOptions
                  ?.find(({ value }) => value === e.target.value)
                  ?.label || '';

                const custName = getValues('custName');
                
                setValue('projTypeName', newProjTypeName);
                setValue('projName', `${custName}様邸　${newProjTypeName}`);
                onChange(e);
              }}
            >
              <MenuItem value="">
                ---
              </MenuItem>
              {projTypeOptions?.map(({
                label, value,
              }) => {
                return (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                );
              })}
    
            </Select>
            <FormHelperText>
              {error?.message}
            </FormHelperText>
          </FormControl>
        );

      }}
    />

  );
};