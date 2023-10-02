import { FormControl, FormHelperText, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import { useProjTypes } from 'kokoas-client/src/hooksQuery';
import { useTypedFormContext, useTypedWatch } from '../../hooks/useTypedRHF';
import { Controller } from 'react-hook-form';
import { useEffect } from 'react';
import { OtherProjType } from './OtherProjType';


export const ProjectType = ({
  disabled,
}:{
  disabled?: boolean;
}) => {
  const { control, setValue, register, getValues } = useTypedFormContext();

  const { data: projTypeOptions } = useProjTypes({
    select: (d) => d
      ?.map(({
        label,
        projectName,
        uuid,
      }) => ({
        label: projectName.value || label?.value,
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
          onBlur,
          onChange,
          value: newValue,
        },
        fieldState: {
          error,
          isTouched,
        },
      }) => {
        const showError = isTouched && !!error;

        return (
          <Stack
            direction={'row'}
            spacing={2}
            justifyContent={'space-between'}
            width={600}
          >
            <FormControl 
              size='small'
              sx={{
                width: 300,
              }}
              placeholder='工事種別'
              error={showError}
              //disabled={disabled}
              required
            >
              <InputLabel>
                工事種別
              </InputLabel>
              <Select
                value={newValue}
                label="工事種別"
                onBlur={onBlur}
                onChange={(e) => {
                  const newProjTypeName = projTypeOptions
                    ?.find(({ value }) => value === e.target.value)
                    ?.label || '';

                  const custName = getValues('custName');
                  const hasContract = getValues('hasContract');

                  
                  if (!hasContract) {
                    // 契約がないときのみ、工事名称を変更する
                    setValue('projTypeName', newProjTypeName);
                    setValue('projName', `${custName}様邸　${newProjTypeName}`);
                  }
                
                  
                  onChange(e.target.value);
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

            
            <OtherProjType disabled={disabled} />
            
  
          </Stack>
        );

      }}
    />

  );
};