import { Stack, Typography } from '@mui/material';
import { KAlertPurpose, alertMessages } from './alertConfig';
import { useMemo } from 'react';
import { JADatePicker } from 'kokoas-client/src/components';
import format from 'date-fns/format';


export const AlertContent = ({
  purpose,
  paymentDate,
  handleDateChange,
}: {
  purpose: KAlertPurpose
  paymentDate: Date | null
  handleDateChange: (v: Date) => void
}) => {
  const explanation = useMemo(() => {
    const defaultMessage = alertMessages[purpose];
    if (purpose === 'unissued') return defaultMessage;

    if (!paymentDate) return defaultMessage;

    const displayDate = format(paymentDate, 'yyyy年MM月dd日');

    return `${displayDate}に${defaultMessage}`;

  }, [paymentDate, purpose]);

  return (
    <Stack
      direction={'row'}
      spacing={1}
    >
      {purpose === 'subsidy' &&
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
            入金予定日 :
          </Typography>

          <JADatePicker
            onChange={handleDateChange}
            value={paymentDate}
            slotProps={{
              textField: {
                label: '入金予定日',
                size: 'small',
                sx: {
                  width: 150,
                },
              },
            }}
          />
        </Stack>}

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
          通知内容 :
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
    </Stack >
  );
};
