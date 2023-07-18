import { Controller } from 'react-hook-form';
import { useTypedFormContext } from '../../../hooks/useTypedHooks';
import { KFormCustomer } from '../../../schema';
import { InputAdornment, OutlinedInput } from '@mui/material';

export const ControlledNumberInput = ({
  index,
  name,
  suffix,
}:{
  index: number,
  name: KFormCustomer,
  suffix?: string,
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
            size='small'
            type='number'
            inputProps={{
              style: {
                textAlign: 'right',
              },
            }}
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