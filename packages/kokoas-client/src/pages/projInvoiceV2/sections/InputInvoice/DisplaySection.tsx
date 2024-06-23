import { useTypedWatch } from '../../hooks/useTypedRHF';
import { Stack } from '@mui/material';
import { Big } from 'big.js';
import { AmountInfo } from '../../parts/AmountInfo';
import { useMemo } from 'react';



export const DisplaySection = () => {

  const [
    totalContractAmtAfterTax,
    billingTotalAmount,
  ] = useTypedWatch({
    name: [
      'totalContractAmtAfterTax',
      'billingTotalAmount',
    ],
  }) as [number, number];

  const billingBalance = useMemo(() => {
    return Big(totalContractAmtAfterTax).minus(billingTotalAmount)
      .round()
      .toNumber();
  }, [totalContractAmtAfterTax, billingTotalAmount]);



  return (
    <Stack spacing={1}>
      <AmountInfo
        key={'billingTotalAmount'}
        label={'請求済み金額'}
        value={`${billingTotalAmount.toLocaleString()} 円`}
      />
      <AmountInfo
        key={'billingBalance'}
        label={'請求残額'}
        value={`${billingBalance.toLocaleString()} 円`}
      />
    </Stack>
  );
};
