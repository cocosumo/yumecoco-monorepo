import { useTypedFormContext } from '../../../hooks/useTypedRHF';
import { Controller } from 'react-hook-form';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { payMethods } from '../../../schema';



export const PayMethod = ({
  required = false,
}:{
  required?: boolean
}) => {

  const { control } = useTypedFormContext();

  return (
    <Controller
      name={'payMethodPlan'}
      control={control}
      render={({
        field: {
          onChange,
          value,
          ...otherFields
        },
        fieldState: {
          error,
          isTouched,
        },
        formState: {
          isSubmitted,
        },
      }) => {

        const showError = !!error && (isTouched || isSubmitted);

        return (
          <FormControl
            size='small'
            sx={{
              width: 200,
            }}
            required={required}
            error={showError}
          >
            <InputLabel>
              入金区分
            </InputLabel>
            <Select
              value={value as string || ''}
              onChange={(e) => {
                onChange(e.target.value);
              }}
              label='入金区分'
              size='small'
              {...otherFields}
            >
              {
                payMethods.map((payMethod) => {
                  return (
                    <MenuItem
                      key={payMethod}
                      value={payMethod}
                    >
                      {payMethod}
                    </MenuItem>
                  );
                })
              }
            </Select>
            <FormHelperText>
              {showError && error.message}
            </FormHelperText>
          </FormControl>
        );
      }}
    />
  );
};
