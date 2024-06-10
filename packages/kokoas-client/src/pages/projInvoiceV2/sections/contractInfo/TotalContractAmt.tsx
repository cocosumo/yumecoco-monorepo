import { Typography } from '@mui/material';
import { useTypedWatch } from '../../hooks/useTypedRHF';


/** 合計契約金額を表示します */
export const TotalContractAmt = () => {

  const [
    totalContractAmt,
  ] = useTypedWatch({
    name: [
      'totalContractAmtAfterTax',
    ],
  }) as [string];


  return (
    <Typography
      variant='h6'
      component={'span'}
      style={{ textDecoration: 'underline' }}
    >
      {`合計契約金額  ${totalContractAmt.toLocaleString()} 円`}
    </Typography>
  );
};
