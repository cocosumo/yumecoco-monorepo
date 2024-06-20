import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { useTypedFormContext, useTypedWatch } from '../../../hooks/useTypedRHF';
import { TInvoiceDetails } from '../../../schema';



export const BillingAmount = ({
  index,
  required = false,
}: {
  index: number,
  required?: boolean
}) => {

  const {
    control,
    setValue,
  } = useTypedFormContext();

  const [
    invoiceDetails,
  ] = useTypedWatch({
    name: [
      'invoiceDetails',
    ],
  }) as [TInvoiceDetails];

  const handleChange = (newVal: string) => {
    const billingTotal = invoiceDetails.reduce((acc, {
      billingAmount,
    }, idx) => {
      if (index === idx) {
        return acc + +newVal;
      }
      const total = acc + +billingAmount;
      return total;
    }, 0);

    setValue('billingTotalAmount', billingTotal);
  };


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
              onChange(e.target.value);
              handleChange(e.target.value);
            }}
            required={required}
          />
        );
      }}
    />
  );
};
