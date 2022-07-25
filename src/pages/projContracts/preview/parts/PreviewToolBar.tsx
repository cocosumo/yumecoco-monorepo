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

  console.log('loading', loading, envelopeStatus, projId);

  return (
    <Stack  direction={'row'} spacing={2} justifyContent={'flex-end'}>
      {!!projId && <DownloadContract projId={projId}/>}

      {!loading && !!!envelopeStatus && !!!envelopeId  && !voidable &&
        <SendContract
          projId={projId}
          isBusy={loading}
        />
      }

      {!loading && !!voidable && !!envelopeId  &&
        <MenuContainer/>
      }
    </Stack>
  );
};