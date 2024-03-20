import { Alert, Stack } from '@mui/material';
import { jaEnvelopeStatus } from '../../../../lib';
import { useWatch } from 'react-hook-form';
import { TypeOfForm } from '../../schema';
import { TEnvelopeStatus } from 'types';
import { RefreshButton } from './RefreshButton';
import { StartContract } from './startcontract/StartContract';
import { EnvelopeRecipients } from 'docusign-esign';


export const PreviewHeader = ({
  recipients,
  isFetching,
}:{
  recipients?: EnvelopeRecipients
  isFetching?: boolean,
}) => {
  const envelopeStatus = useWatch<TypeOfForm>({
    name: 'envelopeStatus',
  });


  const { ja } = jaEnvelopeStatus(envelopeStatus as TEnvelopeStatus);

  const isWithContract = !!envelopeStatus;

  return (
    <Stack direction="row" spacing={2}>

      {envelopeStatus !== 'completed' && (
        <RefreshButton isFetching={isFetching} />
      )}
      {envelopeStatus === 'voiding' && (
        <Alert severity="info" >
          {ja}
        </Alert>
      )}

      {!isWithContract && (
        <StartContract 
          recipients={recipients}
          isFetching={isFetching}
        />
      ) }

      {/* <ContractStatus /> */}
    </Stack>
  );
};