import { Controller } from 'react-hook-form';
import { useTypedFormContext, useTypedWatch } from '../../hooks/useTypedRHF';
import { Box, Chip, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { getFiscalMonths } from '../../../../../helpers/getFiscalMonths';
import parse from 'date-fns/parse';
import format from 'date-fns/format';


const formatYearMonth = (yearMonth: string) => {

  return `${format(parse(yearMonth, 'yyyy-MM', new Date()), 'M')}月`;
};

export const SelectMonths = () => {

  const { control } = useTypedFormContext();
  const selectedYear = useTypedWatch({
    name: 'year',
  }) as string;

  const fiscalMonths = getFiscalMonths(selectedYear);

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
              onChange={(e) => onChange(([] as string[]).concat(e.target.value).sort())}
              multiple
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((s) => (
                    <Chip size='small' key={s} label={formatYearMonth(s)} />
                  ))}
                </Box>
              )}
              {...otherField}
            >
              {fiscalMonths.map((month) => (
                <MenuItem 
                  key={month}
                  value={month}
                >
                  {formatYearMonth(month)}
                </MenuItem>
              ))}
                  
                
            </Select>
          </FormControl>
                    
        );
      }}
    
    />
  );
};