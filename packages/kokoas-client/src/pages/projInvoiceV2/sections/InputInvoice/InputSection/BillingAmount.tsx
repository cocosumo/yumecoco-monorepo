import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { useTypedFormContext } from '../../../hooks/useTypedRHF';



export const BillingAmount = ({
  index,
  required = false,
}: {
  index: number,
  required?: boolean
}) => {

  const {
    control,
  } = useTypedFormContext();

  return (
    <Controller
      control={control}
      name={`invoiceDetails.${index}.billingAmount`}
      render={({
        field: {
          value,
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
            required={required}
          />
        );
      }}
    />
  );
};
