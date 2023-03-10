import { Stack, Typography } from '@mui/material';
import { Caption } from 'kokoas-client/src/components';

export const ButtonContentBillingAmount = ({
  billingAmount,
}: {
  billingAmount: string
}) => {

  return (
    <Stack
      direction={'column'}
      spacing={0}
      alignItems="flex-end"
      justifyContent="space-around"
      width={'100%'}
    >
      <Caption text={'請求金額'} />
      <Typography align='right' variant='h5'>
        {`${Math.round(+billingAmount).toLocaleString()} 円`}
      </Typography>
    </Stack>
  );
};