import { useTypedWatch } from '../../hooks/useTypedRHF';
import { Stack, StackProps, Typography } from '@mui/material';
import { Big } from 'big.js';



const BillingInfo = ({
  label,
  value,
  justifyContent,
}: {
  label: string,
  value: string,
  justifyContent?: StackProps['justifyContent']
}) => (
  <Stack
    direction={'row'}
    justifyContent={justifyContent}
  >
    <Typography variant='body2' width={'100Px'}>
      {label}
    </Typography>
    <Typography
      variant='body1'
      component={'span'}
      width={'15%'}
      align={'right'}
      style={{
        position: 'relative',
        display: 'inline-block',
      }}
    >
      {value}
      <span
        style={{
          position: 'absolute',
          bottom: '-2px', // Adjust this value as needed
          left: '0',
          width: '100%',
          borderBottom: '1px solid black',
        }}
      />
    </Typography>
  </Stack>
);


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


  const billingBalance = Big(totalContractAmtAfterTax).minus(billingTotalAmount)
    .round()
    .toNumber();

  return (
    <Stack spacing={1}>
      <BillingInfo key={'billingTotalAmount'} label={'請求済み金額'} value={`${billingTotalAmount.toLocaleString()} 円`} />
      <BillingInfo key={'billingBalance'} label={'請求残額'} value={`${billingBalance.toLocaleString()} 円`} />
    </Stack>
  );
};
