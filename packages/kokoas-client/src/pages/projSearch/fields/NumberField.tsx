import { Controller } from 'react-hook-form';
import { useTypedFormContext } from '../hooks/useTypedRHF';
import { KeyOfForm } from '../schema';
import { InputAdornment, OutlinedInput } from '@mui/material';
import { NumericFormat } from 'react-number-format';

export const NumberField = ({
  name,
  suffix,
}:{
  name: KeyOfForm,
  suffix: 'から' | 'まで',
}) => {
  const { control } = useTypedFormContext();


  return (
    <Controller 
      name={name}
      control={control}
      render={({
        field: {
          value,
          onChange,
          ref,
          ...restField
        },
      }) => {

        return (
          <NumericFormat 
            value={value === null ? '' : value as number}
            thousandSeparator={true}           
            customInput={OutlinedInput}
            size="small"
            fullWidth
            inputRef={ref}
            startAdornment={(
              <InputAdornment position="start">
                ¥
              </InputAdornment>)}
            endAdornment={(
              <InputAdornment position="end">
                {suffix}
              </InputAdornment>)}
            onValueChange={({ floatValue: newValue }) => {
              onChange(newValue as number);
            }}
            {...restField}
          />


        );
      }}
    />
  );
};