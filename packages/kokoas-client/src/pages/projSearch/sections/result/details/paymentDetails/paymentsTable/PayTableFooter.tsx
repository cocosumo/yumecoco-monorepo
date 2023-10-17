import { Stack, Typography } from '@mui/material';
import { IAndpadpayments } from 'types';

export const PayTableFooter = ({
  records,
}: {
  records: IAndpadpayments[]
}) => {

  const totalAmount = records.reduce(
    (acc, cur) => {
      const parsedPaymentAmount = +cur.paymentAmount.value;
      const parsedHandlingFee = +cur.handlingFee.value;
      const actualPaymentAmount = parsedPaymentAmount + parsedHandlingFee;
      return acc + actualPaymentAmount;
    }, 
    0,
  );


  return (
    <Stack
      justifyContent={'flex-end'}
      width={'100%'}
      height={70}
      px={4}
      direction={'row'}
      spacing={2}
      borderTop={1}
      borderColor={'divider'}
      alignItems={'center'}
    >
      <Typography
        color={'text.secondary'}
      >
        総金額
      </Typography>
      <Typography
        variant='h5'
      >
        {totalAmount.toLocaleString()}
      </Typography>
    </Stack>
  );
};