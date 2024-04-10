import { Stack, Typography } from '@mui/material';
import { useMemo } from 'react';
import { KAlertPurpose, alertMessages } from '../alertConfig';
import { getDisplayPaymentDate } from '../helper/getDisplayPaymentDate';



export const Explanation = ({
  label = '通知内容',
  paymentDate,
  paymentAmount,
  purpose,
}: {
  label?: string
  paymentDate: Date | null
  paymentAmount: string
  purpose: KAlertPurpose
}) => {

  const explanation = useMemo(() => {

    const defaultMessage = alertMessages[purpose];
    const displayAmount = !isNaN(+paymentAmount) && paymentAmount !== '0' && paymentAmount !== '' ?
      (+paymentAmount).toLocaleString() : null;
    const displayDate = getDisplayPaymentDate(paymentDate);


    if (!displayDate && !displayAmount) {
      return defaultMessage;

    } else if (!displayDate && !!displayAmount) {
      return `\xA5${displayAmount}-${defaultMessage}`;

    } else if (!!displayDate && !displayAmount) {
      return `${displayDate}に${defaultMessage}`;

    } else if (!!displayDate && !!displayAmount) {
      return `${displayDate}に\xA5${displayAmount}-${defaultMessage}`;

    }

  }, [paymentDate, purpose, paymentAmount]);


  return (
    <Stack
      direction={'column'}
      spacing={1}
    >
      <Typography
        variant='body2'
        sx={{
          color: 'gray',
        }}
      >
        {`${label} :`}
      </Typography>

      <Typography
        variant='body1'
        sx={{
          pl: '10px',
        }}
      >
        {explanation}
      </Typography>
    </Stack>
  );
};
