import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { TypeOfForm, contractTypes } from '../../schema';




export const ContractTypeField = () => {

  const { control } = useFormContext<TypeOfForm>();

  return (
    <Controller
      name={'contractType'}
      control={control}
      render={({
        field: {
          onChange,
          value,
          ...restField
        },
        fieldState: {
          isDirty,
          error,
        },
      }) => {
        const showError = !!error && isDirty;
        return (
          <FormControl>
            <FormLabel id="contractTypeLabel">
              カテゴリ
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="contractTypeLabel"
              onChange={(e) => {
                onChange(e.target.value as string);
              }}
              value={value}
              
              {...restField}
            >
           
              {contractTypes
                .map(choice => (
                  <FormControlLabel
                    key={choice}
                    value={choice}
                    control={<Radio />}
                    label={choice}
                  />
                ))}
            </RadioGroup>
            <FormHelperText>
              {showError && error?.message}
            </FormHelperText>
          </FormControl>
         
        );
      }}
    />
    
  );
};