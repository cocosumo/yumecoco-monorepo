import { Controller } from 'react-hook-form';
import { useTypedFormContext } from '../../hooks/useTypedRHF';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { ChangeEvent } from 'react';




export const MonthSelect = () => {
  const {
    control,
  } = useTypedFormContext();

  return (
    <Controller 
      control={control}
      name='month'
      render={({
        field: {
          onChange,
          ...otherField
        },
      }) => {

        return (
          <FormControl 
            size='small'
          >
            <InputLabel>
              月
            </InputLabel>
            <Select
              label="月"
              onChange={(e) => onChange(e as ChangeEvent)}
              {...otherField}
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                <MenuItem 
                  key={month}
                  value={month}
                >
                  {`${month}月`}
                </MenuItem>
              ))}                  
                
            </Select>
          </FormControl>
        );
      }}
    />
  );
};