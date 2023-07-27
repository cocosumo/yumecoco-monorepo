import { Controller } from 'react-hook-form';
import { useTypedFormContext } from '../hooks/useTypedRHF';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';

const financingMethodOptions = [
  'ローン',
  '現金',
];

export const FinancingMethod = () => {
  const { control } = useTypedFormContext();

  return (
    <Controller 
      control={control}
      name='financingMethod'
      render={({
        field: {
          value,
          onChange,
        },
      }) => {


        return (
          <FormControl>
            <FormLabel >
              支払い方法
            </FormLabel>
            <RadioGroup
              value={value}
              onChange={onChange}
              row
            >
              {financingMethodOptions.map((option) => (
                <FormControlLabel
                  key={option}
                  value={option}
                  control={<Radio />}
                  label={option}
                />
              ))}

            </RadioGroup>
          </FormControl>);
      }}
    
    />
  );
};