import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { useTypedFormContext } from '../../../hooks/useTypedRHF';
import { useBillingTotal } from '../../../hooks/useBillingTotal';



export const BillingAmount = ({
  index,
  required = false,
}: {
  index: number,
  required?: boolean
}) => {

  const { control } = useTypedFormContext();
  const { handleChange } = useBillingTotal();

  return (
    <Controller
      control={control}
      name={`invoiceDetails.${index}.billingAmount`}
      render={({
        field: {
          value,
          onChange,
          ...otherValue
        },
        fieldState: {
          error,
        },
      }) => {

        return (
          <TextField
            {...otherValue}
            value={value || ''}
            label={'請求金額(税込)'}
            size='small'
            error={!!error}
            helperText={error?.message}
            onChange={(e) => {
              onChange(+e.target.value);
              handleChange(+e.target.value, index);
            }}
            required={required}
          />
        );
      }}
    />
  );
};
