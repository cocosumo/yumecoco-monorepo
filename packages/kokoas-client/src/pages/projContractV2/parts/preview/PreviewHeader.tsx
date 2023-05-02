import { Alert, Stack } from '@mui/material';
import { jaEnvelopeStatus } from '../../../../lib';
import { useWatch } from 'react-hook-form';
import { TypeOfForm } from '../../schema';
import { TEnvelopeStatus } from 'types';
import { RefreshButton } from './RefreshButton';
import { StartContract } from './startcontract/StartContract';


export const PreviewHeader = () => {

  const envelopeStatus = useWatch<TypeOfForm>({
    name: 'envelopeStatus',
  });


  const { ja } = jaEnvelopeStatus(envelopeStatus as TEnvelopeStatus);

  const isWithContract = !!envelopeStatus;

  return (
    <Stack direction="row" spacing={2}>

      {envelopeStatus !== 'completed' && (
        <RefreshButton />
      )}
      {envelopeStatus === 'voiding' && (
        <Alert severity="info" >
          {ja}
        </Alert>
      )}

      {!isWithContract && (
        <StartContract />
      ) }

      {/* <ContractStatus /> */}
    </Stack>
  );
};