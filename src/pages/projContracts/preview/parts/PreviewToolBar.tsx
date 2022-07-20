import { Stack } from '@mui/material';
import { DownloadContract } from './DownloadContract';
import { SendContract } from './SendContract';
import { SenderViewButton } from './SenderViewButton';

export const PreviewToolBar = ({
  projId, envelopeStatus, envelopeId, loading,
}: {
  projId: string,
  envelopeStatus: TEnvelopeStatus,
  envelopeId: string,
  loading: boolean,
}) => {

  return (
    <Stack  direction={'row'} spacing={2} justifyContent={'flex-end'}>
      {!!projId && <DownloadContract projId={projId}/>}

      {envelopeStatus == '' && !loading &&
        <SendContract
          projId={projId}
          isBusy={loading}
        />
      }

      {envelopeStatus != '' && envelopeStatus != 'completed' && !loading &&
      <SenderViewButton
          envelopeId={envelopeId}
        />
      }
    </Stack>
  );
};