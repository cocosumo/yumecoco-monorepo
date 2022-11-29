import { FormControl, FormLabel, Stack, Typography } from '@mui/material';

export const BillingBalance = ({
  billingBalance,
}:{
  billingBalance: number
}) => {
  return (
    <FormControl>
      <Stack spacing={2} direction={'row'}>
        <FormLabel sx={{ width: 120 }}>
          請求残高
        </FormLabel>
        <Typography sx={{ width: 120, textAlign: 'right' }}>
          {`${billingBalance} 円`}
        </Typography>
      </Stack>
    </FormControl>
  );
};