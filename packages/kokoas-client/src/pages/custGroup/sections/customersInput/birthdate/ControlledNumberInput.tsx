import { Controller } from 'react-hook-form';
import { useTypedFormContext } from '../../../hooks/useTypedHooks';
import { KFormCustomer } from '../../../schema';
import { InputAdornment, OutlinedInput } from '@mui/material';

export const ControlledNumberInput = ({
  index,
  name,
  prefix,
  suffix,
  width,
  borderRadius,
  ...rest
}:{
  index: number,
  name: KFormCustomer,
  prefix?: string,
  suffix?: string,
  width?: number,
  min?: number,
  max?: number,
  borderRadius?: string,
}) => {
  const { control } = useTypedFormContext();


  return (
    <Controller  
      control={control}
      name={`customers.${index}.${name}`}
      render={({
        field: {
          ref,
          ...restFields
        },
      }) => {
        return (
          <OutlinedInput 
            inputRef={ref}
            {...restFields}
            {...rest}
            size='small'
            type='number'
            sx={{
              width: width || 100,
              borderRadius,            
            }}
            inputProps={{
              style: {
                textAlign: 'right',
                
              },
            }}
            startAdornment={(
              <InputAdornment position="start">
                {prefix}
              </InputAdornment>)}
            endAdornment={(
              <InputAdornment position="end">
                {suffix}
              </InputAdornment>)}
          />
        );
      }}
    />
  );
};