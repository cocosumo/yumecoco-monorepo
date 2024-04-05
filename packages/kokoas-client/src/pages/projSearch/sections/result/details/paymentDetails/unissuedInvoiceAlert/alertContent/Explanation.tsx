import { Stack, Typography } from '@mui/material';
import { useMemo } from 'react';
import { KAlertPurpose, alertMessages } from '../alertConfig';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';



export const Explanation = ({
  label = '通知内容',
  paymentDate,
  paymentAmount,
  purpose,
}: {
  label?: string
  paymentDate: string | null
  paymentAmount: string
  purpose: KAlertPurpose
}) => {

  const explanation = useMemo(() => {

    const defaultMessage = alertMessages[purpose];
    const displayAmount = !isNaN(+paymentAmount) && paymentAmount !== '0' && paymentAmount !== '' ?
      (+paymentAmount).toLocaleString() : null;
    const displayDate = paymentDate ? format(parseISO(paymentDate), 'yyyy年MM月dd日') : '';

    if (!paymentDate && !displayAmount) {

      return defaultMessage;

    } else if (!paymentDate && !!displayAmount) {
      return `\xA5${displayAmount}-${defaultMessage}`;

    } else if (!!paymentDate && !displayAmount) {
      return `${displayDate}に${defaultMessage}`;

    } else if (!!paymentDate && !!displayAmount) {
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
