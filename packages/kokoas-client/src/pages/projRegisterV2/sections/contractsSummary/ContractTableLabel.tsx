import { Stack, Tooltip, Typography } from '@mui/material';
import { ContractStatus } from 'kokoas-client/src/components';
import { jaEnvelopeStatus } from 'kokoas-client/src/lib';
import { TEnvelopeStatus } from 'types';

export const ContractTabLabel = ({
  envelopeStatus,
  textLabel,
}:{
  envelopeStatus: TEnvelopeStatus
  textLabel: string;
}) => {
  return (
    <Tooltip 
      title={jaEnvelopeStatus(envelopeStatus).ja}
      placement='top'
    >
      <Stack spacing={1} direction={'row'}>

        <Typography >
          {textLabel}
        </Typography>
                    
        <ContractStatus envStatus={envelopeStatus} />
      </Stack>
    </Tooltip>
  );
};