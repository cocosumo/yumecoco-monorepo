import { Grid } from '@mui/material';
import { Stack } from '@mui/system';
import { FormikMoneyField } from 'kokoas-client/src/components/ui/textfield';
import { getFieldName } from '../form';
import { DisplayAmount } from './DisplayAmount';
import { ExceedContractAmount } from './ExceedContractAmount';

/**
 * 請求金額コンポーネント
 * @param projId :工事番号
 * @returns 
 */
export const BillingAmount = ({
  open,
  billingBalance,
}: {
  open: boolean
  billingBalance: number,
}) => {


  return (
    <Stack spacing={2} direction={'column'}>
      {/* 請求金額 */}
      <Stack spacing={2} alignItems={'center'} direction={'row'}>

        <Grid item xs={12} md={4}>
          <FormikMoneyField
            label='請求額'
            name={getFieldName('billingAmount')}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          {open && <ExceedContractAmount />}
        </Grid>
      </Stack>

      {/* 請求残高 */}

      <Grid item xs={12} md={6}>
        <DisplayAmount
          amount={billingBalance}
          label={'請求残高'}
        />
      </Grid>

      <Grid item md={6} />
    </Stack>
  );
};