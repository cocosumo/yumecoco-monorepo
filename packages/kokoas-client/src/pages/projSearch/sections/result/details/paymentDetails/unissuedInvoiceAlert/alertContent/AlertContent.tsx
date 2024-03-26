import { Stack } from '@mui/material';
import { KAlertPurpose } from '../alertConfig';
import { PaymentDate } from './PaymentDate';
import { PaymentAmount } from './PaymentAmount';
import { Explanation } from './Explanation';
import { ChangeEventHandler } from 'react';


export const AlertContent = ({
  purpose,
  paymentDate,
  paymentAmount,
  handleDateChange,
  handleAmtChange,
}: {
  purpose: KAlertPurpose
  paymentDate: Date | null
  paymentAmount: number
  handleDateChange: (v: Date) => void
  handleAmtChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
}) => {
  
  return (
    <Stack
      direction={'column'}
      spacing={1}
    >
      <Stack
        direction={'row'}
        spacing={1}
      >
        <PaymentDate
          label='入金日'
          handleChange={handleDateChange}
          paymentDate={paymentDate}
        />
        <PaymentAmount
          label='入金額'
          handleChange={handleAmtChange}
          paymentAmount={paymentAmount}
        />
      </Stack >

      <Stack
        direction={'column'}
        spacing={1}
      >
        <Explanation
          label='通知内容'
          purpose={purpose}
          paymentDate={paymentDate}
          paymentAmount={paymentAmount}
        />
      </Stack>
    </Stack >
  );
};
