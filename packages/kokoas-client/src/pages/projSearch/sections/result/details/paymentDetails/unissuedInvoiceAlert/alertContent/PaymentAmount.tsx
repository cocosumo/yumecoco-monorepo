import { InputAdornment, TextField, Typography } from '@mui/material';
import { ChangeEventHandler } from 'react';

export const PaymentAmount = ({
  label = '入金額',
  handleChange,
  paymentAmount,
}: {
  label?: string
  handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  paymentAmount: string
}) => {

  return (
    <>
      <Typography
        variant='body2'
        color='gray'
      >
        {`${label} :`}
      </Typography>

      <TextField
        size='small'
        value={paymentAmount}
        onChange={handleChange}
        InputProps={{
          type: 'text',
          endAdornment: (
            <InputAdornment position="end">
              円
            </InputAdornment>),
          onFocus: (e) => e.target.select(),
        }}
        inputProps={{
          style: { textAlign: 'right' },
        }}
      />
    </>
  );
};
