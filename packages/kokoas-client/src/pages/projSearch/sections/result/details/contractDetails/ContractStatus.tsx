
import CircleIcon from '@mui/icons-material/Circle';
import { Tooltip } from '@mui/material';
import { jaEnvelopeStatus } from 'kokoas-client/src/lib';
import { useMemo } from 'react';
import { TEnvelopeStatus } from 'types';


export const ContractStatus = ({
  envStatus,
}: {
  envStatus: TEnvelopeStatus
}) => {

  const color = useMemo(() => {
    switch (envStatus) {
      case 'completed':
        return 'success';
      case 'sent':
        return 'info';
      case 'voided':
      case 'voiding':
        return 'error';
      default:
        return 'disabled';
    }
  }, [envStatus]);


  return (
    <Tooltip title={jaEnvelopeStatus(envStatus).ja} placement="top">
      <CircleIcon color={color} />
    </Tooltip>
  );
};