import { FormControl, FormHelperText, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { fieldMapJa } from '../../api/fieldMapJa';

export const CommissionRate = () => {
  const { control } = useFormContext();


  return (
    <Controller 
      control={control}
      name={'commissionRate'}
      render={({
        field:{
          value,
          onChange,
          ...otherFieldProps
        },
        fieldState: {
          error,
          isTouched,
        },
      }) => {

        console.log('RECEIVED VALUE', value, typeof value);

        return (
          <FormControl
            error={isTouched && !!error}
            size='small'
          >
            <InputLabel
              htmlFor={otherFieldProps.name}
            >
              {fieldMapJa.commissionRate} 
            </InputLabel>
            <OutlinedInput 
              {...otherFieldProps}
              id={otherFieldProps.name}
              value={value ?? ''}
              label={fieldMapJa.commissionRate} 
              onChange={({ target: { value: newValue } }) => {
                console.log(newValue, typeof newValue, Number(newValue), value);

                onChange(newValue === '' ? null : Number(newValue));
              }}
              sx={{
                width: '110px',
              }}
              placeholder='50'
              type='number'
              inputProps={{
                // Prevent change by mouse wheel
                onWheel: (e) => e.currentTarget.blur(),
              }}
            // end adornment is %
              endAdornment={(
                <InputAdornment position='end'>
                  %
                </InputAdornment>
              )}
              required
            />
            <FormHelperText
              sx={{
                marginLeft: '0px', // override default margin that adds 14px
              }}
            >
              {error?.message || ' '}
            </FormHelperText>
          </FormControl>
        );
      }}
    />
  );
};