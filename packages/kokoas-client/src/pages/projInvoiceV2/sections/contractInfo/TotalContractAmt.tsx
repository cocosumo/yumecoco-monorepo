import { Typography } from '@mui/material';
import { IContracts } from 'types';


/** 合計契約金額を表示します */
export const TotalContractAmt = ({
  contracts,
}: {
  contracts: IContracts[]
}) => {

  const totalContractAmt = contracts.reduce((acc, { totalContractAmt: contractAmt }) => {
    return acc + +contractAmt.value;
  }, 0);

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
