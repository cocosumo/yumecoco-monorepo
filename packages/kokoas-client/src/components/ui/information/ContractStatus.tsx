
import CircleIcon from '@mui/icons-material/Circle';
import { Tooltip } from '@mui/material';
import { useContractColor } from 'kokoas-client/src/hooks/useContractColor';
import { jaEnvelopeStatus } from 'kokoas-client/src/lib';
import { TEnvelopeStatus } from 'types';


export const ContractStatus = ({
  envStatus,
}: {
  envStatus: TEnvelopeStatus
}) => {

  const getContractColor = useContractColor();


  return (
    <Tooltip title={jaEnvelopeStatus(envStatus).ja} placement="top">
      <CircleIcon fontSize={'small'} color={getContractColor(envStatus)} />
    </Tooltip>
  );
};