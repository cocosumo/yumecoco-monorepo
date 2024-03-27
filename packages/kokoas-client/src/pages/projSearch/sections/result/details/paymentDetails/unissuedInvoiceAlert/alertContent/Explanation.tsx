import { Typography } from '@mui/material';
import { useMemo } from 'react';
import { KAlertPurpose, alertMessages } from '../alertConfig';
import format from 'date-fns/format';



export const Explanation = ({
  label = '通知内容',
  paymentDate,
  paymentAmount,
  purpose,
}: {
  label?: string
  paymentDate: Date | null
  paymentAmount: number | null
  purpose: KAlertPurpose
}) => {
  const explanation = useMemo(() => {
    const defaultMessage = alertMessages[purpose];

    if (!paymentDate && !paymentAmount) {

      return defaultMessage;

    } else if (!paymentDate && !!paymentAmount) {

      const displayAmount = paymentAmount.toLocaleString();
      return `\xA5${displayAmount}-${defaultMessage}`;

    } else if (!!paymentDate && !paymentAmount) {

      const displayDate = format(paymentDate, 'yyyy年MM月dd日');
      return `${displayDate}に${defaultMessage}`;

    } else if (!!paymentDate && !!paymentAmount) {

      const displayAmount = paymentAmount.toLocaleString();
      const displayDate = format(paymentDate, 'yyyy年MM月dd日');
      return `${displayDate}に\xA5${displayAmount}-${defaultMessage}`;

    }

  }, [paymentDate, purpose, paymentAmount]);


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

      <Typography
        variant='body1'
        sx={{
          pl: '10px',
        }}
      >
        {explanation}
      </Typography>
    </>
  );
};
