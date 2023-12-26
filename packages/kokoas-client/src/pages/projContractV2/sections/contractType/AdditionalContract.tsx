import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { TypeOfForm } from '../../schema';

export const choices = [ 
  '追加工事',
  '減額工事',
  '返金',
  'その他',
] as const;

export const AdditionalContract = () => {
  const { control } = useFormContext<TypeOfForm>();
  
  return (
    <Controller 
      control={control}
      name={'contractAddType'}
      render={({
        field,
      }) => {
        return (
          <FormControl 
            size='small'
          >
            <RadioGroup
              row
              {...field}
            >
              {choices.map(choice => (
                <FormControlLabel
                  key={choice}
                  value={choice}
                  control={<Radio />}
                  label={choice}
                />
              ))}

            </RadioGroup>
          </FormControl>
        );
      }}

    />
    
  );
};