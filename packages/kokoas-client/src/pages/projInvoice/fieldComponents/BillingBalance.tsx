import { FormControl, FormLabel, Stack, Typography } from '@mui/material';

/**
 * 請求残高コンポーネント
 * @returns 
 */
export const BillingBalance = () => {

  const billingBalance = 'xxx,xxx'; // 請求残高の算出処理の実装箇所

  return (
    <FormControl>
      <Stack direction={'row'}>
        <FormLabel>
          請求残高
        </FormLabel>
        <Typography>
          {`${billingBalance} 円`}
        </Typography>
      </Stack>
    </FormControl>
  );
};