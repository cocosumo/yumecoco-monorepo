import { Controller } from 'react-hook-form';
import { useTypedFormContext } from '../../hooks/useTypedRHF';
import { Box, Chip, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useLatestMonths } from '../../hooks/useLatestMonths';

export const SelectMonths = () => {

  const { control } = useTypedFormContext();

  const latestMonths = useLatestMonths();

  return (
    <Controller 
      name='months'
      control={control}
      render={({
        field: { onChange, value, ...otherField },
      }) => {

        return (
  
          <FormControl 
            size='small'
            sx={{
              minWidth: '150px',
            }}
          >
            <InputLabel id="selectMonthsLabel">
              年月
            </InputLabel>
            <Select
              labelId="selectMonths"
              id="selectMonths"
              value={value}
              label="年月"
              onChange={(e) => onChange(([] as string[]).concat(e.target.value))}
              multiple
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((s) => (
                    <Chip key={s} label={s} />
                  ))}
                </Box>
              )}
              {...otherField}
            >
              {latestMonths.map((month) => (
                <MenuItem 
                  key={month}
                  value={month}
                >
                  {month}
                </MenuItem>
              ))}
                  
                
            </Select>
          </FormControl>
                    
        );
      }}
    
    />
  );
};