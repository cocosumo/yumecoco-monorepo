import { Stack } from '@mui/material';
import { DownloadContract } from './DownloadContract';
import { MenuContainer } from './PreviewMenu/MenuContainer';
import { SendContract } from './SendContract';


export const PreviewToolBar = ({
  projId, envelopeStatus, loading, envelopeId,
}: {
  projId: string,
  envelopeStatus: TEnvelopeStatus,
  envelopeId: string,
  loading: boolean,
}) => {

  const voidable = envelopeStatus === 'sent';

  return (
    <Stack  direction={'row'} spacing={2} justifyContent={'flex-end'}>
      {!!projId && <DownloadContract projId={projId}/>}

      {!!!envelopeStatus && !!!envelopeId  && !loading &&
        <SendContract
          projId={projId}
          isBusy={loading}
        />
      }

      {!!voidable  && !loading &&
        <MenuContainer/>
      }
    </Stack>
  );
};