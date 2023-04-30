import { FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup, TextField } from '@mui/material';
import { TypeOfForm, payMethods } from '../schema';
import { Controller, useFormContext } from 'react-hook-form';


export const PaymentMethod = ({
  disabled = false,
}: {
  disabled?: boolean
}) => {

  const { control, register } = useFormContext<TypeOfForm>();
  

  return (

    <Controller
      name={'payMethod'}
      control={control}
      render={({
        field: {
          onChange,
          value,
          ...otherFieldProps
        },
        fieldState: {
          error,
          isTouched,
        },
      }) => {
        const isShowError = isTouched && !!error;
        return (
          <FormControl 
            error={isShowError}
          >
            <FormLabel>
              {'支払い方法'}
            </FormLabel>
            { isShowError && (
            <FormHelperText>
              {error.message}
            </FormHelperText>
            )}
            <RadioGroup
              {...otherFieldProps}
              onChange={(_, newValue) => {
                onChange(newValue);
              }}
              value={value}
              row
            >
              {payMethods.map(pM => (
                <FormControlLabel
                  key={pM}
                  value={pM}
                  control={<Radio />}
                  label={pM}
                  disabled={disabled}
                />
              ))}
        
              <TextField 
                variant='standard'
                label={'振込先'}
                fullWidth
                {...register('payDestination')}
                sx={{
                  visibility: value === '振込' ? 'visible' : 'hidden',
                }}
              />
              
              
            </RadioGroup>


          </FormControl>
        );
      }}
    />

   

  );
};