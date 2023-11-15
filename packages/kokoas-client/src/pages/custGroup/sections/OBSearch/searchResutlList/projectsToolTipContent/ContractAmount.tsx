import { Typography } from '@mui/material';
import { getContractsSummary } from 'api-kintone/src/contracts/getContractsSummary';
import { useContractsByProjIdV2 } from 'kokoas-client/src/hooksQuery';

export const ContractAmount = ({
  projId,
}:{
  projId: string,
}) => {
  const { data: contractsRec = [] } = useContractsByProjIdV2(projId);

  const {
    合計受注金額税込,
  } = getContractsSummary(contractsRec);

  return (
    <Typography
      fontSize={'0.6rem'}
      whiteSpace={'nowrap'}
      ml={2}
    >
      {`${合計受注金額税込.toLocaleString()} 円`}
    </Typography>
  );
};