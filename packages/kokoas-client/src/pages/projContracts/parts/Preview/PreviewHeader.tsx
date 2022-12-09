import { Alert, Stack } from '@mui/material';
import { useFormikContext } from 'formik';
import { jaEnvelopeStatus } from '../../../../lib';
import { TypeOfForm } from '../../form';
import { ContractStatus } from './ContractStatus';
import { RefreshButton } from './RefreshButton';
import { StartContract } from './PreviewMenu/startContract';


export const PreviewHeader = ({
  isBusy,
  handleRefetch,
  handleClosePreview,
}: {
  isBusy: boolean,
  handleRefetch: () => void
  handleClosePreview: () => void
}) => {

  const {
    values: {
      envelopeStatus,
    },
  } = useFormikContext<TypeOfForm>();


  const { ja } = jaEnvelopeStatus(envelopeStatus);

  const isWithContract = !!envelopeStatus;

  return (
    <Stack direction="row" spacing={2}>

      {envelopeStatus !== 'completed' && (
        <RefreshButton
          loading={isBusy}
          handleRefetch={handleRefetch}
        />
      )}
      {envelopeStatus === 'voiding' && (
        <Alert severity="info" >
          {ja}
        </Alert>
      )}

      {!isWithContract && !isBusy && (
        <StartContract handleClosePreview={handleClosePreview} />
      ) }

      <ContractStatus />
    </Stack>
  );
};