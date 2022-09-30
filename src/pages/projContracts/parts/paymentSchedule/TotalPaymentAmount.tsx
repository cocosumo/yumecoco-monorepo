import { Stack, Typography } from '@mui/material';

export const TotalPaymentAmount = ({
  totalAmount,
}: {
  totalAmount: number
}) => {
  return (
    <Stack pb={2}>
      <Typography variant="caption" textAlign={'center'}>
        契約合計金額
      </Typography>
      <Typography fontSize={32} textAlign={'center'}>
        {`${totalAmount?.toLocaleString() ?? 0} 円`}
      </Typography>
    </Stack>
  );
};