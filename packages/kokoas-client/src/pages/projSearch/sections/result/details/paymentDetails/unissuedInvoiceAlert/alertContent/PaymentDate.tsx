import { Typography } from '@mui/material';
import { JADatePicker } from 'kokoas-client/src/components';



export const PaymentDate = ({
  label = '入金日',
  handleChange,
  paymentDate,
}: {
  label?: string
  handleChange: (v: Date) => void
  paymentDate: Date | null
}) => {


  return (
    <>
      <Typography
        variant='body2'
        sx={{
          color: 'gray',
        }}
      >
        {`${label} :`}
      </Typography>

      <JADatePicker
        onChange={handleChange}
        value={paymentDate}
        slotProps={{
          popper: { placement: 'right' },
          textField: {
            size: 'small',
            sx: {
              width: 150,
            },
          },
        }}
      />
    </>);
};
