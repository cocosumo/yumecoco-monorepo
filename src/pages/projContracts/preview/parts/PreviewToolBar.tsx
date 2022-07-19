import { Stack } from '@mui/material';
import { DownloadContract } from './DownloadContract';
import { SendContract } from './SendContract';
import { SenderViewButton } from './SenderViewButton';

export const PreviewToolBar = ({
  projId, envStatus, envelopeId, loading,
}: {
  projId: string,
  envStatus: TEnvelopeStatus,
  envelopeId: string,
  loading: boolean,
}) => {

  return (
    <Stack  direction={'row'} spacing={2} justifyContent={'flex-end'}>
      {!!projId && <DownloadContract projId={projId}/>}

      {envStatus == '' && !loading &&
        <SendContract
          projId={projId}
          isBusy={loading}
          envelopeId={envelopeId}
        />
      }

      {envStatus != '' && envStatus != 'completed' && !loading &&
      <SenderViewButton
          envelopeId={envelopeId}
        />
      }
    </Stack>
  );
};