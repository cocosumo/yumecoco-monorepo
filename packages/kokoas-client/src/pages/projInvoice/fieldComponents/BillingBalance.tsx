import { FormControl, FormLabel, Stack, Typography } from '@mui/material';
import { useContractAmount } from '../hooks/useContractAmount';

/**
 * 請求残高コンポーネント
 * @returns 
 */
export const BillingBalance = ({
  projId,
}: {
  projId: string
}) => {

  const { billingBalance } = useContractAmount(projId);

  return (
    <FormControl>
      <Stack direction={'row'}>
        <FormLabel sx={{ width: 120 }}>
          請求残高
        </FormLabel>
        <Typography>
          {`${billingBalance} 円`}
        </Typography>
      </Stack>
    </FormControl >
  );
};