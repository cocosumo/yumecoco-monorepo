import { Stack, Typography } from '@mui/material';
import { ContractStatus } from 'kokoas-client/src/components';
import { TEnvelopeStatus } from 'types';

export const ContractTabLabel = ({
  envelopeStatus,
  textLabel,
}:{
  envelopeStatus: TEnvelopeStatus
  textLabel: string;
}) => {
  return (

    <Stack spacing={1} direction={'row'}>

      <Typography >
        {textLabel}
      </Typography>
                    
      <ContractStatus envStatus={envelopeStatus} />
    </Stack>

  );
};