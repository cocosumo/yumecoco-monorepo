import { Alert, AlertTitle, Stack } from '@mui/material';
import { useFormikContext } from 'formik';
import { jaEnvelopeStatus } from '../../../../lib';
import { TypeOfForm } from '../../form';
import { ContractStatus } from './ContractStatus';
import { RefreshButton } from './RefreshButton';

export const PreviewHeader = ({
  isBusy,
  handleRefetch,
}: {
  isBusy: boolean,
  handleRefetch: () => void
}) => {

  const {
    values: {
      envelopeStatus,
    },
  } = useFormikContext<TypeOfForm>();

  const { ja } = jaEnvelopeStatus(envelopeStatus);

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
      <ContractStatus />
    </Stack>
  );
};