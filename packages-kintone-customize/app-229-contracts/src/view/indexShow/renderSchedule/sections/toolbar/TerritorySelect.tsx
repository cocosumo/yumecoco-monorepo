import { Controller } from 'react-hook-form';
import { useTypedFormContext } from '../../hooks/useTypedRHF';
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { KForm, TForm, territoryChoices  } from '../../schema';

const name : KForm = 'territory';
export const TerritorySelect = () => {
  const { control } = useTypedFormContext();
  
  return (
    <Controller 
      name={name}
      control={control}
      render={({
        field: {
          onChange,
          value,
          ...otherField
        },
      }) => {
        return (
          <FormControl
            size='small'
          >
            <RadioGroup
              row
              aria-labelledby={name}
              value={value}
              onChange={(e) => onChange(e.target.value as TForm['territory'])}
              {...otherField}
            >
              {
                territoryChoices.map((t) => (
                  <FormControlLabel 
                    key={t}
                    value={t}
                    control={<Radio />}
                    label={t}
                  />
                ))
              }

            </RadioGroup>
          </FormControl>
        );
      }}
    />
  );
};