import { FormControl, FormLabel, Grid, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useFormikContext } from 'formik';
import { FormikMoneyField } from 'kokoas-client/src/components/ui/textfield';
import { useEffect, useState } from 'react';
import { getFieldName, TypeOfForm } from '../form';
import { useContractAmount } from '../hooks/useContractAmount';
import { ExceedContractAmount } from './ExceedContractAmount';

/**
 * 請求金額コンポーネント
 * @param projId :工事番号
 * @returns 
 */
export const BillingAmount = ({
  projId,
}: {
  projId: string
}) => {
  const { values, setValues } = useFormikContext<TypeOfForm>();
  const { billingAmount } = values;

  const { billingBalance } = useContractAmount(projId);

  const [open, setOpen] = useState(false);



  useEffect(() => {
    setValues({
      ...values,
      billingAmount: String(billingBalance),
    });
  }, [billingBalance]);


  useEffect(() => {
    let openChk = false;
    if ((billingBalance - +billingAmount) < 0) {
      openChk = true;
    }

    setOpen(openChk);
    setValues({
      ...values,
      exceedContractAmount: openChk,
    });
  }, [billingBalance, billingAmount]);



  return (
    <>
      {/* 請求金額 */}
      <Stack spacing={2} direction={'row'}>

        <Grid item xs={12} md={4}>
          <FormikMoneyField
            label='請求額'
            name={getFieldName('billingAmount')}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          {open && <ExceedContractAmount />}
        </Grid>
        <Grid item md={2} />
      </Stack>

      {/* 請求残高 */}
      <FormControl>
        <Stack spacing={2} direction={'row'}>
          <FormLabel sx={{ width: 120 }}>
            請求残高
          </FormLabel>
          <Typography sx={{ width: 120, textAlign: 'right' }}>
            {`${billingBalance - +billingAmount} 円`}
          </Typography>
        </Stack>
      </FormControl>
    </>
  );
};