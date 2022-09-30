import { Stack, Typography } from '@mui/material';

export const TotalPaymentAmount = () => {
  return (
    <Stack pb={2}>
      <Typography variant="caption" textAlign={'center'}>
        契約合計金額
      </Typography>
      <Typography fontSize={32} textAlign={'center'}>
        111,111,111円
      </Typography>
    </Stack>
  );
};