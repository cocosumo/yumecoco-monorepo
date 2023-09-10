import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useMemo } from 'react';
import { useTypedFormContext } from '../../hooks/useTypedRHF';
import { Controller } from 'react-hook-form';
import { getLatestMonths } from '../../../../../helpers/getLatestMonths';


export const SelectYear = () => {
  const {
    control,
    setValue,
  } = useTypedFormContext();

  const years = useMemo(
    () => {
      const currentDate = new Date();
      const latestYear = currentDate.getFullYear() + 1;
      return Array.from(
        { length: 4 },
        (_, index) => latestYear - index,
      );
      
    }, 
    [],
  );

  return (
    <Controller 
      name='year'
      control={control}
      render={({
        field: { onChange, value, ...otherField },
        
      }) => {

        return (
          <FormControl 
            fullWidth
            size='small'
            sx={{
              maxWidth: '150px',
            }}
          >
            <InputLabel id="selectYearLabel">
              年度
            </InputLabel>
            <Select
              labelId="selectYear"
              id="selectYear"
              value={value}
              label="年度"
              onChange={(e) => {
                onChange(e.target.value);
                setValue('months', getLatestMonths(+e.target.value, 3));
              }}
              {...otherField}
            >
              {years.map((year) => (
                <MenuItem 
                  key={year}
                  value={year}
                >
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      }}
    />

    
  );
};