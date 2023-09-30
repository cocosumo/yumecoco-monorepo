import { Controller } from 'react-hook-form';
import { useTypedFormContext } from '../../hooks/useTypedRHF';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { today } from './../../config';
import { ChangeEvent } from 'react';

// past 5 years
const yearsOptions = Array.from({ length: 4 }, (_, i) => today.getFullYear() - i);

export const YearSelect = () => {
  const { control } = useTypedFormContext();
  
  return (
    <Controller
      control={control}
      name='year'
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
              年
            </InputLabel>
            <Select
              label="年"
              onChange={(e) => onChange(e as ChangeEvent)}
              {...otherField}
            >
              {yearsOptions.map((year) => (
                <MenuItem 
                  key={year}
                  value={year}
                >
                  {`${year}年`}
                </MenuItem>
              ))}

            </Select>

          </FormControl>
        );

      }}
    
    />
  );
};