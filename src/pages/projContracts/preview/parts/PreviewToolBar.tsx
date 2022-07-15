import { Stack } from '@mui/material';
import { DownloadContract } from './DownloadContract';
import { SendContract } from './SendContract';

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
      <DownloadContract projId={projId}/>
      {envStatus == '' &&
      <SendContract
        projId={projId}
        isBusy={loading}
        envelopeId={envelopeId}
      />
            }
    </Stack>
  );
};